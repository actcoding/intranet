import Image from 'next/image'

interface FileImagePreviewProps {
    image: File;
}

const FileImagePreview = (props: FileImagePreviewProps) => {
    return (
        <div className="relative h-[200px]">
            <Image
                src={URL.createObjectURL(props.image)}
                alt=""
                className="rounded-lg"
                style={{ objectFit: 'cover' }}
                fill
            />
        </div>
    )
}
export default FileImagePreview
