# Learning to Read

A bilingual (English/French) phonics-based learning application designed to help children learn to read through interactive phoneme exploration.

This application was developed during the Vibe Coding Workshop at the Recurse Center, with all code written by Claude, an AI assistant. It demonstrates modern web development practices and the potential of AI-assisted programming.

## Features

- 🌍 Bilingual support (English and French)
- 🎯 Progressive learning levels
- 🔤 Interactive phoneme exploration
- 🗣️ Text-to-speech pronunciation
- 🖼️ Visual aids for words and objects
- 📱 Responsive design for all devices

## Live Demo

Visit the application at: [https://proteusvacuum.github.io/phonemes/](https://proteusvacuum.github.io/phonemes/)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/proteusvacuum/phonemes.git
cd phonemes
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173/phonemes/](http://localhost:5173/phonemes/) in your browser

## Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Deployment

The application is automatically deployed to GitHub Pages when changes are pushed to the main branch through GitHub Actions.

## Technology Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Web Speech API for text-to-speech
- DiceBear for avatars
- Lucide React for icons

## Project Structure

```
src/
├── components/         # React components
├── context/           # React context providers
├── data/             # JSON data for phonemes and progression
├── hooks/            # Custom React hooks
├── types/            # TypeScript type definitions
└── App.tsx           # Main application component
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. 