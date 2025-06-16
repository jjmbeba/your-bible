import SignInForm from '../forms/sign-in-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'

const SignInTab = () => {
    return (
        <Card className="max-w-md rounded-none border-0 shadow-none md:border md:shadow">
            <CardHeader>
                <CardTitle className="text-lg md:text-xl">Sign In</CardTitle>
                <CardDescription className="text-xs md:text-sm">
                    Enter your email below to login to your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <SignInForm />
            </CardContent>
        </Card>
    )
}

export default SignInTab