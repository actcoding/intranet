'use server'

import {linkApi} from '@/lib/api/api'
import {LinkAttachRequest} from '@/lib/api/generated'

export const linkNewsAndEvent = async (request: LinkAttachRequest) => {
    return linkApi.linkAttach(request)
}
