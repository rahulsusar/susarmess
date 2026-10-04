// API Base URL
const API_BASE = 'http://localhost:3000/api';

// API Calls
const API = {
    // Members
    getMembers: async () => {
        const response = await fetch(`${API_BASE}/members`);
        return response.json();
    },

    addMember: async (data) => {
        const response = await fetch(`${API_BASE}/members`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return response.json();
    },

    updateMember: async (id, data) => {
        const response = await fetch(`${API_BASE}/members/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return response.json();
    },

    deleteMember: async (id) => {
        const response = await fetch(`${API_BASE}/members/${id}`, {
            method: 'DELETE'
        });
        return response.json();
    },

    // Employees
    getEmployees: async () => {
        const response = await fetch(`${API_BASE}/employees`);
        return response.json();
    },

    addEmployee: async (data) => {
        const response = await fetch(`${API_BASE}/employees`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return response.json();
    },

    updateEmployee: async (id, data) => {
        const response = await fetch(`${API_BASE}/employees/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return response.json();
    },

    // Expenses
    getExpenses: async () => {
        const response = await fetch(`${API_BASE}/expenses`);
        return response.json();
    },

    addExpense: async (data) => {
        const response = await fetch(`${API_BASE}/expenses`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return response.json();
    },

    getExpensesSummary: async () => {
        const response = await fetch(`${API_BASE}/expenses/summary`);
        return response.json();
    },

    // Orders
    getOrders: async () => {
        const response = await fetch(`${API_BASE}/orders`);
        return response.json();
    },

    addOrder: async (data) => {
        const response = await fetch(`${API_BASE}/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return response.json();
    },

    updateOrder: async (id, data) => {
        const response = await fetch(`${API_BASE}/orders/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return response.json();
    },

    // Billing
    getBilling: async () => {
        const response = await fetch(`${API_BASE}/billing`);
        return response.json();
    },

    generateInvoice: async (data) => {
        const response = await fetch(`${API_BASE}/billing/generate-invoice`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return response.json();
    },

    markBillingAsPaid: async (id) => {
        const response = await fetch(`${API_BASE}/billing/${id}/pay`, {
            method: 'PUT'
        });
        return response.json();
    },

    // Dashboard
    getDashboard: async () => {
        const response = await fetch(`${API_BASE}/dashboard`);
        return response.json();
    },

    // Integrations
    getIntegrationsStatus: async () => {
        const response = await fetch(`${API_BASE}/integrations/status`);
        return response.json();
    }
};
