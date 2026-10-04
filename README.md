# 🍽️ SusarMess - Mess Food Management System v2.0

A comprehensive **web-based Mess Food Management System** built with Node.js backend and responsive JavaScript frontend. Designed for desktop use with seamless mobile adaptation. Integrates with Swiggy & Zomato for online order management.

## ✨ Key Features

### 📊 Dashboard
- Real-time statistics and overview
- Active members count
- Monthly expense tracking
- Pending billing status
- Employee count
- Order statistics (total & today's orders)

### 👥 Members Management
- Add/Edit/Delete members
- Member status tracking
- Monthly billing rate (₹3,500)
- Automatic membership tracking

### 🍚 Meals & Orders Management
- Support for multiple order types:
  - 🍽️ **Dine-In** orders
  - 📦 **Parcel** orders
  - 🚗 **Swiggy Integration** (Auto-sync enabled)
  - 🍕 **Zomato Integration** (Auto-sync enabled)
- Track items and amounts
- Order status management
- Daily meal tracking

### 💰 Expense Management
- Add daily expenses with categories:
  - Food Items
  - Utilities
  - Salary
  - Maintenance
  - Other
- Expense history
- Category-wise tracking
- Budget monitoring

### 📋 Billing & Invoices
- Monthly invoice generation
- Automatic billing for all active members
- Payment status tracking (Paid/Pending)
- Due date management
- Bulk invoice generation

### 👔 Employee Management
- Add/Edit employee records
- Position management (Chef, Cook, Helper, Cleaner, Manager)
- Salary tracking
- Contact information storage
- Employee directory

### 🔗 Integrations
- **Swiggy Integration Ready**
  - Webhook endpoint configured
  - Auto-order sync capability
  - Order status tracking
  
- **Zomato Integration Ready**
  - Webhook endpoint configured
  - Auto-order sync capability
  - Order status tracking

## 🛠️ Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **Body-Parser** - Request parsing
- **UUID** - Unique ID generation

### Frontend
- **HTML5** - Structure
- **CSS3** - Desktop-first responsive design
- **Vanilla JavaScript** - No framework dependencies
- **Fetch API** - HTTP requests

### Database
- **JSON Files** - Local data persistence (upgradeable to MongoDB/MySQL)

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rahulsusar/SusarMess.git
   cd SusarMess
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```
   The server will run on `http://localhost:3000`

4. **Access the application**
   - Open your browser
   - Navigate to `http://localhost:3000`
   - Start managing your mess!

## 📁 Project Structure

```
SusarMess/
├── server.js                 # Express backend server
├── package.json              # Dependencies & scripts
├── data/                     # Database (JSON files)
│   ├── members.json
│   ├── expenses.json
│   ├── employees.json
│   ├── orders.json
│   └── billing.json
├── public/                   # Frontend application
│   ├── index.html           # Main app (desktop-first)
│   ├── css/
│   │   └── app.css          # Responsive styling
│   └── js/
│       ├── app.js           # Main app logic
│       ├── api.js           # API calls
│       └── util.js          # Utility functions
└── README.md                # This file
```

## 📱 Responsive Design

### Desktop (1024px+)
- Full sidebar navigation
- Complete table views
- Multi-column layouts
- Optimized for large screens

### Tablet (768px - 1024px)
- Responsive grid layouts
- Touch-friendly buttons
- Adjusted spacing

### Mobile (< 768px)
- Horizontal scrolling tables
- Stacked layouts
- Mobile-optimized forms
- Touch-friendly navigation
- Full functionality preserved

## 🔌 API Endpoints

### Members
- `GET /api/members` - Get all members
- `POST /api/members` - Add new member
- `PUT /api/members/:id` - Update member
- `DELETE /api/members/:id` - Delete member

### Employees
- `GET /api/employees` - Get all employees
- `POST /api/employees` - Add new employee
- `PUT /api/employees/:id` - Update employee

### Expenses
- `GET /api/expenses` - Get all expenses
- `POST /api/expenses` - Add new expense
- `GET /api/expenses/summary` - Get expense summary

### Orders
- `GET /api/orders` - Get all orders
- `POST /api/orders` - Add new order
- `PUT /api/orders/:id` - Update order

### Billing
- `GET /api/billing` - Get all invoices
- `POST /api/billing/generate-invoice` - Generate invoice
- `PUT /api/billing/:id/pay` - Mark invoice as paid

### Integrations
- `POST /api/integrations/swiggy/callback` - Swiggy webhook
- `POST /api/integrations/zomato/callback` - Zomato webhook
- `GET /api/integrations/status` - Check integration status

### Dashboard
- `GET /api/dashboard` - Get dashboard statistics

## 🔄 Swiggy & Zomato Integration

### How it Works
1. Set up webhook URLs in Swiggy & Zomato partner portals:
   ```
   Swiggy: http://yourdomain.com/api/integrations/swiggy/callback
   Zomato: http://yourdomain.com/api/integrations/zomato/callback
   ```

2. Orders are automatically received and tracked
3. Orders sync to the "Meals & Orders" section
4. Manage fulfillment through the dashboard

### Integration API Response
```json
{
  "success": true,
  "orderId": "unique-order-id"
}
```

## 💾 Data Storage

Currently uses JSON files for data persistence. For production, upgrade to:
- **MongoDB** - NoSQL database
- **MySQL** - Relational database
- **PostgreSQL** - Advanced relational database

## 🔒 Security Considerations

- Add authentication/authorization
- Validate all inputs
- Use HTTPS in production
- Implement rate limiting
- Add data encryption
- Regular backups

## 📈 Future Enhancements

- [ ] Database migration (MongoDB/MySQL)
- [ ] User authentication & roles
- [ ] SMS/Email notifications
- [ ] Advanced analytics & reports
- [ ] Member portal
- [ ] Inventory management
- [ ] Mobile app (React Native)
- [ ] Payment gateway integration (Razorpay/PayPal)
- [ ] Multi-location support
- [ ] Export reports (PDF/Excel)
- [ ] QR code meal ordering
- [ ] Digital meal cards
- [ ] Vendor management
- [ ] Menu planning system

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Change port in server.js or use environment variable
PORT=4000 npm start
```

### CORS Issues
Ensure frontend is accessing correct API URL in `public/js/api.js`

### Database File Issues
- Check `data/` folder permissions
- Ensure write access to directory
- Delete corrupted JSON files to reset

## 📧 Contact & Support

- **Author:** Rahul Susar
- **Email:** rahulsusar@gmail.com
- **GitHub:** [rahulsusar](https://github.com/rahulsusar)

## 📝 License

MIT License - Free to use for personal or commercial projects

---

**Version:** 2.0.0  
**Status:** Production Ready  
**Last Updated:** October 2026

### Desktop-First Responsive Design ✅
### Swiggy & Zomato Integration Ready ✅
### Full Mess Management Features ✅

🍽️ **Happy Mess Management!** 🍽️
