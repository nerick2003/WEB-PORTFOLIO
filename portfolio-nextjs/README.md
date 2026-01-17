# Portfolio - Next.js & React

A modern, responsive portfolio website built with Next.js 14, React, and TypeScript.

## Features

- ✨ Modern UI with smooth animations
- 📱 Fully responsive design
- ⚡ Fast performance with Next.js
- 🎨 Beautiful gradient effects and transitions
- 🔍 Project filtering and search
- 📊 Animated statistics counters
- 🎯 Typewriter effect for hero subtitle
- 📧 Contact form with EmailJS integration
- 🎭 Smooth scroll animations
- 🌟 Featured projects showcase

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: CSS3 with custom animations
- **Email Service**: EmailJS (optional)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
```bash
cd portfolio-nextjs
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
portfolio-nextjs/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main page component
│   └── globals.css         # Global styles
├── components/
│   ├── Navbar.tsx          # Navigation bar
│   ├── Hero.tsx            # Hero section
│   ├── Statistics.tsx      # Statistics section
│   ├── About.tsx           # About section
│   ├── Skills.tsx          # Skills section
│   ├── Projects.tsx        # Projects section
│   ├── Achievements.tsx    # Achievements section
│   ├── Contact.tsx         # Contact section
│   ├── Footer.tsx          # Footer
│   ├── WelcomeScreen.tsx   # Welcome screen
│   ├── BackToTop.tsx       # Back to top button
│   └── ScrollIndicator.tsx # Scroll progress indicator
├── data/
│   └── portfolio.ts        # Portfolio data (TypeScript)
├── public/
│   ├── images/             # Images and assets
│   └── resume/             # Resume/CV files
└── package.json
```

## Configuration

### Update Portfolio Data

Edit `data/portfolio.ts` to update your personal information, projects, skills, achievements, and contact details.

### EmailJS Setup (Optional)

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create a service and template
3. Update the EmailJS configuration in `components/Contact.tsx`:

```typescript
const EMAILJS_CONFIG = {
  serviceId: 'YOUR_SERVICE_ID',
  templateId: 'YOUR_TEMPLATE_ID',
  publicKey: 'YOUR_PUBLIC_KEY'
}
```

## Building for Production

```bash
npm run build
npm start
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Deploy automatically

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## Customization

### Colors

Edit CSS variables in `app/globals.css`:

```css
:root {
  --primary-color: #6366f1;
  --primary-dark: #4f46e5;
  --secondary-color: #8b5cf6;
  /* ... */
}
```

### Fonts

The project uses Poppins font from Google Fonts. To change it, update the font link in `app/layout.tsx`.

## Features Breakdown

- **Welcome Screen**: Animated loading screen on first visit
- **Navbar**: Sticky navigation with smooth scroll
- **Hero**: Typewriter effect and profile image
- **Statistics**: Animated counters on scroll
- **Skills**: Accordion-style skill categories
- **Projects**: Filterable and searchable project grid
- **Achievements**: Infinite scrolling carousel
- **Contact**: Contact form with validation

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available for personal use.

## Credits

Built with ❤️ using Next.js and React.

