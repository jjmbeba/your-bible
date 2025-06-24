import { storiesSchema } from '@/schemas/stories'
import { useForm } from '@tanstack/react-form'
import { Loader2, SparklesIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

type Props = {
  bible: string,
  chapter: string,
}

const StoriesForm = ({ bible, chapter }: Props) => {
  const form = useForm({
    defaultValues: {
      bibleId: bible,
      chapterId: chapter,
      perspective: "Observer",
      setting: "",
      tone: "",
      storyLength: "short",
    },
    validators: {
      onSubmit: storiesSchema
    },
    onSubmit: ({ value }) => {
      console.log(value)
    }
  })

  return (
    <form onSubmit={(e) => {
      e.preventDefault()

      form.handleSubmit()
    }}>
      <div className="grid grid-cols-3 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="perspective">Perspective</Label>
          <form.Field
            name="perspective"
            children={(field) => (
              <>
                <Input
                  id="perspective"
                  placeholder="Perspective"
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
          <Label htmlFor="setting">Setting</Label>
          <form.Field
            name="setting"
            children={(field) => (
              <>
                <Input
                  id="setting"
                  placeholder="Setting"
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
          <Label htmlFor="tone">Tone</Label>
          <form.Field
            name="tone"
            children={(field) => (
              <>
                <Input
                  id="tone"
                  placeholder="Tone"
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
          <Label htmlFor="storyLength">Story Length</Label>
          <form.Field
            name="storyLength"
            children={(field) => (
              <>
                <Select onValueChange={field.handleChange} defaultValue={field.state.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a story length" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="short">Short</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="long">Long</SelectItem>
                  </SelectContent>
                </Select>
                {field.state.meta.errors.map((error, i) => (
                  <div key={i} className="text-red-500 text-sm">
                    {error?.message}
                  </div>
                ))}
              </>
            )}
          />
        </div>
      </div>
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <Button className='mt-4' size='sm' type="submit" disabled={!canSubmit || isSubmitting}>
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <div className='flex items-center gap-2'>
              <SparklesIcon />
              Generate story
            </div>}
          </Button>
        )}
      />
    </form>
  )
}

export default StoriesForm