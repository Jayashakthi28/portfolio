import { getGitHubPortfolioData } from "./github";
import { config } from "./config";

const techIcons: Record<string, string> = {
  // Frontend
  React: "https://cdn.simpleicons.org/react/ff6b35",
  "Next.js": "https://cdn.simpleicons.org/nextdotjs/000000",
  TypeScript: "https://cdn.simpleicons.org/typescript/3178c6",
  "Tailwind CSS": "https://cdn.simpleicons.org/tailwindcss/06b6d4",
  "Framer Motion": "https://cdn.simpleicons.org/framer/0055ff",
  Vue: "https://cdn.simpleicons.org/vuedotjs/42b883",
  Svelte: "https://cdn.simpleicons.org/svelte/ff3e00",
  Angular: "https://cdn.simpleicons.org/angular/dd0031",
  "Next Js": "https://cdn.simpleicons.org/nextdotjs/000000",
  Gatsby: "https://cdn.simpleicons.org/gatsby/663399",
  Redux: "https://cdn.simpleicons.org/redux/764abc",
  Webpack: "https://cdn.simpleicons.org/webpack/8dd6f9",
  Vite: "https://cdn.simpleicons.org/vite/646cff",
  "React.js": "https://cdn.simpleicons.org/react/61dafb",

  // Backend
  "Node.js": "https://cdn.simpleicons.org/nodedotjs/339933",
  Express: "https://cdn.simpleicons.org/express/000000",
  Django: "https://cdn.simpleicons.org/django/092e20",
  Flask: "https://cdn.simpleicons.org/flask/000000",
  FastAPI: "https://cdn.simpleicons.org/fastapi/009688",
  "Spring Boot": "https://cdn.simpleicons.org/springboot/6db33f",
  Laravel: "https://cdn.simpleicons.org/laravel/ff2d20",
  "ASP.NET": "https://cdn.simpleicons.org/dotnet/512bd4",
  Rails: "https://cdn.simpleicons.org/rubyonrails/cc0000",

  // Database
  PostgreSQL: "https://cdn.simpleicons.org/postgresql/336791",
  MongoDB: "https://cdn.simpleicons.org/mongodb/13aa52",
  MySQL: "https://cdn.simpleicons.org/mysql/4479a1",
  Redis: "https://cdn.simpleicons.org/redis/dc382d",
  Firebase: "https://cdn.simpleicons.org/firebase/ffa726",
  SQLite: "https://cdn.simpleicons.org/sqlite/003b57",
  Cassandra: "https://cdn.simpleicons.org/apachecassandra/1287b1",
  DynamoDB: "https://cdn.simpleicons.org/amazondynamodb/4053d6",
  Elasticsearch: "https://cdn.simpleicons.org/elasticsearch/005571",

  // Mobile
  "React Native": "https://cdn.simpleicons.org/react/61dafb",
  Flutter: "https://cdn.simpleicons.org/flutter/02569b",
  Swift: "https://cdn.simpleicons.org/swift/fa7343",
  Kotlin: "https://cdn.simpleicons.org/kotlin/7f52ff",
  "Objective-C": "https://cdn.simpleicons.org/apple/000000",
  Ionic: "https://cdn.simpleicons.org/ionic/3880ff",

  // DevOps & Cloud
  Docker: "https://cdn.simpleicons.org/docker/2496ed",
  Kubernetes: "https://cdn.simpleicons.org/kubernetes/326ce5",
  AWS: "https://cdn.iconscout.com/icon/free/png-256/free-amazon-aws-icon-svg-download-png-2944772.png?f=webp",
  GCP: "https://cdn.simpleicons.org/googlecloud/4285f4",
  Azure: "https://cdn.simpleicons.org/microsoftazure/0078d4",
  Terraform: "https://cdn.simpleicons.org/terraform/7b42bc",
  Jenkins: "https://cdn.simpleicons.org/jenkins/d24939",
  "GitHub Actions": "https://cdn.simpleicons.org/githubactions/2088ff",
  Vercel: "https://cdn.simpleicons.org/vercel/000000",
  Netlify: "https://cdn.simpleicons.org/netlify/00c7b7",
  Heroku: "https://cdn.simpleicons.org/heroku/430098",

  // Languages & Testing
  JavaScript: "https://cdn.simpleicons.org/javascript/f7df1e",
  Python: "https://cdn.simpleicons.org/python/3776ab",
  SQL: "https://cdn.simpleicons.org/sqlite/003b57",
  Go: "https://cdn.simpleicons.org/go/00add8",
  Java: "https://cdn-icons-png.flaticon.com/512/226/226777.png",
  Rust: "https://cdn.simpleicons.org/rust/000000",
  PHP: "https://cdn.simpleicons.org/php/777bb4",
  Ruby: "https://cdn.simpleicons.org/ruby/cc342d",
  "C++": "https://cdn.simpleicons.org/cplusplus/00599c",
  C: "https://cdn.simpleicons.org/c/a8b9cc",
  "C#": "https://cdn.simpleicons.org/csharp/239120",
  HTML: "https://cdn.simpleicons.org/html5/e34f26",
  CSS: "https://cdn.iconscout.com/icon/free/png-256/free-css3-icon-svg-download-png-1175238.png",
  Dart: "https://cdn.simpleicons.org/dart/0175c2",
  Shell: "https://cdn.simpleicons.org/gnubash/4eaa25",
  Dockerfile: "https://cdn.simpleicons.org/docker/2496ed",
  Elixir: "https://cdn.simpleicons.org/elixir/4b275f",
  Scala: "https://cdn.simpleicons.org/scala/dc322f",
  Jest: "https://cdn.simpleicons.org/jest/c21325",
  Selenium: "https://cdn.simpleicons.org/selenium/43b02a",
  JUnit: "https://cdn.simpleicons.org/junit5/25a162",
  "Fast API": "https://cdn.simpleicons.org/fastapi/009688",
  Maplibre: "https://cdn.simpleicons.org/maplibre/396CB2",
  Apache2: "https://cdn.simpleicons.org/apache/d22128",
  LangChain: "https://cdn.simpleicons.org/chainlink/375bd2",
  Langgraph: "https://cdn.simpleicons.org/graphql/e10098",
};

