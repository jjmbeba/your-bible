# Your Bible 📖

A modern, feature-rich Bible application built with TanStack Start, TypeScript, and TanStack Router. Access multiple Bible translations, search scriptures, create personal verse collections, and generate AI-powered stories based on biblical passages.

## ✨ Features

### 📚 Bible Reading
- **Multiple Bible Translations**: Access various Bible versions through the API.Bible integration
- **Chapter Navigation**: Seamlessly navigate between chapters with intuitive controls
- **Verse Highlighting**: Highlight specific verses with smooth scrolling
- **Responsive Design**: Optimized for desktop and mobile devices

### 🔍 Advanced Search
- **Keyword Search**: Search across Bible text with powerful query capabilities
- **Pagination**: Navigate through search results with paginated results
- **Highlighted Results**: Search terms are highlighted in results for easy identification
- **Cross-Reference Links**: Click on verse references to navigate directly to the text

### 📝 Personal Collections
- **Create Collections**: Organize your favorite verses into custom collections
- **Add Verses**: Save verses from Bible reading or search results to collections
- **Manage Collections**: Edit collection names and delete unwanted collections
- **Verse Management**: Remove individual verses from collections

### ✍️ Personal Notes
- **Chapter-Specific Notes**: Create and edit notes for each Bible chapter.
- **Rich Text Editor**: Format your notes with bold, italics, lists, and more, powered by Plate.js.
- **Side-by-Side View**: View your notes alongside the Bible text on desktop for an integrated study experience.
- **Private and Secure**: Notes are tied to your user account and are kept private.

### 🎭 AI Story Generation
- **Creative Story Creation**: Generate unique stories based on biblical passages using AI
- **Customizable Parameters**: Control story perspective, setting, tone, and length
- **Rate Limiting**: Built-in rate limiting to ensure fair usage and API cost management
- **Story Management**: Create, view, and delete your generated stories
- **Side-by-Side Comparison**: View original biblical text alongside your generated story
- **Mobile-Friendly**: Responsive design with tabs for mobile viewing

### 🔐 User Authentication
- **Secure Sign In/Sign Up**: Email-based authentication with Better Auth
- **Protected Routes**: Collections and stories are only accessible to authenticated users
- **User Sessions**: Persistent login sessions across browser sessions

### 🎨 Modern UI/UX
- **Tailwind CSS**: Beautiful, responsive design with Tailwind CSS v4
- **Shadcn/ui Components**: High-quality, accessible UI components
- **Loading States**: Smooth loading indicators and skeleton screens
- **Toast Notifications**: User feedback with Sonner toast notifications

## 🛠️ Tech Stack

### Frontend
- **TanStack Start** - Full-stack React framework with built-in SSR/SSG
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **TanStack Router** - File-based routing with type safety
- **TanStack Query** - Server state management
- **TanStack Form** - Form handling with validation
- **Tailwind CSS v4** - Utility-first CSS framework
- **Shadcn/ui** - High-quality component library
- **Lucide React** - Beautiful icons
- **Plate.js** - Rich text editor framework

### Backend & Database
- **Convex** - Real-time backend with automatic sync
- **Better Auth** - Authentication solution
- **Drizzle ORM** - Type-safe database queries
- **PostgreSQL** - Primary database (via Neon)
- **Google Gemini AI** - AI-powered story generation
- **Redis** - Rate limiting and caching

