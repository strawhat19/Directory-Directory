import { useEffect, useState } from 'react';

export default function useDirectoryCardPreview(previewImage?: string) {
    const [failedSource, setFailedSource] = useState<string | null>(null);
    const imageSource = previewImage && failedSource !== previewImage ? previewImage : null;
    const hideImage = () => setFailedSource(previewImage ?? null);

    useEffect(() => setFailedSource(null), [previewImage]);

    return { hideImage, imageSource };
}
