import { cn } from '@/lib/utils';
import { Link, linkOptions, useRouterState } from '@tanstack/react-router';
import { buttonVariants } from './ui/button';

const Header = () => {
    const links = linkOptions([
        {
            to: '/',
            label: 'Home',
        },
        {
            to: '/roadmap',
            label: 'Roadmap',
        },
    ]);

    const { location: { pathname } } = useRouterState()
    console.log(pathname)

    return (
        <div className='flex justify-between items-center py-4 mx-10 border border-b border-x-0'>
            <h1 className='text-2xl font-bold'>Your Bible</h1>
            <div className='flex items-center'>
                {links.map((link) => (
                    <Link key={link.to} className={cn(buttonVariants({ variant: 'link' }), {
                        'underline': pathname === link.to,
                    })} to={link.to}>{link.label}</Link>
                ))}
            </div>
        </div>
    )
}

export default Header