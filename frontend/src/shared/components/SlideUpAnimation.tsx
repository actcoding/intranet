'use client'

import {motion} from 'framer-motion'
import {ReactNode} from 'react'

interface SlideUpAnimationProps {
    children: ReactNode
}

export const SlideUpAnimation = ({children}: SlideUpAnimationProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20}}
            animate={{ opacity: 1, y: 0 }}
        >
            {children}
        </motion.div>
    )
}
