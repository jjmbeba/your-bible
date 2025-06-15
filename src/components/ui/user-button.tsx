import { SignInButton, ClerkLoading, SignedIn, ClerkLoaded, SignedOut } from '@clerk/tanstack-react-start'
import React from 'react'
import { Button } from './button'

const UserButton = () => {
    return (
        <>
            <ClerkLoading>
                <div className='size-8 bg-muted rounded-full animate-pulse' />
            </ClerkLoading>
            <ClerkLoaded>
                <SignedIn>
                    <UserButton />
                </SignedIn>
                <SignedOut>
                    <SignInButton>
                        <Button 
                            size="sm" 
                            variant="outline" 
                            className="w-full sm:w-auto"
                        >
                            Sign In
                        </Button>
                    </SignInButton>
                </SignedOut>
            </ClerkLoaded>
        </>
    )
}

export default UserButton