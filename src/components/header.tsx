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
    const isFetching = useRouterState({
        select: (s) => s.status === 'pending',
    });

    if (isFetching) {
        return null;
    }

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
            to: '/stories',
            label: 'Stories',
        },
    ]);

    return (
        <div data-testid="header" className='flex justify-between items-center py-4 px-4 sm:mx-10 border border-b border-x-0'>
            <Link data-testid="header-logo" to="/" tabIndex={0} aria-label="Home">
                <h1 className='text-xl sm:text-2xl font-bold'>Your Bible</h1>
            </Link>
            {/* Desktop Navigation */}
            <nav data-testid="header-nav-desktop" className='hidden sm:flex items-center gap-2' role="navigation" aria-label="Main navigation">
                {links.map((link) => (
                    <Link
                        key={link.to}
                        data-testid={`header-nav-link-${link.label.toLowerCase()}`}
                        className={cn(buttonVariants({ variant: 'link' }))}
                        activeProps={{
                            className: "underline"
                        }}
                        to={link.to}
                        aria-label={link.label}
                    >
                        {link.label}
                    </Link>
                ))}
                <UserButton />
            </nav>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild className="sm:hidden">
                    <Button data-testid="header-mobile-trigger" variant="outline" size="icon" className="sm:hidden" aria-label="Toggle menu">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent data-testid="header-sheet" side="right" className="w-[300px] sm:hidden">
                    <nav data-testid="header-nav-mobile" className="flex flex-col h-full" role="navigation" aria-label="Mobile navigation">
                        <div className="flex flex-col gap-4 mt-8">
                            {links.map((link, idx) => (
                                <Link
                                    key={link.to}
                                    data-testid={`header-mobile-link-${link.label.toLowerCase()}`}
                                    className={cn(
                                        "text-lg font-medium transition-colors hover:text-primary",
                                        pathname === link.to ? "text-primary" : "text-muted-foreground"
                                    )}
                                    to={link.to}
                                    onClick={() => setIsOpen(false)}
                                    aria-label={link.label}
                                    tabIndex={0}
                                    ref={idx === 0 ? (el) => {
                                        if (el && isOpen) {
                                            setTimeout(() => el.focus(), 0);
                                        }
                                    } : undefined}
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