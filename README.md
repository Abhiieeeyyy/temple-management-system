# 🕉️ Sri Kainari Ayyappan Kavu - Temple Management System

A comprehensive full-stack web application for managing temple operations, including pooja bookings, donations, user management, and more.

## 🌟 Features

### For Users
- 🔐 **Authentication System**
  - Email/Password login
  - Phone number OTP verification for sign-up
  - Password reset with OTP
  
- 👥 **People Management**
  - Add family members with name, birthstar (nakshatra), and address
  - Book poojas for multiple people
  - Manage people list (Add/Edit/Delete)

- 🙏 **Pooja Booking**
  - Browse available poojas
  - Book single or multiple poojas
  - Book for yourself or family members
  - Secure online payment via Razorpay
  - Real-time booking confirmation

- 💰 **Donations**
  - Secure online donations via Razorpay
  - Multiple payment options (Card/UPI/Net Banking)
  - Instant receipt generation
  - Purpose-based donations

- 📧 **Contact & Messaging**
  - Send messages to temple administration
  - Track message status

- 🔔 **Notifications**
  - Receive temple announcements
  - Event notifications

- 🖼️ **Gallery**
  - View temple photos and videos
  - Event galleries

### For Admins
- 📊 **Dashboard**
  - View all donations
  - Manage pooja bookings
  - User management
  - Message management

- 🎯 **Pooja Management**
  - Add/Edit/Delete poojas
  - Set pricing
  - Manage availability

- 💳 **Payment Management**
  - Track online payments
  - Payment reports and analytics

- 📢 **Notifications**
  - Send notifications to all users
  - Targeted notifications

- 📨 **Message Management**
  - View user messages
  - Mark as read/replied
  - Email responses

## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **React Router** - Navigation
- **Axios** - HTTP client
- **Vite** - Build tool
- **CSS3** - Styling

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcrypt** - Password hashing

### Payment Gateway
- **Razorpay** - Payment processing (Test mode)

### Additional Features
- **OTP Verification** - Phone number verification
- **File Upload** - Multer for image/video uploads
- **Security** - Helmet, CORS, Rate limiting
- **Logging** - Winston, Morgan

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **MongoDB** (v4.4 or higher)
- **npm** or **yarn**

## 🚀 Installation

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/temple-management-system.git
cd temple-management-system
```

### 2. Install Frontend Dependencies
```bash
npm install
```

### 3. Install Backend Dependencies
```bash
cd server
npm install
cd ..
```

### 4. Configure Environment Variables

Create a `.env` file in the `server` directory:

```env
# MongoDB Configuration
MONGODB_URI=mongodb://127.0.0.1:27017/temple

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Razorpay Configuration (Test Mode)
RAZORPAY_KEY_ID=rzp_test_RfxxUHvWj3pwrI
RAZORPAY_KEY_SECRET=EQlRNs6V0N1vO4gNwkEecyJI

# Server Configuration
PORT=5011
NODE_ENV=development

# Admin Creation Key
ADMIN_CREATION_KEY=your-admin-key

# Email Configuration (Optional)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### 5. Update Frontend Razorpay Key

Edit `src/utils/razorpay.js` and update the Razorpay key:
```javascript
export const RAZORPAY_CONFIG = {
  key: 'rzp_test_RfxxUHvWj3pwrI', // Same as backend
  // ... rest of config
}
```

### 6. Start MongoDB
```bash
# Windows
mongod

# Linux/Mac
sudo systemctl start mongod
```

### 7. Start the Application

**Backend:**
```bash
cd server
npm start
```
Server runs on: `http://localhost:5011`

**Frontend:**
```bash
# In root directory
npm start
```
Frontend runs on: `http://localhost:5173`

## 🧪 Testing

### Test Accounts

**Admin Account:**
- Email: `srikainariayyappatemple@gmail.com`
- Password: `skat369`

**Test Payment (Razorpay Test Mode):**
- Card Number: `4111 1111 1111 1111`
- Expiry: Any future date (e.g., `12/25`)
- CVV: Any 3 digits (e.g., `123`)
- Name: Any name

### Test OTP
OTP codes are logged to the server console in development mode.

## 📁 Project Structure

