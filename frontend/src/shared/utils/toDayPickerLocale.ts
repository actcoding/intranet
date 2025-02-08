import {de, enUS, Locale} from 'react-day-picker/locale'

const locales: { [key: string]: Locale } = { de, enUS }

export const toDayPickerLocale = (locale: string): Locale => {
    const localeWithCountry = locale.split('-').join('')
    const localePrefix = locale.split('-')[0]
    return locales[localeWithCountry] || locales[localePrefix] || enUS
}
