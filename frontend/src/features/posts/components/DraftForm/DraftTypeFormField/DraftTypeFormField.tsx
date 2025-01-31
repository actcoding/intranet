import {CreateDraftFormValues} from '@/features/posts/types'
import {FormControl, FormField, FormItem, FormLabel} from '@/lib/components/common/Form'
import {RadioGroup} from '@/shared/components/RadioGroup'
import Image from 'next/image'
import {useFormContext} from 'react-hook-form'
import {DraftTypeFormFieldItem} from '.'

const DraftTypeFormField = () => {
    const form = useFormContext<CreateDraftFormValues>()
    return (
        <FormField
            control={form.control}
            name="type"
            render={({ field }) => {
                return (
                    <FormItem>
                        <FormLabel>Inhaltstyp</FormLabel>
                        <FormControl>
                            <RadioGroup
                                className="grid grid-cols-2 gap-4"
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <DraftTypeFormFieldItem value="news" id="news">
                                    <Image src={'/newspaper.png'} className={'mb-2'} height={60} width={60} alt=""/>
                                    Neuigkeit
                                </DraftTypeFormFieldItem>
                                <DraftTypeFormFieldItem
                                    value="event"
                                    id="event"
                                >
                                    <Image src={'/calendar.png'} className={'mb-2'} height={60} width={60} alt=""/>
                                    Veranstaltung
                                </DraftTypeFormFieldItem>
                            </RadioGroup>
                        </FormControl>
                    </FormItem>
                )
            }}
        />
    )
}

export { DraftTypeFormField }
