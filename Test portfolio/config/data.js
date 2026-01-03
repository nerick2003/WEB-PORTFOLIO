const portfolioData = {
    personalInfo: {
        name: "Nerick Edward J. Macapayag",
        title: "BSIT 2nd Year Student | Web Developer | Software Development & Database Enthusiast",
        description: "Currently pursuing my Bachelor of Science in Information Technology at the University of Science and Technology of Southern Philippines. Passionate about creating innovative solutions through code and eager to learn and grow in the tech industry.",
        university: "University of Science and Technology of Southern Philippines",
        year: "2nd Year",
        location: "Villanueva, Misamis Oriental, Mindanao, Philippines",
        profileImage: "images/pfp.png"
    },

    skills: [
        {
            category: "Programming Languages",
            icon: "💻",
            items: ["Java", "Python", "JavaScript", "C++", "HTML/CSS"]
        },
        {
            category: "Web Development",
            icon: "🌐",
            items: ["HTML5", "CSS3", "JavaScript", "React", "Node.js", "Bootstrap"]
        },
        {
            category: "Database",
            icon: "🗄️",
            items: ["MySQL", "SQLite", "MongoDB", "Database Design"]
        },
        {
            category: "Tools & Technologies",
            icon: "🛠️",
            items: ["Git & GitHub", "VS Code", "Postman", "Figma", "Linux"]
        },
        {
            category: "Software Engineering",
            icon: "⚙️",
            items: ["Object-Oriented Programming", "Data Structures", "Algorithms", "System Design", "Agile Methodology"]
        }
    ],

    projects: [
        {
            icon: "📱",
            title: "HabitMate - Habit & Routine Tracker",
            description: "A beautiful and intuitive habit & routine tracker app built with Flutter for Android and iOS. Features habit creation with custom icons and colors, daily checklist tracking, streak monitoring, progress analytics with charts, smart reminders, and local data storage. Built with Material 3 design principles for a modern, clean user experience. Currently working on this project.",
            technologies: ["Flutter", "Dart", "SQLite", "Local Notifications", "Charts"],
            featured: true,
            status: "in-progress",
            year: "2025",
            category: "Mobile Application",
            screenshot: "",
            liveDemo: "",
            videoDemo: "",
            caseStudy: "",
            features: ["Habit Creation & Customization", "Daily Checklist Tracking", "Streak Tracking", "Progress Analytics & Charts", "Smart Reminders", "Local Storage", "Material 3 UI"],
            githubLink: "https://github.com/nerick2003/HabitMate",
            link: "https://github.com/nerick2003/HabitMate",
            linkText: "View Repository"
        },
        {
            icon: "🛒",
            title: "SHOENIVERSE - E-Commerce Website",
            description: "A responsive e-commerce platform with shopping cart functionality, product catalog, and user dashboard. Built using HTML and CSS.",
            technologies: ["HTML", "CSS"],
            featured: true,
            status: "completed",
            year: "2025",
            category: "Full-Stack",
            screenshot: "",
            liveDemo: "",
            videoDemo: "",
            caseStudy: "",
            features: ["Shopping Cart", "Product Catalog", "User Dashboard", "Payment Integration"],
            githubLink: "https://github.com/nerick2003/SHOENIVERSE.git",
            link: "https://github.com/nerick2003/SHOENIVERSE.git",
            linkText: "View Repository"
        },
        {
            icon: "📊",
            title: "Library Management System",
            description: "A desktop application for managing library operations including book cataloging, member management, and loan tracking. Developed using Java with Swing GUI and MySQL database.",
            technologies: ["Java", "Swing", "MySQL"],
            screenshot: "",
            liveDemo: "",
            videoDemo: "",
            caseStudy: "",
            features: ["Book Cataloging", "Member Management", "Loan Tracking", "Search & Filter"],
            githubLink: "", // Private project - no public repository
            link: "",
            linkText: "View Demo"
        },
        {
            icon: "🌐",
            title: "Personal Portfolio Website ⭐ (This Portfolio)",
            description: "A responsive portfolio website showcasing my projects and skills. Built with modern web technologies including HTML5, CSS3, and JavaScript with smooth animations and interactive elements. This is the current portfolio you are viewing right now.",
            technologies: ["HTML", "CSS", "JavaScript"],
            featured: true,
            status: "completed",
            year: "2025",
            category: "Frontend",
            screenshot: "",
            liveDemo: "",
            videoDemo: "",
            caseStudy: "",
            features: ["Responsive Design", "Smooth Animations", "Interactive Elements", "Modern UI/UX", "Dynamic Content Loading", "Project Showcase"],
            githubLink: "https://github.com/nerick2003", // Portfolio repository - update with actual repo if available
            link: "",
            linkText: "View Live"
        },
        {
            icon: "📊",
            title: "TECHFIX - Accounting System",
            description: "A comprehensive desktop accounting practice application with complete accounting cycle implementation. Features double-entry bookkeeping, financial statement generation (Income Statement, Balance Sheet, Cash Flow), document management, and export capabilities. Built with Python, Tkinter GUI, and SQLite database.",
            technologies: ["Python", "Tkinter", "SQLite", "Pillow", "OpenCV"],
            featured: true,
            status: "completed",
            year: "2025",
            category: "Desktop Application",
            screenshot: "",
            liveDemo: "",
            videoDemo: "",
            caseStudy: "",
            features: ["Complete Accounting Cycle (10 Steps)", "Double-Entry Bookkeeping", "Financial Statements", "Document Scanning & Management", "Data Export (Excel, CSV, PDF)", "User Authentication", "Backup & Restore"],
            githubLink: "https://github.com/nerick2003/TECHFIX.git",
            link: "https://github.com/nerick2003/TECHFIX.git",
            linkText: "View Repository"
        },
        {
            icon: "🏪",
            title: "PROJECT-NEXUS - POS & Inventory System",
            description: "A comprehensive Point of Sale (POS) and inventory management system for businesses. Features include sales transactions, inventory tracking, product management, and sales reporting. Built with Python for efficient business operations.",
            technologies: ["Python", "Database", "GUI"],
            featured: true,
            status: "completed",
            year: "2025",
            category: "Desktop Application",
            screenshot: "",
            liveDemo: "",
            videoDemo: "",
            caseStudy: "",
            features: ["Point of Sale Transactions", "Inventory Management", "Product Catalog", "Sales Reporting", "Stock Tracking"],
            githubLink: "https://github.com/nerick2003/PROJECT-NEXUS.git",
            link: "https://github.com/nerick2003/PROJECT-NEXUS.git",
            linkText: "View Repository"
        }
    ],

    achievements: [
        {
            icon: "🏆",
            title: "Dean's List",
            description: "Recognized for academic excellence in the 1st Year of BSIT program",
            date: "2023-2024"
        },
        {
            icon: "📜",
            title: "Introduction to Web Development",
            description: "Completed online course covering HTML, CSS, and JavaScript fundamentals",
            date: "2024"
        },
        {
            icon: "🎓",
            title: "Database Management Systems",
            description: "Completed course on database design, SQL, and data modeling",
            date: "2024"
        },
        {
            icon: "💻",
            title: "Programming Competition Participant",
            description: "Participated in university-level programming competition",
            date: "2024"
        },
        {
            icon: "🔧",
            title: "Git & GitHub Fundamentals",
            description: "Completed certification on version control and collaborative development",
            date: "2024"
        },
        {
            icon: "🌐",
            title: "Responsive Web Design",
            description: "Completed course on creating mobile-friendly and responsive websites",
            date: "2024"
        }
    ],

    statistics: [
        {
            icon: "📁",
            label: "Projects Completed",
            value: 6,
            suffix: "+"
        },
        {
            icon: "💻",
            label: "Technologies Mastered",
            value: 20,
            suffix: "+"
        },
        {
            icon: "🏆",
            label: "Achievements",
            value: 6,
            suffix: "+"
        },
        {
            icon: "📚",
            label: "Years of Learning",
            value: 2,
            suffix: "+"
        }
    ],

    contact: {
        email: "macapayag.nerick6@gmail.com",
        linkedin: "linkedin.com/in/nerick-macapayag", // TODO: Update with your actual LinkedIn profile URL
        github: "github.com/nerick2003",
        facebook: "facebook.com/nerick69",
        location: "Villanueva, Misamis Oriental, Mindanao, Philippines",
        locationLink: "https://maps.app.goo.gl/y45QA5MWhYUrD5zm6",
        cvPath: "resume/Nerick_Resume.pdf" // Path to your CV/Resume file (PDF recommended)
    }
};
