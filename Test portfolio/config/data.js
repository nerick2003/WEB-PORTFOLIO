// Portfolio Data Configuration
// Edit this file to easily update your portfolio content

const portfolioData = {
    // Personal Information
    personalInfo: {
        name: "Nerick Edward J. Macapayag",
        title: "BSIT 2nd Year Student | Web Developer | Software Development & Database Enthusiast",
        description: "Currently pursuing my Bachelor of Science in Information Technology at the University of Science and Technology of Southern Philippines. Passionate about creating innovative solutions through code and eager to learn and grow in the tech industry.",
        university: "University of Science and Technology of Southern Philippines",
        year: "2nd Year",
        location: "Villanueva, Misamis Oriental, Mindanao, Philippines",
        profileImage: "images/pfp.png" // Path to your profile picture
    },

    // Skills Configuration
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

    // Projects Configuration
    // Showcase your projects without showing code by using:
    // - screenshot: Path to project screenshot/demo image (e.g., "images/projects/project1.png")
    // - liveDemo: URL to live demo (e.g., "https://yourproject.com")
    // - videoDemo: URL to video walkthrough (YouTube, Vimeo, etc.)
    // - caseStudy: URL to detailed case study or blog post
    // - features: Array of key features to highlight
    // - githubLink: Optional GitHub link (can be hidden if you don't want to show code)
    projects: [
        {
            icon: "📱",
            title: "Student Management System",
            description: "A web-based application for managing student records, grades, and attendance. Built using HTML, CSS, JavaScript, and MySQL. Features include user authentication, data validation, and report generation.",
            technologies: ["HTML", "CSS", "JavaScript", "MySQL"],
            // Modern showcase features (NEW):
            featured: true, // Mark as featured project
            status: "completed", // Options: "completed", "in-progress", "maintained", "planned"
            year: "2024", // Project completion year
            category: "Full-Stack", // Optional: helps with organization
            // Showcase options (all optional):
            screenshot: "", // e.g., "images/projects/student-management.png"
            liveDemo: "", // e.g., "https://student-management-demo.netlify.app"
            videoDemo: "", // e.g., "https://youtube.com/watch?v=..."
            caseStudy: "", // e.g., "https://yourblog.com/case-study"
            features: ["User Authentication", "Data Validation", "Report Generation", "Responsive Design"],
            githubLink: "#", // Optional: set to "" to hide GitHub link
            link: "#",
            linkText: "View Demo"
        },
        {
            icon: "🛒",
            title: "E-Commerce Website",
            description: "A responsive e-commerce platform with shopping cart functionality, product catalog, and user dashboard. Implemented using React for the frontend and Node.js for the backend API.",
            technologies: ["React", "Node.js", "MongoDB", "CSS"],
            screenshot: "",
            liveDemo: "",
            videoDemo: "",
            caseStudy: "",
            features: ["Shopping Cart", "Product Catalog", "User Dashboard", "Payment Integration"],
            githubLink: "#",
            link: "#",
            linkText: "View Demo"
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
            githubLink: "#",
            link: "#",
            linkText: "View Demo"
        },
        {
            icon: "🌐",
            title: "Personal Portfolio Website",
            description: "A responsive portfolio website showcasing my projects and skills. Built with modern web technologies including HTML5, CSS3, and JavaScript with smooth animations and interactive elements.",
            technologies: ["HTML", "CSS", "JavaScript"],
            screenshot: "",
            liveDemo: "", // This could be the current portfolio URL
            videoDemo: "",
            caseStudy: "",
            features: ["Responsive Design", "Smooth Animations", "Interactive Elements", "Modern UI/UX"],
            githubLink: "#",
            link: "#",
            linkText: "View Live"
        },
        {
            icon: "📝",
            title: "Task Management App",
            description: "A simple yet effective task management application with features like task creation, editing, deletion, and status tracking. Built using Python with a clean command-line interface.",
            technologies: ["Python", "SQLite"],
            screenshot: "",
            liveDemo: "",
            videoDemo: "",
            caseStudy: "",
            features: ["Task CRUD Operations", "Status Tracking", "Priority Management", "Data Persistence"],
            githubLink: "#",
            link: "#",
            linkText: "View Demo"
        },
        {
            icon: "🔐",
            title: "Password Manager",
            description: "A secure password management tool that allows users to store and retrieve passwords with encryption. Features include password generation, secure storage, and master password protection.",
            technologies: ["Python", "Encryption", "SQLite"],
            screenshot: "",
            liveDemo: "",
            videoDemo: "",
            caseStudy: "",
            features: ["Password Encryption", "Secure Storage", "Password Generator", "Master Password"],
            githubLink: "#",
            link: "#",
            linkText: "View Demo"
        }
    ],

    // Achievements Configuration
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

    // Contact Information
    contact: {
        email: "macapayag.nerick6@gmail.com",
        linkedin: "linkedin.com/in/yourprofile",
        github: "github.com/nerick2003",
        facebook: "facebook.com/nerick69",
        location: "Villanueva, Misamis Oriental, Mindanao, Philippines"
    }
};

