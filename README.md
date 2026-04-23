# SimpleTalk - WhatsApp-Integrated Micro-CRM
## Contact Management System for Indian 3-Person Businesses

**Version:** 1.0.0 (MVP)  
**Status:** Development  
**Target Launch:** Q2 2026

---

## 📋 Project Overview

SimpleTalk is a **WhatsApp-integrated contact management system** designed specifically for micro-businesses in India (jewelry stores, coaching institutes, real estate agents, logistics operators). It acts as an intelligent layer on top of existing WhatsApp conversations—everything stays in WhatsApp, but now it's actually organized.

### Problem Statement
Traditional CRM systems (Salesforce, HubSpot, Zoho) are **too expensive** (₹5,000-50,000/month), **too complex** (40+ hours setup), and **too powerful** (90% of features unused) for 3-person businesses that just need simple contact management.

### Solution
SimpleTalk combines the familiarity of WhatsApp with smart CRM features:
- ✅ Contact management (linked to WhatsApp)
- ✅ Conversation history & quick actions
- ✅ Task & reminder management
- ✅ Payment tracking (₹)
- ✅ Simple dashboard with actionable metrics
- ✅ Affordable pricing: ₹299-2,999/month

---

## 🎯 Key Features (MVP)

### 1. Contact Management
- WhatsApp Business API integration
- Auto-sync contact list from WhatsApp
- Last seen status & online indicators
- Custom notes & tags per contact
- Business type, location, custom fields
- Quick contact search & filtering

### 2. Chat Integration
- Full WhatsApp conversation history (synced)
- Read/unread message tracking
- Quick action buttons (Follow-up, Payment, Note, Schedule)
- Message timestamps & sender identification
- Support for text, media, and links

### 3. Task & Reminder System
- Create tasks from chats (one-tap)
- Task types: Follow-up, Payment, Call, Callback
- Due date & reminder notifications
- Task priority levels
- Mark complete / snooze functionality
- Daily task overview

### 4. Dashboard & Metrics
- **Active Chats:** Contacts communicated with this week
- **Follow-ups Due:** Count of pending reminders
- **Pending Payments:** Total amount owed (₹)
- **Response Rate:** % of replied conversations
- **Task List:** Today / Tomorrow / Overdue sections
- Quick action cards for urgent items

### 5. Payment Tracking
- Log payment amounts & dates
- Mark paid/pending status
- Payment method tracking (Cash/UPI/Bank)
- Payment reminders
- Payment history per contact

### 6. Search & Filter
- Search by contact name or phone
- Filter by: Online, Pending Payment, Needs Follow-up, Contacted Today/Week
- Sort by: Last contacted, Name, Amount due
- Advanced filters (dashboard)

### 7. Settings & Preferences
- Account management
- WhatsApp sync status
- Notification preferences
- Theme preferences (Light/Dark)
- Help & Support
- Logout/Account deletion

---

## 💻 Technology Stack

### Frontend
- **Framework:** React 18.x with Vite
- **Routing:** React Router v6
- **State Management:** Redux Toolkit + Redux Persist
- **Styling:** Tailwind CSS + Material-UI (MUI)
- **Form Management:** Formik + Yup validation
- **HTTP Client:** Axios with interceptors
- **UI Components:** Custom components + MUI
- **Icons:** Heroicons + React Icons
- **Notifications:** React Hot Toast / Sonner
- **API Documentation:** React Helmet (SEO)

### Backend (Recommended Architecture)
- **Runtime:** Node.js 18.x
- **Framework:** Express.js / Fastify
- **Database:** PostgreSQL
- **Caching:** Redis
- **Authentication:** OAuth 2.0 (WhatsApp) + JWT
- **API Gateway:** Nginx / reverse proxy
- **Message Queue:** Bull / RabbitMQ (for notifications)
- **File Storage:** AWS S3 / Cloudinary (profile pictures)

### Infrastructure
- **Hosting:** Vercel (Frontend) / AWS / DigitalOcean (Backend)
- **Monitoring:** Sentry + DataDog
- **CI/CD:** GitHub Actions
- **Environment:** Docker containers (optional)

### Tools & Utilities
- **Package Manager:** npm / pnpm
- **Linting:** ESLint + Prettier
- **Testing:** Vitest + React Testing Library (future)
- **Analytics:** Google Analytics 4
- **Error Tracking:** Sentry
- **Design System:** Custom Tailwind + MUI tokens

---

## 📁 Project Folder Structure

