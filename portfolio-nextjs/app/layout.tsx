import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'My Portfolio | BSIT Student',
  description: 'Portfolio of Nerick Edward J. Macapayag - BSIT Student at University of Science and Technology of Southern Philippines',
  themeColor: '#6366f1',
  openGraph: {
    type: 'website',
    url: 'https://nerick2003.github.io/',
    title: 'Nerick Edward J. Macapayag - Portfolio | BSIT Student',
    description: 'Portfolio of Nerick Edward J. Macapayag - BSIT Student at University of Science and Technology of Southern Philippines. Web Developer, Software Development & Database Enthusiast.',
    images: ['https://nerick2003.github.io/images/pfp.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nerick Edward J. Macapayag - Portfolio | BSIT Student',
    description: 'Portfolio of Nerick Edward J. Macapayag - BSIT Student at University of Science and Technology of Southern Philippines.',
    images: ['https://nerick2003.github.io/images/pfp.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js" async></script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Nerick Edward J. Macapayag",
            "jobTitle": "BSIT Student | Web Developer",
            "url": "https://nerick2003.github.io/",
            "sameAs": [
              "https://github.com/nerick2003",
              "https://www.facebook.com/nerick69"
            ],
            "email": "macapayag.nerick6@gmail.com",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Villanueva",
              "addressRegion": "Misamis Oriental",
              "addressCountry": "Philippines"
            },
            "alumniOf": {
              "@type": "EducationalOrganization",
              "name": "University of Science and Technology of Southern Philippines"
            }
          })}
        </script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

