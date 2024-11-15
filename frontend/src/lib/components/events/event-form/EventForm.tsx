import { EventResource } from '@/lib/api/generated'
import { Button } from '@/lib/components/common/Button'
import { Separator } from '@/lib/components/common/Separator'
import { EventFormContext } from '@/lib/components/events/event-form/EventFormContext'
import {
    EventContentFormField,
    EventDateTimeFormField,
    EventIsAlldayFormField,
    EventTitleFormField,
} from '@/lib/components/events/event-form/form-fields'

interface EventFormProps {
    event: EventResource;
}

const EventForm = ({ event }: EventFormProps) => {
    return (
        <EventFormContext event={event}>
            <div className="h-full md:flex">
                <div className="flex w-3/4">
                    <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between">
                            <EventTitleFormField label="Titel" />
                            <Button>Speichern</Button>
                        </div>
                        <EventContentFormField label="Inhalt" />
                    </div>
                    <Separator
                        orientation="vertical hidden md:block"
                        className="mx-5"
                    />
                </div>
                <Separator className="my-5 md:hidden" />
                <div className="w-1/4 space-y-3">
                    <EventDateTimeFormField label="Startdatum" type="start" />
                    <EventDateTimeFormField label="Enddatum" type="end" />
                    <EventIsAlldayFormField label="Ganztägig?" />
                </div>
            </div>
        </EventFormContext>
    )
}

export { EventForm }
