# 🦷 Dental Scheduling App – Frontend (ReactJS)

This is the **frontend** repository for the Dental Scheduling System, allowing patients to schedule appointments with dentists. It is built using **ReactJS**, **TypeScript**, and **TailwindCSS**.

> **Note:** This client communicates with a backend API hosted separately. Make sure the backend is running for full functionality.

---

## 📦 Tech Stack

* **ReactJS** – UI framework
* **TypeScript** – Type-safe development
* **TailwindCSS** – Utility-first CSS styling
* **React Router DOM** – Routing and navigation
* **Axios** – HTTP client for API communication

---

## 📁 Folder Structure

```
client/
├── public/
├── src/
│   ├── assets/          # Static files like images, icons, fonts, etc.
│   ├── components/      # Shared UI components
│   ├── layout/          # Page header
│   ├── lib/             # Utility services using Axios
│   ├── pages/           # App pages (Home, Login, Booking, etc.)
│   ├── redux/           # Redux store, slices, and state management logic
│   ├── schemas/         # Zod-based form validation schemas
│   └── App.tsx          # Root component
├── tailwind.config.ts
├── index.css
├── tsconfig.json
└── vite.config.ts
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/drahcir-ediacla/dental-scheduling-client.git
cd dental-scheduling-client
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Development Server

```bash
npm run dev
```

> Open your browser to `http://localhost:5173`

---

## 🌐 Environment Variables

This app assumes the backend runs at `http://localhost:3000`.
If needed, you can configure a proxy in `vite.config.ts`.

---

## 📌 Key Features

* Home page with dental office info and services
* Register and Login forms
* Book appointment (select dentist and time slot)
* View, update, and cancel existing appointments
* Responsive and mobile-friendly UI

---

## 🔗 API Integration

The frontend communicates with these backend endpoints:

* `POST /api/users/register`
* `POST /api/users/login`
* `GET /api/user/logout`
* `GET /api/refresh`
* `POST /api/schedule-appointment`
* `GET /dentists/:dentistId/slots`
* `GET /api/dentists`
* `GET /api/users/:userId/appointments`
* `DELETE /api/users/appointments/:id`
* `PUT /api/users/appointments/:id`
* `GET /api/get/user/auth`
* `GET /api/get/users`

---

## ✅ Requirements

* Node.js v18 or later
* Backend server running ([Dental Scheduler Backend](https://github.com/drahcir-ediacla/dental-scheduling-server))

---

## ❗ Assumptions

* This frontend assumes the backend is available at http://localhost:3000 by default.
* All users are patients; there's no admin interface or role-specific UI.
* Appointments can only be booked for available time slots retrieved from the API.
* There is no UI for dentists to manage their availability directly (handled via backend slot generator).
* No third-party authentication (OAuth) is implemented.

---

## 🛠 Future Improvements

* Toast notifications for feedback
* Email or SMS notifications for reminders
* Role-based access
* Appointment status (e.g., confirmed, completed, canceled)

---

## 📬 Contact

If you encounter issues, feel free to open an issue or contribute to this repository.

---

© 2025 Dental Scheduling App – Frontend
