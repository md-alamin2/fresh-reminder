# 🧊 Fresh Reminders - Food Management App

**Live URL:** [https://fresh-reminder-82973.web.app](https://fresh-reminder-82973.web.app)

## 📌 Project Purpose

Fresh Reminders is a food inventory management application designed to help users monitor their food items, reduce waste, and stay organized. It allows users to add, view, search, filter, and manage food items with expiry tracking, note-taking, and countdown features — all secured with JWT authentication.

---

## 🚀 Key Features

### 🔐 Authentication
- Email & Password login/register (with Firebase Auth)
- Google Sign-In
- JWT-based API protection

### 🧾 Food Management
- **Add Food:** Add new food items (with image, quantity, expiry date, etc.)
- **My Items:** View your added food with update & delete options
- **Fridge:** Explore all food items
- **Food Details Page:** See detailed info, add notes, and view expiration countdown

### 🧠 Smart Expiry Tracking
- **Expiration Countdown** for each food item
- **Nearly Expiry Items:** Shows food that will expire in the next 5 days
- **Expired Items:** Automatically identifies expired food

### 🔍 Extra Functionalities
- **Search & Filter:** Search by title/category and filter by category
- **React CountUp:** Count how many items are expired or nearly expired
- **Responsive UI:** Built with Tailwind CSS and DaisyUI
- **Loading Spinner & 404 Page**

---

## 🧩 Tech Stack & NPM Packages

### 📦 Frontend
- `react` (v19)
- `react-router-dom`
- `axios`
- `firebase`
- `swiper` (for carousel)
- `aos` (Animate on Scroll)
- `framer-motion`
- `lottie-react`
- `react-icons`
- `react-countup`
- `react-countdown`
- `sweetalert2`
- `react-toastify`
- `date-fns` + `date-fns-tz`
- `reactbits`

### 🎨 UI & Styling
- `tailwindcss`
- `daisyui`

### 🔧 Backend (Node.js + Express + MongoDB)
- `express`
- `cors`
- `mongodb`
- `dotenv`
- `jsonwebtoken` (used only for verifying Firebase token if needed)

## 🔐 JWT with Firebase

- Firebase Access Token is generated after login and sent with each secured request using Axios.
- Backend verifies the Firebase token before allowing access to protected routes like `POST`, `PATCH`, and `DELETE`.

---

## 👨‍💻 Developer

**Md. Alamin**  
Email: [mdalamin22671@gmail.com]  
GitHub: [https://github.com/md-alamin2](https://github.com/md-alamin2)

---

## 📎 License

This project is open source and free to use for learning and portfolio purposes.