```
simpletal-crm/
├── public/
│   ├── favicon.ico
│   ├── logo.svg
│   └── robots.txt
│
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── ErrorBoundary.jsx
│   │   │
│   │   ├── ui/
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── Avatar.jsx
│   │   │   ├── Skeleton.jsx
│   │   │   └── Toast.jsx
│   │   │
│   │   ├── contacts/
│   │   │   ├── ContactList.jsx
│   │   │   ├── ContactCard.jsx
│   │   │   ├── ContactDetail.jsx
│   │   │   ├── AddContactModal.jsx
│   │   │   └── ContactFilter.jsx
│   │   │
│   │   ├── chats/
│   │   │   ├── ChatWindow.jsx
│   │   │   ├── ChatBubble.jsx
│   │   │   ├── MessageThread.jsx
│   │   │   ├── QuickActions.jsx
│   │   │   └── ChatSearch.jsx
│   │   │
│   │   ├── tasks/
│   │   │   ├── TaskList.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   ├── TaskForm.jsx
│   │   │   ├── TaskModal.jsx
│   │   │   └── TaskFilter.jsx
│   │   │
│   │   ├── dashboard/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── MetricCard.jsx
│   │   │   ├── TaskOverview.jsx
│   │   │   └── AnalyticsChart.jsx
│   │   │
│   │   ├── payments/
│   │   │   ├── PaymentTracker.jsx
│   │   │   ├── PaymentForm.jsx
│   │   │   ├── PaymentHistory.jsx
│   │   │   └── InvoiceGenerator.jsx
│   │   │
│   │   └── settings/
│   │       ├── Settings.jsx
│   │       ├── AccountSettings.jsx
│   │       ├── NotificationPreferences.jsx
│   │       └── ThemeToggle.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── Dashboard.jsx
│   │   ├── ContactsPage.jsx
│   │   ├── ChatPage.jsx
│   │   ├── TasksPage.jsx
│   │   ├── PaymentsPage.jsx
│   │   ├── SettingsPage.jsx
│   │   ├── NotFound.jsx
│   │   └── Unauthorized.jsx
│   │
│   ├── features/
│   │   ├── auth/
│   │   │   ├── authSlice.js
│   │   │   ├── authService.js
│   │   │   └── useAuth.js
│   │   │
│   │   ├── contacts/
│   │   │   ├── contactsSlice.js
│   │   │   ├── contactsService.js
│   │   │   └── useContacts.js
│   │   │
│   │   ├── chats/
│   │   │   ├── chatsSlice.js
│   │   │   ├── chatsService.js
│   │   │   └── useChats.js
│   │   │
│   │   ├── tasks/
│   │   │   ├── tasksSlice.js
│   │   │   ├── tasksService.js
│   │   │   └── useTasks.js
│   │   │
│   │   ├── payments/
│   │   │   ├── paymentsSlice.js
│   │   │   ├── paymentsService.js
│   │   │   └── usePayments.js
│   │   │
│   │   └── ui/
│   │       ├── uiSlice.js
│   │       └── useUI.js
│   │
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useDebounce.js
│   │   ├── useFetch.js
│   │   ├── useTheme.js
│   │   ├── useLocalStorage.js
│   │   ├── useSessionStorage.js
│   │   ├── usePagination.js
│   │   └── useAsync.js
│   │
│   ├── services/
│   │   ├── api.js (Axios instance + interceptors)
│   │   ├── authService.js
│   │   ├── contactService.js
│   │   ├── chatService.js
│   │   ├── taskService.js
│   │   ├── paymentService.js
│   │   ├── whatsappService.js
│   │   └── analyticsService.js
│   │
│   ├── utils/
│   │   ├── formatters.js (dates, currency)
│   │   ├── validators.js (email, phone, etc.)
│   │   ├── constants.js (API URLs, error codes)
│   │   ├── localStorage.js (helper functions)
│   │   ├── sessionStorage.js (helper functions)
│   │   ├── notification.js (toast/notification helpers)
│   │   └── errorHandler.js (global error handling)
│   │
│   ├── styles/
│   │   ├── globals.css
│   │   ├── tailwind.config.js
│   │   └── theme.js
│   │
│   ├── redux/
│   │   ├── store.js (Redux store configuration)
│   │   ├── rootReducer.js
│   │   └── middleware.js (custom middleware)
│   │
│   ├── routes/
│   │   ├── Routes.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── RouteGuard.jsx
│   │   └── routeConfig.js
│   │
│   ├── config/
│   │   ├── api.config.js
│   │   ├── app.config.js
│   │   └── theme.config.js
│   │
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
│
├── .env.example
├── .env.local
├── .eslintrc.json
├── .prettierrc
├── tailwind.config.js
├── vite.config.js
├── package.json
├── package-lock.json
├── README.md
├── DEVELOPMENT.md
├── DEPLOYMENT.md
└── .gitignore
```

