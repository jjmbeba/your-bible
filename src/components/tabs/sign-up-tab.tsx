
import SignUpForm from '../forms/sign-up-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'

const SignUpTab = () => {
    return (
        <Card className="z-50 rounded-md rounded-t-none max-w-md border-0 shadow-none md:border md:shadow">
            <CardHeader>
                <CardTitle className="text-lg md:text-xl">Sign Up</CardTitle>
                <CardDescription className="text-xs md:text-sm">
                    Enter your information to create an account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <SignUpForm />
            </CardContent>
        </Card>
    )
}

export default SignUpTab