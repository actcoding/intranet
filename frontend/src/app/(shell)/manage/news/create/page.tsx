import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/lib/components/common/Card'
import CreateContentForm from '@/lib/components/shared/create-content-form/CreateContentForm'

const CreateNewsPage = () => {
    return (
        <div className="container xl:w-2/3">
            <Card>
                <CardHeader>
                    <CardTitle>News Entwurf erstellen</CardTitle>
                    <CardDescription>
                        Gib unten einen Titel für den Entwurf ein und klicke auf
                        speichern. Danach kann der Artikel vollumfänglich
                        bearbeitet werden.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <CreateContentForm />
                </CardContent>
            </Card>
        </div>
    )
}
export default CreateNewsPage
