# smart-attendance-backend

Backend scaffold for Smart Attendance Tracker

Quick start:
- Copy `.env.example` to `.env` and fill values
- Start Postgres (docker-compose up -d)
- Run migrations (`psql $DATABASE_URL -f migrations/001_create_users.sql` etc.)
- Run `npm install` and `npm run dev`

Planned features:
- JWT auth, RBAC
- Attendance endpoints with photo upload
- Background worker for face recognition
- Retention cron job (3 months)