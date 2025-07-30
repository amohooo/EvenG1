/**
 * Personal Knowledge Base for RAG Implementation
 */

export interface KnowledgeEntry {
  id: string;
  content: string;
  keywords: string[];
  category: string;
}

// Your personal knowledge base - customize this with your information
export const personalKnowledgeBase: KnowledgeEntry[] = [
  {
    id: "about-me",
    content: "I'm a driven IT graduate from Queensland University of Technology with a GPA of 6.188/7.0 and two Dean's Scholar Awards (2023 & 2024). I'm experienced in full-stack development, AI/ML, and embedded systems with a passion for building scalable, accessible, and innovative technology solutions.",
    keywords: ["who are you", "about yourself", "tell me about you", "your background", "developer", "graduate", "education"],
    category: "personal"
  },
  {
    id: "education",
    content: "Bachelor of Information Technology from Queensland University of Technology (QUT), completed July 2025 with GPA 6.188/7.0 (With Distinction). Major in Computer Science with Minor in Intelligent Systems. Also completed Diploma of Software Development at TAFE Queensland (2021-2022) focusing on Java, C#, Azure Web Apps, and Unity Game Development.",
    keywords: ["education", "university", "QUT", "degree", "bachelor", "diploma", "computer science", "academic", "GPA"],
    category: "education"
  },
  {
    id: "technical-skills",
    content: "Programming Languages: Java, Python, C/C++, HTML, CSS, JavaScript, TypeScript, C#. Frameworks: Node.js, Express.js, React, Flask, Bootstrap, PyTorch, TensorFlow, JavaFX. Databases: MySQL, Redis, Azure SQL, SQLite. Tools: Git/GitHub, Linux, Visual Studio, VS Code, MATLAB. Practices: MVC, REST APIs, Agile Scrum, Test-Driven Development, CI/CD.",
    keywords: ["skills", "technologies", "programming languages", "expertise", "tech stack", "frameworks", "databases", "tools", "java", "python", "javascript", "react", "node"],
    category: "skills"
  },
  {
    id: "experience",
    content: "Currently working as Amazon Associate at Amazon Fulfilment Centre Brisbane (2021-Now) - consistently achieved top 5% accuracy ranking in fast-paced environment. Previously Store Manager/Owner at Chery Shop (2014-2021) where I managed inventory, sales, staffing, and reduced monthly reconciliation time by 60% through automation.",
    keywords: ["experience", "work history", "amazon", "store manager", "professional experience", "job", "career"],
    category: "experience"
  },
  {
    id: "leadership-achievements",
    content: "Dean's Scholar Awards in 2023 and 2024. Led multiple 4-person development teams mentoring peers on Git workflow and full-stack development. Presented transfer learning research achieving High Distinction. QUT Executive Dean's Commendations for Academic Excellence in both 2023 and 2024.",
    keywords: ["leadership", "achievements", "awards", "dean scholar", "team lead", "mentor", "research", "high distinction", "academic excellence"],
    category: "achievements"
  },
  {
    id: "current-projects",
    content: "Currently working on an AI voice assistant for MentraOS smart glasses integrating OpenAI GPT models, featuring voice recognition, auto-scrolling text display, intelligent question processing, and RAG (Retrieval-Augmented Generation) for personalized responses.",
    keywords: ["projects", "current project", "AI", "voice assistant", "smart glasses", "MentraOS", "OpenAI", "GPT", "RAG", "machine learning"],
    category: "projects"
  },
  {
    id: "web-development-projects",
    content: "Led EnviroFish Non-Profit website redevelopment using Node.js, Express.js, React, MySQL, and Stripe. Team lead for 4-person development team implementing CMS, admin dashboard, WCAG 2.0 compliance. Also developed Flask event management application with SQLAlchemy, role-based authentication, and Azure cloud deployments with C#.",
    keywords: ["web development", "envirofish", "node.js", "react", "flask", "full stack", "team lead", "mysql", "azure", "cms"],
    category: "projects"
  },
  {
    id: "ai-ml-projects",
    content: "Extensive AI/ML portfolio including: Sokoban puzzle solver with A* algorithms, flower image classifier using MobileNetV2 transfer learning (87% accuracy), land cover classification with spectral data, socio-economic crime prediction models, Oxford-IIIT pets classification, Caltech-256 triplet learning, and deep learning with CNNs achieving 0.87 F1-score.",
    keywords: ["AI", "machine learning", "deep learning", "CNN", "transfer learning", "classification", "regression", "sokoban", "tensorflow", "pytorch"],
    category: "projects"
  },
  {
    id: "software-engineering-projects",
    content: "Developed Mindful Browser desktop application in JavaFX with MySQL for healthy internet habits tracking. Built building access simulator in C with TCP/UDP socket communication, 95% test coverage. Created algorithm complexity analyzer in C# with performance benchmarking and visualization.",
    keywords: ["software engineering", "java", "javafx", "desktop application", "C programming", "socket programming", "algorithm analysis", "performance"],
    category: "projects"
  },
  {
    id: "robotics-projects",
    content: "Pick-and-place robotics system using Python, CoppeliaSim, and Machine Vision Toolbox. Implemented object detection, homography transformation, inverse kinematics for 3DoF robot arm with 5mm precision. SoC development with QUTy platform creating Simon game with embedded systems programming.",
    keywords: ["robotics", "computer vision", "python", "embedded systems", "kinematics", "object detection", "automation", "SoC", "machine vision"],
    category: "projects"
  },
  {
    id: "leadership-stories",
    content: "Led EnviroFish team through 23,000-line legacy codebase challenge - reverse-engineered architecture, documented environment setup, helped struggling teammates get onboarded within 2 days. Managed mid-project client requirement changes, adapting login system and editing logic without delays. Organized capstone team from unclear brief to top-performing submission.",
    keywords: ["leadership", "team management", "problem solving", "client management", "project management", "mentoring", "challenging projects"],
    category: "leadership"
  },
  {
    id: "technical-problem-solving",
    content: "Solved critical Redis-MySQL sync bug under pressure during late-night deployment - debugged content preview feature, rewrote caching logic, fixed within 1 hour before client demo. Helped teammates troubleshoot development environment issues with comprehensive guides and one-on-one support.",
    keywords: ["problem solving", "debugging", "technical challenges", "under pressure", "redis", "mysql", "troubleshooting", "performance optimization"],
    category: "problem-solving"
  },
  {
    id: "adaptability-stories",
    content: "Successfully adapted to mid-project client requirement changes in EnviroFish - redesigned authentication system from centralized dashboard to inline page editing, restructured login routing, maintained security while improving UX. Client praised responsiveness and flexibility.",
    keywords: ["adaptability", "change management", "client requirements", "flexibility", "authentication", "UX improvement", "requirement changes"],
    category: "adaptability"
  },
  {
    id: "career-goals",
    content: "Seeking to contribute as a software engineer, data scientist, AI/ML engineer, or full-stack developer in a forward-thinking organization. Passionate about building scalable, accessible, and innovative technology solutions with expertise in web development, artificial intelligence, and embedded systems.",
    keywords: ["goals", "career goals", "software engineer", "data scientist", "AI engineer", "full stack developer", "aspirations", "future plans"],
    category: "goals"
  },
  {
    id: "specializations",
    content: "Specialized in full-stack web development (React, Node.js, Flask), AI/ML with PyTorch and TensorFlow, embedded systems, and Agile team leadership. Experienced with cloud platforms, database design, and modern development practices including CI/CD and test-driven development.",
    keywords: ["specialization", "full stack", "AI", "ML", "machine learning", "web development", "embedded systems", "agile", "cloud", "specialties"],
    category: "skills"
  },
  {
    id: "value-proposition",
    content: "I bring immediate value through proven full-stack development skills, AI/ML expertise, and strong leadership experience. Delivered 15+ successful projects with 100% client satisfaction rate. My combination of technical depth (6.188 GPA, Dean's Scholar Awards) and practical leadership (led multiple 4-person teams) enables me to contribute from day one while mentoring junior developers and driving technical innovation.",
    keywords: ["why hire you", "value proposition", "hire me", "what can you bring", "immediate value", "contribution", "why should we"],
    category: "value"
  },
  {
    id: "unique-strengths",
    content: "Unique combination of academic excellence and real-world application: top 5% performance at Amazon, successful client projects, and research achieving High Distinction. I excel at reverse-engineering complex systems (23,000-line legacy codebases), mentoring teammates to productivity within days, and adapting to changing requirements without delays. My AI/ML skills (87% accuracy projects) combined with full-stack development make me valuable for modern tech challenges.",
    keywords: ["unique strengths", "what makes you different", "competitive advantage", "standout qualities", "differentiation"],
    category: "value"
  },
  {
    id: "cultural-fit",
    content: "I thrive in collaborative environments and believe in knowledge sharing - evidenced by my mentoring success and comprehensive documentation practices. My experience managing changing client requirements and working under pressure shows adaptability and resilience. I'm passionate about continuous learning (evident from my diverse project portfolio) and contributing to team success rather than just individual achievement.",
    keywords: ["cultural fit", "team player", "collaboration", "work style", "company culture", "team dynamics"],
    category: "culture"
  },
  {
    id: "growth-mindset",
    content: "Demonstrated rapid learning ability across multiple domains - from legacy system reverse-engineering to cutting-edge AI/ML implementations. My consistent academic excellence (Dean's Scholar Awards 2 years running) and diverse project portfolio show I can quickly adapt to new technologies and methodologies. I actively seek challenging projects and see setbacks as learning opportunities, as shown in my successful navigation of complex technical problems.",
    keywords: ["learning", "growth mindset", "adaptability", "continuous improvement", "development", "potential"],
    category: "growth"
  },
  {
    id: "business-impact",
    content: "Track record of delivering measurable business value: reduced reconciliation time by 60% through automation, achieved top 5% accuracy ranking at Amazon, led projects with 100% client approval rates. My technical solutions directly impact efficiency and user satisfaction. Strong understanding of balancing technical excellence with business requirements, evidenced by successful client requirement adaptations and deadline management.",
    keywords: ["business impact", "measurable results", "efficiency", "business value", "ROI", "performance metrics"],
    category: "impact"
  },
  {
    id: "work-study-balance",
    content: "During my final year at university, I successfully balanced full-time work at Amazon (inventory management, logistics coordination, team operations) with completing a full-time Bachelor of IT including capstone projects and machine learning assignments. I developed a strict time management routine using daily planners, studied during lunch breaks and commutes, took leadership in group projects for early organization, and negotiated shift preferences during critical academic periods. Result: graduated with GPA 6.188 while maintaining top performance at work, learning discipline and resilience in managing competing priorities.",
    keywords: ["challenging situation", "work study balance", "time management", "full time work", "university", "pressure", "discipline", "competing priorities", "amazon", "final year"],
    category: "leadership"
  },
  {
    id: "team-collaboration",
    content: "I handle team conflicts through consensus-building, but when needed, defer to the person with most experience in the specific area. As project manager, I mediate discussions focusing on project goals and timelines while ensuring all voices are heard. I helped struggling teammates in EnviroFish by creating setup guides, running one-on-one sessions, and sharing pre-configured environments - getting them productive within 2 days. I believe in proactive support and knowledge sharing.",
    keywords: ["team conflicts", "team collaboration", "helping teammates", "consensus building", "project management", "mediation", "knowledge sharing", "team dynamics"],
    category: "leadership"
  },
  {
    id: "learning-approach",
    content: "I approach learning new technologies by starting with official documentation and tutorials, then building small prototypes for hands-on experience. When transitioning from JavaFX to React + Node.js, I created a full-stack project to practice REST APIs, state management, and deployment. I combine learning with real tasks like integrating Stripe or Humanitix APIs in projects, which helps me learn under realistic constraints and deadlines.",
    keywords: ["learning new technologies", "approach to learning", "documentation", "hands-on experience", "prototypes", "realistic constraints"],
    category: "growth"
  },
  {
    id: "version-control-experience",
    content: "Extensive experience with Git and GitHub including branching strategies, merge conflict resolution, and collaborative workflows. Use Trello for project management to track user stories and tasks, Discord for team communication and screen sharing. I handle meeting minutes, updates, and ensure tasks align with sprint goals. Practiced in Agile methodologies and maintaining clear documentation for team coordination.",
    keywords: ["version control", "git", "github", "project management", "trello", "agile", "team coordination", "documentation"],
    category: "skills"
  }
];