---

## 🚀 Installation & Setup

### Prerequisites
- **Node.js:** v18.x or higher
- **npm/pnpm:** Latest version
- **Git:** For version control
- **Figma:** Design reference (already created)
- **WhatsApp Business Account:** For API access (optional for development)

### Step 1: Clone Repository
```bash
git clone https://github.com/your-org/simpletal-crm.git
cd simpletal-crm
```

### Step 2: Install Dependencies
```bash
npm install
# OR
pnpm install
```

### Step 3: Environment Setup
```bash
# Copy example env file
cp .env.example .env.local

# Edit .env.local with your configuration
# Required variables:
# - VITE_API_BASE_URL=http://localhost:5000
# - VITE_WHATSAPP_API_KEY=your_key_here
# - VITE_GOOGLE_ANALYTICS_ID=your_ga_id
# - VITE_SENTRY_DSN=your_sentry_dsn
```

### Step 4: Install Tailwind CSS & Configure
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Step 5: Configure MUI (Material-UI)
```bash
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material
```

### Step 6: Setup Redux Toolkit
```bash
npm install @reduxjs/toolkit react-redux redux-persist
```

### Step 7: Install Other Dependencies
```bash
npm install react-router-dom axios formik yup react-hot-toast react-helmet-async
npm install zustand zustand-persist (optional, for state management alternative)
```

### Step 8: Start Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

---

## 📝 Development Guidelines

### 1. Design Approval (MANDATORY - COMPLETED ✅)
- [x] Figma design created: [Link](https://www.figma.com/proto/w5NCRHCEUXH2clk8mVjSjL/Untitled)
- [x] All major screens designed (Contacts, Chat, Dashboard, Tasks, Payments, Settings)
- [x] Desktop design complete
- [x] Consistent design system (colors, typography, spacing)
- [x] Components planned (Buttons, Forms, Cards, Tables, Navigation)
- [x] User flow clearly defined
- [x] Design approved before development

### 2. Project Setup & Structure ✅
- [x] Vite project created
- [x] Tailwind CSS configured
- [x] MUI integrated
- [x] Clean folder structure implemented (feature-based architecture)
- [x] Reusable components created

### 3. Routing System
- [ ] React Router implemented
- [ ] Public routes configured (Home, Login, Signup)
- [ ] Protected routes configured (Dashboard, Chat, Tasks)
- [ ] Role-based routes (Admin/User if applicable)
- [ ] Lazy loading applied to routes
- [ ] Route guards implemented

### 4. State Management (Redux Toolkit)
- [ ] Redux Toolkit setup completed
- [ ] Store properly configured
- [ ] Slices created:
  - [ ] authSlice (login, logout, user data)
  - [ ] contactsSlice (all contacts, selected contact)
  - [ ] chatsSlice (conversation threads)
  - [ ] tasksSlice (tasks, reminders)
  - [ ] paymentsSlice (payment data)
  - [ ] uiSlice (loading, theme, notifications)
- [ ] Redux Persist configured (persist auth & preferences)

### 5. API Integration
- [ ] Centralized API service created (src/services/api.js)
- [ ] Axios abstraction layer with:
  - [ ] Request interceptor (attach JWT token)
  - [ ] Response interceptor (global error handling)
  - [ ] Base URL configuration
- [ ] API services created for each feature:
  - [ ] authService.js
  - [ ] contactService.js
  - [ ] chatService.js
  - [ ] taskService.js
  - [ ] paymentService.js
- [ ] Error handling: 401, 403, 404, 500, network errors
- [ ] Retry mechanism for failed requests
- [ ] Loading states properly managed

### 6. Forms & Validation
- [ ] Formik integrated
- [ ] Yup validation schemas created:
  - [ ] loginSchema
  - [ ] signupSchema
  - [ ] contactSchema
  - [ ] taskSchema
  - [ ] paymentSchema
- [ ] Error messages displayed in UI
- [ ] Reusable form components:
  - [ ] FormField
  - [ ] FormSelect
  - [ ] FormCheckbox
  - [ ] FormDatePicker
- [ ] Complex forms implemented:
  - [ ] Multi-step signup (optional)
  - [ ] Dynamic task form

### 7. UI / UX Design
- [ ] Fully responsive design (mobile-first approach)
- [ ] Consistent design system followed
- [ ] Core Components implemented:
  - [ ] Navbar (responsive with hamburger menu)
  - [ ] Sidebar (collapsible on mobile)
  - [ ] Cards (contact, task, payment cards)
  - [ ] Tables (contact list, payment history - with overflow handling)
  - [ ] Modals (forms, confirmations)
  - [ ] Buttons (primary, secondary, danger variants)
  - [ ] Input fields (text, email, phone, number)
  - [ ] Dropdowns/Selects
- [ ] UX Enhancements:
  - [ ] Skeleton loaders (while data loading)
  - [ ] Empty state UI ("No contacts yet", "No tasks")
  - [ ] Error state UI ("Failed to load, try again")
  - [ ] Loading spinners
  - [ ] Success/Error toasts
- [ ] Accessibility:
  - [ ] Proper color contrast
  - [ ] Touch targets (min 44px)
  - [ ] Clear visual hierarchy

### 8. Theme System
- [ ] Light/Dark mode implemented
- [ ] Theme preference stored in localStorage
- [ ] Tailwind + MUI theme consistency maintained
- [ ] CSS variables for easy customization
- [ ] Theme toggle in Settings page
- [ ] Apply theme preference on app load

### 9. Performance Optimization
- [ ] Code splitting implemented (lazy load pages)
  ```jsx
  const Dashboard = lazy(() => import('./pages/Dashboard'));
  ```
- [ ] useMemo used for expensive computations (filtering, sorting)
- [ ] useCallback used for event handlers passed to child components
- [ ] Avoid unnecessary re-renders (proper dependency arrays)
- [ ] Image optimization (lazy loading images)
- [ ] Virtualized lists for large contact/task lists (optional: react-window)

### 10. SEO Implementation
- [ ] React Helmet configured
- [ ] Page titles set dynamically:
  ```jsx
  <Helmet>
    <title>Contacts - SimpleTalk</title>
    <meta name="description" content="Manage your contacts..." />
  </Helmet>
  ```
- [ ] Meta descriptions added
- [ ] Open Graph tags implemented
- [ ] Sitemap created (/public/sitemap.xml)
- [ ] robots.txt configured (/public/robots.txt)
- [ ] Structured data (schema.org) added (optional)

### 11. Accessibility (A11y)
- [ ] Semantic HTML used (header, nav, main, footer, section, article)
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] ARIA labels added for icons & buttons
- [ ] Color contrast meets WCAG AA standards
- [ ] Form labels properly associated with inputs

