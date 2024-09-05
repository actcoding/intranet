import { editNewsAction, uploadNewsFileAction } from "@/lib/actions/news";
import { instanceOfNewsUpload200Response } from "@/lib/api/generated";
import { serializeFileData } from "@/lib/utils";

export async function updateContentImages(
    newsId: number,
    content: string,
    contentImages: File[]
) {
    const tempImages = content.match(/<img[^>]+data-temp-id="([^"]*)"/g);

    if (tempImages) {
        for (let index = 0; index < tempImages.length; index++) {
            const tempImage = tempImages[index];
            const tempId = tempImage.match(/data-temp-id="([^"]*)"/)?.[1];
            if (tempId) {
                const file = contentImages.find(
                    (e) => e.tempId === tempId
                ).image;
                console.log(file);
                if (!file || !tempImage) continue;
                const imageUrl = await uploadNewsFileAction(
                    newsId,
                    "content",
                    serializeFileData(file)
                );
                content = content.replace(
                    tempImage,
                    `<img src="${imageUrl.url}" alt="Uploaded image">`
                );
            }
        }
    }

    return editNewsAction({
        id: newsId,
        newsUpdateRequest: { content: content },
    });
}

export function updateAttachments(newsId: number, attachments: File[]) {
    attachments.forEach(async (file) => {
        return uploadNewsFileAction(
            newsId,
            "attachment",
            serializeFileData(file)
        );
    });
}

export function getImagesFromHtml(html: string): File[] {
    const images = html.match(/<img[^>]+>/g);
    if (!images) return [];
    return images
        .map((image) => {
            const src = image.match(/src="([^"]*)"/);
            if (!src) return null;
            const url = src[1];
            return new File([url], url, { type: "image/*" });
        })
        .filter((image) => image !== null) as File[];
}
