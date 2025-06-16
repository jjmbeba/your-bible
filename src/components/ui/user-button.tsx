import { cn } from '@/lib/utils';
import { useAuthActions } from '@convex-dev/auth/react';
import { Link } from '@tanstack/react-router';
import { api } from 'convex/_generated/api';
import { Authenticated, AuthLoading, Unauthenticated, useQuery } from "convex/react";
import { Loader2, UserIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { buttonVariants } from './button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './dropdown-menu';

const UserButton = () => {
    const { signOut } = useAuthActions()
    const currentUser = useQuery(api.auth.getCurrentUser)
    console.log(currentUser)

    return (
        <>
            <AuthLoading>
                <div className='size-8 rounded-full bg-primary/10 flex items-center justify-center animate-pulse' />
            </AuthLoading>
            <Unauthenticated>
                <Link to='/sign-in' className={cn(buttonVariants({
                    variant: 'outline',
                    size: 'sm',
                }))}>
                    Sign In
                </Link>
            </Unauthenticated>
            <Authenticated>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar className='cursor-pointer'>
                            <AvatarImage src={currentUser?.image} />
                            <AvatarFallback>{currentUser?.name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => void signOut()}>Sign out</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </Authenticated>
        </>
    )
}

export default UserButton