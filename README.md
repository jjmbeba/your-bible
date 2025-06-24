# Your Bible 📖

A modern, feature-rich Bible application built with TanStack Start, TypeScript, and TanStack Router. Access multiple Bible translations, search scriptures, and create personal verse collections.

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

### 🔐 User Authentication
- **Secure Sign In/Sign Up**: Email-based authentication with Better Auth
- **Protected Routes**: Collections are only accessible to authenticated users
- **User Sessions**: Persistent login sessions across browser sessions

### 🎨 Modern UI/UX
- **Tailwind CSS**: Beautiful, responsive design with Tailwind CSS v4
- **Shadcn/ui Components**: High-quality, accessible UI components
- **Dark/Light Mode**: Theme support with next-themes
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
   # Convex
   VITE_CONVEX_URL=your_convex_url_here
   
   # API.Bible
   VITE_API_BIBLE_KEY=your_api_bible_key_here
   
   # Database
   DATABASE_URL=your_database_url_here
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
│   ├── ui/          # Reusable UI components
│   └── skeletons/   # Loading skeletons
├── hooks/           # Custom React hooks
├── lib/             # Utility libraries
├── queries/         # TanStack Query configurations
├── routes/          # TanStack Router routes
├── schemas/         # Zod validation schemas
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

### API Integration
The app integrates with API.Bible for:
- Bible translations and metadata
- Chapter content retrieval
- Verse search functionality

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

## 📞 Support

For support, please open an issue in the GitHub repository or contact the development team.

---

Built with ❤️ using TanStack Start and modern web technologies 