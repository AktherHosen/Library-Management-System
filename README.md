# 📚 Campus Library

A **Minimal Library Management System** built with **React**, **TypeScript**, **Redux Toolkit Query (RTK Query)**, **React Router**, and **Tailwind CSS**.  
This application allows users to view a list of books, perform CRUD operations, borrow books, and view a borrow summary—all.

---

## Project Overview

**Campus Library** is designed to be minimal, clean, and fully functional.  
It interacts with a RESTful API and demonstrates **state management, UI design, and core library features**.

---

## Features

- 📖 **Book Management** – List, add, edit, and delete books
- 📚 **Borrow Books** – Borrow with quantity and due date
- 📊 **Borrow Summary** – View aggregated borrowed books
- 🔄 **Real-time Updates** – Data synced via RTK Query
- 🎨 **Responsive Design** – Styled with Tailwind CSS
- 🎨 **Pagination Support** - Pagination support for better user experiences
- ⚡ **Fast & Type-Safe** – Built with React + TypeScript

---

## 🛠️ Technology Stack

| Layer           | Technology                |
| --------------- | ------------------------- |
| **Frontend**    | React + TypeScript        |
| **State Mgmt.** | Redux Toolkit + RTK Query |
| **Routing**     | React Router              |
| **Backend**     | Node.js + Express.js      |
| **Database**    | MongoDB + Mongoose        |
| **Styling**     | Tailwind CSS              |

## Project Structure

```
library-management-system/
src/
├── components/ # Reusable UI components
├── pages/ # Application pages (Books, Home, Summary)
├── redux/ # Redux store and API services
├── routes/ # React Router DOM routes
└── main.tsx # Root component
```

---

## ⚡ Getting Started

### Prerequisites

- **Node.js**
- **npm** or **yarn**

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/campus-library.git
cd campus-library

# Install dependencies
npm install
```

```
npm run dev # Runs on http://localhost:5173
```
