# SyncSetu - WhatsApp-Integrated Micro-CRM
Contact Management System for Indian 3-Person Businesses
**Version**: 1.0.0 (MVP)
**Status**: Development
**Target Launch**: Q2 2026

---

## 📋 Project Overview
SyncSetu is a premium WhatsApp-integrated contact management system designed specifically for micro-businesses in India (jewelry stores, coaching institutes, real estate agents, logistics operators). It acts as an intelligent layer on top of existing WhatsApp conversations—everything stays in WhatsApp, but now it's actually organized quietly and beautifully.

### Problem Statement
Traditional CRM systems (Salesforce, HubSpot, Zoho) are too expensive (₹5,000-50,000/month), too complex (40+ hours setup), and too powerful (90% of features unused) for 3-person businesses that just need simple contact management.

### Solution
SyncSetu combines the familiarity of WhatsApp with smart, aesthetically premium CRM features:

- ✅ Contact management (linked to WhatsApp)
- ✅ Conversation history & quick actions
- ✅ Task & reminder management
- ✅ Payment tracking (₹)
- ✅ Simple dashboard with actionable metrics
- ✅ Affordable pricing: ₹299-2,999/month

---

## 🎯 Key Features (MVP)

**1. Contact Management**
* WhatsApp Business API integration
* Auto-sync contact list from WhatsApp
* Last seen status & online indicators
* Custom notes & tags per contact
* Business type, location, custom fields
* Quick contact search & filtering

**2. Chat Integration**
* Full WhatsApp conversation history (synced)
* Read/unread message tracking
* Quick action buttons (Follow-up, Payment, Note, Schedule)
* Message timestamps & sender identification
* Support for text, media, and links

**3. Task & Reminder System**
* Create tasks from chats (one-tap)
* Task types: Follow-up, Payment, Call, Callback
* Due date & reminder notifications
* Task priority levels
* Mark complete / snooze functionality
* Daily task overview

**4. Dashboard & Metrics**
* Active Chats: Contacts communicated with this week
* Follow-ups Due: Count of pending reminders
* Pending Payments: Total amount owed (₹)
* Response Rate: % of replied conversations
* Task List: Today / Tomorrow / Overdue sections
* Quick action cards for urgent items

**5. Payment Tracking**
* Log payment amounts & dates
* Mark paid/pending status
* Payment method tracking (Cash/UPI/Bank)
* Payment reminders
* Payment history per contact

**6. Search & Filter**
* Search by contact name or phone
* Filter by: Online, Pending Payment, Needs Follow-up, Contacted Today/Week
* Sort by: Last contacted, Name, Amount due
* Advanced filters (dashboard)

**7. Settings & Preferences**
* Account management
* WhatsApp sync status
* Notification preferences
* Theme preferences (Light/Dark)
* Help & Support
* Logout/Account deletion

---

## 💻 Technology Stack

### Frontend
- **Framework:** React 18.x with Vite
- **Routing:** React Router v6
- **State Management:** Redux Toolkit + Redux Persist
- **Styling:** Tailwind CSS + Material-UI (MUI)
- **Animation:** Framer Motion
- **Form Management:** Formik + Yup validation
- **HTTP Client:** Axios with interceptors
- **UI Components:** Custom glassmorphism components + MUI
- **Icons:** Lucide React + Heroicons
- **Notifications:** React Hot Toast / Sonner

### Backend (Recommended Architecture)
- **Runtime:** Node.js 18.x
- **Framework:** Express.js / Fastify
- **Database:** PostgreSQL
- **Caching:** Redis
- **Authentication:** OAuth 2.0 (WhatsApp) + JWT
- **API Gateway:** Nginx / reverse proxy
- **Message Queue:** Bull / RabbitMQ (for notifications)

### Infrastructure
- **Hosting:** Vercel (Frontend) / AWS / DigitalOcean (Backend)
- **Monitoring:** Sentry + DataDog
- **CI/CD:** GitHub Actions

---

