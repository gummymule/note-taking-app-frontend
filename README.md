# Note Taking Web App

A full-stack note-taking application built with Next.js (frontend) and Laravel (backend).

## Features

- User authentication (login/registration)
- Create, edit, and delete notes
- Rich text formatting
- Note categorization
- Search functionality
- Responsive design

## Technologies Used

### Frontend
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Axios for API calls
- React Hook Form for forms
- NextAuth.js (optional for authentication)

### Backend
- Laravel 10
- PHP 8.2
- MySQL database
- Sanctum for API authentication
- Eloquent ORM

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v18 or higher)
- npm or yarn
- PHP (v8.2 or higher)
- Composer
- MySQL (v5.7 or higher)

## Setup Instructions

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd note-taking-web-app/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file based on `.env.example` and fill in the required environment variables.

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd note-taking-web-app/backend
   ```

2. Install dependencies:
   ```bash
   composer install
   ```

3. Create a `.env` file based on `.env.example` and configure your database connection:
   ```env
   DB_DATABASE=your_database_name
   DB_USERNAME=your_database_username
   DB_PASSWORD=your_database_password
   ```

4. Generate application key:
   ```bash
   php artisan key:generate
   ```

5. Run database migrations:
   ```bash
   php artisan migrate
   ```

6. Start the development server:
   ```bash
   php artisan serve
   ```

## Running the Application

1. Start both frontend and backend servers as described above.

2. The frontend should be accessible at `http://localhost:3000` and the backend API at `http://localhost:8000`.

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/register` | POST | User registration |
| `/api/login` | POST | User login |
| `/api/logout` | POST | User logout |
| `/api/notes` | GET | Get all notes for authenticated user |
| `/api/notes` | POST | Create a new note |
| `/api/notes/{id}` | GET | Get a specific note |
| `/api/notes/{id}` | PUT | Update a note |
| `/api/notes/{id}` | DELETE | Delete a note |

## Project Structure

```
note-taking-web-app/
├── frontend/               # Next.js frontend
│   ├── public/             # Static files
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Next.js pages
│   │   ├── services/       # API service layer
│   │   ├── styles/         # Global styles
│   │   ├── types/          # TypeScript types
│   │   └── utils/          # Utility functions
│   ├── next.config.js      # Next.js configuration
│   └── package.json        # Frontend dependencies
│
└── backend/                # Laravel backend
    ├── app/
    │   ├── Http/
    │   │   ├── Controllers/ # API controllers
    │   │   └── Middleware/ # Middleware
    │   ├── Models/          # Eloquent models
    │   └── Providers/       # Service providers
    ├── database/
    │   ├── migrations/      # Database migrations
    │   └── seeders/         # Database seeders
    ├── routes/              # API routes
    ├── .env                 # Environment configuration
    └── composer.json        # Backend dependencies
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Create a new Pull Request

## Contact

For any questions or feedback, please contact [muliasujiastuti@gmail.com].