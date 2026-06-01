# Lendsqr Frontend Assessment

## Overview

This project is a responsive frontend assessment built for Lendsqr using React, TypeScript, SCSS, and Vite. It implements a practical authenticated user flow with a login page, shared dashboard shell, users dashboard, and user details page.

What I built:
- a login screen with client-side authentication state
- a protected app layout with sidebar navigation and topbar actions
- a users dashboard with summary cards, search, filters, table, pagination, and row actions
- a user details page with profile summary, rating stars, and sectioned information blocks
- local persistence for auth session state and selected user details
- API-driven data loading from the MockAPI users endpoint

The codebase is organized to be interview-friendly: simple enough to explain clearly, but structured like a real production frontend.

## Tech Stack

```text
React
TypeScript
SCSS
React Router
Fetch
Vite
Lucide React
```

## Features

- Email/password login flow with localStorage session persistence
- Protected routes for authenticated pages
- Responsive sidebar navigation with mobile drawer behavior
- Shared top navigation bar with search, docs link, notifications, and profile menu
- Users dashboard with:
  - metric summary cards
  - searchable table
  - filter popover
  - pagination
  - row actions menu
- User details page with:
  - profile summary header
  - account balance and user tier
  - star-based tier rating
  - section tabs and information blocks
- Loading, empty, and error states for user data
- Reusable common UI components for buttons, fields, table, status pills, pagination, avatars, and state views

## Architecture

The app follows a clean layered structure:

- Entry layer: bootstraps React and global styles
- Routing layer: defines public and protected routes
- Layout layer: handles shared shell UI
- Page layer: contains screen-level composition and page state
- Component layer: reusable UI primitives and shell components
- Service layer: handles API requests
- Hook layer: wraps async loading logic
- Utility layer: contains formatting, filtering, pagination, and storage helpers
- Type layer: defines shared TypeScript contracts
- Style layer: keeps SCSS organized by component and page

This structure keeps components focused and avoids unnecessary abstractions.

## Setup Instructions

### Prerequisites

- Node.js 18+ recommended
- npm installed

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint the Codebase

```bash
npm run lint
```


## API Endpoint

The users data is loaded from:

```text
https://lendsqr-api-hx9n.onrender.com/api/users
```

The service layer fetches the data, normalizes it, and then the UI applies filtering, pagination, and row actions locally.

## Design Decisions

- I used React + TypeScript instead of a heavier state-management stack because the app only needs local UI state and server data loading.
- I kept the architecture layered and practical so each file has a clear responsibility.
- Shared UI pieces such as the table, pagination, status pills, and form fields were extracted to reduce duplication.
- I kept styling in SCSS so component and page styles stay explicit and easy to map back to the UI.
- I used localStorage for auth and selected-user persistence so the details page remains reachable after navigation.
- I kept the routing simple so the app is easy to explain in an assessment setting.

## Challenges & Solutions

### 1. Preserving pixel-perfect UI while refactoring
The UI had to stay visually identical while the codebase was improved.

Solution:
- kept the existing component structure and SCSS approach
- changed logic and organization without redesigning components
- avoided introducing new visual patterns

### 2. Managing users data cleanly
The users dashboard needs filtering, pagination, and row interactions without making the page messy.

Solution:
- centralized user helpers in the utility layer
- kept API access inside a service
- left page components to handle composition and minimal local UI state

### 3. Keeping the details page usable on direct navigation
The user details page must still work when opened directly or refreshed.

Solution:
- saved the selected user in localStorage
- fell back to reloading users from the API when needed
- resolved the user by id inside the page flow

### 4. Making the shell responsive without affecting the layout
The sidebar and topbar needed to behave differently on mobile while keeping desktop layout intact.

Solution:
- used a shared app layout for the shell
- controlled sidebar open/close state at the layout level
- added mobile backdrop and drawer behavior without changing the page content

## Project Structure

```text
src/
  components/
    common/       reusable UI primitives
    layout/       sidebar, topbar, branding
  hooks/          data-loading hooks
  layouts/        shared authenticated shell
  pages/          screen-level views
  routes/         routing and access control
  services/       API calls
  styles/         global SCSS
  types/          shared TypeScript interfaces
  utils/          helpers for users, storage, formatting
```