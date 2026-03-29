# AI Expense Tracker

A modern, full-stack expense tracking application powered by AI to help users analyze spending patterns, categorize expenses automatically, and gain meaningful financial insights.

---

## What This Project Does

This isn't just a basic expense tracker.

It allows users to:
- Track daily expenses
- Automatically categorize transactions using AI
- Analyze spending patterns
- Get smart financial insights
- Visualize data in a clean and modern UI

---

## Why This Project Exists

Most expense trackers only store data.

This one **understands your data**.

The goal was to build something that:
- Feels modern
- Solves a real problem
- Uses AI in a meaningful way (not just for hype)

---

## Tech Stack

### Frontend
- React / Next.js
- Tailwind CSS
- Axios

### Backend
- FastAPI
- SQLAlchemy
- PostgreSQL / SQLite

### AI Layer
- OpenAI / LangChain (for insights & categorization)

---

## Features

### Authentication
- Secure login/signup
- Token-based authentication (JWT)

### Expense Management
- Add, update, delete expenses
- Filter & sort expenses
- Pagination support

### AI Categorization
- Automatically detects categories (Food, Travel, Shopping, etc.)

### Insights & Analysis
- Smart summaries of spending habits
- AI-generated insights

### Modern UI
- Clean, minimal and responsive design
- Smooth user experience

---

## 🧩 Project Structure
```bash
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── styles/
└── backend/
    └── app/
        ├── models/
        ├── routes/
        ├── services/
        ├── config/
        └── main.py
```

## How to Run Locally

### 1. Clone the repository
```
git clone https://github.com/Samakcha/expenseAI.git
cd expense-tracker
```

### 2. Backend Setup
```
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```
### 3. Frontend Setup
```
cd frontend
npm install
npm run dev
```
## Environment Variables
```
Create a `.env` file in backend:
DATABASE_URL=your_database_url
OPENAI_API_KEY=your_api_key
SECRET_KEY=your_secret
```
## Common Issues

### 401 Unauthorized Error
- Make sure JWT token is being sent from frontend
- Check Authorization header format: `Bearer <token>`
- Ensure backend CORS is configured properly

---

## Future Improvements

- Budget tracking
- Monthly financial reports
- Charts & advanced analytics
- Mobile app version
- Multi-user collaboration

---

## Contributing

Feel free to fork this repo and improve it.

Pull requests are welcome 

---

## Author

Built with by Sam

---

## If You Like This Project

Give it a star and share it!
