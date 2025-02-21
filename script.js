
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('section');
const progressBar = document.querySelector('.progress-bar');

// Update navigation and progress bar on scroll
window.addEventListener('scroll', () => {
  // Update progress bar
  const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
  progressBar.style.width = `${scrollPercentage}%`;

  // Update active nav item
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= (sectionTop - sectionHeight / 3)) {
      current = section.getAttribute('id');
    }
  });

  navItems.forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('href').slice(1) === current) {
      item.classList.add('active');
    }
  });
});

// Smooth scroll for navigation links
navItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = item.getAttribute('href');
    document.querySelector(targetId).scrollIntoView({
      behavior: 'smooth'
    });
  });
});



document.addEventListener('DOMContentLoaded', () => {
  const stats = {
    total: 442,
    easy: 180,
    medium: 200,
    hard: 62
  };

  // Calculate percentages and create arcs
  const calculateArc = (startAngle, endAngle) => {
    const start = polarToCartesian(0, 0, 80, startAngle);
    const end = polarToCartesian(0, 0, 80, endAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;

    return [
      "M", start.x, start.y,
      "A", 80, 80, 0, largeArcFlag, 1, end.x, end.y
    ].join(" ");
  };

  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };

  // Set up the progress rings
  const startAngle = -140; // Starting at -140 degrees for 4/5 of the circle
  const totalAngle = 280; // 280 degrees = 4/5 of circle

  const easyAngle = (stats.easy / stats.total) * totalAngle;
  const mediumAngle = (stats.medium / stats.total) * totalAngle;
  const hardAngle = (stats.hard / stats.total) * totalAngle;

  // Update paths
  document.querySelector('.progress-ring-easy').setAttribute('d',
    calculateArc(startAngle, startAngle + easyAngle));

  document.querySelector('.progress-ring-medium').setAttribute('d',
    calculateArc(startAngle + easyAngle, startAngle + easyAngle + mediumAngle));

  document.querySelector('.progress-ring-hard').setAttribute('d',
    calculateArc(startAngle + easyAngle + mediumAngle,
      startAngle + easyAngle + mediumAngle + hardAngle));
});




const projects = [
  {
    title: "EduMatrix – NextGen Learning Platform",
    description: "An all-in-one educational platform that provides study materials, focus music, interactive games, AI-powered interview preparation, and a chatbot assistant for students.",
    details: [
      "Developed a responsive frontend using HTML5, CSS3, and modern JavaScript ES6+ features",
      "Implemented an AI-powered chatbot using OpenAI API for answering student queries with 95% accuracy",
      "Created an interactive study material system with dynamic content loading and caching",
      "Built a custom audio player for focus music with features like playlist management and timer",
      "Integrated Speech-to-Text API for real-time voice input in interview preparation module"
    ],
    image: "edumatrix.jpg",
    techStack: ["HTML", "CSS", "JavaScript", "OpenAI API", "Speech-to-Text API"],
    github: "https://github.com/yourusername/edumatrix",
    live: "https://yourwebsite.com/edumatrix"
  },
  {
    title: "FoodDelivery App",
    description: "A seamless food delivery app allowing users to browse restaurants, place orders, track delivery in real time, and make secure payments.",
    details: [
      "Architected and developed a Kotlin-based Android application following MVVM architecture",
      "Implemented real-time order tracking using Google Maps API and Firebase Realtime Database",
      "Built a scalable backend using Node.js and MongoDB, handling 1000+ concurrent users",
      "Integrated multiple payment gateways with PCI-compliant secure transaction processing",
      "Developed a push notification system using Firebase Cloud Messaging for order updates"
    ],
    image: "food_project_image.png",
    techStack: ["Kotlin", "Firebase", "Google Maps API", "Node.js", "MongoDB"],
    github: "https://github.com/yourusername/fooddelivery",
    live: "https://yourwebsite.com/fooddelivery"
  },
  {
    title: "AI Powered Interview Website",
    description: "An interactive AI-based interview preparation platform featuring real-time speech-to-text conversion, AI-generated questions, answer evaluation, and scoring.",
    details: [
      "Designed and implemented a React-based frontend with custom hooks and context API",
      "Integrated OpenAI API to generate dynamic interview questions based on user performance",
      "Developed real-time speech recognition system using Web Speech API with 98% accuracy",
      "Created an automated scoring algorithm using NLP techniques for answer evaluation",
      "Implemented multi-language support using i18next, supporting 5 major languages"
    ],
    image: "Screenshot (222).png",
    techStack: ["React", "Node.js", "OpenAI API", "Speech-to-Text API", "Docker"],
    github: "https://github.com/yourusername/ai-interview",
    live: "https://yourwebsite.com/ai-interview"
  },
  {
    title: "AI Powered Chatbot for BFSI",
    description: "A smart AI chatbot designed for the Banking, Financial Services, and Insurance (BFSI) sector to assist with customer queries, financial advice, and automated workflows.",
    details: [
      "Developed a FastAPI backend with async support handling 100K+ daily requests",
      "Built custom TensorFlow models for intent classification with 92% accuracy",
      "Implemented secure document verification system using computer vision algorithms",
      "Created RESTful APIs for seamless integration with banking and insurance systems",
      "Deployed the solution on Google Cloud Platform with auto-scaling configuration"
    ],
    image: "chatbot.jpg",
    techStack: ["Python", "FastAPI", "TensorFlow", "React", "GCP"],
    github: "https://github.com/yourusername/ai-chatbot-bfsi",
    live: "https://yourwebsite.com/ai-chatbot-bfsi"
  }
];



