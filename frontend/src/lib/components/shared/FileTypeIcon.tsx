import { FileImageIcon, FileTextIcon, FileVideoIcon } from 'lucide-react'

interface FileTypeIconProps {
    className?: string;
    fileType: File['type'];
    size?: number;
}

const FileTypeIcon = ({ fileType, ...props }: FileTypeIconProps) => {
    if (fileType.includes('image')) {
        return <FileImageIcon {...props} />
    }
    if (fileType.includes('video')) {
        return <FileVideoIcon {...props} />
    }
    return <FileTextIcon {...props} />
}
export default FileTypeIcon
