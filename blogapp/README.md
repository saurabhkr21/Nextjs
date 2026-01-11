# BlogApp

A modern full-stack blog application built with Next.js 15, GraphQL, and Prisma.

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **API**: GraphQL (Apollo Server) with `graphql-request`
- **Database ORM**: [Prisma](https://www.prisma.io/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Authentication**: JWT-based auth (implied from structure)

## Features

- **Blog Management**: Create, read, update, and delete blogs.
- **Search**: Real-time blog searching functionality.
- **Authentication**: User login and signup.
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS.

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd blogapp
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up Environment Variables:**

   Rename `.env.example` to `.env` (if available) or create a `.env` file and add your database connection string and other secrets.

   ```env
   DATABASE_URL="postgresql://..."
   JWT_SECRET="your-secret"
   ```

4. **Run Database Migrations:**

   ```bash
   npx prisma migrate dev
   ```

5. **Start the Development Server:**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API

The application exposes a GraphQL API at `/api/graphql`. You can use tools like Apollo Studio or Postman to interact with it.

## Deployment

To deploy the application:

```bash
npm run build
npm start
``` 
