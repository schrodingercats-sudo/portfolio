# replit.md

## Overview

This is a full-stack web application built as a personal portfolio for Pratham, a Computer Engineering student and AI developer. The application showcases a modern tech stack with a React frontend using shadcn/ui components, Express.js backend, and PostgreSQL database integration through Drizzle ORM.

## System Architecture

### Frontend Architecture
- **Framework**: React 18+ with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack Query (React Query) for server state
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design system
- **Build Tool**: Vite with React plugin

### Backend Architecture
- **Runtime**: Node.js with TypeScript (ES modules)
- **Framework**: Express.js
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: Built-in session handling with express-session and connect-pg-simple

### Monorepo Structure
```
├── client/          # React frontend application
├── server/          # Express.js backend
├── shared/          # Shared types and schemas
└── migrations/      # Database migration files
```

## Key Components

### Database Layer
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Schema**: User management system with username/password authentication
- **Storage Interface**: Abstracted storage layer with in-memory implementation for development
- **Migration Strategy**: Drizzle Kit for schema migrations

### Authentication System
- Basic user authentication structure in place
- Username/password based authentication
- Session management ready for implementation

### UI Design System
- Dark theme portfolio design with navy, cyan, purple, and orange color scheme
- Glass morphism effects and hover animations
- Responsive design with mobile-first approach
- Custom CSS variables for consistent theming

### Development Environment
- Hot module replacement via Vite
- TypeScript strict mode enabled
- ESLint and Prettier configuration implied
- Development server with API logging middleware

## Data Flow

### Client-Server Communication
1. **API Layer**: RESTful API structure with `/api` prefix
2. **Query Management**: TanStack Query for caching and synchronization
3. **Error Handling**: Centralized error handling with custom error modal
4. **Request/Response**: JSON-based communication with proper HTTP status codes

### Database Operations
1. **Schema Definition**: Centralized in `shared/schema.ts`
2. **Type Safety**: Full TypeScript integration with Drizzle
3. **CRUD Operations**: Interface-based storage abstraction
4. **Validation**: Zod schema validation for data integrity

## External Dependencies

### Core Dependencies
- **UI Framework**: Radix UI primitives for accessibility
- **Icons**: Lucide React and React Icons
- **Database**: Neon Database serverless PostgreSQL
- **Validation**: Zod for runtime type checking
- **Date Handling**: date-fns for date utilities

### Development Tools
- **Build**: esbuild for production builds
- **Development**: tsx for TypeScript execution
- **Database Tooling**: Drizzle Kit for migrations and introspection
- **Replit Integration**: Cartographer plugin for development environment

## Deployment Strategy

### Build Process
1. **Frontend**: Vite builds optimized React application to `dist/public`
2. **Backend**: esbuild bundles server code to `dist/index.js`
3. **Database**: Drizzle migrations applied via `db:push` command

### Environment Configuration
- **Database**: PostgreSQL connection via `DATABASE_URL` environment variable
- **Production**: Node.js server serving static files and API routes
- **Development**: Vite dev server with Express API proxy

### Hosting Considerations
- **Frontend**: Static file serving from Express
- **Backend**: Node.js compatible hosting (Replit, Railway, etc.)
- **Database**: Neon Database serverless PostgreSQL
- **Assets**: Integrated asset handling with Vite aliases

## Changelog

```
Changelog:
- June 28, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```