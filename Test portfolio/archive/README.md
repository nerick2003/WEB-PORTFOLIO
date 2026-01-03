# Professional Portfolio Website - Modular Structure

A modern, responsive portfolio website for an IT student with a modular structure for easy customization.

## 📁 Project Structure

```
portfolio/
├── index.html              # Main HTML file (shell)
├── styles.css              # All styling
├── script.js               # Main JavaScript (module loader)
├── config/
│   └── data.js            # ⭐ EDIT THIS - All portfolio data
└── components/
    ├── navbar.html         # Navigation component
    ├── hero.html           # Hero/Introduction section
    ├── about.html          # About Me section
    ├── skills.html         # Skills section (populated from data.js)
    ├── projects.html       # Projects section (populated from data.js)
    ├── achievements.html   # Achievements section (populated from data.js)
    ├── contact.html        # Contact section
    └── footer.html         # Footer component
```

## 🎯 Quick Start Guide

### 1. Edit Your Personal Information

Open `config/data.js` and update the `personalInfo` object:

```javascript
personalInfo: {
    name: "Your Full Name",
    title: "BSIT 2nd Year Student | Aspiring Software Developer",
    description: "Your personal description...",
    university: "University of Science and Technology of Southern Philippines",
    year: "2nd Year",
    location: "Philippines"
}
```

### 2. Update Your Skills

In `config/data.js`, edit the `skills` array:

```javascript
skills: [
    {
        category: "Programming Languages",
        items: ["Java", "Python", "JavaScript", "C++"]
    },
    // Add or remove categories as needed
]
```

### 3. Add Your Projects

Edit the `projects` array in `config/data.js`:

```javascript
projects: [
    {
        icon: "📱",  // Emoji or icon
        title: "Project Name",
        description: "Project description...",
        technologies: ["HTML", "CSS", "JavaScript"],
        link: "https://github.com/yourusername/project",
        linkText: "View Code"
    },
    // Add more projects...
]
```

### 4. Update Achievements

Modify the `achievements` array:

```javascript
achievements: [
    {
        icon: "🏆",
        title: "Achievement Title",
        description: "Description of achievement...",
        date: "2024"
    },
    // Add more achievements...
]
```

### 5. Update Contact Information

Edit the `contact` object:

```javascript
contact: {
    email: "your.email@example.com",
    linkedin: "linkedin.com/in/yourprofile",
    github: "github.com/yourusername",
    location: "Philippines"
}
```

## 📝 Editing Individual Sections

### Navigation Bar
- Edit `components/navbar.html` to change navigation items or brand name

### Hero Section
- Edit `components/hero.html` for hero content
- Or update `personalInfo` in `config/data.js` (auto-updates hero)

### About Section
- Edit `components/about.html` to modify the about me content

### Skills, Projects, Achievements
- **Easiest way**: Edit `config/data.js` - changes are automatically applied
- **Advanced way**: Edit the respective HTML files in `components/` folder

### Contact Section
- Contact info: Edit `contact` object in `config/data.js`
- Contact form: Edit `components/contact.html`

### Footer
- Edit `components/footer.html` or update name in `config/data.js`

## 🎨 Customization

### Colors
Edit CSS variables in `styles.css`:

```css
:root {
    --primary-color: #6366f1;
    --primary-dark: #4f46e5;
    --secondary-color: #8b5cf6;
    /* ... more variables */
}
```

### Styling
- All styles are in `styles.css`
- Organized by sections for easy navigation
- Responsive design included

## 🚀 Running the Portfolio

1. **Local Development**: Simply open `index.html` in your browser
2. **Live Server**: Use VS Code Live Server extension or any local server
3. **Deployment**: Upload all files to your web hosting service

## ⚠️ Important Notes

- **Local File Access**: If opening directly from file system, you may need a local server due to CORS restrictions when loading components
- **Recommended**: Use a local development server (VS Code Live Server, Python's http.server, etc.)
- **Data File**: Always edit `config/data.js` for content changes - it's the central configuration file

## 📦 Features

- ✅ Modular component structure
- ✅ Centralized data configuration
- ✅ Responsive design
- ✅ Smooth animations
- ✅ Mobile-friendly navigation
- ✅ Easy to customize
- ✅ Professional appearance

## 🔧 Troubleshooting

**Components not loading?**
- Make sure you're using a local server (not opening file:// directly)
- Check browser console for errors
- Verify all component files exist in `components/` folder

**Changes not showing?**
- Clear browser cache
- Check that `config/data.js` is properly formatted (valid JSON-like structure)
- Verify JavaScript console for errors

## 📄 License

Free to use and modify for personal and commercial purposes.

---

**Happy Coding! 🚀**
