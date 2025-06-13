import { useForm } from '@tanstack/react-form'
import { getRouteApi, useNavigate } from '@tanstack/react-router'
import { z } from 'zod'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

const SearchBar = () => {
    const { bible } = getRouteApi('/bible').useSearch()
    const navigate = useNavigate()

    const form = useForm({
        validators: {
            onSubmit: z.object({
                query: z.string().min(1, { message: 'Query is required' })
            })
        },
        defaultValues: {
            query: ''
        },
        onSubmit: ({ value }) => {
            console.log(value)
            // navigate({
            //     to: '/bible',
            //     search: (prev) => ({
            //         bible: prev.bible,
            //         chapter: value.query
            //     })
            // })
        }
    })

    return (
        <form onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
        }} className='flex items-center gap-2'>
            <form.Field
                name='query'
                children={(field) => (
                    <div className='relative flex flex-col gap-2'>
                        <Input
                            type="text"
                            placeholder="Search"
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            onBlur={field.handleBlur}
                        />
                        <div className='absolute -bottom-4 left-0'>
                            {field.state.meta.errors.map((error, i) => (
                                <div key={i} className="text-xs text-red-500">
                                    {error?.message}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            />
            <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                    <Button type='submit' size='sm' disabled={!canSubmit}>
                        Search
                    </Button>
                )}
            />
        </form>
    )
}

export default SearchBar