### 12. Error Handling
- [ ] Error Boundary component created:
  ```jsx
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
  ```
- [ ] Global error state in Redux
- [ ] Error UI displayed (not just console errors)
- [ ] Error logging to Sentry

### 13. Custom Hooks (At least 2 required)
- [ ] useAuth - Get current user, login, logout
  ```jsx
  const { user, isLoading, login, logout } = useAuth();
  ```
- [ ] useDebounce - Debounce search input
  ```jsx
  const debouncedSearch = useDebounce(searchTerm, 500);
  ```
- [ ] useTheme - Toggle light/dark theme
  ```jsx
  const { theme, toggleTheme } = useTheme();
  ```
- [ ] useFetch - Generic data fetching hook
  ```jsx
  const { data, loading, error } = useFetch('/api/contacts');
  ```
- [ ] useLocalStorage - Persist data in localStorage
  ```jsx
  const [value, setValue] = useLocalStorage('key', defaultValue);
  ```

### 14. Notifications System
- [ ] Toast notifications implemented (React Hot Toast or Sonner)
- [ ] Success feedback:
  ```jsx
  toast.success('Contact added successfully!');
  ```
- [ ] Error feedback:
  ```jsx
  toast.error('Failed to add contact');
  ```
- [ ] Info messages:
  ```jsx
  toast.info('Task scheduled');
  ```
- [ ] Notification auto-dismiss (3-4 seconds)

### 15. Real-Time Ready Structure (Optional for MVP)
- [ ] UI structure prepared for socket.io/WebSocket
- [ ] Socket integration patterns planned
- [ ] Context/Redux ready for live updates

### 16. File Upload Feature (Optional for MVP)
- [ ] File upload UI component (button + preview)
- [ ] Drag & drop support
- [ ] File preview before upload (image/document)
- [ ] File validation (size: max 5MB, type: jpg, png, pdf)
- [ ] Progress indicator during upload
- [ ] Success/error feedback

