import {
    EventAttachmentsFormField,
    EventContentFormField,
    EventDateTimeFormField,
    EventIsAlldayFormField,
    EventTitleFormField,
} from '@/features/posts/components/EventForm'
import {EventFormProvider, PostProvider} from '@/features/posts/contexts'
import {Event} from '@/features/posts/types'
import {FormSubmitButton} from '@/shared/components/FormSubmitButton'
import {Separator} from '@/shared/components/Separator'

interface EventFormProps {
    event: Event;
}

const EventForm = ({ event }: EventFormProps) => {
    return (
        <PostProvider post={event}>
            <EventFormProvider event={event}>
                <div className="h-full md:flex">
                    <div className="flex w-3/4">
                        <div className="flex-1 space-y-3">
                            <div className="flex justify-between">
                                <p className="text-lg font-bold">
                                    Veranstaltung bearbeiten
                                </p>
                                <FormSubmitButton>Speichern</FormSubmitButton>
                            </div>
                            <EventTitleFormField label="Titel" />
                            <EventContentFormField label="Inhalt" />
                        </div>
                        <Separator
                            orientation="vertical"
                            className="mx-5 hidden md:block"
                        />
                    </div>

                    <Separator className="my-5 md:hidden" />
                    <div className="w-1/4 space-y-3">
                        <p className="text-lg font-bold">Details</p>
                        <EventDateTimeFormField
                            label="Startdatum"
                            type="start"
                        />
                        <EventDateTimeFormField label="Enddatum" type="end" />
                        <EventIsAlldayFormField label="Ganztägig?" />
                        <EventAttachmentsFormField />
                    </div>
                </div>
            </EventFormProvider>
        </PostProvider>
    )
}

export { EventForm }
