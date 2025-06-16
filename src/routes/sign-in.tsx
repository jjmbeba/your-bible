import { buttonVariants } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ChevronLeftIcon } from 'lucide-react'

export const Route = createFileRoute('/sign-in')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="w-full bg-background">
      <div className="flex items-center flex-col justify-center w-full px-0 md:px-4 py-6 md:py-10">
        <div className="flex items-center justify-start w-full px-4 md:px-0 mb-4 md:mb-6">
          <Link to='/' className={cn(buttonVariants({ variant: 'link' }))}>
            <ChevronLeftIcon />
            Go home
          </Link>
        </div>
        <div className="w-[93%] md:w-full max-w-[370px] md:max-w-[400px]">
          <Tabs defaultValue="sign-in" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="sign-in" className="flex-1">
                Sign In
              </TabsTrigger>
              <TabsTrigger value="sign-up" className="flex-1">
                Sign Up
              </TabsTrigger>
            </TabsList>
            <TabsContent value="sign-in" className="mt-4">
              {/* <SignIn /> */}
            </TabsContent>
            <TabsContent value="sign-up" className="mt-4">
              {/* <SignUp /> */}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
