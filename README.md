# Test Project Songs Client

A practice project showcasing the use of different technologies on the frontend, 
following an architecture that separates concerns across pages, components and store. 
It uses reusable generic components and RTK Query for data fetching and cache management.

## Tech Stack
- React + TypeScript + Vite
- Redux Toolkit + RTK Query
- Formik + Yup
- Tailwind CSS
- Vitest + Testing Library

## Architecture
- Generic components — reusable components like PrimaryForm, SimpleTable and PrimaryModal 
  accept generics to work across different data types without duplicating code
- RTK Query — handles data fetching, caching and cache invalidation. Tags are used to 
  automatically refetch data after mutations
- Render prop pattern — form fields access Formik state through a render prop, keeping 
  the form wrapper decoupled from field implementation
- CI/CD pipeline builds a Docker image and deploys automatically to a VPS via Coolify webhook, with Cloudflare in front for security

## Project Structure
src/
  components/   — Reusable UI components
  pages/        — Feature pages
  store/        — Redux slices and RTK Query services
  routes/       — Application routes
  types/        — Shared types

## Getting Started
1. Clone the repository
2. Copy `.env.example` to `.env` and fill in the values
3. Run `npm install`
4. Run `npm run dev`
