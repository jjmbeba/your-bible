import { cn } from '@/lib/utils';
import { useAuthActions } from '@convex-dev/auth/react';
import { Link, useRouter } from '@tanstack/react-router';
import { api } from 'convex/_generated/api';
import { Authenticated, AuthLoading, Unauthenticated, useQuery } from "convex/react";
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { buttonVariants } from './button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './dropdown-menu';
import { useMemo } from 'react';
import { LogOutIcon, UserIcon } from 'lucide-react';

const UserButton = () => {
    const { signOut } = useAuthActions()
    const currentUser = useQuery(api.auth.getCurrentUser)
    const router = useRouter()

    const userInitials = useMemo(() => {
        return currentUser?.email?.charAt(0).toUpperCase()
    }, [currentUser?.email])

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
                            <AvatarFallback>{userInitials}</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <UserIcon />
                            Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={async () => {
                            await signOut()
                            router.invalidate()
                        }}>
                            <LogOutIcon />
                            Sign out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </Authenticated>
        </>
    )
}

export default UserButton