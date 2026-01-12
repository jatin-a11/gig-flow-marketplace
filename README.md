
#  GigFlow - Freelance Marketplace

GigFlow ek modern, secure aur fast freelance marketplace platform hai. Is platform par **Clients** apni zarurat ke hisaab se Gigs post kar sakte hain aur **Freelancers** un par Bids (Proposals) laga sakte hain. 

Is project ki sabse badi khasiyat iska **Transactional Hiring System** hai jo database level par double-hiring ko rokta hai.

---

##  Key Features

- ** Secure Authentication:** JWT aur BcryptJS ke saath safe login/signup.
- ** Role-Based Access:** Client aur Freelancer ke liye alag-alag dashboards aur permissions.
- ** Transactional Integrity:** MongoDB Transactions ka use karke "Hire" logic ko secure banaya gaya hai taaki race conditions na hon.
- ** Modern UI:** Tailwind CSS 4.0 aur Vite ka upyog karke fast aur beautiful design.
- ** Live Dashboard:** Real-time mein bids dekhna aur unhe accept/reject karne ki suvidha.

---

##  Tech Stack

- **Frontend:** React.js, Tailwind CSS 4.0, Vite, Axios, React Router.
- **Backend:** Node.js, Express.js, MongoDB, Mongoose.
- **State Management:** Context API (AuthContext).

---

##  Getting Started

### 1. Repository Clone Karein
```bash
git clone [https://github.com/aapka-username/gig-flow-marketplace.git](https://github.com/aapka-username/gig-flow-marketplace.git)
cd gig-flow-marketplace

```

### 2. Backend Setup

```bash
cd server
npm install

```

`.env` file banayein aur ye variables dalein:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

```

Run karein: `npm run dev`

### 3. Frontend Setup

```bash
cd client
npm install
npm run dev

```

---

##  Project Structure

```text
Gig-flow/
├── client/           # Frontend (React + Tailwind 4.0)
├── server/           # Backend (Node + Express + MongoDB)
├── README.md         # Documentation
└── .gitignore        # Ignored files (node_modules, .env)

```

---

## 🛡️ Secure Hiring Logic (Snippet)

Humne hiring process mein transactional integrity ka dhyan rakha hai:

* Gig status check (Atomic).
* Bid acceptance status update.
* Other bids rejection automations.
* All steps or none (Rollback mechanism).

---

## 👤 Author

* **Jatin** - Full Stack Developer

```

