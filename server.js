const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Database file paths
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

const dbFiles = {
  members: path.join(dataDir, 'members.json'),
  expenses: path.join(dataDir, 'expenses.json'),
  employees: path.join(dataDir, 'employees.json'),
  orders: path.join(dataDir, 'orders.json'),
  billing: path.join(dataDir, 'billing.json')
};

// Initialize database files
const initializeDb = () => {
  Object.entries(dbFiles).forEach(([name, filePath]) => {
    if (!fs.existsSync(filePath)) {
      const defaultData = getDefaultData(name);
      fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2));
    }
  });
};

const getDefaultData = (type) => {
  const defaults = {
    members: [
      { id: '1', name: 'Rajesh Kumar', email: 'rajesh@example.com', phone: '9876543210', status: 'active', joinDate: '2026-01-01', monthlyRate: 3500 },
      { id: '2', name: 'Priya Singh', email: 'priya@example.com', phone: '9876543211', status: 'active', joinDate: '2026-02-01', monthlyRate: 3500 }
    ],
    expenses: [
      { id: '1', description: 'Rice & Grains', amount: 2500, category: 'Food Items', date: new Date().toISOString(), createdAt: new Date().toISOString() }
    ],
    employees: [
      { id: '1', name: 'Ramesh', position: 'Chef', email: 'ramesh@susarmess.com', phone: '9876543210', salary: 5000, joinDate: '2026-01-01' }
    ],
    orders: [],
    billing: []
  };
  return defaults[type] || [];
};

const readDb = (type) => {
  try {
    return JSON.parse(fs.readFileSync(dbFiles[type], 'utf8'));
  } catch (error) {
    console.error(`Error reading ${type}:`, error);
    return getDefaultData(type);
  }
};

