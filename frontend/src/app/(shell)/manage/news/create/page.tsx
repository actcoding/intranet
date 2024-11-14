import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/lib/components/common/Card'
import CreateDraftForm from '@/lib/components/shared/create-content-draft-form/CreateDraftForm'

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
                    <CreateDraftForm />
                </CardContent>
            </Card>
        </div>
    )
}
export default CreateNewsPage
