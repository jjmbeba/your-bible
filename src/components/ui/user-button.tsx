import { cn } from '@/lib/utils';
import { Link, useRouter } from '@tanstack/react-router';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { buttonVariants } from './button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './dropdown-menu';
import { useMemo } from 'react';
import { LogOutIcon, UserIcon } from 'lucide-react';
import { useSession, signOut } from '@/lib/auth-client';
import { useQueryClient } from '@tanstack/react-query';

const UserButton = () => {
    const router = useRouter()
    const { data: session, isPending } = useSession()
    const queryClient = useQueryClient()

    const userInitials = useMemo(() => {
        return session?.user?.name?.charAt(0).toUpperCase() ?? session?.user?.email?.charAt(0).toUpperCase()
    }, [session?.user?.name, session?.user?.email])

    if (isPending) {
        return <div className='size-8 rounded-full bg-primary/10 flex items-center justify-center animate-pulse' />
    }

    const handleLogout = async () => {
        await signOut({
            fetchOptions: {
                onSuccess: () => {
                    queryClient.setQueryData(['session'], null)
                    queryClient.invalidateQueries({ queryKey: ['session'] })

                    router.navigate({ to: '/' })
                    router.invalidate()
                }
            }
        })
    }

    return (
        <>
            {!session ? (
                <Link to='/sign-in' className={cn(buttonVariants({
                    variant: 'outline',
                    size: 'sm',
                }))}>
                    Sign In
                </Link>
            ) : (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar className='cursor-pointer'>
                            <AvatarImage src={session.user?.image ?? undefined} />
                            <AvatarFallback>{userInitials}</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Link to='/profile' className='flex items-center gap-2'>
                                <UserIcon />
                                Profile
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleLogout}>
                            <LogOutIcon />
                            Sign out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </>
    )
}

export default UserButton