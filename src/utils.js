// Check WebP support
export const supportsWebP = (() => {
  if (typeof window === 'undefined') return false;

  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;

  return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
})();

export const transformImageUrl = (imageUrl) => {
  if (typeof imageUrl === 'string' && imageUrl) {
    // If it's a culturelens cloud URL, extract the filename
    if (imageUrl.startsWith('https://culturelens.cloud/upload/survey/')) {
      const imageName = imageUrl.split('/').pop();
      return `/survey/${imageName}`;
    }

    // If it's just a filename (without path), add the survey path
    if (!imageUrl.startsWith('/') && !imageUrl.startsWith('http') && imageUrl.includes('.')) {
      return `/survey/${imageUrl}`;
    }
  }
  return imageUrl || '';
};

// Create WebP version with fallback
export const createWebPUrl = (imageUrl) => {
  if (!imageUrl) return '';

  const transformedUrl = transformImageUrl(imageUrl);

  if (!transformedUrl || typeof transformedUrl !== 'string') return '';

  if (transformedUrl.startsWith('/survey/')) {
    // Extract filename and extension
    const lastDotIndex = transformedUrl.lastIndexOf('.');
    if (lastDotIndex !== -1) {
      const nameWithoutExt = transformedUrl.substring(0, lastDotIndex);
      const ext = transformedUrl.substring(lastDotIndex + 1).toLowerCase();

      // Only convert jpg/jpeg/png to webp
      if (['jpg', 'jpeg', 'png'].includes(ext)) {
        return `${nameWithoutExt}.webp`;
      }
    }
  }

  return transformedUrl;
};

// Image optimization utilities
export const createOptimizedImageUrl = (imageSrc, options = {}) => {
  const { width, height, quality = 80, format } = options;

  // For local images, we can't dynamically resize them without a server
  // But we can add parameters for future implementation
  if (imageSrc.startsWith('/survey/')) {
    let url = imageSrc;
    const params = new URLSearchParams();

    if (width) params.append('w', width);
    if (height) params.append('h', height);
    if (quality !== 80) params.append('q', quality);
    if (format) params.append('f', format);

    const paramString = params.toString();
    return paramString ? `${url}?${paramString}` : url;
  }

  return imageSrc;
};

// Generate srcset for responsive images
export const generateSrcSet = (imageSrc, sizes = [320, 480, 768, 1024, 1200]) => {
  if (!imageSrc.startsWith('/survey/')) return '';

  return sizes
    .map(size => `${createOptimizedImageUrl(imageSrc, { width: size })} ${size}w`)
    .join(', ');
};

// Compress image client-side (for uploaded images)
export const compressImage = (file, maxWidth = 1200, quality = 0.8) => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      const { width, height } = img;
      const ratio = Math.min(maxWidth / width, maxWidth / height);

      canvas.width = width * ratio;
      canvas.height = height * ratio;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(resolve, 'image/jpeg', quality);
    };

    img.src = URL.createObjectURL(file);
  });
};
