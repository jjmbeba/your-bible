// src/routes/index.tsx
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { createFileRoute, Link } from '@tanstack/react-router'
import {
    ArrowRight,
    BookMarked,
    BookOpen,
    FileText,
    FolderOpen,
    Lightbulb,
    Search,
    Sparkles
} from 'lucide-react'

export const Route = createFileRoute('/')({
    component: Home,
})

function Home() {
    const features = [
        {
            icon: BookOpen,
            title: "Bible Reading",
            description: "Access multiple Bible translations with intuitive navigation and verse highlighting.",
            href: "/bible",
            color: "text-blue-600"
        },
        {
            icon: Search,
            title: "Advanced Search",
            description: "Search across Bible text with powerful query capabilities and highlighted results.",
            href: "/search",
            color: "text-green-600"
        },
        {
            icon: FolderOpen,
            title: "Personal Collections",
            description: "Create and organize your favorite verses into custom collections.",
            href: "/collections",
            color: "text-purple-600"
        },
        {
            icon: Sparkles,
            title: "AI Story Generation",
            description: "Generate creative stories based on biblical passages using AI.",
            href: "/stories",
            color: "text-orange-600"
        }
    ]

    const quickActions = [
        {
            icon: BookMarked,
            title: "Start Reading",
            description: "Begin your Bible study journey",
            href: "/bible",
            variant: "default" as const
        },
        {
            icon: FileText,
            title: "Take Notes",
            description: "Create personal study notes",
            href: "/bible",
            variant: "outline" as const
        },
        {
            icon: Lightbulb,
            title: "Generate Stories",
            description: "Explore AI-powered narratives",
            href: "/stories",
            variant: "outline" as const
        }
    ]

    return (
        <div className="min-h-screen bg-background">
            <section className="relative px-4 py-20 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-4xl text-center">
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
                            Your Bible
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl">
                            A modern, feature-rich Bible application for reading, studying, and exploring scripture with AI-powered insights.
                        </p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/bible">
                            <Button size="sm" className="w-full sm:w-auto">
                                Start Reading
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                        <Link to="/search">
                            <Button variant="outline" size="sm" className="w-full sm:w-auto">
                                Search Scriptures
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
            <section className="px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                            Everything you need for Bible study
                        </h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Powerful tools to enhance your spiritual journey and deepen your understanding of scripture.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {features.map((feature) => {
                            const Icon = feature.icon
                            return (
                                <Link key={feature.title} to={feature.href}>
                                    <Card className="h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-1 cursor-pointer group">
                                        <CardHeader className="pb-4">
                                            <div className={cn("w-12 h-12 rounded-lg bg-muted flex items-center justify-center group-hover:scale-110 transition-transform", feature.color)}>
                                                <Icon className="h-6 w-6" />
                                            </div>
                                            <CardTitle className="text-lg">{feature.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <CardDescription className="text-sm leading-relaxed">
                                                {feature.description}
                                            </CardDescription>
                                        </CardContent>
                                    </Card>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </section>
            <section className="px-4 py-16 sm:px-6 lg:px-8 bg-muted/30">
                <div className="mx-auto max-w-4xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                            Get started quickly
                        </h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Choose your path and begin your Bible study journey today.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                        {quickActions.map((action) => {
                            const Icon = action.icon
                            return (
                                <Link key={action.title} to={action.href}>
                                    <Card className="h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-1 cursor-pointer group">
                                        <CardHeader className="text-center pb-4">
                                            <div className="mx-auto w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                <Icon className="h-6 w-6 text-primary" />
                                            </div>
                                            <CardTitle className="text-lg">{action.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-center">
                                            <CardDescription className="text-sm mb-4">
                                                {action.description}
                                            </CardDescription>
                                            <Button size="sm" variant={action.variant} className="w-full">
                                                Get Started
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </section>
            <section className="px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                        Ready to dive deeper?
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Create an account to save your collections, notes, and generated stories.
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/sign-in">
                            <Button size="sm" variant="outline">
                                Sign In
                            </Button>
                        </Link>
                        <Link to="/bible">
                            <Button size="sm">
                                Start Reading Now
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
            <footer className="px-4 py-8 sm:px-6 lg:px-8 border-t">
                <div className="mx-auto max-w-2xl text-center">
                    <a 
                        href="https://github.com/jjmbeba/your-bible" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                         <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                role='img'
                aria-label='GitHub logo'
            >
                <path
                    fill="currentColor"
                    d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"
                ></path>
            </svg>
                        View on GitHub
                    </a>
                </div>
            </footer>
        </div>
    )
}