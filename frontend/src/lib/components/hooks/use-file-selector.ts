import { useContext } from 'react'
import { FileSelectorContext } from '@/lib/components/shared/FileSelector'

export function useFileSelector() {
    const context = useContext(FileSelectorContext)
    if (!context) {
        throw new Error('useFileSelector must be used within a FileSelector')
    }
    return context
}
