import { cn } from '@/lib/utils';
import { Link, linkOptions, useRouterState } from '@tanstack/react-router';
import { buttonVariants } from './ui/button';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const links = linkOptions([
        {
            to: '/',
            label: 'Home',
        },
        {
            to: '/bible',
            label: 'Bible',
        },
        {
            to: '/search',
            label: 'Search',
        },
        {
            to: '/roadmap',
            label: 'Roadmap',
        },
    ]);

    const { location: { pathname } } = useRouterState()

    return (
        <div className='flex justify-between items-center py-4 px-4 sm:mx-10 border border-b border-x-0'>
            <h1 className='text-xl sm:text-2xl font-bold'>Your Bible</h1>
            
            {/* Desktop Navigation */}
            <nav className='hidden sm:flex items-center gap-2'>
                {links.map((link) => (
                    <Link 
                        key={link.to} 
                        className={cn(buttonVariants({ variant: 'link' }), {
                            'underline': pathname === link.to,
                        })} 
                        to={link.to}
                    >
                        {link.label}
                    </Link>
                ))}
            </nav>

            {/* Mobile Navigation */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild className="sm:hidden">
                    <Button variant="ghost" size="icon" className="sm:hidden">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:hidden">
                    <nav className="flex flex-col gap-4 mt-8">
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
                    </nav>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default Header