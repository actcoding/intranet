import {
    DraftTitleFormField,
    DraftTypeFormField,
} from '@/features/posts/components/DraftForm'
import { DraftFormProvider } from '@/features/posts/contexts/DraftFormContext'
import { CreateDraftFormValues } from '@/features/posts/types'
import { FormSubmitButton } from '@/shared/components/FormSubmitButton'

export interface DraftFormProps {
    onSuccess?: () => void;
    defaultContentType?: CreateDraftFormValues['type'];
    showContentTypePicker?: boolean;
}

const DraftForm = ({
    onSuccess,
    defaultContentType = 'news',
    showContentTypePicker = true,
}: DraftFormProps) => {
    return (
        <DraftFormProvider
            defaultValues={{ type: defaultContentType }}
            onSuccess={onSuccess}
        >
            <DraftTitleFormField />
            {showContentTypePicker ? <DraftTypeFormField /> : null}
            <div className="flex flex-row justify-end">
                <FormSubmitButton type="submit">Speichern</FormSubmitButton>
            </div>
        </DraftFormProvider>
    )
}

export default DraftForm
