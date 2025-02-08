'use client'
import { useEffect } from 'react'

export default function TimezoneSetter() {
    useEffect(() => {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
        document.cookie = `timezone=${timezone};path=/`
    }, [])

    return null
}
