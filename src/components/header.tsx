import { cn } from '@/lib/utils';
import { Link, linkOptions, useRouterState } from '@tanstack/react-router';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import { Button, buttonVariants } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import UserButton from './ui/user-button';

const Header = () => {
    const { location: { pathname } } = useRouterState()
    const [isOpen, setIsOpen] = useState(false);

    if (pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up')) {
        return null;
    }

    const links = linkOptions([
        {
            to: '/bible',
            label: 'Bible',
        },
        {
            to: '/search',
            label: 'Search',
        },
        {
            to: '/collections',
            label: 'Collections',
        },
        {
            to: '/roadmap',
            label: 'Roadmap',
        },
    ]);

    return (
        <div className='flex justify-between items-center py-4 px-4 sm:mx-10 border border-b border-x-0'>
            <Link to="/">
                <h1 className='text-xl sm:text-2xl font-bold'>Your Bible</h1>
            </Link>
            {/* Desktop Navigation */}
            <nav className='hidden sm:flex items-center gap-2'>
                {links.map((link) => (
                    <Link
                        key={link.to}
                        className={cn(buttonVariants({ variant: 'link' }))}
                        activeProps={{
                            className: "underline"
                        }}
                        to={link.to}
                    >
                        {link.label}
                    </Link>
                ))}
                <UserButton />
            </nav>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild className="sm:hidden">
                    <Button variant="outline" size="icon" className="sm:hidden">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:hidden">
                    <nav className="flex flex-col h-full">
                        <div className="flex flex-col gap-4 mt-8">
                            {links.map((link) => (
                                <Link
                                    key={link.to}
                                    className={cn(
                                        "text-lg font-medium transition-colors hover:text-primary",
                                        pathname === link.to ? "text-primary" : "text-muted-foreground"
                                    )}
                                    to={link.to}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                        <div className="mt-auto pt-4 border-t">
                            <UserButton />
                        </div>
                    </nav>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default Header