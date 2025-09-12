# EduPath Finder

A full-stack application to help students discover their ideal career paths and educational opportunities.

## Project Structure

```
edupath-finder/
├── frontend/           # React frontend application
│   ├── public/         # Static files
│   └── src/            # React source code
│       ├── components/ # Reusable UI components
│       ├── pages/      # Page components
│       └── ...
└── backend/            # Node.js/Express backend
    └── src/
        ├── config/     # Configuration files
        ├── controllers/# Request handlers
        ├── models/     # Database models
        ├── routes/     # API routes
        ├── middleware/ # Custom middleware
        └── ...
```

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm (v8 or later) or yarn
- MongoDB (or MongoDB Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd edupath-finder
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install

   # Install frontend dependencies
   cd frontend
   npm install

   # Install backend dependencies
   cd ../backend
   npm install
   ```

3. **Set up environment variables**
   - Create `.env` files in both `frontend` and `backend` directories
   - See `.env.example` files for required variables

### Running the Application

1. **Start the development servers**

   From the project root:
   ```bash
   # Start both frontend and backend in development mode
   npm run dev
   ```

   Or start them separately:
   ```bash
   # Frontend only (runs on http://localhost:5173)
   cd frontend
   npm run dev

   # Backend only (runs on http://localhost:5000)
   cd ../backend
   npm run dev
   ```

2. **Build for production**
   ```bash
   # Build both frontend and backend
   npm run build
   
   # Start production server
   npm start
   ```

## Development

### Frontend

- Built with React, TypeScript, and Vite
- Uses Shadcn UI components
- State management with React Query
- Form handling with React Hook Form

### Backend

- Built with Node.js and Express
- MongoDB with Mongoose ODM
- RESTful API architecture
- JWT authentication

## Environment Variables

### Frontend (`.env`)
```
VITE_API_URL=http://localhost:5000/api
# Add other frontend environment variables here
```

### Backend (`.env`)
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/edupath_finder
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=30d
FRONTEND_URL=http://localhost:5173
```

## API Documentation

API documentation is available at `/api-docs` when running in development mode.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
