EaseDrive backend (Node + Express + MongoDB)
==========================================

Quick start:

1. Copy .env.example -> .env and edit values (MONGO_URI, JWT_SECRET)
2. npm install
3. npm run dev
4. Open http://localhost:5000

APIs (basic):
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me (protected)
- GET /api/drivers
- POST /api/drivers (create driver)
- POST /api/bookings (protected)
- GET /api/bookings (protected)
- POST /api/feedbacks (protected)
