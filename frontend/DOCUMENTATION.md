# Day 7 - Mobile Recharge Application with React Advanced Concepts

## Overview
This is a complete mobile recharge application built with React, Vite, and Tailwind CSS, demonstrating advanced React concepts including Context API, Props, State Management, and responsive design.

## Technologies Used
- **React 18.2** - UI library
- **Vite 5.0** - Build tool
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Context API** - Global state management

## Project Structure
```
Day7/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx              # Navigation with theme toggle
│   │   ├── Sidebar.jsx             # Collapsible sidebar menu
│   │   ├── Footer.jsx              # Footer with social links
│   │   ├── UserGreeting.jsx        # Personalized user greeting (Props)
│   │   ├── MobileRechargeForm.jsx  # Main recharge form (State)
│   │   ├── PlanCard.jsx            # Individual plan card (Props)
│   │   ├── PlanGrid.jsx            # Grid of plan cards
│   │   ├── RechargeHistory.jsx     # Transaction history (Context)
│   │   ├── ThemeToggle.jsx         # Theme switcher (Context)
│   │   ├── AmountChips.jsx         # Quick amount selection (Props)
│   │   ├── OperatorDropdown.jsx    # Operator selection (Props)
│   │   └── Notification.jsx        # Toast notifications
│   ├── context/
│   │   ├── ThemeContext.jsx        # Theme management
│   │   └── UserContext.jsx         # User & recharge data
│   ├── App.jsx                     # Main application
│   ├── main.jsx                    # Entry point with providers
│   └── index.css                   # Tailwind imports
├── tailwind.config.js
├── vite.config.js
└── package.json
```

## Key Features Implemented

### 1. TAILWIND CSS
- Fully responsive design (mobile, tablet, desktop)
- Consistent color palette with gradients
- Hover, focus, and active states
- Custom animations and transitions
- Dark/Light theme support

### 2. PROPS IMPLEMENTATION
**PlanCard Component:**
- Receives: `plan` object with price, validity, data, features
- Conditional rendering based on badge prop
- Different icons per plan

**UserGreeting Component:**
- Receives: `name`, `balance`, `isLoggedIn`
- Shows personalized message
- Conditional rendering for logged-in state

**AmountChips Component:**
- Receives: `amounts` array, `selectedAmount`, `onSelect` callback
- Dynamic rendering of amount buttons

**OperatorDropdown Component:**
- Receives: `value`, `onChange`, `error`
- Displays validation errors

### 3. STATE MANAGEMENT (useState)
**MobileRechargeForm:**
- `mobileNumber` - Input validation
- `operator` - Selected operator
- `amount` - Selected amount
- `errors` - Form validation errors
- `loading` - Submit loading state
- `notification` - Success/error messages

**PlanCard:**
- `isSelected` - Plan selection state
- `showDetails` - Toggle details visibility

**Navbar:**
- `isMobileMenuOpen` - Mobile menu toggle

**Sidebar:**
- `isCollapsed` - Sidebar collapse state

### 4. CONTEXT API
**ThemeContext:**
- Provides: `theme` (light/dark), `toggleTheme()`
- Consumed in: Navbar, Sidebar, Footer, all form components
- Changes colors across entire app

**UserContext:**
- Provides: `user` object, `recharges` array, `addRecharge()`
- Consumed in: Navbar, UserGreeting, RechargeHistory, MobileRechargeForm
- Manages user data and transaction history globally

### 5. FORM VALIDATION
- Mobile number: 10 digits starting with 6-9
- Operator: Required selection
- Amount: Required selection
- Real-time error display
- Success notification on submit

### 6. RESPONSIVE DESIGN
- Mobile: Single column, hamburger menu
- Tablet: 2-column grid for plans
- Desktop: 3-column grid, visible sidebar
- Sidebar collapses on smaller screens

### 7. INTERACTIVE FEATURES
- Theme toggle (light/dark mode)
- Plan selection with visual feedback
- Form validation with error messages
- Loading states during submission
- Toast notifications
- Hover animations on all interactive elements
- Smooth transitions

## Component Demonstrations

### Props Usage
```jsx
// PlanCard receives plan data
<PlanCard plan={{ price: 299, validity: '28 days', data: '2GB/day' }} />

// UserGreeting receives user info
<UserGreeting name="John Doe" balance={1250} isLoggedIn={true} />

// AmountChips receives amounts and callback
<AmountChips amounts={[199, 299, 399]} selectedAmount={299} onSelect={setAmount} />
```

### State Management
```jsx
// Form state in MobileRechargeForm
const [mobileNumber, setMobileNumber] = useState('');
const [operator, setOperator] = useState('');
const [amount, setAmount] = useState(null);
const [errors, setErrors] = useState({});
```

### Context API
```jsx
// Theme context usage
const { theme, toggleTheme } = useTheme();

// User context usage
const { user, recharges, addRecharge } = useUser();
```

## Running the Application

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Design System

### Colors
- Primary: Purple (600-700)
- Secondary: Pink (500-600)
- Success: Green (500)
- Warning: Yellow (500)
- Error: Red (500)
- Dark Mode: Gray (700-900)

### Typography
- Headings: font-black (900)
- Subheadings: font-bold (700)
- Body: font-semibold (600)
- Labels: font-medium (500)

### Spacing
- Sections: mb-8, mb-12
- Cards: p-6, p-8
- Gaps: gap-4, gap-6, gap-8

## Key React Concepts Demonstrated

1. **Functional Components** - All components are functional
2. **Hooks** - useState, useContext, useEffect
3. **Props** - Data passing between components
4. **State Management** - Local state with useState
5. **Context API** - Global state management
6. **Conditional Rendering** - Based on props and state
7. **Event Handling** - Form submissions, clicks
8. **Component Composition** - Reusable components
9. **Responsive Design** - Mobile-first approach
10. **Performance** - Optimized re-renders

## Validation Rules
- Mobile: Exactly 10 digits, starts with 6-9
- Operator: Must be selected
- Amount: Must be selected
- All fields required before submission

## Success Criteria Met
✅ Tailwind CSS fully integrated
✅ Props used in multiple components
✅ useState for form and UI interactions
✅ Context API for theme and user data
✅ Responsive design (mobile/tablet/desktop)
✅ Form validation with error display
✅ Loading and success states
✅ Professional design with animations
✅ All components integrated in App.jsx
✅ Complete working application