## 📁 Project Folder Structure
```text
syncsetu/
├── frontend/           # React + Vite Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/ # Reusable UI components (Sidebar, TopHeader, etc.)
│   │   ├── pages/      # Page components (Dashboard, Contacts, etc.)
│   │   ├── services/   # API service layer (Axios)
│   │   ├── store/      # Redux state management
│   │   ├── assets/     # Static assets
│   │   ├── features/   # Feature-specific logic
│   │   ├── hooks/      # Custom React hooks
│   │   ├── utils/      # Helper functions
│   │   ├── App.jsx     # Main App component
│   │   ├── index.css   # Global styles
│   │   ├── dark-mode.css # Premium dark mode styles
│   │   └── main.jsx    # Entry point
│   ├── package.json
│   └── vite.config.js
└── backend/            # Node.js + Express Backend
    ├── config/         # Database & Config
    ├── controllers/    # Request logic
    ├── models/         # Mongoose schemas (Contact, Lead)
    ├── routes/         # API endpoints
    ├── .env            # Environment variables
    ├── server.js       # Entry point
    └── package.json
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js: v18.x or higher
- Git: For version control
- WhatsApp Business Account: For API access (optional for development)

### Step 1: Clone Repository
```bash
git clone https://github.com/Sarthak-Khalasi-dev/syncSetu.git
cd syncSetu/frontend
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Environment Setup
```bash
# Copy example env file
cp .env.example .env.local

# Required variables:
# - VITE_API_BASE_URL=http://localhost:5000
# - VITE_WHATSAPP_API_KEY=your_key_here
```

### Step 4: Start Development Server
```bash
npm run dev
```
The app will be available at `http://localhost:5173`

---

## 🔧 Available Scripts
```bash
npm run dev        # Development server (HMR enabled)
npm run build      # Build for production
npm run preview    # Preview production build locally
npm run lint       # Run ESLint
npm run format     # Format code with Prettier
```

---

## 🎨 Design System & Styling

### Colors
```css
--teal-brand: #1b6855;
--teal-dark: #125143;
--teal-bg: #e6f1ed;
--whatsapp-green: #23cc62;
--whatsapp-hover: #1dae52;
--text-dark: #1f2937;
--text-muted: #6b7280;
--input-bg: #f9fafb;
--white: #ffffff;
--divider: #e5e7eb;
```

### Typography
- **Display/Headings**: 'Inter' / System UI fonts (Weights: 600, 700, 800)
- **Body**: 'Inter' (Weight: 400, Line-height: 1.6)

---

## 📊 Redux Store Structure
```javascript
{
  auth: { user, token, isLoading, isAuthenticated },
  contacts: { items, selectedContact, filters },
  chats: { conversations, selectedChatId },
  tasks: { items, filter, isLoading },
  payments: { items, totalPending },
  ui: { theme, sidebarOpen, notifications }
}
```

---

## 🔐 Authentication Flow

**Login Page**
1. User enters work email/phone + password.
2. API validates credentials.
3. JWT token returned + stored securely.
4. Redirect to Dashboard.

**Protected Routes**
1. Check token in localStorage.
2. If token exists → load auth state.
3. If token missing → redirect to Login.

---

## 📱 Responsive Breakpoints
- `sm: 640px` (mobile - stack vertically)
- `md: 768px` (tablet)
- `lg: 1024px` (desktop - narrow side-by-side)
- `xl: 1280px` (large desktop)

---

## 📦 Deployment
**Frontend Deployment (Vercel)**
```bash
npm run build
```
Connect GitHub repo to Vercel for auto-deploys on push to main branch.

---

## 🤝 Contributing
1. Create a feature branch: `git checkout -b feature/your-feature`
2. Follow code style (ESLint + Prettier)
3. Make commits with clear messages
4. Push and create Pull Request
5. Wait for code review

---

## 📜 License
MIT License - See LICENSE file

## 📞 Contact & Support
- **Email**: support@syncsetu.com
- **GitHub Issues**: Report bugs here

---

## 🚀 Roadmap
**Phase 1 (MVP - Q2 2026)**
- ✅ Contact management
- ✅ Chat integration
- ✅ Task management
- ✅ Dashboard & Payments

**Phase 2 (Q3 2026)**
-  WhatsApp message sending from app
-  Team collaboration (multiple users)

**Phase 3 & 4 (Q4 2026 - 2027)**
-  Mobile app (React Native)
-  Multi-language support

---
*Last Updated: April 27, 2026*  
*Project Status: Development Phase*
