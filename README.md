# Campus Library 📚

A **Minimal Library Management System** built with **React**, **TypeScript**, **Redux Toolkit Query (RTK Query)**, and **Tailwind CSS**.  
This system allows users to view a list of books, perform CRUD operations, borrow books, and view a borrow summary—all without authentication.  

---

## Table of Contents

- [Campus Library 📚](#campus-library-)
  - [Table of Contents](#table-of-contents)
  - [Project Overview](#project-overview)
  - [Features](#features)
    - [Public Routes 🚀](#public-routes-)
    - [Book Management 🛠️](#book-management-️)
    - [Borrow Book](#borrow-book)
    - [Borrow Summary](#borrow-summary)
    - [Landing Page Components](#landing-page-components)
  - [Pages](#pages)
  - [Technology Stack](#technology-stack)

---

## Project Overview

**Campus Library** is a minimal, clean, and functional client-side application that interacts with a RESTful API. The system demonstrates proper state management, UI design, and core library management functionality, including:

- Book listing, creation, editing, and deletion  
- Borrowing books with quantity and due date  
- Borrow summary with aggregated borrowed books  

All pages are public, focusing purely on library operations without authentication or payment integration.  

---

## Features

### Public Routes 🚀
- All pages are accessible without login  
- Minimalistic design for fast and easy interactions  

### Book Management 🛠️
- **Book List Table**  
  - Columns: Title, Author, Genre, ISBN, Copies, Availability, Actions  
  - Action buttons: Edit, Delete, Borrow  
- **Add New Book**  
  - Fields: Title, Author, Genre, ISBN, Description, Copies, Available (optional)  
- Business Logic:  
  - Books with `0` copies are marked unavailable  

### Borrow Book
- Open from "Borrow" button in the book list  
- Fields: Quantity and Due Date  
- Quantity cannot exceed available copies  
- Updates book availability automatically  

### Borrow Summary
- Aggregated list of all borrowed books  
- Columns: Book Title, ISBN, Total Quantity Borrowed  

### Landing Page Components
- **Navbar:** Links to All Books, Add Book, Borrow Summary  
- **Book Table/Grid:** Display books with core actions  
- **Footer:** Basic footer with site info  

---

## Pages

| Route              | Description                           |
|--------------------|----------------------------------------|
| `/books`           | List all books with actions            |
| `/create-book`     | Add a new book                         |
| `/books/:id`       | Detailed view of a book                |
| `/edit-book/:id`   | Edit book details                      |
| `/borrow/:bookId`  | Borrow a selected book                 |
| `/borrow-summary`  | View aggregated borrow summary         |

---

## Technology Stack

| Layer           | Technology                       |
|-----------------|----------------------------------|
| Frontend        | React + TypeScript               |
| State Management| Redux Toolkit + RTK Query         |
| Backend         | Node.js + Express.js             |
| Database        | MongoDB + Mongoose               |
| Styling         | Tailwind CSS                     |

---