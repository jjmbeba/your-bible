import React from 'react'
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { Loader2 } from 'lucide-react';
import { Button, buttonVariants } from './button';
import { useAuthActions } from '@convex-dev/auth/react';
import { Link } from '@tanstack/react-router';
import { cn } from '@/lib/utils';

const UserButton = () => {
    const { signOut } = useAuthActions()

    return (
        <>
            <AuthLoading>
                <div className="flex items-center justify-center h-full">
                    <Loader2 className="animate-spin" />
                </div>
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
                <Button variant="outline" size="sm" className="w-full gap-2" onClick={() => void signOut()}>
                    Sign Out
                </Button>
            </Authenticated>
        </>
    )
}

export default UserButton