// Static data that won't be fetched from GitHub
const staticData = {
  // Work experience
  experience: [
    {
      id: 1,
      company: "ThoughtWorks",
      position: "Application Developer",
      duration: "January 2024 - Present",
      description:
        "Developed automated systems managing 1000+ employees, built CLI tools reducing setup time from hours to minutes, and owned full-stack features using React.js, Java Spring Boot, and PostgreSQL. Recognized as Best-Performing Developer for delivering innovative solutions.",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEtpYCVsh6bVabM8GuRm3CymjVDl2yp83jbQ&s",
      website: "https://www.thoughtworks.com",
    },
    {
      id: 2,
      company: "Saama Technologies",
      position: "Full Stack Developer",
      duration: "January 2023 - December 2023",
      description:
        "Developed core features using React.js and Spring Boot, contributed to backend services with Python, and built open-source AI model infrastructure. Created full-stack website with Next.js, MongoDB, and automated CI/CD with GitHub Actions.",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu2BxdfJCQP1WPDr2_yNgHi6S9mMys3laTNw&s",
      website: "https://www.saama.com",
    },
    {
      id: 3,
      company: "United Bleachers",
      position: "Full Stack Developer (Freelance)",
      duration: "2022 - Present",
      description:
        "Designed and developed a management app used by 200+ employees for stock management, product tracking, and report generation. Built with React, Node.js, SQL, and deployed on AWS EC2 with advanced PDF rendering capabilities. Currently providing full-time support and maintenance for the application.",
      logo: "",
    },
  ],

  education: [
    {
      id: 1,
      school: "Kumaraguru College of Technology",
      degree: "Bachelor of Technology in Information Technology",
      year: "2019 - 2023",
      description:
        "CGPA: 9.23/10.0 - Specialized in software development, algorithms, and full-stack technologies",
    },
    {
      id: 2,
      school: "Bharathi Vidya Bhavan, Erode",
      degree: "Higher Secondary Education",
      year: "2019",
      description: "Higher Secondary: 91% | High School: 96.8%",
    },
  ],

  achievements: [
    "Best-Performing Developer at ThoughtWorks",
    "Built automated systems managing 1000+ employees",
    "Developed management app used by 200+ employees daily",
    "Contributed to open-source AI models and datasets",
  ],

  certifications: [
    {
      id: 1,
      name: "Hack The Box - Linux Fundamentals",
      issuer: "Hack The Box",
      date: "2023",
    },
    {
      id: 2,
      name: "Operating Systems and You",
      issuer: "Coursera",
      date: "2023",
    },
    {
      id: 3,
      name: "Using Python to Interact with the OS",
      issuer: "Coursera",
      date: "2023",
    },
    {
      id: 4,
      name: "Introduction to Machine Learning",
      issuer: "Coursera",
      date: "2023",
    },
    {
      id: 5,
      name: "MongoDB Basics",
      issuer: "MongoDB University",
      date: "2023",
    },
  ],

  services: [
    {
      id: 1,
      title: "Full Stack Web Development",
      description:
        "Building scalable web applications with modern frameworks like React, Next.js, and Node.js",
      icon: "web",
    },
    {
      id: 2,
      title: "Mobile App Development",
      description:
        "Creating cross-platform mobile apps with React Native for iOS and Android",
      icon: "mobile",
    },
    {
      id: 3,
      title: "API Development",
      description:
        "Designing and implementing RESTful APIs with Spring Boot, Flask, and FastAPI",
      icon: "api",
    },
    {
      id: 4,
      title: "Database Design",
      description:
        "Architecting efficient database solutions using MongoDB, PostgreSQL, and SQL",
      icon: "database",
    },
    {
      id: 5,
      title: "App Deployment",
      description:
        "Setting up CI/CD pipelines, AWS infrastructure, and containerization with Docker",
      icon: "devops",
    },
    {
      id: 6,
      title: "Teaching & Mentoring",
      description:
        "Guiding aspiring developers through coding concepts and best practices",
      icon: "teaching",
    },
  ],

  testimonials: [
    {
      id: 1,
      name: "Ankit Pal",
      role: "Principal Research Engineer",
      company: "Saama Technologies",
      image:
        "https://ui-avatars.com/api/?name=Ankit+Pal&background=ff6b35&color=fff",
      text: `I had the pleasure of collaborating with Jayashakthi Vishnu during his internship. His passion and resourcefulness shine through in every project, delivering websites exactly as requested. Notably, he introduced innovative solutions, such as seamlessly moving data to a database upon code contribution to a repository using a bot. Jayashakthi's expertise in both front-end and back-end development makes him a valuable asset for any team.What sets him apart is not just his skill, but his youthful energy and undeniable talent. Jayashakthi is a rising star, poised to achieve remarkable milestones. Don't miss the chance to work with this exceptional talent. I wholeheartedly recommend Jayashakthi for his dedication and prowess in creating outstanding digital solutions.`,
    }
  ],
};