### 17. Local Storage & Session Storage (CRITICAL)
#### localStorage - Persistent Data
```jsx
// Store theme preference
localStorage.setItem('theme', 'dark');

// Store auth token
localStorage.setItem('authToken', token);

// Store user preferences
localStorage.setItem('userPreferences', JSON.stringify(preferences));
```

#### sessionStorage - Temporary Data
```jsx
// Store form progress (multi-step)
sessionStorage.setItem('formStep', currentStep);

// Store temporary filters
sessionStorage.setItem('selectedFilter', filter);
```

#### Best Practices
- [ ] Utility functions created for storage:
  ```jsx
  // utils/localStorage.js
  export const setAuth = (token) => localStorage.setItem('authToken', token);
  export const getAuth = () => localStorage.getItem('authToken');
  export const clearAuth = () => localStorage.removeItem('authToken');
  ```
- [ ] Data cleared on logout
- [ ] Sensitive data NOT stored (passwords, payment info)
- [ ] Fallback handling if storage unavailable
- [ ] Custom hook for storage:
  ```jsx
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  ```

### 18. Analytics & Tracking
- [ ] Google Analytics 4 configured
- [ ] Page tracking implemented:
  ```jsx
  useEffect(() => {
    gtag.pageview({ page_path: location.pathname });
  }, [location]);
  ```
- [ ] Event tracking added (button clicks, form submissions):
  ```jsx
  const trackEvent = (action, category, label) => {
    gtag.event(action, { event_category: category, event_label: label });
  };
  ```

### 19. Code Quality
- [ ] ESLint configured (.eslintrc.json)
  ```bash
  npm run lint
  ```
- [ ] Prettier configured (.prettierrc)
  ```bash
  npm run format
  ```
- [ ] Clean, consistent code structure
- [ ] Proper naming conventions (camelCase variables, PascalCase components)
- [ ] No console.log in production code (use proper logging)
- [ ] Comments for complex logic

### 20. Documentation
- [ ] README.md created (this file)
- [ ] Project setup steps documented
- [ ] Folder structure explained
- [ ] Features listed with descriptions
- [ ] Development commands documented
- [ ] Environment variables explained
- [ ] Deployment guide created (DEPLOYMENT.md)
- [ ] Development guide created (DEVELOPMENT.md)

---

## 🔧 Available Scripts

```bash
# Development server (HMR enabled)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint (check code quality)
npm run lint

# Fix ESLint issues
npm run lint:fix

# Format code with Prettier
npm run format

# Check formatting
npm run format:check

# Type checking (if TypeScript added)
npm run type-check

# Run tests (when tests are added)
npm run test

# Run tests with coverage
npm run test:coverage
```

---

## 🎨 Design System & Styling

### Colors
```javascript
// Primary: WhatsApp Green
--primary: #25D366
--primary-dark: #0fa355

// Secondary: Orange (urgent items)
--secondary: #FF9800
--secondary-dark: #F57C00

// Accent: Blue
--accent: #2196F3
--accent-dark: #1976D2

// Neutral
--white: #FFFFFF
--gray-light: #F5F5F5
--gray-medium: #999999
--gray-dark: #222222
--black: #000000
```

### Typography
```javascript
// Display
font-family: 'Roboto';
font-weight: 700;
font-size: 18-24px;

// Body
font-family: 'Roboto';
font-weight: 400;
font-size: 14-16px;
line-height: 1.6;

// Labels
font-family: 'Roboto';
font-weight: 500;
font-size: 12-13px;
```

### Spacing Scale
```javascript
xs: 4px
sm: 8px
md: 12px
lg: 16px
xl: 24px
2xl: 32px
```

### Border Radius
```javascript
sm: 4px
md: 8px
lg: 12px
xl: 16px
full: 999px (for avatars)
```

---

## 📊 Redux Store Structure

```javascript
// Redux state shape
{
  auth: {
    user: { id, email, phone, name, role },
    token: string,
    isLoading: boolean,
    error: null | string,
    isAuthenticated: boolean
  },
  contacts: {
    items: Contact[],
    selectedContact: Contact | null,
    isLoading: boolean,
    error: null | string,
    filters: { search, tag, status },
    pagination: { page, limit, total }
  },
  chats: {
    conversations: Message[],
    selectedChatId: string | null,
    isLoading: boolean,
    newMessagesCount: number
  },
  tasks: {
    items: Task[],
    filter: 'all' | 'pending' | 'completed' | 'overdue',
    isLoading: boolean
  },
  payments: {
    items: Payment[],
    totalPending: number,
    isLoading: boolean
  },
  ui: {
    theme: 'light' | 'dark',
    sidebarOpen: boolean,
    isLoading: boolean,
    notifications: Notification[]
  }
}
```

