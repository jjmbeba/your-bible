import { signInSchema } from '@/schemas/auth'
import { useForm } from '@tanstack/react-form'
import { getRouteApi, Link, useNavigate } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import SocialButtons from '../ui/social-buttons'

export default function SignInForm() {
    const navigate = useNavigate()
    const { from } = getRouteApi('/sign-in').useSearch()

    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        validators: {
            onSubmit: signInSchema
        },
        onSubmit: async ({ value }) => {
            
        },
    })

    return (
        <form onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()

            form.handleSubmit()
        }} className="grid gap-4">
            <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <form.Field
                    name="email"
                    children={(field) => (
                        <>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                            />
                            {field.state.meta.errors.map((error, i) => (
                                <div key={i} className="text-red-500 text-sm">
                                    {error?.message}
                                </div>
                            ))}
                        </>
                    )}
                />
            </div>
            <div className="grid gap-2">
                <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link to="/" className="ml-auto inline-block text-sm underline">
                        Forgot your password?
                    </Link>
                </div>
                <form.Field
                    name="password"
                    children={(field) => (
                        <>
                            <Input
                                id="password"
                                type="password"
                                placeholder="password"
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                            />
                            {field.state.meta.errors.map((error, i) => (
                                <div key={i} className="text-red-500 text-sm">
                                    {error?.message}
                                </div>
                            ))}
                        </>
                    )}
                />
            </div>
            <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                    <Button
                        type="submit"
                        size='sm'
                        className="w-full"
                        disabled={!canSubmit || isSubmitting}
                    >
                        {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : "Sign In"}
                    </Button>
                )}
            />
            <SocialButtons />
        </form>
    );
}
