# Quick Start Guide

## Prerequisites
- Node.js 18+ must be installed
- Download from: https://nodejs.org/ (Choose LTS version)

## Installation Steps

1. **Install Node.js** (if not already installed)
   - Download from https://nodejs.org/
   - Run installer
   - Restart your terminal

2. **Open Terminal in Project Folder**
   ```bash
   cd F:\WEB-PORTFOLIO\portfolio-nextjs
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```
   Wait for installation to complete (may take 2-5 minutes)

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Open Browser**
   - Go to: http://localhost:3000
   - Your portfolio should be running!

## Common Issues

**"npm is not recognized"**
→ Node.js is not installed or not in PATH. Install Node.js and restart terminal.

**"Port 3000 already in use"**
→ Next.js will use the next available port. Check the terminal output for the actual port.

**Installation takes too long**
→ This is normal. First installation downloads many packages.

## What's Next?

- Edit `data/portfolio.ts` to update your information
- Customize styles in `app/globals.css`
- Configure EmailJS in `components/Contact.tsx`

