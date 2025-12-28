# 🚀 Task Manager Pro: Full-Stack Ecosystem

A professional, cross-platform task management solution featuring a **Node.js/Express API**, a **React Web Dashboard**, and an **Expo (React Native) Mobile App**.

---

## 🛠️ Project Architecture

* **Backend**: Node.js & Express with MongoDB. Handles logic, security, and data.
* **Web**: React + Vite + Tailwind CSS. A high-performance desktop dashboard.
* **Mobile**: Expo + Redux Toolkit. A persistent, touch-optimized mobile experience.

---

## ⚙️ Setup Instructions (Beginner Friendly)

### 1. Backend Setup (The Brain)
1.  **Navigate**: Open your terminal and go to the backend folder: `cd backend`.
2.  **Install**: Type `npm install`. This downloads all required packages.
3.  **Configure**: Create a file named `.env` and add your database link and secret key:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_secret_key
    ```
4.  **Start**: Type `npm run dev`. You should see "Server running on port 5000."

### 2. Frontend/Web Setup (Desktop View)
1.  **Navigate**: Open a new terminal and go to the web folder: `cd web`.
2.  **Install**: Type `npm install`.
3.  **Configure**: Create a `.env` file in the web folder and add:
    ```env
    VITE_API_URL=http://localhost:5000/api
    ```
4.  **Start**: Type `npm run dev`. Open the link (usually `http://localhost:5173`) in your browser.

### 3. Mobile Setup (The App View)
*Phones cannot see "localhost" easily, so we use a tunnel.*

1.  **Navigate**: Open a third terminal and go to the mobile folder: `cd mobile`.
2.  **Install**: Type `npm install`.
3.  **The Tunnel Trick**:
    * In another terminal, run: `ngrok http 5000`.
    * Copy the URL it gives you (e.g., `https://1234.ngrok-free.app`).
4.  **Update Mobile `.env`**: Create a `.env` file in the mobile folder:
    ```env
    EXPO_PUBLIC_API_URL=[https://your-ngrok-link.ngrok-free.app/api](https://your-ngrok-link.ngrok-free.app/api)
    ```
5.  **Start**: Type `npx expo start --tunnel`. Scan the QR code with the **Expo Go** app.

---

## 📑 Full API Documentation

All task-related requests must include the header: `Authorization: Bearer <your_token>`.

### Authentication
| Method | Endpoint         | Request Body                    |
| :----- | :--------------- | :------------------------------ |
| `POST` | `/auth/register` | `{ username, email, password }` |
| `POST` | `/auth/login`    | `{ email, password }`           |

### Tasks
| Method   | Endpoint     | Description                                  |
| :------- | :----------- | :------------------------------------------- |
| `GET`    | `/tasks`     | Query: `?page=1&search=work&isCompleted=all` |
| `POST`   | `/tasks`     | `{ title, description }`                     |
| `PUT`    | `/tasks/:id` | `{ title, description, isCompleted }`        |
| `DELETE` | `/tasks/:id` | Delete specific task by ID                   |