export const CONTENT = {
  profile: {
    name: "Ilyas Dahbi",
    role: "Security Research • Offensive Security • Programming",
    intro:
      "I’m interested in offensive security, systems programming, and software internals. I enjoy exploring operating systems, understanding how software works, and experimenting with different technologies.",
    aboutLead:
      "Interested in offensive security, systems programming, and software internals.",
    aboutBody:
      "A Linux enthusiast with an interest in exploring operating systems, understanding how software works, and experimenting with different technologies.",
    aboutNote: "Areas of interest are not claims of professional specialization.",
    interests: [
      "Offensive Security",
      "Penetration Testing",
      "Vulnerability Research",
      "Reverse Engineering",
      "Application Security",
      "Systems & Network Security",
      "Linux & Unix-like Systems",
      "Low-level Programming",
    ],
    languages: ["C / C++", "Python", "Bash", "JavaScript / TypeScript", "SQL", "Rust"],
    frameworks: ["React", "Next.js", "Node.js", "Express.js", "PostgreSQL", "Prisma"],
    background: [
      "Web and API security testing",
      "Source-code analysis",
      "Network communication",
      "Full-stack application development",
      "QA Testing",
      "Scripting and automation",
    ],
  },
  links: {
    github: "https://github.com/Br0kun",
    linkedin: "https://www.linkedin.com/in/ilyass-dahbi-b99b89283/",
    email: "dahbiilyass32@gmail.com",
  },
  projects: [
    {
      id: "SN-P01",
      title: "PFE: Medical Platform",
      badge: "Academic Project",
      category: "Academic / Web",
      year: null,
      status: null,
      repo: "https://github.com/Br0kun/MedLink",
      desc: "A medical platform developed as part of my final-year studies, focused on building software for healthcare-related workflows.",
      tags: [
        "Software Development",
        "Web Application",
        "Academic Project",
        "Next.js",
        "Express",
        "PostgreSQL",
        "Prisma",
        "JWT",
        "bcrypt",
        "Socket.IO",
        "node-cron",
      ],
      detail: {
        overview: "My final-year academic project: a medical platform.",
        context:
          "Developed as part of my final-year studies, focused on building software for healthcare-related workflows.",
        approach:
          "A multi-role platform (patient, doctor, lab, admin) for medical records and lab results. Access control is layered: patient consent, isolation by specialty, scopes and expiry.",
        implementation:
          "Justified ‘break-glass’ emergency access with a real-time alert to the patient and an admin log. JWT authentication, bcrypt hashing, an audit log, and validation of doctor and lab accounts. An hourly cron job escalates urgent results left unread after 24 hours, with real-time alerts and PDF export.",
      },
    },
    {
      id: "SN-P02",
      title: "PFA: Password Manager",
      badge: "Academic Project",
      category: "Academic / Systems",
      year: null,
      status: null,
      repo: "https://github.com/Br0kun/cyphersafe",
      desc: "A password manager developed in C, involving credential management and encryption to protect stored passwords.",
      tags: ["C", "Programming", "Encryption", "Password Management", "Security", "Honeypot"],
      detail: {
        overview: "A password manager developed using C.",
        context:
          "A first-year academic project involving credential management and encryption to protect stored passwords.",
        approach:
          "Built around encryption to protect credentials and data, with authentication, secure handling of local data, and a security alert system.",
        implementation: "Includes a honeypot to detect unauthorized access attempts.",
      },
    },
    {
      id: "https://github.com/Br0kun/world-app-attack-surface",
      title: "World App Security Investigation",
      badge: "Ongoing Investigation",
      category: "Security Research",
      year: null,
      status: "Ongoing",
      repo: "#repo-bedrock",
      desc: "An investigation into URL validation and outbound HTTP request handling in the Bedrock Rust library, exploring a potential SSRF attack surface.",
      tags: ["Application Security", "Rust", "Source Code Analysis", "SSRF Analysis", "Security Research"],
      detail: {
        overview:
          "An independent security investigation involving the World App and the open-source Bedrock Rust library.",
        context:
          "Areas explored: custom_bundler_url, URL validation logic, outbound HTTP requests, Rust source-code analysis, application trust boundaries, and potential SSRF implications.",
        approach:
          "The examined URL validation logic accepts HTTPS destinations pointing to private or loopback addresses.",
        implementation:
          "This is an ongoing investigation, not a confirmed vulnerability. Attacker control has not been established, practical exploitability has not been confirmed, and real-world impact has not been demonstrated.",
      },
    },
    {
      id: "SN-P04",
      title: "Local Hacking Agent",
      badge: "In Progress",
      category: "Security Tooling",
      year: null,
      status: "Ongoing",
      repo: "#repo-agent",
      desc: "A local offensive-security agent for penetration testing and bug bounty tasks.",
      tags: ["Offensive Security", "Penetration Testing", "Bug Bounty"],
      detail: {
        overview:
          "A local agent for offensive security work: penetration testing and bug bounty tasks.",
        context: "Project in progress.",
        approach: null,
        implementation: null,
      },
    },
  ],
  training: [
    {
      id: "SN-T01",
      title: "PentesterLab",
      badge: "Practical Training",
      category: "Training Labs",
      desc: "Hands-on security exercises focused on understanding application behavior, identifying weaknesses, and learning how vulnerabilities work in practice.",
      tags: [
        "Web Application Security",
        "Access Control",
        "Authorization",
        "API Security",
        "Vulnerability Analysis",
      ],
      note: "Training labs, not independent discoveries or real-world reports.",
      exercises: [],
    },
    {
      id: "SN-T02",
      title: "Hack The Box — CPTS",
      badge: "Course Content Completed",
      category: "Course",
      desc: "Completed the HTB CPTS learning material, covering practical penetration-testing concepts and methodologies.",
      tags: ["Penetration Testing", "Methodology"],
      note: "Course content completed. This is not the official CPTS certification.",
      exercises: [],
    },
  ],
  certifications: [
    { name: "Cybersecurity Fundamentals", id: "3a34ea83-c114-478c-b00e-dddf24e63e91" },
    { name: "AI Foundations", id: "22bddb09-192d-40c6-936e-ffc833b99dd7" },
    { name: "IBM Blockchain Essentials V2", id: "6a47bc23-8258-4315-8063-7d348b6ab0b0" },
    { name: "Enterprise Design Thinking Practitioner", id: "740fe593-58b6-42af-a51c-be6da0fd60cb" },
    { name: "Working in a Digital World: Professional Skills", id: "0892a6cd-b8ef-4142-962c-16ab3f461071" },
  ],
  experience: [
    {
      id: "SN-E01",
      title: "QA Tester (part-time)",
      org: "Online platform",
      period: "Aug 2026 – Present",
      points: [
        "Tested web and Android applications: sign-up, login, deposits, data operations.",
        "Sent API requests with Postman and checked responses against expected results.",
        "Ran functional test scenarios and compared outcomes with expectations.",
        "Documented bugs with screenshots, videos and test reports, and reported them systematically.",
      ],
    },
    {
      id: "SN-E02",
      title: "Odoo ERP Intern",
      org: "TGBAT (construction sector)",
      note: "8-week internship",
      period: "Jun – Aug 2026",
      points: [
        "Analyzed the purchase request process: suppliers, products and procurement.",
        "Ran functional tests on test data and documented Odoo’s technical structure.",
      ],
    },
  ],
  webSec: [
    "OWASP Top 10",
    "SQL Injection",
    "XSS / DOM XSS",
    "NoSQL Injection",
    "SSTI",
    "XXE",
    "XML/XPath Injection",
    "Authentication",
    "Access control",
    "HTTP analysis",
  ],
  secProfile: {
    method: [
      "Reconnaissance",
      "Enumeration",
      "Attack-surface mapping",
      "Vulnerability validation",
      "Manual testing",
      "Controlled exploitation",
    ],
    coverage: [
      ["Injection", ["SQL", "NoSQL", "XPath / XML", "SSTI", "XXE"]],
      ["Client-side", ["XSS", "DOM XSS"]],
      ["Identity & access", ["Authentication", "Access control", "Authorization"]],
      ["Analysis", ["HTTP traffic analysis"]],
      ["Standards", ["OWASP Top 10", "MITRE ATT&CK (fundamentals)"]],
    ] as [string, string[]][],
    applied: [
      ["Medical platform", "Layered access control, justified emergency access, audit logging, JWT and bcrypt."],
      [
        "World App investigation",
        "Source-code analysis of URL validation and outbound request handling. Ongoing; no confirmed vulnerability.",
      ],
      ["Password manager", "Encryption-based credential storage with a honeypot for unauthorized access attempts."],
      ["Training", "PentesterLab labs on web, access control and API security; HTB CPTS course content completed."],
    ] as [string, string][],
  },
  tools: [
    "Burp Suite",
    "Postman",
    "Nmap",
    "Gobuster",
    "Dirsearch",
    "Netcat",
    "Wireshark",
    "tcpdump",
    "Metasploit",
    "Hydra",
    "Hashcat",
    "John the Ripper",
  ],
  education: [
    "Technicien Spécialisé, Software Development — MIAGE, Casablanca (2024–2026)",
    "Baccalauréat — Institut Essalam, Casablanca (2022–2023)",
  ],
  spoken: ["Arabic: native", "English: intermediate", "French: intermediate"],
  notebook: [] as Array<{ title: string; summary: string; url?: string }>,
};

export type ContentType = typeof CONTENT;
export type ProjectType = (typeof CONTENT.projects)[number];
