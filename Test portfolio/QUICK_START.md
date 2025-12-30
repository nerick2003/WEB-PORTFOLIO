# Quick Start Guide

## 🚀 Running Your Portfolio

### Option 1: Python Server (Recommended)
```bash
python server.py
```
This will automatically open your portfolio in your browser at `http://localhost:8000`

### Option 2: VS Code Live Server
1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

### Option 3: Node.js http-server
```bash
npx http-server -p 8000
```

## 📝 Editing Your Portfolio

### Main Configuration File
**Edit `config/data.js`** - This is where ALL your content lives:

- **Personal Info**: Name, title, description
- **Skills**: All your skills organized by category
- **Projects**: All your projects with descriptions
- **Achievements**: Certificates and accomplishments
- **Contact**: Email, LinkedIn, GitHub links

### Individual Components
Edit HTML files in `components/` folder:
- `navbar.html` - Navigation menu
- `hero.html` - Hero/intro section
- `about.html` - About me content
- `skills.html` - Skills section structure
- `projects.html` - Projects section structure
- `achievements.html` - Achievements section structure
- `contact.html` - Contact form and info
- `footer.html` - Footer content

### Styling
Edit `styles.css` for colors, fonts, spacing, etc.

## ⚡ Quick Edits

1. **Change your name**: Edit `personalInfo.name` in `config/data.js`
2. **Add a project**: Add object to `projects` array in `config/data.js`
3. **Update skills**: Modify `skills` array in `config/data.js`
4. **Change colors**: Edit CSS variables in `styles.css`

## ⚠️ Important

**You MUST use a local server** - Don't just double-click `index.html` because the modular components need to be loaded via HTTP.

Use one of the server options above!

