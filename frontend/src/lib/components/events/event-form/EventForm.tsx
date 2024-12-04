import { AttachmentResource, EventResource } from '@/lib/api/generated'
import { Button } from '@/lib/components/common/Button'
import { Separator } from '@/lib/components/common/Separator'
import { EventFormContext } from '@/lib/components/events/event-form/EventFormContext'
import {
    EventContentFormField,
    EventDateTimeFormField,
    EventIsAlldayFormField,
    EventTitleFormField,
} from '@/lib/components/events/event-form/form-fields'
import { EventAttachmentsFormField } from '@/lib/components/events/event-form/form-fields/EventAttachmentsFormField'

interface EventFormProps {
    event: EventResource & {
        headerImage?: AttachmentResource;
        attachments?: AttachmentResource[];
    };
}

const EventForm = ({ event }: EventFormProps) => {
    return (
        <EventFormContext event={event}>
            <div className="h-full md:flex">
                <div className="flex w-3/4">
                    <div className="flex-1 space-y-3">
                        <div className="flex justify-between">
                            <p className="text-lg font-bold">
                                Veranstaltung bearbeiten
                            </p>
                            <Button>Speichern</Button>
                        </div>
                        <EventTitleFormField label="Titel" />
                        <EventContentFormField label="Inhalt" />
                    </div>
                    <Separator
                        orientation="vertical hidden md:block"
                        className="mx-5"
                    />
                </div>
                <Separator className="my-5 md:hidden" />
                <div className="w-1/4 space-y-3">
                    <p className="text-lg font-bold">Metadaten</p>
                    <EventDateTimeFormField label="Startdatum" type="start" />
                    <EventDateTimeFormField label="Enddatum" type="end" />
                    <EventIsAlldayFormField label="Ganztägig?" />
                    <EventAttachmentsFormField />
                </div>
            </div>
        </EventFormContext>
    )
}

export { EventForm }
