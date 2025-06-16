import { useAuthActions } from "@convex-dev/auth/react"
import { useMutation } from "@tanstack/react-query"
import { api } from "convex/_generated/api"
import { useQuery } from "convex/react"
import { ConvexError } from "convex/values"
import { toast } from "sonner"
import { useMemo, useState } from "react"

export const useSignUp = () => {
    const { signIn } = useAuthActions()
    const [email, setEmail] = useState("")
    const foundUser = useMemo(() => {
        return useQuery(api.auth.getUser, { email })
    }, [email])

    return useMutation({
        mutationFn: async ({ email, password, firstName, lastName, redirectTo }: { email: string, password: string, firstName: string, lastName: string, redirectTo: string }) => {
            setEmail(email)

            if (foundUser) {
                throw new ConvexError("User already exists")
            }

            const res = await signIn('password', {
                email,
                password,
                name: `${firstName} ${lastName}`,
                flow: "signUp",
                redirectTo
            })

            return res
        },
        onSuccess: (data) => {
            if (data.signingIn) {
                toast.success("Sign up successful")
            }
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
}