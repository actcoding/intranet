import { Button } from '@/lib/components/common/Button'
import {
    EventContentFormField,
    EventDateTimeFormField,
    EventForm,
    EventIsAlldayFormField,
    EventTitleFormField,
} from '@/lib/components/events/event-form'

const EditEventPage = () => {
    return (
        <EventForm event={{}} className="grid grid-cols-4 gap-4">
            <div className="col-span-3 space-y-3">
                <EventTitleFormField label="Titel" />
                <EventContentFormField label="Inhalt" />
            </div>
            <div className="col-span-1 space-y-3">
                <EventDateTimeFormField label="Startdatum" type="start" />
                <EventDateTimeFormField label="Enddatum" type="end" />
                <EventIsAlldayFormField label="Ganztägig?" />
            </div>
            <Button className="float-end">Speichern</Button>
        </EventForm>
    )
}

export default EditEventPage
