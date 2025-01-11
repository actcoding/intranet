import {linkApi} from '@/lib/api/api'
import {LinkDetachRequest} from '@/lib/api/generated'

export const unlinkNewsAndEvent = async (request: LinkDetachRequest) => {
    return linkApi.linkDetach(request)
}
