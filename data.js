// Portfolio Data - Edit this file to update content
const portfolioData = {
    experiences: [
        {
            id: "linkedin",
            title: "Systems & Infrastructure SWE Intern",
            company: "LinkedIn",
            date: "Incoming Summer 2026",
            bullets: [],
            tags: [],
            feedback: []
        },
        {
            id: "credera",
            title: "Software Engineer Intern",
            company: "Credera",
            date: "June 2025 - August 2025",
            bullets: [
                "Shipped major updates to an <strong>Electron + Vue</strong> application for <strong>Mercedes-Benz USA</strong> in-store screens across <strong>380+</strong> dealerships; presented and delivered to Mercedes stakeholders and released nationwide.",
                "Developed a dual car builder experience that allows users to configure and compare two vehicles simultaneously.",
                "Proposed and led redesign of image content rendering, reducing <strong>0.5GB</strong> in API calls per home screen load.",
                "Diagnosed and fixed a reported fatal, unreproducible, and inter-process race condition unresolved for <strong>7 months</strong>.",
                "Improved engagement by <strong>50%</strong> (10,000→15,000 monthly interactions), tracked via <strong>Google Analytics</strong> post-release."
            ],
            tags: ["Electron.js", "Vue.js"],
            feedback: [
                {
                    quote: "From day one, you demonstrated a strong commitment to learning... Your ability to independently own features - such as the auto scroll and two-window comparison - was truly impressive... You've made a lasting impression here.",
                    author: "Saba Merchant, Career Coach",
                    modalId: "artifact-letter-modal",
                    linkText: "View full letter"
                },
                {
                    quote: "Preetam has made impressive progress this summer, particularly in developing his client-facing skills... He resolved a persistent 'screen in screen' issue... His contributions have been truly appreciated.",
                    author: "Mia Barone, Project Director",
                    modalId: "artifact-peer-modal",
                    linkText: "View full feedback"
                }
            ]
        },
        {
            id: "bae",
            title: "Software Development Intern",
            company: "BAE Systems",
            date: "May 2024 - Aug 2024",
            bullets: [
                "Engineered an <strong>Apache Arrow Flight</strong> server in <strong>Python</strong> to stream <strong>DuckDB</strong>-queried data over LAN, enabling real-time processing and replay of radio communication for live system simulation and tuning.",
                "Reduced load time <strong>10x</strong> by switching from disk reads to batched in-memory streaming with concurrent preloading.",
                "Created benchmark tool to optimize <strong>Apache Spark</strong> jobs in the data processing pipeline with the Spark job API.",
                "Simulated <strong>1000s</strong> of pipeline executions, decreasing worst-case runtime by <strong>80%</strong> through configuration tuning.",
                "Deployed a <strong>Vue + Go</strong> app to decode <strong>Protobuf</strong> messages with <strong>100+</strong> nested fields pooled via <strong>ZMQ</strong> for monitoring."
            ],
            tags: ["Vue.js", "Go", "Python", "Docker", "Apache Arrow", "Dagster", "Chart.js", "DuckDB", "AWS S3", "Apache Spark"],
            feedback: [
                {
                    quote: "Preetam's performance was more than satisfactory, showing professionalism, dedication, and eagerness to learn... His qualities as a student, his disposition, and interpersonal manners, demonstrated that we made an excellent choice... I unconditionally recommended Preetam.",
                    author: "Dr. Jarilyn Hernandez, Manager",
                    modalId: "bae-artifact-1-modal",
                    linkText: "View recommendation"
                },
                {
                    quote: "Preetam demonstrated exceptional qualities that made him a standout member of the intern cohort. His responsiveness and eagerness to learn... displayed the impressive ability to context switch between different tasks and was able to adapt to new challenges seamlessly while delivering high quality work.",
                    author: "Seth Gillis, Senior Software Engineer",
                    modalId: "bae-artifact-2-modal",
                    linkText: "View recommendation"
                }
            ]
        },
        {
            id: "uga-research",
            title: "Cloud Computing Researcher",
            company: "University of Georgia",
            date: "Aug 2024 - Present",
            bullets: [
                "Designing a cloud platform in <strong>Python</strong> that runs serverless workflows on discounted, volatile AWS servers while maintaining near-perfect reliability, using cost-optimized checkpointing, workload migration, and adaptive scaling.",
                "Simulating unreliable servers on a <strong>20</strong>-node <strong>Kubernetes</strong> cluster with failure intervals based on AWS reclaim data.",
                "Leveraging <strong>MySQL</strong> as a source of truth for checkpoints, logging, and compute time for <strong>1000s</strong> of daily requests.",
                "Reduced cost by <strong>30%+</strong> with dynamic programming-based checkpointing, benchmarked against EC2 pricing data."
            ],
            tags: ["Cloud Computing", "AWS", "Kubernetes", "Python", "Fault Tolerance", "Serverless", "Distributed Systems"],
            feedback: []
        },
        {
            id: "ssrl",
            title: "Flight Software Developer",
            company: "UGA Small Satellite Research Laboratory",
            date: "Feb 2023 - May 2025",
            bullets: [
                "Building reusable components for satellite spaceflight software system using NASA's F' Framework in <strong>C++</strong>.",
                "Utilizing agile methodologies to organize software requirements, implementation, testing, and deployment.",
                "Built EPS UART component that facilitates satellite computer-to-sensor communication through <strong>20</strong> telemetry and event types such as battery temperature and heater status, providing the ground station with critical information.",
                "Used <strong>Google Test Suite</strong> for C++ to ensure <strong>100%</strong> line and function coverage during unit testing."
            ],
            tags: ["C++", "F' (F Prime)", "CMake", "Google Test", "Agile"],
            feedback: []
        },
        {
            id: "deltek",
            title: "Software Quality Assurance Intern",
            company: "Deltek",
            date: "Jun 2023 - Aug 2023",
            bullets: [
                "Crafted automation test scripts for Deltek's GovWin IQ project, a platform for government contract procurement.",
                "Stored scripts in a test suite, enabling test management to automatically validate all Canadian contract pages.",
                "Utilized XPath Helper to extract HTML elements and validated them using an internal TestRunner application."
            ],
            tags: ["QA Automation", "XML/XPath", "HTML", "Test Management"],
            feedback: []
        }
    ],

    projects: [
        {
            id: "dht",
            title: "Distributed Hash Table",
            description: "Decentralized distributed hash table (DHT) using consistent hashing and socket-based coordination, leveraging multiple nodes and fault-tolerant key-value storage with dynamic peer entry and exit.",
            tags: ["Java", "Data Structures", "Algorithms", "Socket Programming"],
            media: { type: "youtube", src: "https://www.youtube.com/embed/T8Ztq7ROCgk" }
        },
        {
            id: "file-transfer",
            title: "Multithreaded File Transfer Server",
            description: "Multithreaded file transfer server/client supporting concurrent file operations, asynchronous command termination, and thread-safe communication over dual ports and multiple clients.",
            tags: ["Java", "Multithreading", "Socket Programming"],
            media: { type: "youtube", src: "https://www.youtube.com/embed/llix9hvZsKE" }
        },
        {
            id: "multicast",
            title: "Multicast Message System",
            description: "Persistent, asynchronous multicast system over TCP ensuring temporal-bound message delivery, replay for disconnected participants, and reliable group coordination through a central server.",
            tags: ["Java", "Socket Programming"],
            media: { type: "youtube", src: "https://www.youtube.com/embed/VfT2X13--vo" }
        },
        {
            id: "ecinema",
            title: "E-Cinema Booking System",
            description: "Full-stack cinema booking system with user profiles, admin tools, and movie management.",
            tags: ["Java", "Spring Boot", "React", "JavaScript", "MySQL", "Azure"],
            media: { type: "vimeo", src: "https://player.vimeo.com/video/896085100?badge=0&autopause=0&player_id=0&app_id=58479" },
            diagram: "resources/artifacts/ecinema_uml.jpg"
        },
        {
            id: "brickbreaker",
            title: "BrickBreaker Game",
            description: "JavaFX implementation featuring multithreading and dynamic ball physics.",
            tags: ["Java", "JavaFX", "Multithreading"],
            media: { type: "gif", src: "resources/gifs/brickbreaker.gif" }
        },
        {
            id: "sql",
            title: "SQL Database Implementation",
            description: "Core SQL functionalities built in Java, with hash table indexing improving query speed by ~10x.",
            tags: ["Java", "Data Structures", "Algorithms", "SQL"],
            media: { type: "gif", src: "resources/gifs/sql.gif" }
        },
        {
            id: "gallery",
            title: "Gallery App",
            description: "JavaFX app displaying images from user search via iTunes API and Gson library.",
            tags: ["Java", "JavaFX", "API Integration", "JSON"],
            media: { type: "gif", src: "resources/gifs/gallery.gif" }
        },
        {
            id: "tree",
            title: "Unix Tree Command",
            description: "C implementation of the `tree` command using custom tree data structures.",
            tags: ["C", "Unix/Linux", "Data Structures", "CLI"],
            media: { type: "gif", src: "resources/gifs/tree.gif" }
        }
    ],

    skills: [
        { id: "java", name: "Java", logo: "resources/images/java_logo.png", description: "Applied Java in diverse projects including a multithreaded file transfer server, BrickBreaker (JavaFX), the E-Cinema booking system backend (Spring Boot), and a distributed hash table implementation." },
        { id: "python", name: "Python", logo: "resources/images/python_logo.png", description: "Developed the BAE Systems Apache Arrow server, created a benchmark tool for Apache Spark optimization (Dagster), used for scripting at UGA SSRL, and contributed to building a FaaS system for cloud research." },
        { id: "cpp", name: "C++", logo: "resources/images/c++_logo.png", description: "Primary language for satellite flight software development (F' framework) at UGA SSRL, focusing on reusable components and testing (GTest); developed parts of the RF monitoring backend at BAE Systems." },
        { id: "js", name: "JavaScript", logo: "resources/images/javascript_logo.webp", description: "Developed frontends for the E-Cinema booking system (React) and BAE Systems RF monitoring app (Vue.js); implemented interactivity for this portfolio (vanilla JS) and other projects." },
        { id: "go", name: "Go", logo: "resources/images/go_logo.png", description: "Developed REST APIs and WebSocket communication for the RF monitoring web application during the BAE Systems internship." },
        { id: "html", name: "HTML", logo: "resources/images/html_logo.png", description: "Utilized as the markup language for structuring content across all web-based projects, including this portfolio and various frontend applications." },
        { id: "css", name: "CSS", logo: "resources/images/CSS3_logo.svg.png", description: "Applied directly and through frameworks like Tailwind CSS (this portfolio) to style web projects." },
        { id: "react", name: "React", logo: "resources/images/react_logo.png", description: "Engineered the frontend UI/UX for the E-Cinema booking system, managing component state, lifecycle, and interactions with the Spring Boot backend API." },
        { id: "vue", name: "Vue.js", logo: "resources/images/vue_logo.png", description: "Built the frontend interface for the real-time RF data monitoring web application at BAE Systems, integrating with WebSockets via a Go backend." },
        { id: "spring", name: "Spring Boot", logo: "resources/images/springboot_logo.png", description: "Implemented backend REST APIs, business logic, and database integration (MySQL) for the E-Cinema booking system and a database course final project." },
        { id: "mysql", name: "MySQL", logo: "resources/images/mysql_logo.png", description: "Designed and managed relational databases for the E-Cinema booking system; utilized for checkpointing/graph storage in cloud computing (FaaS) research." },
        { id: "docker", name: "Docker", logo: "resources/images/docker_logo.png", description: "Leveraged Docker for containerizing applications, managing dependencies, and ensuring consistent development/deployment environments during the BAE Systems internship and cloud computing research." },
        { id: "git", name: "Git", logo: "resources/images/git_logo.png", description: "Employed Git and platforms like GitHub/GitLab for version control, branching strategies, and collaborative development across all significant software projects and internships." },
        { id: "tailwind", name: "Tailwind CSS", logo: "resources/images/Tailwind_CSS_Logo.svg.png", description: "Utilized Tailwind's for the development, styling, and responsiveness of this portfolio website." },
        { id: "fprime", name: "F' (F Prime)", logo: "resources/images/fprime_logo.png", description: "Used NASA's F' framework at the UGA SSRL for developing and testing C++ flight software components according to its specific architecture." },
        { id: "c", name: "C", logo: "resources/images/c_logo.png", description: "Applied C for systems programming coursework and projects, including implementing core Unix utilities (like `tree`) using custom data structures." },
        { id: "mongodb", name: "MongoDB", logo: "resources/images/MongoDB_Logo.svg.png", description: "Utilized MongoDB as the NoSQL database solution for hackathon projects and the backend of a personal financial tracking website." }
    ]
};