```
temple/
├── public/                 # Static files
├── server/                 # Backend
│   ├── config/            # Configuration files
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Custom middleware
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── services/          # Business logic
│   ├── utils/             # Utility functions
│   ├── .env               # Environment variables
│   ├── index.js           # Server entry point
│   └── package.json       # Backend dependencies
├── src/                   # Frontend
│   ├── components/        # React components
│   ├── contexts/          # React contexts
│   ├── pages/             # Page components
│   ├── styles/            # CSS files
│   ├── utils/             # Utility functions
│   ├── App.jsx            # Main app component
│   └── main.jsx           # Entry point
├── .gitignore             # Git ignore rules
├── package.json           # Frontend dependencies
└── README.md              # This file
```

## 🔑 Key Features Implementation

### Authentication Flow
1. User signs up with email, phone, and password
2. OTP sent to phone number for verification
3. User verifies OTP
4. Account created
5. User can login with email/password

### Pooja Booking Flow
1. User browses available poojas
2. Selects pooja(s) to book
3. Chooses to book for self or family members
4. Proceeds to secure online payment
5. Razorpay checkout → Payment → Confirmation
6. Booking confirmed and notification sent

### Donation Flow
1. User fills donation form
2. Selects amount and purpose
3. Clicks "Donate Now"
4. Razorpay checkout opens
5. User completes payment
6. Donation recorded with payment ID

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- OTP verification for phone numbers
- Rate limiting on API endpoints
- CORS protection
- Helmet security headers
- Input validation
- XSS protection

## 📱 Responsive Design

The application is fully responsive and works on:
- 📱 Mobile devices
- 📱 Tablets
- 💻 Desktops
- 🖥️ Large screens

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/login-phone` - Login with phone (after OTP)
- `GET /api/auth/me` - Get current user

### OTP
- `POST /api/otp/send` - Send OTP
- `POST /api/otp/verify` - Verify OTP

### Poojas
- `GET /api/poojas` - Get all poojas
- `POST /api/poojas` - Create pooja (Admin)
- `PUT /api/poojas/:id` - Update pooja (Admin)
- `DELETE /api/poojas/:id` - Delete pooja (Admin)

### Bookings
- `GET /api/bookings` - Get user bookings
- `GET /api/bookings/all` - Get all bookings (Admin)
- `POST /api/bookings` - Create booking

### Donations
- `GET /api/donations` - Get all donations (Admin)
- `POST /api/donations` - Create donation

### Payments
- `POST /api/payments/create-order` - Create Razorpay order
- `POST /api/payments/verify` - Verify payment

### People
- `GET /api/people` - Get user's people
- `POST /api/people` - Add person
- `PUT /api/people/:id` - Update person
- `DELETE /api/people/:id` - Delete person

### Messages
- `GET /api/messages` - Get all messages (Admin)
- `POST /api/messages` - Send message

### Notifications
- `GET /api/notifications` - Get notifications
- `POST /api/notifications` - Create notification (Admin)

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)
1. Build the frontend: `npm run build`
2. Deploy the `dist` folder
3. Set environment variables

### Backend Deployment (Heroku/Railway/Render)
1. Push code to GitHub
2. Connect to deployment platform
3. Set environment variables
4. Deploy

### Database (MongoDB Atlas)
1. Create MongoDB Atlas account
2. Create cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@YOUR_USERNAME](https://github.com/YOUR_USERNAME)
- Email: your.email@example.com

## 🙏 Acknowledgments

- Sri Kainari Ayyappan Kavu Temple
- Razorpay for payment gateway
- MongoDB for database
- React community
- All contributors

## 📞 Support

For support, email srikainariayyappatemple@gmail.com or create an issue in the repository.

## 🔄 Version History

- **v1.0.0** (Current)
  - Initial release
  - User authentication with OTP
  - Pooja booking system
  - Donation system with Razorpay
  - People management
  - Admin panel
  - Responsive design

## 🎯 Future Enhancements

- [ ] Email notifications
- [ ] SMS notifications via Twilio
- [ ] Advanced reporting and analytics
- [ ] Mobile app (React Native)
- [ ] Multi-language support
- [ ] Calendar integration
- [ ] Automated receipts via email
- [ ] Payment history and invoices
- [ ] User dashboard with statistics

---

Made with ❤️ for Sri Kainari Ayyappan Kavu Temple