/**
 * Get complete portfolio data
 * Only fetches projects from GitHub, everything else is manual
 */
async function getPortfolioData() {
  // Only fetch GitHub projects if enabled
  let githubProjects: any[] = [];

  if (config.github.fetchProjects) {
    try {
      const githubData = await getGitHubPortfolioData(
        config.github.username,
        config.github.usePinnedRepos,
        config.githubToken,
        config.github.featuredReposCount
      );
      githubProjects = githubData.projects;
    } catch (error) {
      console.error("Error fetching GitHub projects:", error);
      githubProjects = [];
    }
  }

  // Use manual personal info (no GitHub profile data)
  const name = config.personal.name;
  const description = config.personal.description;
  const email = config.personal.email;
  const location = config.personal.location;

  // Build social links from config
  const socialLinks = [
    config.social.github && {
      label: "GitHub",
      url: config.social.github,
      icon: "github",
    },
    config.social.linkedin && {
      label: "LinkedIn",
      url: config.social.linkedin,
      icon: "linkedin",
    },
    config.social.twitter && {
      label: "Twitter",
      url: config.social.twitter,
      icon: "twitter",
    },
    config.social.instagram && {
      label: "Instagram",
      url: config.social.instagram,
      icon: "instagram",
    },
    config.social.leetcode && {
      label: "LeetCode",
      url: config.social.leetcode,
      icon: "leetcode",
    },
  ].filter(Boolean) as Array<{
    label: string;
    url: string;
    icon: "github" | "linkedin" | "twitter" | "instagram" | "leetcode";
  }>;

  // Tech stack based on your resume
  const techStack = {
    frontend: [
      "React.js",
      "Next.js",
      "TypeScript",
      "HTML",
      "CSS",
      "Tailwind CSS",
      "Maplibre",
    ],
    backend: ["Node.js", "Spring Boot", "Flask", "Fast API", "Express"],
    database: ["MongoDB", "PostgreSQL", "SQL"],
    mobile: ["React Native"],
    devops: ["AWS", "Docker", "GitHub Actions"],
    languages: ["JavaScript", "TypeScript", "Python", "Java", "C++"],
  };

  return {
    name,
    titles: config.personal.titles,
    description,
    email,
    location,
    githubUrl: config.social.github,
    socialLinks,

    // Tech stack - always manual
    techStack,

    techIcons,

    // Use static work experience
    experience: staticData.experience,

    // Use GitHub projects if available, otherwise static projects
    projects:
      githubProjects.length > 0
        ? githubProjects
        : [
            {
              id: 1,
              title: "Project Name 1",
              description: "Description of your project",
              image: "https://via.placeholder.com/300x200?text=Project+1",
              githubUrl: "https://github.com",
              liveUrl: "https://example.com",
              tags: ["React", "TypeScript", "Tailwind"],
            },
            {
              id: 2,
              title: "Project Name 2",
              description: "Another cool project",
              image: "https://via.placeholder.com/300x200?text=Project+2",
              githubUrl: "https://github.com",
              liveUrl: "https://example.com",
              tags: ["Next.js", "Node.js", "MongoDB"],
            },
            {
              id: 3,
              title: "Project Name 3",
              description: "Your latest creation",
              image: "https://via.placeholder.com/300x200?text=Project+3",
              githubUrl: "https://github.com",
              liveUrl: "https://example.com",
              tags: ["React", "Express", "PostgreSQL"],
            },
          ],

    education: staticData.education,
    achievements: staticData.achievements,
    certifications: staticData.certifications,
    services: staticData.services,
    testimonials: staticData.testimonials,
  };
}

