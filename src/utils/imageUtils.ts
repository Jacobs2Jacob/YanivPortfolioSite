
export const validateAndReadImage = (
    file: File,
    options: {
        maxSize?: number;
        allowedTypes?: string[];
        onSuccess: (base64: string) => void;
        onError?: (message: string) => void;
    }
) => {
    const {
        maxSize = 3145728,
        allowedTypes = ['image/jpeg', 'image/png', 'image/webp'],
        onSuccess,
        onError
    } = options;

    // type check
    if (!allowedTypes.includes(file.type)) {
        if (onError) {
            onError('Unsupported file type. Please upload a JPG, PNG, or WEBP image.');
        }
        
        return;
    }

    // size check
    if (file.size > maxSize) {
        if (onError) {
            onError('File size exceeds limit. Please upload an image smaller than 3MB.');
        }
         
        return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
        onSuccess(reader.result as string);
    };

    reader.readAsDataURL(file);
};