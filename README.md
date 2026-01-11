# Employee Management System

A modern, responsive web application for managing employee records with a clean and intuitive user interface.

## 📋 Project Overview

This Employee Management System allows you to:

- View a list of employees with their details
- Add new employees with profile pictures
- Edit existing employee information
- Toggle employee active/inactive status
- Delete employees with confirmation
- Search and filter employees
- Print employee records

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: SVG Icons
- **State Management**: React Hooks (useState, useContext, useReducer)
- **Form Handling**: React Hook Form
- **Routing**: React Router DOM
- **UI Components**: Custom-built components
- **Code Quality**: ESLint, Prettier

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:

   ```bash
   git clone [repository-url]
   cd bookXpert-assignment
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

The production build will be available in the `dist` directory.

## 🎨 Design Decisions

1. **Responsive Design**:

   - Mobile-first approach with responsive breakpoints
   - Print-friendly styles for employee records

2. **State Management**:

   - Local state management using React Hooks
   - Context API for global state when needed

3. **Form Handling**:

   - Client-side form validation
   - Image upload with preview
   - Dropdowns for standardized inputs (gender, state)

4. **User Experience**:

   - Confirmation dialogs for destructive actions
   - Loading states for better feedback
   - Clear error messages
   - Intuitive navigation

5. **Performance**:
   - Code splitting with React.lazy and Suspense
   - Efficient re-renders with React.memo
   - Optimized asset loading

## 📝 Assumptions

1. The application is a single-page application (SPA) without server-side rendering
2. Employee data is stored in the browser's localStorage
3. Profile pictures are either uploaded or generated using DiceBear avatars
4. The application is designed for modern browsers