const writeDb = (type, data) => {
  try {
    fs.writeFileSync(dbFiles[type], JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error(`Error writing ${type}:`, error);
    return false;
  }
};

// ==================== MEMBERS ENDPOINTS ====================
app.get('/api/members', (req, res) => {
  const members = readDb('members');
  res.json(members);
});

app.post('/api/members', (req, res) => {
  const members = readDb('members');
  const newMember = {
    id: uuidv4(),
    ...req.body,
    status: 'active',
    joinDate: new Date().toISOString(),
    monthlyRate: 3500
  };
  members.push(newMember);
  writeDb('members', members);
  res.status(201).json(newMember);
});

app.put('/api/members/:id', (req, res) => {
  const members = readDb('members');
  const index = members.findIndex(m => m.id === req.params.id);
  if (index !== -1) {
    members[index] = { ...members[index], ...req.body };
    writeDb('members', members);
    res.json(members[index]);
  } else {
    res.status(404).json({ error: 'Member not found' });
  }
});

app.delete('/api/members/:id', (req, res) => {
  const members = readDb('members');
  const filtered = members.filter(m => m.id !== req.params.id);
  writeDb('members', filtered);
  res.json({ message: 'Member deleted' });
});

// ==================== EMPLOYEES ENDPOINTS ====================
app.get('/api/employees', (req, res) => {
  const employees = readDb('employees');
  res.json(employees);
});

app.post('/api/employees', (req, res) => {
  const employees = readDb('employees');
  const newEmployee = {
    id: uuidv4(),
    ...req.body,
    joinDate: new Date().toISOString()
  };
  employees.push(newEmployee);
  writeDb('employees', employees);
  res.status(201).json(newEmployee);
});

app.put('/api/employees/:id', (req, res) => {
  const employees = readDb('employees');
  const index = employees.findIndex(e => e.id === req.params.id);
  if (index !== -1) {
    employees[index] = { ...employees[index], ...req.body };
    writeDb('employees', employees);
    res.json(employees[index]);
  } else {
    res.status(404).json({ error: 'Employee not found' });
  }
});

// ==================== EXPENSES ENDPOINTS ====================
app.get('/api/expenses', (req, res) => {
  const expenses = readDb('expenses');
  res.json(expenses);
});

app.post('/api/expenses', (req, res) => {
  const expenses = readDb('expenses');
  const newExpense = {
    id: uuidv4(),
    ...req.body,
    createdAt: new Date().toISOString()
  };
  expenses.push(newExpense);
  writeDb('expenses', expenses);
  res.status(201).json(newExpense);
});

app.get('/api/expenses/summary', (req, res) => {
  const expenses = readDb('expenses');
  const summary = {
    total: expenses.reduce((sum, e) => sum + e.amount, 0),
    byCategory: {}
  };
  expenses.forEach(e => {
    summary.byCategory[e.category] = (summary.byCategory[e.category] || 0) + e.amount;
  });
  res.json(summary);
});

// ==================== ORDERS ENDPOINTS (DINE-IN & PARCEL) ====================
app.get('/api/orders', (req, res) => {
  const orders = readDb('orders');
  res.json(orders);
});

app.post('/api/orders', (req, res) => {
  const orders = readDb('orders');
  const newOrder = {
    id: uuidv4(),
    ...req.body,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  orders.push(newOrder);
  writeDb('orders', orders);
  res.status(201).json(newOrder);
});

app.put('/api/orders/:id', (req, res) => {
  const orders = readDb('orders');
  const index = orders.findIndex(o => o.id === req.params.id);
  if (index !== -1) {
    orders[index] = { ...orders[index], ...req.body };
    writeDb('orders', orders);
    res.json(orders[index]);
  } else {
    res.status(404).json({ error: 'Order not found' });
  }
});

// ==================== BILLING ENDPOINTS ====================
app.get('/api/billing', (req, res) => {
  const billing = readDb('billing');
  res.json(billing);
});

app.post('/api/billing/generate-invoice', (req, res) => {
  const { memberId, month, year } = req.body;
  const members = readDb('members');
  const member = members.find(m => m.id === memberId);

  if (!member) {
    return res.status(404).json({ error: 'Member not found' });
  }

  const billing = readDb('billing');
  const invoice = {
    id: uuidv4(),
    memberId,
    memberName: member.name,
    month,
    year,
    amount: member.monthlyRate,
    status: 'pending',
    dueDate: new Date(year, month, 0).toISOString(),
    createdAt: new Date().toISOString()
  };

  billing.push(invoice);
  writeDb('billing', billing);
  res.status(201).json(invoice);
});

app.put('/api/billing/:id/pay', (req, res) => {
  const billing = readDb('billing');
  const index = billing.findIndex(b => b.id === req.params.id);
  if (index !== -1) {
    billing[index].status = 'paid';
    billing[index].paidDate = new Date().toISOString();
    writeDb('billing', billing);
    res.json(billing[index]);
  } else {
    res.status(404).json({ error: 'Invoice not found' });
  }
});

// ==================== SWIGGY/ZOMATO INTEGRATION ENDPOINTS ====================
app.post('/api/integrations/swiggy/callback', (req, res) => {
  // This endpoint receives order callbacks from Swiggy
  const orders = readDb('orders');
  const newOrder = {
    id: uuidv4(),
    source: 'swiggy',
    customerId: req.body.customer_id,
    items: req.body.items,
    totalAmount: req.body.total,
    status: 'received',
    externalOrderId: req.body.order_id,
    createdAt: new Date().toISOString()
  };
  orders.push(newOrder);
  writeDb('orders', orders);
  res.json({ success: true, orderId: newOrder.id });
});

app.post('/api/integrations/zomato/callback', (req, res) => {
  // This endpoint receives order callbacks from Zomato
  const orders = readDb('orders');
  const newOrder = {
    id: uuidv4(),
    source: 'zomato',
    customerId: req.body.user_id,
    items: req.body.items,
    totalAmount: req.body.amount,
    status: 'received',
    externalOrderId: req.body.order_id,
    createdAt: new Date().toISOString()
  };
  orders.push(newOrder);
  writeDb('orders', orders);
  res.json({ success: true, orderId: newOrder.id });
});

app.get('/api/integrations/status', (req, res) => {
  res.json({
    swiggy: { connected: true, status: 'active' },
    zomato: { connected: true, status: 'active' }
  });
});

// ==================== DASHBOARD ENDPOINTS ====================
app.get('/api/dashboard', (req, res) => {
  const members = readDb('members');
  const employees = readDb('employees');
  const expenses = readDb('expenses');
  const orders = readDb('orders');
  const billing = readDb('billing');

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const pendingBilling = billing.filter(b => b.status === 'pending').length;
  const totalOrders = orders.length;

  res.json({
    stats: {
      activeMembers: members.filter(m => m.status === 'active').length,
      totalExpenses,
      pendingBillings: pendingBilling,
      activeEmployees: employees.length,
      totalOrders,
      todayOrders: orders.filter(o => new Date(o.createdAt).toDateString() === new Date().toDateString()).length
    }
  });
});

// ==================== SERVER STARTUP ====================
app.listen(PORT, () => {
  initializeDb();
  console.log(`
    🍽️ SusarMess - Mess Food Management System
    ✅ Server running on http://localhost:${PORT}
    📱 Desktop & Mobile Responsive App
    🔗 Swiggy & Zomato Integration Ready
  `);
});

module.exports = app;
