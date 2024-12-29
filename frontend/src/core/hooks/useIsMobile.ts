import {useMediaQuery} from 'usehooks-ts'

export const useIsMobile = () => {
    return useMediaQuery('(max-width: 640px)', {
        initializeWithValue: false,
    })
}
