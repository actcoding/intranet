import parse, { ConfigType, Dayjs, OptionType } from 'dayjs'
import localeDe from 'dayjs/locale/de'
import pluginLocalizedFormat from 'dayjs/plugin/localizedFormat'

parse.locale(localeDe)

parse.extend(pluginLocalizedFormat)

export default function dayjs(
    date?: ConfigType,
    format?: OptionType,
    locale?: string,
    strict?: boolean,
): Dayjs {
    return parse(date, format, locale, strict)
}