/**
 * Simple text similarity scoring using keyword matching
 */
function calculateSimilarity(query: string, entry: KnowledgeEntry): number {
  const queryLower = query.toLowerCase();
  let score = 0;
  
  // Check for exact keyword matches
  for (const keyword of entry.keywords) {
    if (queryLower.includes(keyword.toLowerCase())) {
      score += 10; // High weight for exact matches
    }
  }
  
  // Check for partial keyword matches
  const queryWords = queryLower.split(/\s+/);
  for (const keyword of entry.keywords) {
    const keywordWords = keyword.toLowerCase().split(/\s+/);
    for (const qWord of queryWords) {
      for (const kWord of keywordWords) {
        if (qWord.includes(kWord) || kWord.includes(qWord)) {
          score += 2; // Lower weight for partial matches
        }
      }
    }
  }
  
  return score;
}

/**
 * Retrieve relevant knowledge entries for a query
 */
export function retrieveKnowledge(query: string, maxResults: number = 3): KnowledgeEntry[] {
  const scoredEntries = personalKnowledgeBase.map(entry => ({
    entry,
    score: calculateSimilarity(query, entry)
  }));
  
  // Sort by score and return top results
  return scoredEntries
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults)
    .map(item => item.entry);
}

/**
 * Check if a query is asking about personal information
 */
export function isPersonalQuery(query: string): boolean {
  const personalIndicators = [
    "you", "your", "yourself", "who are you", "about you",
    "tell me about", "what do you", "your background",
    "your experience", "your skills", "your projects",
    "your interests", "your goals", "what are you working on"
  ];
  
  const queryLower = query.toLowerCase();
  return personalIndicators.some(indicator => queryLower.includes(indicator));
}

/**
 * Generate a RAG response using retrieved knowledge
 */
export function generateRAGResponse(query: string, relevantEntries: KnowledgeEntry[]): string {
  if (relevantEntries.length === 0) {
    return "I don't have specific information about that aspect of myself. Feel free to ask about my projects, skills, or interests!";
  }
  
  // Combine relevant knowledge
  const combinedKnowledge = relevantEntries
    .map(entry => entry.content)
    .join(" ");
  
  // For glasses display, keep it concise
  if (combinedKnowledge.length > 200) {
    return relevantEntries[0].content; // Use the most relevant entry
  }
  
  return combinedKnowledge;
}
