import { useUploadThing } from '@/hooks/use-upload-file'
import { useField, useForm } from '@tanstack/react-form'
import { useDropzone } from '@uploadthing/react'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { Avatar, AvatarFallback, AvatarImage } from 'src/components/ui/avatar'
import { Button } from 'src/components/ui/button'
import { Input } from 'src/components/ui/input'
import { Skeleton } from 'src/components/ui/skeleton'
import { authClient, useSession } from 'src/lib/auth-client'
import { z } from 'zod'

const profileImageSchema = z.object({
    profileImageUrl: z.string().url({
        message: 'Upload a valid image'
    })
})

const ProfileImageSkeleton = () => {
    return (
        <div className='flex flex-col sm:flex-row items-center gap-4 sm:gap-10'>
            <Skeleton className='size-20 sm:size-24 rounded-full' />
            <div className='w-full'>
                <Skeleton className='h-20 sm:h-24 w-full rounded-md' />
            </div>
        </div>
    )
}

const ProfileImage = () => {
    const { data : session, isPending: isFetchSessionPending, error } = useSession()

    if (error) {
        toast.error(error.message)
    }

    const form = useForm({
        defaultValues: {
            profileImageUrl: ''
        },
        validators: {
            onChange: profileImageSchema
        },
        onSubmit: async ({ value }) => {
            await authClient.updateUser({
                image: value.profileImageUrl,
            }, {
                onError: (error) => {
                    toast.error(error.error.message)
                },
                onSuccess: () => {
                    toast.success('Profile Image updated')
                    form.reset()
                }
            })
        }
    })

    const { handleChange, state: { value } } = useField({
        form,
        name: 'profileImageUrl'
    })

    const { startUpload, isUploading } = useUploadThing('profileImageUploader', {
        onClientUploadComplete: (data) => {
            handleChange(data[0]?.ufsUrl ?? '')
        },
        onUploadError: (error) => {
            toast.error(error.message)
        }
    })

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: (acceptedFile) => {
            toast.promise(startUpload(acceptedFile), {
                loading: 'Uploading...',
                success: 'Uploaded successfully',
                error: 'Upload failed'
            })
        },
        maxFiles: 1,
        accept: {
            'image/*': ['.png', '.jpg', '.jpeg', '.webp']
        }
    })

    if (isFetchSessionPending) {
        return <ProfileImageSkeleton />
    }

    if (!session?.user) {
        return 
    }

    const user = session.user

    return (
        <div className=''>
            <form onSubmit={(e) => {
                e.preventDefault()
                e.stopPropagation()

                form.handleSubmit()
            }}>
                <div className='flex flex-col sm:flex-row items-center gap-4 sm:gap-10'>
                    <Avatar className='size-20 sm:size-24'>
                        <AvatarImage src={user?.image ?? ''} />
                        <AvatarFallback>
                            {user.name.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                    {value ? (
                        <div className='flex flex-col sm:flex-row items-center gap-4 sm:gap-10 text-sm'>
                            Changes to
                            <Avatar className='size-20 sm:size-24'>
                                <AvatarImage src={value} />
                                <AvatarFallback>
                                    {user.name.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                        </div>
                    ) : (
                        <div className='w-full' {...getRootProps()}>
                            <Input {...getInputProps()} />
                            <div className='cursor-pointer border-2 border-dashed border-gray-300 rounded-md p-4 w-full flex items-center justify-center text-sm h-20 sm:h-24'>
                                {isUploading ? (
                                    <Loader2 size={16} className='animate-spin' />
                                ) : isDragActive ? (
                                    <p className='animate-pulse'>Drop the files here ...</p>
                                ) : (
                                    <p className="text-center">Drag 'n' drop some files here, or click to select files</p>
                                )}
                            </div>
                        </div>
                    )
                    }
                    {
                        form.getAllErrors().form.errors[0]?.profileImageUrl?.map((error, index) => (
                            <div key={`${error.path}-${index}`} className='text-red-500 text-sm mt-2'>
                                {error.message}
                            </div>
                        ))
                    }
                </div>
                <form.Subscribe
                    selector={(state) => [state.canSubmit, state.isSubmitting]}
                    children={([canSubmit, isSubmitting]) => (
                        <div className='mt-5 flex flex-col sm:flex-row items-center sm:items-end gap-3'>
                            <Button
                                className='w-full sm:w-auto'
                                type="submit"
                                disabled={!canSubmit || isSubmitting || isUploading}
                            >
                                {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : "Edit Profile Image"}
                            </Button>
                            <Button 
                                variant='outline' 
                                type='button' 
                                className='w-full sm:w-auto'
                                onClick={() => {
                                    form.setFieldValue('profileImageUrl', '')
                                }}>
                                Cancel
                            </Button>
                        </div>
                    )}
                />
            </form >
        </div >
    )
}

export default ProfileImage