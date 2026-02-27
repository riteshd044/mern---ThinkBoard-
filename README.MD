# 📝 ThinkBoard - MERN Stack Note Taking App

![Demo App](/frontend/public/Screenshot 2026-02-13 at 10.00.38 AM.png)

A modern, fully-functional note-taking web application built with the MERN stack. Create, manage, and organize your thoughts with a beautiful responsive interface. Features user authentication, rate limiting, and a clean REST API.

## ✨ Features

### Core Functionality
- ✅ **User Authentication** - Secure signup and login with JWT tokens
- ✅ **Create Notes** - Add notes with title and description
- ✅ **Read Notes** - View all your notes in a clean card-based layout
- ✅ **Update Notes** - Edit existing notes seamlessly
- ✅ **Delete Notes** - Remove notes you no longer need
- ✅ **Real-time Feedback** - Loading states and success/error notifications

### Advanced Features
- 🛡️ **Rate Limiting** - Built-in protection against API abuse using Upstash Redis
- 🎨 **Responsive Design** - Fully responsive UI that works on all devices (mobile, tablet, desktop)
- 🎭 **Modern UI** - Beautiful components with Tailwind CSS and DaisyUI
- 🔐 **Secure Authentication** - Password hashing and JWT-based authorization
- ⚡ **Fast Performance** - Optimized queries and caching

### Technical Highlights
- 🧱 Full-Stack MERN Architecture (MongoDB, Express, React, Node.js)
- 🛠️ RESTful API Design with proper HTTP methods and status codes
- 💾 MongoDB NoSQL database for flexible data storage
- 🌐 HTTP Methods & Status Codes - Learn industry best practices
- 📊 Explore SQL vs NoSQL concepts

---

## 🏗️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Rate Limiting**: Upstash Redis
- **Environment**: Node.js with dotenv

### Frontend
- **Framework**: React 18+
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + DaisyUI
- **HTTP Client**: Axios
- **State Management**: Zustand
- **Linting**: ESLint

---

## 📋 Prerequisites

Before you begin, ensure you have installed:
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** account (MongoDB Atlas is recommended)
- **Upstash Redis** account (free tier available)

---

## 🚀 Getting Started

### 1. Clone the Repository

\`\`\`bash
git clone <repository-url>
cd ThinkBoard
\`\`\`

### 2. Backend Setup

#### Install Dependencies
\`\`\`bash
cd backend
npm install
\`\`\`

#### Configure Environment Variables
Create a `.env` file in the `/backend` directory:

\`\`\`env
# MongoDB Configuration
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority

# Upstash Redis Configuration
UPSTASH_REDIS_REST_URL=https://<your-redis-endpoint>.upstash.io
UPSTASH_REDIS_REST_TOKEN=<your-redis-token>

# Environment
NODE_ENV=development

# Server Port (optional, defaults to 5000)
PORT=5000
\`\`\`

#### Run the Backend
\`\`\`bash
npm run dev
\`\`\`

The backend server will start at `http://localhost:5000`

### 3. Frontend Setup

#### Install Dependencies
\`\`\`bash
cd frontend
npm install
\`\`\`

#### Configure API Endpoint (if needed)
Update the API base URL in `src/lib/axios.js` if your backend runs on a different port:

\`\`\`javascript
const API_URL = 'http://localhost:5000/api';
\`\`\`

#### Run the Frontend
\`\`\`bash
npm run dev
\`\`\`

The frontend will start at `http://localhost:5173`

---

## 🔌 API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/signup` | Register a new user | ❌ No |
| POST | `/login` | Login user | ❌ No |

### Notes Routes (`/api/notes`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Get all user notes | ✅ Yes |
| POST | `/` | Create a new note | ✅ Yes |
| GET | `/:id` | Get a specific note | ✅ Yes |
| PUT | `/:id` | Update a note | ✅ Yes |
| DELETE | `/:id` | Delete a note | ✅ Yes |

---

## 💡 Usage Guide

### 1. Register a New Account
1. Navigate to the Sign Up page
2. Enter username, email, and password
3. Click "Sign Up"
4. You'll be redirected to the login page

### 2. Login
1. Enter your email and password
2. Click "Login"
3. You'll be taken to your dashboard

### 3. Create a Note
1. Click the "Create New Note" button
2. Enter a title and description
3. Click "Save Note"

### 4. View Your Notes
1. All your notes appear on the home page
2. Click on any note card to view full details

### 5. Edit a Note
1. Click on the note you want to edit
2. Modify the title or description
3. Click "Update Note"

### 6. Delete a Note
1. Click on the note
2. Click the "Delete" button
3. Confirm the deletion

---

## ⚙️ Rate Limiting

The API implements rate limiting using Upstash Redis to prevent abuse:

- **Limit**: 10 requests per minute per user
- **Response**: 429 (Too Many Requests) when limit exceeded
- **Reset**: Automatic after 1 minute

If you hit the rate limit, you'll see a user-friendly notification. Simply wait a moment and try again.

---

## 🔐 Authentication & Security

- Passwords are securely hashed before storage
- JWT tokens are used for stateless authentication
- Protected routes require valid authentication tokens
- Tokens are stored securely on the client side

---

## 🛠️ Available Scripts

### Backend
\`\`\`bash
npm run dev      # Start development server with hot reload
npm start        # Start production server
\`\`\`

### Frontend
\`\`\`bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build locally
npm run lint     # Run ESLint
\`\`\`

---

## 📸 Screenshots

![Demo App](/frontend/public/Screenshot%202026-02-13%20at%2010.00.38 AM.png)

---

## 🐛 Troubleshooting

### Connection Issues
- Ensure MongoDB is running and accessible
- Verify `MONGO_URI` in `.env` file
- Check if backend server is running on the correct port

### Rate Limiting Issues
- Verify Upstash credentials in `.env`
- Check your Upstash account quota
- Try clearing browser cache if needed

### Frontend Not Connecting
- Ensure backend is running on `http://localhost:5000`
- Check browser console for CORS errors
- Verify axios configuration in `src/lib/axios.js`

---

## 📚 Learning Resources

This project is great for learning:
- **MERN Stack Development** - Full-stack web development
- **REST API Design** - Building scalable APIs
- **Database Design** - MongoDB schema design and relationships
- **Authentication** - JWT-based auth implementation
- **Rate Limiting** - Protecting APIs from abuse
- **Responsive Design** - Creating mobile-friendly UIs

---

## 📄 License

This project is open source and available under the MIT License.

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add YourFeature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

---

## 📞 Contact & Support

For questions or support, feel free to reach out or open an issue in the repository.

---

**Happy Note Taking! 🚀**
