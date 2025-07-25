# Arun Gopi - Portfolio Website

A modern, interactive portfolio website built with Next.js, featuring an AI-powered chat interface that can answer questions about my professional background and experience.

## 🚀 Features

- **Responsive Design**: Fully responsive layout that works on all devices
- **Dark/Light Mode**: Toggle between dark and light themes with system preference detection
- **Interactive Sections**: 
  - About Me with professional introduction
  - Services offered
  - Work portfolio showcase
  - Contact information
- **AI Chat Interface**: Interactive chat powered by OpenAI that can answer questions about my resume and experience
- **Smooth Animations**: Built with Framer Motion for engaging user interactions
- **Modern UI**: Styled with Tailwind CSS for a clean, professional look

## 🛠️ Tech Stack

- **Framework**: Next.js 15.1.3 with App Router
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **AI Integration**: OpenAI API for resume-based chat
- **Icons**: Lucide React
- **Language**: JavaScript/JSX

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/arun-gopi/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory and add your OpenAI API key:
```bash
OPENAI_API_KEY=your_openai_api_key_here
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```
portfolio/
├── app/                    # Next.js App Router
│   ├── api/chat/          # AI chat API endpoint
│   ├── globals.css        # Global styles
│   ├── layout.js          # Root layout
│   └── page.js            # Home page
├── components/            # React components
│   ├── About.jsx          # About section
│   ├── ChatUI.jsx         # AI chat interface
│   ├── Contact.jsx        # Contact section
│   ├── Footer.jsx         # Footer component
│   ├── Header.jsx         # Header section
│   ├── Navbar.jsx         # Navigation bar
│   ├── Services.jsx       # Services section
│   └── Work.jsx           # Work portfolio section
├── assets/                # Static assets and data
│   ├── resumedata.json    # Resume data for AI chat
│   └── [images]           # Image assets
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries
└── public/                # Public assets
```

## 💼 About

This portfolio showcases my professional experience as a Data & Analytics professional with 16+ years in IT and healthcare. The website features:

- **Professional Background**: Billing Operations Manager with expertise in Data Engineering and Power BI
- **Certifications**: DP-600 Certified in Data Engineering
- **Skills**: ETL development, Power BI dashboards, SQL, Python, Microsoft Fabric
- **Interactive Resume**: AI-powered chat that can answer specific questions about my experience

## 🤖 AI Chat Feature

The portfolio includes an intelligent chat interface that can answer questions about my professional background. The chat:
- Uses OpenAI's GPT-4o-mini model for responses
- Is trained on my complete resume data
- Only answers questions related to my professional experience
- Provides accurate, contextual information about my skills and background

## 🚀 Deployment

The portfolio can be deployed on various platforms:

### Vercel (Recommended)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/arun-gopi/portfolio)

### Other Platforms
- Netlify
- AWS Amplify
- GitHub Pages (with static export)

## 📧 Contact

- **Email**: arungopi@live.com
- **Phone**: +91 623 800 6233
- **Location**: Kochi, Kerala, India
- **LinkedIn**: [arun-gopi-alungal](https://linkedin.com/in/arun-gopi-alungal)
- **GitHub**: [arun-gopi](https://github.com/arun-gopi)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