function createProjectCard(project, index) {
  const card = document.createElement('div');
  card.className = 'project-card';
  card.style.animationDelay = `${index * 0.2}s`;

  card.innerHTML = `
    <div class="card-inner">
        <div class="card-front">
            <button class="menu-dots">⋮</button>
            <img src="${project.image}" alt="${project.title}" class="project-image">
            <div class="card-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="tech-stack">
                    ${project.techStack.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            </div>
        </div>
        <div class="card-back">
            <button class="close-btn">✕</button>
            <h3 class="project-title">${project.title}</h3>
            <ul class="project-details" style="font-size: 0.8rem; text-align: left;">
                ${project.details.map(detail => `<li>✅ ${detail}</li>`).join('')}
            </ul>
            <div class="project-links">
                <a href="${project.github}" class="project-link">GitHub</a>
                <a href="${project.live}" class="project-link">Live Demo</a>
            </div>
        </div>
    </div>
  `;

  // Add event listeners
  const cardInner = card.querySelector('.card-inner');
  const menuDots = card.querySelector('.menu-dots');
  const closeBtn = card.querySelector('.close-btn');
  const projectImage = card.querySelector('.project-image');
  const projectTitle = card.querySelector('.card-front .project-title');

  function flipCard() {
    card.classList.add('flipped');
  }

  function unflipCard() {
    card.classList.remove('flipped');
  }

  menuDots.addEventListener('click', (e) => {
    e.stopPropagation();
    flipCard();
  });

  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    unflipCard();
  });

  projectImage.addEventListener('click', flipCard);
  projectTitle.addEventListener('click', flipCard);

  return card;
}

// Render all project cards
const projectsGrid = document.querySelector('.projects-grid');
projects.forEach((project, index) => {
  projectsGrid.appendChild(createProjectCard(project, index));
});

// Add animation when skills come into view
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, {
  threshold: 0.1
});

document.querySelectorAll('.skills-category').forEach(category => {
  category.style.opacity = '0';
  category.style.transform = 'translateY(20px)';
  observer.observe(category);
});

document.querySelectorAll('.award-card').forEach(card => {
  card.addEventListener('click', function () {
    this.classList.toggle('active');
  });
});


// Animate percentage bars when they come into view
const observerPercentage = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bars = entry.target.querySelectorAll('.percentage-bar');
      bars.forEach(bar => {
        const percentage = bar.getAttribute('data-percentage');
        bar.querySelector('.fill').style.width = percentage + '%';
      });
    }
  });
}, { threshold: 0.5 });

observerPercentage.observe(document.querySelector('.education-timeline'));

// Copy button functionality
document.querySelectorAll('.copy-btn').forEach(button => {
  button.addEventListener('click', () => {
    const value = button.getAttribute('data-value');
    navigator.clipboard.writeText(value);

    // Change button text temporarily
    const originalText = button.textContent;
    button.textContent = 'Copied!';
    setTimeout(() => {
      button.textContent = originalText;
    }, 2000);
  });
});

// Form submission
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();

  // Get form values
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;

  // Here you would typically send this data to your backend
  console.log({ name, email, subject, message });

  // Reset form
  e.target.reset();

  // Show success message (you can customize this)
  alert('Message sent successfully!');
});