// src/routes/index.tsx
import { createFileRoute, Link } from '@tanstack/react-router'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  BookOpen, 
  Search, 
  FolderOpen, 
  Sparkles, 
  ArrowRight,
  BookMarked,
  FileText,
  Lightbulb
} from 'lucide-react'
import { cn } from '@/lib/utils'

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
        </div>
    )
}