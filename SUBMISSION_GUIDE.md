# Student Result Management App Guide

## 1. Project Overview

This project is a full-stack Student Result Management application built with:

- Spring Boot backend
- MySQL database
- React + Vite frontend
- JWT-based authentication

Main features:

- Admin registration and login
- Student add, view, edit, delete
- Result add, view, edit, delete
- Dashboard with live statistics
- Search on students and results

## 2. MySQL Workbench Setup

Open MySQL Workbench and run:

```sql
CREATE DATABASE IF NOT EXISTS student_db;
```

Make sure your MySQL username and password match the backend config in `src/main/resources/application.properties`.

Current backend settings:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/student_db
spring.datasource.username=root
spring.datasource.password=root
server.port=8081
```

If your MySQL password is different, update this file:

- `spring.datasource.username`
- `spring.datasource.password`

Example:

```properties
spring.datasource.username=root
spring.datasource.password=123456
```

You do not need to manually create tables. Spring Boot creates and updates them automatically because:

```properties
spring.jpa.hibernate.ddl-auto=update
```

## 3. How To Run Backend

Open terminal in the `demo` folder and run:

```powershell
cmd /c mvnw.cmd spring-boot:run
```

Backend will start on:

- `http://localhost:8081`

## 4. How To Run Frontend

Open another terminal in `demo/frontend` and run:

```powershell
cmd /c npm.cmd install
cmd /c npm.cmd run dev
```

Frontend will start on:

- `http://localhost:5173`

## 5. How To Use The App

1. Open `http://localhost:5173`
2. Create the first admin account from the register option on login page
3. Login with the same email and password
4. Open dashboard
5. Add students from the Students page
6. Add results from the Results page
7. Edit or delete records if needed

## 6. Postman Setup

Base URL:

```text
http://localhost:8081
```

### 6.1 Register Admin

Method:

```text
POST
```

URL:

```text
http://localhost:8081/auth/register
```

Body -> raw -> JSON:

```json
{
  "email": "admin@example.com",
  "password": "admin123",
  "role": "ADMIN"
}
```

### 6.2 Login

Method:

```text
POST
```

URL:

```text
http://localhost:8081/auth/login
```

Body:

```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

Response will return a token:

```json
{
  "token": "your_jwt_token",
  "email": "admin@example.com",
  "role": "ADMIN",
  "message": "Login successful"
}
```

### 6.3 Set Token In Postman

For all protected APIs, add header:

```text
Authorization: Bearer your_jwt_token
```

You can also create a Postman variable:

- Variable name: `token`
- Value: paste JWT token

Then use:

```text
Authorization: Bearer {{token}}
```

## 7. Postman APIs

### Dashboard Stats

```text
GET http://localhost:8081/dashboard/stats
```

### Add Student

```text
POST http://localhost:8081/students
```

```json
{
  "name": "Rahul Kumar",
  "email": "rahul@gmail.com",
  "course": "BCA"
}
```

### Get All Students

```text
GET http://localhost:8081/students
```

### Update Student

```text
PUT http://localhost:8081/students/1
```

```json
{
  "name": "Rahul Kumar",
  "email": "rahul@gmail.com",
  "course": "MCA"
}
```

### Delete Student

```text
DELETE http://localhost:8081/students/1
```

### Add Result

```text
POST http://localhost:8081/results
```

```json
{
  "studentName": "Rahul Kumar",
  "marks1": 80,
  "marks2": 76,
  "marks3": 88
}
```

### Get All Results

```text
GET http://localhost:8081/results
```

### Update Result

```text
PUT http://localhost:8081/results/1
```

```json
{
  "studentName": "Rahul Kumar",
  "marks1": 90,
  "marks2": 85,
  "marks3": 82
}
```

### Delete Result

```text
DELETE http://localhost:8081/results/1
```

## 8. MySQL Workbench Checks

After running the backend, refresh schemas in MySQL Workbench.

You should see:

- `student`
- `result`
- `users`

Useful SQL queries:

```sql
USE student_db;

SELECT * FROM users;
SELECT * FROM student;
SELECT * FROM result;
```

## 9. What To Show During Submission

Recommended demo order:

1. Show login/register page
2. Register admin
3. Login
4. Show dashboard stats
5. Add student
6. Edit student
7. Add result
8. Edit result
9. Show database tables in MySQL Workbench
10. Show APIs in Postman

## 10. If Something Does Not Run

Check:

- MySQL service is running
- Database `student_db` exists
- Username/password in `application.properties` are correct
- Backend is running on `8081`
- Frontend is running on `5173`
- Token is added in Postman for protected endpoints
