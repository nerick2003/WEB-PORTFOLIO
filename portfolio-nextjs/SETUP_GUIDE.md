# Setup Guide - How to Run Your Portfolio

## Step 1: Install Node.js

You need to install Node.js first to run the Next.js project.

### Option A: Download from Official Website (Recommended)

1. Go to [https://nodejs.org/](https://nodejs.org/)
2. Download the **LTS (Long Term Support)** version (recommended)
3. Run the installer and follow the setup wizard
4. Make sure to check "Add to PATH" during installation
5. Restart your terminal/command prompt after installation

### Option B: Using Chocolatey (if you have it)

```powershell
choco install nodejs-lts
```

### Option C: Using Winget (Windows Package Manager)

```powershell
winget install OpenJS.NodeJS.LTS
```

## Step 2: Verify Installation

After installing Node.js, open a **new** terminal/command prompt and run:

```bash
node --version
npm --version
```

You should see version numbers (e.g., `v20.10.0` and `10.2.3`)

## Step 3: Install Project Dependencies

Navigate to the project folder and install dependencies:

```bash
cd F:\WEB-PORTFOLIO\portfolio-nextjs
npm install
```

This will install all required packages (React, Next.js, TypeScript, etc.)

## Step 4: Run the Development Server

```bash
npm run dev
```

You should see output like:
```
▲ Next.js 14.0.4
- Local:        http://localhost:3000
- Ready in 2.3s
```

## Step 5: Open in Browser

Open your browser and go to: **http://localhost:3000**

## Troubleshooting

### If `npm install` fails:
- Make sure you have internet connection
- Try running as Administrator
- Clear npm cache: `npm cache clean --force`

### If `npm run dev` fails:
- Make sure you're in the correct directory (`portfolio-nextjs`)
- Check if `node_modules` folder exists
- Try deleting `node_modules` and `package-lock.json`, then run `npm install` again

### If port 3000 is already in use:
- Next.js will automatically try the next available port (3001, 3002, etc.)
- Or stop the other application using port 3000

## Alternative: Use the Original Portfolio

If you want to continue using the original portfolio while setting up Node.js:

1. The original portfolio is still in: `F:\WEB-PORTFOLIO\Test portfolio\`
2. You can open `index.html` directly in a browser
3. Or use a simple HTTP server:
   ```bash
   cd "F:\WEB-PORTFOLIO\Test portfolio"
   python -m http.server 8000
   ```
   Then open: http://localhost:8000

## Need Help?

- Node.js Documentation: https://nodejs.org/docs/
- Next.js Documentation: https://nextjs.org/docs
- Check the README.md for more information

