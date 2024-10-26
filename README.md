# VacancyBee - Celebrity News & Entertainment

A modern, high-performance blog built with Next.js, featuring celebrity news, entertainment updates, and lifestyle content.

## Features

- Server-side rendering and static generation for optimal performance
- Dynamic content with pagination
- Real-time content rating and feedback system
- Exit-intent popups with personalized recommendations
- RSS feed support
- Responsive design with dark mode support
- SEO optimized with structured data
- Image optimization and lazy loading
- Infinite scroll and smooth animations
- Cache management and rate limiting

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Shadcn UI
- Framer Motion
- Vercel for deployment

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Environment Variables

Copy `.env.example` to `.env.local` and update the values:

```env
NEXT_PUBLIC_BASE_URL=your-domain
JWT_SECRET=your-jwt-secret
NEXTAUTH_URL=your-domain
NEXTAUTH_SECRET=your-nextauth-secret
```

## License

MIT