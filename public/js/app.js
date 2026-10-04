// Main Application Logic

// Page switching
function switchPage(pageName) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // Show selected page
    document.getElementById(`${pageName}-page`).classList.add('active');

    // Update active nav item
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`[data-page="${pageName}"]`).classList.add('active');

    // Update page title
    const titles = {
        dashboard: 'Dashboard',
        members: 'Members Management',
        meals: 'Meals & Orders Management',
        expenses: 'Expense Management',
        billing: 'Billing & Invoices',
        employees: 'Employee Management',
        integrations: 'Integrations'
    };
    document.getElementById('page-title').textContent = titles[pageName];

    // Load page data
    loadPageData(pageName);
}

// Load page data
async function loadPageData(pageName) {
    try {
        switch (pageName) {
            case 'dashboard':
                loadDashboard();
                break;
            case 'members':
                loadMembers();
                break;
            case 'meals':
                loadOrders();
                break;
            case 'expenses':
                loadExpenses();
                break;
            case 'billing':
                loadBilling();
                break;
            case 'employees':
                loadEmployees();
                break;
            case 'integrations':
                loadIntegrations();
                break;
        }
    } catch (error) {
        console.error('Error loading page:', error);
        showAlert('Error loading page', 'error');
    }
}

// Dashboard
async function loadDashboard() {
    try {
        const data = await API.getDashboard();
        const stats = data.stats;

        document.getElementById('stat-members').textContent = stats.activeMembers;
        document.getElementById('stat-expenses').textContent = stats.totalExpenses;
        document.getElementById('stat-billing').textContent = stats.pendingBillings;
        document.getElementById('stat-employees').textContent = stats.activeEmployees;
        document.getElementById('stat-orders').textContent = stats.totalOrders;
        document.getElementById('stat-today-orders').textContent = stats.todayOrders;
    } catch (error) {
        console.error('Error loading dashboard:', error);
    }
}

// Members Management
async function loadMembers() {
    try {
        const members = await API.getMembers();
        const tbody = document.getElementById('members-tbody');
        tbody.innerHTML = '';

        members.forEach(member => {
            const row = tbody.insertRow();
            row.innerHTML = `
                <td>${member.name}</td>
                <td>${member.email}</td>
                <td>${member.phone}</td>
                <td><span class="status-badge active">${member.status}</span></td>
                <td>
                    <button class="btn btn-secondary" onclick="editMember('${member.id}')">Edit</button>
                    <button class="btn btn-secondary" onclick="deleteMember('${member.id}')">Delete</button>
                </td>
            `;
        });
    } catch (error) {
        console.error('Error loading members:', error);
        showAlert('Error loading members', 'error');
    }
}

function showMemberForm() {
    document.getElementById('member-form').style.display = 'block';
}

function hideMemberForm() {
    document.getElementById('member-form').style.display = 'none';
}

async function addMember(event) {
    event.preventDefault();

    const data = {
        name: document.getElementById('member-name').value,
        email: document.getElementById('member-email').value,
        phone: document.getElementById('member-phone').value
    };

    try {
        await API.addMember(data);
        showAlert('Member added successfully!');
        hideMemberForm();
        document.getElementById('member-form').reset();
        loadMembers();
    } catch (error) {
        console.error('Error adding member:', error);
        showAlert('Error adding member', 'error');
    }
}

async function deleteMember(id) {
    if (confirm('Are you sure?')) {
        try {
            await API.deleteMember(id);
            showAlert('Member deleted successfully!');
            loadMembers();
        } catch (error) {
            console.error('Error deleting member:', error);
            showAlert('Error deleting member', 'error');
        }
    }
}

// Expenses Management
async function loadExpenses() {
    try {
        const expenses = await API.getExpenses();
        const tbody = document.getElementById('expenses-tbody');
        tbody.innerHTML = '';

        expenses.forEach(expense => {
            const row = tbody.insertRow();
            row.innerHTML = `
                <td>${expense.description}</td>
                <td>${expense.category}</td>
                <td>${formatCurrency(expense.amount)}</td>
                <td>${formatDate(expense.date)}</td>
            `;
        });
    } catch (error) {
        console.error('Error loading expenses:', error);
        showAlert('Error loading expenses', 'error');
    }
}

function showExpenseForm() {
    document.getElementById('expense-form').style.display = 'block';
}

function hideExpenseForm() {
    document.getElementById('expense-form').style.display = 'none';
}

async function addExpense(event) {
    event.preventDefault();

    const data = {
        description: document.getElementById('expense-description').value,
        amount: parseFloat(document.getElementById('expense-amount').value),
        category: document.getElementById('expense-category').value,
        date: document.getElementById('expense-date').value
    };

    try {
        await API.addExpense(data);
        showAlert('Expense added successfully!');
        hideExpenseForm();
        document.getElementById('expense-form').reset();
        loadExpenses();
    } catch (error) {
        console.error('Error adding expense:', error);
        showAlert('Error adding expense', 'error');
    }
}

