# Todo App

Welcome to the Todo App! This application is designed to help you manage your tasks, subtasks, sessions, and categories effectively, along with user authentication using Passport.js.

## Features

- **User Management**: Register, login, and manage user profiles.
- **Task Management**: Create, update, delete, and filter tasks by name, category, or tag.
- **SubTask Management**: Create and manage subtasks associated with tasks.
- **Session Management**: Track user sessions with login and logout times.
- **Category Management**: Organize tasks into categories.
- **Tag Management**: Tag tasks for better organization and filtering.
- **Views**: Different views for editing and viewing user information.

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- MySQL

### Backend Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/todo-app.git
   cd todo-app/backend
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Environment Variables**

   Create a `.env` file in the `backend` directory with the following content:

   ```plaintext
   DB_USERNAME=your_db_username
   DB_PASSWORD=your_db_password
   DB_NAME=your_db_name
   DB_HOST=your_db_host
   DB_DIALECT=mysql
   NODE_ENV=development
   ```

4. **Database Setup**

   Ensure your MySQL server is running and create a database for the app.

5. **Run the Backend**

   ```bash
   npm start
   ```

### Frontend Setup

1. **Navigate to Frontend Directory**

   ```bash
   cd ../frontend
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Environment Variables**

   Create a `.env` file in the `frontend` directory with the necessary environment variables for your frontend.

4. **Run the Frontend**

   ```bash
   npm start
   ```

## API Documentation

### User Endpoints

- **Register User**

  ```http
  POST /api/users/register
  ```

- **Login User**

  ```http
  POST /api/users/login
  ```

- **Get User by ID**

  ```http
  GET /api/users/:userId
  ```

- **Update User**

  ```http
  PUT /api/users/:userId
  ```

- **Delete User**

  ```http
  DELETE /api/users/:userId
  ```

### Task Endpoints

- **Create Task**

  ```http
  POST /api/tasks
  ```

- **Get Task by ID**

  ```http
  GET /api/tasks/:taskId
  ```

- **Update Task**

  ```http
  PUT /api/tasks/:taskId
  ```

- **Delete Task**

  ```http
  DELETE /api/tasks/:taskId
  ```

- **Filter Tasks**

  ```http
  GET /api/tasks?category=CategoryName&tag=TagName
  ```

### Category Endpoints

- **Create Category**

  ```http
  POST /api/categories
  ```

- **Get Category by ID**

  ```http
  GET /api/categories/:categoryId
  ```

- **Update Category**

  ```http
  PUT /api/categories/:categoryId
  ```

- **Delete Category**

  ```http
  DELETE /api/categories/:categoryId
  ```

### Session Endpoints

- **Get Session by ID**

  ```http
  GET /api/sessions/:sessionId
  ```

- **Create Session**

  ```http
  POST /api/sessions
  ```

- **Update Session**

  ```http
  PUT /api/sessions/:sessionId
  ```

- **Delete Session**

  ```http
  DELETE /api/sessions/:sessionId
  ```

## Contributing

We welcome contributions to improve the Todo App. Feel free to open issues or submit pull requests.

## License

This project is licensed under the ___ License.