---

## 🔐 Authentication Flow

1. **Login Page**
   - User enters phone/email + password
   - API validates credentials
   - JWT token returned + stored in localStorage
   - Redirect to Dashboard

2. **Protected Routes**
   - Check token in localStorage
   - If token exists → load auth state
   - If token missing → redirect to Login

3. **Token Refresh**
   - Implement token refresh logic in axios interceptor
   - Auto-refresh before token expires
   - On failure, redirect to Login

---

## 📱 Responsive Breakpoints

```javascript
// Tailwind breakpoints
sm: 640px   (mobile)
md: 768px   (tablet)
lg: 1024px  (desktop)
xl: 1280px  (large desktop)
2xl: 1536px (extra large)
```

---

## 🧪 Component Testing (Future)

Each component should have tests:
```jsx
// Button.test.jsx
import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button Component', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
```

---

## 📦 Deployment

### Frontend Deployment (Vercel)
```bash
npm run build
# Connect GitHub repo to Vercel
# Auto-deploys on push to main branch
```

### Environment Variables for Production
```
VITE_API_BASE_URL=https://api.simpletal.com
VITE_WHATSAPP_API_KEY=production_key
VITE_GOOGLE_ANALYTICS_ID=production_id
VITE_SENTRY_DSN=production_dsn
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment guide.

---

## 🐛 Troubleshooting

### Port 5173 already in use
```bash
# Kill process on port 5173
# macOS/Linux
lsof -ti:5173 | xargs kill -9

# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

### Node modules issues
```bash
rm -rf node_modules package-lock.json
npm install
```

### Vite HMR issues
```bash
# Check vite.config.js HMR configuration
# May need to set:
// vite.config.js
export default {
  server: {
    hmr: {
      host: 'localhost',
      port: 5173
    }
  }
}
```

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

---

## 📞 Contact & Support

- **Email:** support@simpletal.com
- **Discord:** [Join our community]
- **GitHub Issues:** Report bugs here
- **WhatsApp:** For urgent support (meta link)

---

## 🚀 Roadmap

### Phase 1 (MVP - Q2 2026)
- ✅ Contact management
- ✅ Chat integration (read-only initially)
- ✅ Task management
- ✅ Payment tracking
- ✅ Dashboard

### Phase 2 (Q3 2026)
- [ ] WhatsApp message sending from app
- [ ] Team collaboration (multiple users)
- [ ] Advanced analytics
- [ ] API for custom integrations

### Phase 3 (Q4 2026)
- [ ] Mobile app (React Native)
- [ ] Offline sync
- [ ] AI-powered insights
- [ ] SMS integration

### Phase 4 (2027)
- [ ] Multi-language support (Hindi, Tamil, etc.)
- [ ] Advanced CRM features
- [ ] Marketplace for extensions
- [ ] Enterprise features

---

## ✅ Final Evaluation Checklist

A project is considered production-ready only if:

- [ ] **UI is polished and responsive** (desktop to mobile)
- [ ] **State management is properly implemented** (Redux with proper structure)
- [ ] **API integration is clean and scalable** (centralized service layer)
- [ ] **UX is smooth** (loading, error, empty states handled)
- [ ] **Performance optimizations applied** (code splitting, memoization, lazy loading)
- [ ] **SEO basics implemented** (titles, meta tags, structured data)
- [ ] **Storage used correctly** (localStorage for persistent, sessionStorage for temp)
- [ ] **Code quality** (ESLint, Prettier, clean structure)
- [ ] **Documentation complete** (README, API docs, deployment guide)
- [ ] **Security** (auth tokens in localStorage, sanitized inputs, no sensitive data exposed)
- [ ] **Error handling** (global error boundary, error states, Sentry logging)
- [ ] **Accessibility** (semantic HTML, keyboard nav, ARIA labels)
- [ ] **Analytics** (Google Analytics, event tracking)
- [ ] **Notifications** (toast for user feedback)

---

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Router](https://reactrouter.com/)
- [Formik](https://formik.org/docs/overview)
- [Axios](https://axios-http.com/)
- [Material-UI](https://mui.com/)

---

**Last Updated:** April 23, 2026  
**Project Status:** Development Phase  
**Lead Developer:** [Your Name]  
**Next Review:** May 7, 2026


