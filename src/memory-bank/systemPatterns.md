# System Patterns

## Architecture
- Component-based architecture using React
- Atomic design pattern for UI components

## Key Technical Decisions
- Centralized theme configuration via CSS variables
- Motion animations for interactive elements
- Responsive-first approach using Tailwind breakpoints

## Component Relationships
- ThemeProvider wraps entire application
- Navigation components consume theme context
- UI states managed through React hooks

## Critical Paths
1. Theme initialization on app load
2. Animated transitions between navigation items
3. Dynamic color scheme application