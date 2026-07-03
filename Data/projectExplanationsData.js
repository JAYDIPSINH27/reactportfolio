const projectExplanationsData = [
  {
    title: "Serverless Expense Tracker",
    subtitle: "AWS Serverless Expense Management App",
    stack: "React,AWS,Lambda,DynamoDB,API Gateway",
    videoId: "GiOvFnXCeig",
    explanationLink: "https://www.youtube.com/watch?v=GiOvFnXCeig",
    githubLink: "https://github.com/JAYDIPSINH27/serverless-expense-tracker",
    details: [
      "Built a cloud-based expense tracker using React and AWS serverless services.",
      "Implemented user authentication with Amazon Cognito.",
      "Created Lambda functions for expenses, user profiles, image uploads, and total extraction.",
      "Used DynamoDB for storing user and expense data.",
      "Added S3 image upload support and AWS Textract-based expense total extraction.",
      "Used CloudFormation/IaC files to define and manage AWS infrastructure."
    ]
  },
    {
    title: "K8s Microservice",
    subtitle: "Kubernetes and GKE Microservice Deployment",
    stack: "Docker,Kubernetes,Node.js,Express,GCP,Terraform",
    videoId: "nStWIDFb3C0",
    explanationLink: "https://www.youtube.com/watch?v=nStWIDFb3C0",
    githubLink: "https://github.com/JAYDIPSINH27/k8s-microservice",
    details: [
      "Built a containerized microservice application using Node.js and Express.",
      "Packaged services with Docker for consistent deployment.",
      "Deployed the application to Google Kubernetes Engine.",
      "Used Kubernetes manifests for deployments, services, and scaling.",
      "Configured persistent storage for shared application data.",
      "Automated cloud infrastructure provisioning using Terraform."
    ]
  },
  {
  title: "BiasBreaker",
  subtitle: "AI-Powered Bias Reduction Platform",
  stack: "Next.js,Django,Python,WebSocket,MediaPipe,LLM,Docker",
  videoId: "-XlbcMWzTA4",
  explanationLink: "https://www.youtube.com/watch?v=-XlbcMWzTA4",
  githubLink: "https://github.com/JAYDIPSINH27/BiasBreaker",
  details: [
    "Built a web platform that helps users recognize and reduce cognitive bias while consuming digital content.",
    "Used AI-generated alternative perspectives to expose users to balanced viewpoints.",
    "Implemented quizzes, micro-challenges, points, badges, and progress tracking to encourage deeper engagement.",
    "Built a Django REST backend for articles, quizzes, analytics, user activity, and reward logic.",
    "Integrated real-time nudges using WebSockets based on focus and distraction events.",
    "Added eye-tracking support using MediaPipe webcam gaze estimation and optional Tobii Eye Tracker integration."
  ]
},
  {
    title: "DalVacationHome",
    subtitle: "Multi-Cloud Vacation Rental Booking Platform",
    stack: "React,Node.js,Python,AWS,GCP,Docker,DynamoDB",
    videoId: "huqe2_nddik",
    explanationLink: "https://www.youtube.com/watch?v=huqe2_nddik",
    githubLink: "https://github.com/JAYDIPSINH27/DalVacationHome",
    details: [
      "Built a vacation rental booking platform using AWS and Google Cloud.",
      "Implemented booking-related workflows using AWS Lambda.",
      "Created an Amazon Lex chatbot for user interaction and support.",
      "Used SNS, SQS, and GCP Pub/Sub for notification and messaging workflows.",
      "Implemented sentiment analysis using BigQuery and Google Natural Language API.",
      "Used CI/CD and Infrastructure as Code to support deployment automation."
    ]
  },
  {
    title: "BidSphere",
    subtitle: "Microservices-Based Bidding Platform",
    stack: "React,Node.js,Express,MongoDB,AWS,SpringBoot,Stripe",
    videoId: "8hP19lAmkuw",
    explanationLink: "https://www.youtube.com/watch?v=8hP19lAmkuw",
    githubLink: "https://github.com/JAYDIPSINH27/BidSphere",
    details: [
      "Built a bidding and tender management platform using a microservices-based architecture.",
      "Developed backend services with Node.js and Spring Boot.",
      "Implemented tender/document management with AWS S3 storage.",
      "Integrated Stripe payment processing for secure transactions.",
      "Designed the frontend using React with smooth UI interactions.",
      "Separated features into services to improve maintainability and scalability."
    ]
  },
  {
    title: "Jethiyo",
    subtitle: "2D Platformer Game Built with Godot",
    stack: "Godot,GDScript,Game Development",
    videoId: "bZ66USbuTFg",
    explanationLink: "https://www.youtube.com/watch?v=bZ66USbuTFg",
    githubLink: "https://github.com/JAYDIPSINH27/jethiyo",
    details: [
      "Built a 2D platformer game using the Godot engine.",
      "Implemented player movement with running, jumping, gravity, and directional controls.",
      "Added character animations for idle, running, and jumping states.",
      "Used GDScript to control player physics and input handling.",
      "Added sound feedback for jump actions.",
      "Structured game assets including backgrounds, collectibles, and character sprites."
    ]
  },
  {
    title: "pet-me-js",
    subtitle: "Tamagotchi-Style Terminal Pet CLI",
    stack: "TypeScript,Node.js,JavaScript",
    videoId: "nbe5paqkYBI",
    explanationLink: "https://www.youtube.com/watch?v=nbe5paqkYBI",
    githubLink: "https://github.com/JAYDIPSINH27/pet-me-js",
    details: [
      "Built a TypeScript CLI app that works like a Tamagotchi-style virtual pet.",
      "Added pet evolutions from egg to baby, teen, and adult based on care and age.",
      "Implemented ASCII moods that change based on hunger, happiness, and sickness.",
      "Added inventory, feeding, medicine, mini-games, random events, and achievements.",
      "Supported multiple pets with hatch, switch, rename, list, and release commands.",
      "Stored pet state locally using a JSON-based storage system with zero runtime dependencies."
    ]
  }
];

export default projectExplanationsData;