// Export the data fetching function
export async function getPortfolioDataAsync() {
  return await getPortfolioData();
}

// For client components that need the data, export a fallback
export const portfolioData = {
  name: config.personal.name,
  titles: config.personal.titles,
  description: config.personal.description,
  email: config.personal.email,
  location: config.personal.location,
  githubUrl: config.social.github,
  socialLinks: [
    config.social.github && {
      label: "GitHub",
      url: config.social.github,
      icon: "github",
    },
    config.social.linkedin && {
      label: "LinkedIn",
      url: config.social.linkedin,
      icon: "linkedin",
    },
    config.social.twitter && {
      label: "Twitter",
      url: config.social.twitter,
      icon: "twitter",
    },
    config.social.instagram && {
      label: "Instagram",
      url: config.social.instagram,
      icon: "instagram",
    },
    config.social.leetcode && {
      label: "LeetCode",
      url: config.social.leetcode,
      icon: "leetcode",
    },
  ].filter(Boolean) as Array<{ label: string; url: string; icon: string }>,

  techStack: {
    frontend: [
      "React.js",
      "Next.js",
      "TypeScript",
      "HTML",
      "CSS",
      "Tailwind CSS",
      "Maplibre",
    ],
    backend: ["Node.js", "Spring Boot", "Flask", "Fast API", "Express"],
    database: ["MongoDB", "PostgreSQL", "SQL"],
    mobile: ["React Native"],
    devops: ["AWS", "Docker", "Nginx", "Apache2", "GitHub Actions"],
    languages: ["JavaScript", "TypeScript", "Python", "Java", "C++"],
  },

  techIcons,

  experience: staticData.experience,

  projects: [
    {
      id: 1,
      title: "Project Name 1",
      description: "Description of your project",
      image: "https://via.placeholder.com/300x200?text=Project+1",
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
      tags: ["React", "TypeScript", "Tailwind"],
    },
    {
      id: 2,
      title: "Project Name 2",
      description: "Another cool project",
      image: "https://via.placeholder.com/300x200?text=Project+2",
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
      tags: ["Next.js", "Node.js", "MongoDB"],
    },
    {
      id: 3,
      title: "Project Name 3",
      description: "Your latest creation",
      image: "https://via.placeholder.com/300x200?text=Project+3",
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
      tags: ["React", "Express", "PostgreSQL"],
    },
  ],

  education: staticData.education,
  achievements: staticData.achievements,
  certifications: staticData.certifications,
  services: staticData.services,
  testimonials: staticData.testimonials,
};
