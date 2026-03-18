# Urban City Mechanical Lead Management System

## Overview

A lead generation and management platform for HVAC service businesses. Public-facing landing page + service pages where customers submit requests, plus a protected admin dashboard for managing leads through a pipeline. Includes UTM tracking, Facebook Pixel/Google Tag conversion tracking, and Replit Auth.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Animations**: Framer Motion
- **Charts**: Recharts (bar chart for lead sources)
- **Build Tool**: Vite with path aliases (@/, @shared/, @assets/)

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript (ES modules)
- **API Pattern**: RESTful endpoints defined in shared/routes.ts with Zod validation
- **Session Management**: express-session with PostgreSQL session store (connect-pg-simple)

### Data Storage
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM with drizzle-zod for schema validation
- **Schema Location**: shared/schema.ts (shared between client and server)
- **Migrations**: drizzle-kit with migrations output to ./migrations

### Authentication
- **Provider**: Replit Auth (OpenID Connect)
- **Implementation**: Passport.js with openid-client
- **Session Storage**: PostgreSQL sessions table
- **Protected Routes**: Dashboard requires authentication, public pages do not

### Key Data Models
- **Leads**: Contact info, service type, UTM fields, pipeline status (new→called→quoted→booked→closed), jobValue (integer $), preferredDate, aiAnalysis
- **Users**: Staff accounts managed through Replit Auth
- **Sessions**: Authentication sessions stored in PostgreSQL

### API Endpoints
- `GET /api/leads` - List leads with optional filters (source, status, zipCode)
- `POST /api/leads` - Create lead + trigger SMS/email notifications
- `GET /api/leads/stats` - Aggregated stats including totalRevenue
- `GET /api/leads/:id` - Get single lead
- `PATCH /api/leads/:id` - Update lead (status, jobValue)
- `PATCH /api/leads/:id/status` - Update status only
- `POST /api/leads/:id/analyze` - AI analysis
- `/api/auth/user`, `/api/login`, `/api/logout` - Auth flow

## Pages & Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Home.tsx | Landing page with hero, 6-card services grid, gallery, reviews, form |
| `/about` | About.tsx | About page with story, values, reviews, lead form |
| `/ac-repair` | ACRepair.tsx | AC repair service landing page |
| `/furnace-repair` | FurnaceRepair.tsx | Furnace repair service landing page |
| `/mini-split` | MiniSplit.tsx | Mini-split installation landing page |
| `/commercial-hvac` | CommercialHVAC.tsx | Commercial HVAC service page |
| `/maintenance` | Maintenance.tsx | HVAC maintenance & tune-up service page |
| `/thank-you` | ThankYou.tsx | Post-submission page with 5-min countdown |
| `/admin` | Dashboard.tsx | Admin lead management dashboard |
| `/login` | Login.tsx | Replit Auth login page |

## Key Features

### Public Site
- Urgency banner (sticky, red, shows available spots)
- Floating "Text Us Now" SMS button
- Zip code validator (50-mile radius from 94565 Pittsburg CA)
- Preferred date picker on quote form
- Redirect to /thank-you after form submission with 5-minute countdown
- Before/after gallery (4 real job photo pairs)
- Google Reviews section (6 reviews)
- Service page links section
- Google Maps embed
- CA Contractor License #1093253 in footer

### Admin Dashboard
- Pipeline stages: New → Called → Quoted → Booked → Closed (clickable filter cards)
- Recharts bar chart for leads by source
- Stats: Total Leads, Booked Jobs, Close Rate, Total Revenue
- Inline job value ($) field per lead row (saves on blur)
- Status dropdown per lead (colored by stage)
- AI analysis per lead
- Click-to-call phone button
- Filters: source, status, zip code

### Notifications
- Email via Gmail SMTP (Urbancityair@gmail.com, GMAIL_APP_PASSWORD secret)
- SMS via Verizon email-to-text gateway (5106196586@vtext.com)
- Twilio integration available (blocked by A2P carriers)

## External Dependencies

### Third-Party Services
- **Replit Auth**: OAuth/OIDC for staff login
- **Gmail SMTP**: Lead email notifications (nodemailer)
- **Verizon Gateway**: SMS notifications (email-to-text)
- **Facebook Pixel**: Conversion tracking (VITE_FACEBOOK_PIXEL_ID)
- **Google Tag Manager**: Analytics (VITE_GOOGLE_TAG_ID)

### Environment Variables Required
- `DATABASE_URL`: PostgreSQL connection string
- `SESSION_SECRET`: Session encryption
- `GMAIL_APP_PASSWORD`: Gmail SMTP password
- `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_PHONE_NUMBER`: Twilio (optional)
- `ISSUER_URL`: Replit OIDC issuer
- `REPL_ID`: Replit environment identifier
- `VITE_FACEBOOK_PIXEL_ID`: Optional
- `VITE_GOOGLE_TAG_ID`: Optional

### Key NPM Packages
- drizzle-orm / drizzle-kit: Database ORM and migrations
- @tanstack/react-query: Server state management
- react-hook-form + @hookform/resolvers: Form handling with Zod
- recharts: Bar charts in dashboard
- openid-client + passport: Authentication
- nodemailer: Gmail SMTP
- shadcn/ui components (Radix UI primitives)
- framer-motion: Animations