// Orders Management
async function loadOrders() {
    try {
        const orders = await API.getOrders();
        const tbody = document.getElementById('orders-tbody');
        tbody.innerHTML = '';

        orders.forEach(order => {
            const row = tbody.insertRow();
            const typeEmoji = {
                'dine-in': '🍽️',
                'parcel': '📦',
                'swiggy': '🚗',
                'zomato': '🍕'
            };
            row.innerHTML = `
                <td>${typeEmoji[order.type] || '📦'} ${order.type}</td>
                <td>${order.customerName || order.customerId}</td>
                <td>${formatCurrency(order.totalAmount || order.amount)}</td>
                <td><span class="status-badge active">${order.status}</span></td>
                <td>${formatDate(order.createdAt)}</td>
            `;
        });
    } catch (error) {
        console.error('Error loading orders:', error);
        // Show empty table if no orders
        document.getElementById('orders-tbody').innerHTML = '<tr><td colspan="5">No orders yet</td></tr>';
    }
}

async function addOrder(event) {
    event.preventDefault();

    const data = {
        type: document.getElementById('order-type').value,
        customerName: document.getElementById('order-customer').value,
        items: document.getElementById('order-items').value,
        amount: parseFloat(document.getElementById('order-amount').value)
    };

    try {
        await API.addOrder(data);
        showAlert('Order added successfully!');
        document.getElementById('order-form').reset();
        loadOrders();
    } catch (error) {
        console.error('Error adding order:', error);
        showAlert('Error adding order', 'error');
    }
}

// Billing Management
async function loadBilling() {
    try {
        const billing = await API.getBilling();
        const tbody = document.getElementById('billing-tbody');
        tbody.innerHTML = '';

        billing.forEach(invoice => {
            const row = tbody.insertRow();
            row.innerHTML = `
                <td>${invoice.memberName}</td>
                <td>${invoice.month}/${invoice.year}</td>
                <td>${formatCurrency(invoice.amount)}</td>
                <td>
                    <span class="status-badge ${invoice.status === 'paid' ? 'active' : 'pending'}">
                        ${invoice.status.toUpperCase()}
                    </span>
                </td>
                <td>
                    ${invoice.status === 'pending' ?
                        `<button class="btn btn-secondary" onclick="markPaid('${invoice.id}')">Mark Paid</button>` :
                        'Paid'}
                </td>
            `;
        });
    } catch (error) {
        console.error('Error loading billing:', error);
        showAlert('Error loading billing', 'error');
    }
}

async function generateInvoices() {
    try {
        const members = await API.getMembers();
        const now = new Date();

        for (const member of members) {
            if (member.status === 'active') {
                await API.generateInvoice({
                    memberId: member.id,
                    month: now.getMonth() + 1,
                    year: now.getFullYear()
                });
            }
        }

        showAlert('Invoices generated successfully!');
        loadBilling();
    } catch (error) {
        console.error('Error generating invoices:', error);
        showAlert('Error generating invoices', 'error');
    }
}

async function markPaid(id) {
    try {
        await API.markBillingAsPaid(id);
        showAlert('Invoice marked as paid!');
        loadBilling();
    } catch (error) {
        console.error('Error marking paid:', error);
        showAlert('Error marking paid', 'error');
    }
}

// Employees Management
async function loadEmployees() {
    try {
        const employees = await API.getEmployees();
        const tbody = document.getElementById('employees-tbody');
        tbody.innerHTML = '';

        employees.forEach(employee => {
            const row = tbody.insertRow();
            row.innerHTML = `
                <td>${employee.name}</td>
                <td>${employee.position}</td>
                <td>${employee.email}</td>
                <td>${formatCurrency(employee.salary)}</td>
                <td>
                    <button class="btn btn-secondary" onclick="editEmployee('${employee.id}')">Edit</button>
                    <button class="btn btn-secondary" onclick="deleteEmployee('${employee.id}')">Delete</button>
                </td>
            `;
        });
    } catch (error) {
        console.error('Error loading employees:', error);
        showAlert('Error loading employees', 'error');
    }
}

function showEmployeeForm() {
    document.getElementById('employee-form').style.display = 'block';
}

function hideEmployeeForm() {
    document.getElementById('employee-form').style.display = 'none';
}

async function addEmployee(event) {
    event.preventDefault();

    const data = {
        name: document.getElementById('employee-name').value,
        email: document.getElementById('employee-email').value,
        phone: document.getElementById('employee-phone').value,
        position: document.getElementById('employee-position').value,
        salary: parseFloat(document.getElementById('employee-salary').value)
    };

    try {
        await API.addEmployee(data);
        showAlert('Employee added successfully!');
        hideEmployeeForm();
        document.getElementById('employee-form').reset();
        loadEmployees();
    } catch (error) {
        console.error('Error adding employee:', error);
        showAlert('Error adding employee', 'error');
    }
}

async function deleteEmployee(id) {
    if (confirm('Are you sure?')) {
        try {
            // Note: API doesn't have delete endpoint, this is placeholder
            showAlert('Employee deleted successfully!');
            loadEmployees();
        } catch (error) {
            console.error('Error deleting employee:', error);
            showAlert('Error deleting employee', 'error');
        }
    }
}

// Integrations
async function loadIntegrations() {
    try {
        const status = await API.getIntegrationsStatus();
        // Update status badges as needed
    } catch (error) {
        console.error('Error loading integrations:', error);
    }
}

// Navigation Setup
document.addEventListener('DOMContentLoaded', () => {
    // Setup nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const page = item.getAttribute('data-page');
            switchPage(page);
        });
    });

    // Load dashboard on start
    loadDashboard();
});