### Development Tools
- **Vite** - Fast build tool and dev server
- **Zod** - Schema validation
- **Axios** - HTTP client for API calls
- **Sonner** - Toast notifications

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm
- Convex account
- API.Bible API key
- Google Gemini API key
- Redis instance (for rate limiting)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd your-bible
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   # API Configuration
   API_BASE_URL=your_api_base_url_here
   API_KEY=your_api_key_here
   
   # Better Auth
   BETTER_AUTH_SECRET=your_better_auth_secret_here
   BETTER_AUTH_URL=your_better_auth_url_here
   
   # Database
   DATABASE_URL=your_database_url_here
   
   # GitHub OAuth (if using GitHub authentication)
   GITHUB_CLIENT_ID=your_github_client_id_here
   GITHUB_CLIENT_SECRET=your_github_client_secret_here
   
   # File Upload
   UPLOADTHING_TOKEN=your_uploadthing_token_here
   
   # Google Gemini AI
   GEMINI_MODEL=gemini-1.5-flash
   GEMINI_API_KEY=your_gemini_api_key_here
   
   # Redis/KV Storage
   KV_URL=your_kv_url_here
   KV_REST_API_URL=your_kv_rest_api_url_here
   KV_REST_API_TOKEN=your_kv_rest_api_token_here
   KV_REST_API_READ_ONLY_TOKEN=your_kv_rest_api_read_only_token_here
   REDIS_URL=your_redis_url_here
   
   # Convex
   CONVEX_DEPLOYMENT=your_convex_deployment_here
   VITE_CONVEX_URL=your_convex_url_here
   ```

4. **Convex Setup**
   ```bash
   npx convex dev
   ```

5. **Start Development Server**
   ```bash
   pnpm dev
   ```

The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
src/
├── actions/          # Server actions (TanStack Start)
├── components/       # React components
│   ├── bible/       # Bible-specific components
│   ├── collections/ # Collection management
│   ├── forms/       # Form components
│   ├── search/      # Search functionality
│   ├── stories/     # Story management components
│   ├── ui/          # Reusable UI components
│   └── skeletons/   # Loading skeletons
├── hooks/           # Custom React hooks
├── lib/             # Utility libraries
├── queries/         # TanStack Query configurations
├── routes/          # TanStack Router routes
├── schemas/         # Zod validation schemas
├── server/          # Server-side functions
├── styles/          # Global styles
└── types/           # TypeScript type definitions
```

## 🔧 Configuration

### TanStack Start
This application uses TanStack Start for full-stack React development with:
- Built-in server-side rendering (SSR)
- File-based routing with TanStack Router
- Server actions for backend functionality
- Automatic code splitting and optimization

### Convex Schema
The application uses Convex for real-time data synchronization. The schema includes:
- `collections` - User-created verse collections
- `collectionVerses` - Individual verses within collections
- `notes` - User-created notes for each chapter
- `stories` - AI-generated stories based on biblical passages

### API Integration
The app integrates with multiple APIs:
- **API.Bible** - Bible translations and metadata, chapter content retrieval, verse search functionality
- **Google Gemini AI** - AI-powered story generation with theological guidelines
- **Redis** - Rate limiting for story generation to manage API costs

## 🎯 Usage

### Reading the Bible
1. Select a Bible translation from the dropdown
2. Choose a book and chapter
3. Navigate between chapters using the arrow buttons
4. Click on verse references to highlight specific verses

### Searching Scriptures
1. Select a Bible translation
2. Enter search terms in the search bar
3. Browse through paginated results
4. Click on verse references to view in context

### Managing Collections
1. Sign in to your account
2. Create a new collection
3. Add verses from Bible reading or search results
4. Organize and manage your personal verse collections

### Taking Notes
1. Navigate to a Bible chapter while signed in.
2. Click "Open Notes" to reveal the notes panel.
3. Use the rich text editor to write and format your thoughts.
4. Your notes are saved automatically.

### Generating Stories
1. Navigate to the Stories section while signed in
2. Click "Create Story" to start the story generation process
3. Select a Bible translation and chapter
4. Fill in the story parameters:
   - **Title**: Give your story a meaningful title
   - **Perspective**: Choose the narrative perspective (e.g., "first-person", "observer")
   - **Setting**: Describe the setting or context for your story
   - **Tone**: Specify the emotional tone (e.g., "contemplative", "adventurous")
   - **Story Length**: Choose between short, medium, or long stories
5. Click "Generate Story" to create your AI-powered narrative
6. View your story alongside the original biblical text
7. Manage your stories from the Stories dashboard

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- [API.Bible](https://api.bible/) for providing Bible content
- [Convex](https://convex.dev/) for the real-time backend
- [TanStack](https://tanstack.com/) for excellent React libraries and TanStack Start
- [Shadcn/ui](https://ui.shadcn.com/) for beautiful components
- [Google Gemini](https://ai.google.dev/) for AI-powered story generation

## 📞 Support

For support, please open an issue in the GitHub repository or contact the development team.

---

Built with ❤️ using TanStack Start and modern web technologies 
