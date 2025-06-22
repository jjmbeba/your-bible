import NotesForm from '../forms/notes-form'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'

type NoteViewerProps = {
    chapterId: string
}

const NoteViewer = ({ chapterId }: NoteViewerProps) => {
  return (
    <div>
        <Tabs defaultValue="view">
            <TabsList>
                <TabsTrigger value="view">View</TabsTrigger>
                <TabsTrigger value="edit">Edit</TabsTrigger>
            </TabsList>
            <TabsContent value="view">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia magni, placeat velit impedit animi natus cupiditate quibusdam? Reiciendis expedita vel veritatis corporis optio, vitae obcaecati magnam libero facilis porro at.
                Eaque reiciendis doloribus assumenda? Numquam quae sit dolore inventore dolores fuga provident rem fugit quia? Sequi velit earum sint ipsum consequuntur dignissimos odio iure. Nihil voluptates reiciendis minus quo atque.
                Provident hic dolorum quam quisquam reiciendis cupiditate recusandae delectus nihil, tempora voluptate officiis rem explicabo impedit aliquid dolore repudiandae tempore sapiente laborum! Error recusandae animi, optio iste esse porro quas.
                Quaerat quam neque officiis consequuntur molestias amet totam architecto. Doloribus vel pariatur iusto. Reiciendis mollitia at accusantium vel tenetur maiores eaque dolorum, eius commodi iusto, exercitationem hic architecto atque? Cumque?
                Non eius voluptas natus at quia maxime, est dolor vitae debitis tempora sint eum iusto laborum sunt ad fuga! Veniam omnis nobis aliquid placeat reiciendis excepturi nesciunt totam dolorum officia!
            </TabsContent>
            <TabsContent value="edit">
                <NotesForm chapterId={chapterId} />
            </TabsContent>
        </Tabs>
    </div>
  )
}

export default NoteViewer