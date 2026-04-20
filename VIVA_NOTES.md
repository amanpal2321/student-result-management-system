# Viva Notes

## Project Title

Student Result Management System

## One-Line Explanation

This is a full-stack web application that helps an admin manage student records, generate academic results, and monitor overall performance using a dashboard.

## Technologies Used

- Java
- Spring Boot
- Spring Security
- JWT Authentication
- Spring Data JPA
- MySQL
- React
- Vite
- Tailwind CSS
- Axios

## Main Modules

1. Authentication
2. Student Management
3. Result Management
4. Dashboard Analytics
5. Printable Report Card

## Features You Can Say In Viva

- Admin can register and login securely
- Passwords are stored in encrypted form using BCrypt
- JWT token is generated after login
- Protected APIs require token
- Admin can add, update, delete, and search students
- Admin can add, update, delete, and search results
- Total marks and grade are calculated automatically in backend
- Dashboard shows total students, total results, passed students, pass percentage, and average score
- Each result can be printed as a report card

## Backend Flow

1. User sends login request
2. Backend verifies email and password
3. JWT token is created
4. Token is used in protected requests
5. Student and result data is stored in MySQL through JPA repositories

## Frontend Flow

1. User opens login page
2. After login, token is stored in local storage
3. Protected pages open only when token exists
4. Frontend calls backend APIs using Axios
5. Dashboard, students, and results pages update dynamically

## Database Tables

- `users`
- `student`
- `result`

## Why This Project Is Useful

- Reduces manual result management
- Makes student performance tracking easier
- Gives one place for records, marks, and summary statistics
- Good example of full-stack integration

## Security Points

- Password hashing using BCrypt
- JWT-based authentication
- Protected APIs
- CORS configured for frontend access

## Important Files

- `src/main/java/com/example/demo/controller`
- `src/main/java/com/example/demo/service`
- `src/main/java/com/example/demo/security`
- `frontend/src/pages`
- `frontend/src/components`

## Common Viva Questions With Short Answers

### What is JWT?

JWT is a token used for authentication between frontend and backend. After login, backend sends the token and frontend uses it in protected API requests.

### Why did you use Spring Boot?

Spring Boot makes backend development faster by providing built-in support for REST APIs, dependency management, database connectivity, and security.

### Why MySQL?

MySQL is a popular relational database and is suitable for storing structured data like users, students, and results.

### Where is business logic written?

Business logic is mainly written in the service layer, for example result calculation and authentication logic.

### Where is grade calculated?

Grade is calculated in the backend service layer based on total marks.

### Why use React?

React helps build a fast and interactive user interface with reusable components.

## Suggested Demo Order

1. Show login/register
2. Login to dashboard
3. Show student CRUD
4. Show result CRUD
5. Show report card print
6. Show MySQL database tables
7. Show Postman APIs
