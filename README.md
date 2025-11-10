---

# 🎟️ TicketBox Frontend

---

### ## 📌 1. Project Introduction

This is the **frontend project** for **TicketBox**, an online event ticketing platform.  
Built with **ReactJS** and **Vite**, it provides a fast, modern, and user-friendly interface for both ticket buyers and system administrators.

The project is divided into two main parts:
- **Client Interface**: Users can browse, search for events, book tickets, and complete payments.  
- **Admin Dashboard**: A powerful dashboard for managing events, users, orders, and viewing statistics.

---

### ## 🚀 2. Key Features

#### ### 👥 For Users (Client)
- **Authentication**: Register, Log in (including Google OAuth2), Forgot Password  
- **Homepage**: Featured events, categories, and search bar  
- **Search & Filter**: Search by name, filter by category and date  
- **Event Details**: View event info, location, ticket types  
- **Multi-step Booking Process**:
  1. Select ticket type and quantity  
  2. Fill in buyer information  
  3. Choose a payment method  
- **Payment Integration**: Supports **VNPay** and **PayPal**  
- **Profile Management**: View personal info and order history  

#### ### 🛠️ For Administrators (Admin)
- **Dashboard**: Visual statistics (revenue, event counts, new users) using **ECharts/Ant Design Charts**  
- **User Management**: Add, edit, delete, and view user details  
- **Event Management**: Create, update, and manage events  
- **Order Management**: View and manage all orders  
- **Organizer Management**: Manage event organizer profiles  

---

### ## 🧰 3. Technology Stack

| Category           | Technologies & Tools                                  |
|--------------------|--------------------------------------------------------|
| Framework/Library  | ReactJS                                                |
| Build Tool         | Vite                                                   |
| UI/Styling         | Tailwind CSS, Ant Design (AntD)                        |
| State Management   | Redux Toolkit, React Context                           |
| Routing            | React Router DOM (v6)                                  |
| API Client         | Axios (with interceptors)                              |
| Charting           | ECharts, Ant Design Charts                             |

---

### ## ⚙️ 4. Installation & Setup

#### ### 🔧 Prerequisites
- [Node.js](https://nodejs.org/) (Version 16.x or higher)  
- npm or yarn  

#### ### 📥 Installation Steps

```bash
# Clone the repository
git clone https://github.com/what57-ph/iws_finalproject.git
cd iws_finalproject

# Install dependencies
npm install
# or
yarn install
```

**Configure Environment Variables:**

Create a `.env.development` file in the root directory:

```env
VITE_APP_API_URL=http://localhost:8080
# (or your backend API address)
```

**Run the project in development mode:**

```bash
npm run dev
# or
yarn dev
```

---

### ## 🌐 5. Usage

After running the project, open your browser and navigate to:

- **User Site** → `http://localhost:5173`  
- **Admin Login** → `http://localhost:5173/auth/login`  
- **Admin Dashboard** → `http://localhost:5173/admin/dashboard` *(after logging in with an admin account)*

---

📌 *Tip:* You can customize routes or ports in the `.env` file or Vite config if needed.

---
