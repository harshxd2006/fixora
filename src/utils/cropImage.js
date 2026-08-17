export const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
  });

/**
 * Crop image and resize to 512x512 WebP/JPEG File for profile avatar.
 */
export async function getCroppedImg(
  imageSrc,
  pixelCrop,
  targetWidth = 512,
  targetHeight = 512,
  mimeType = 'image/webp',
  quality = 0.88
) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Canvas 2D context unavailable');
  }

  // Set 512x512 output canvas dimension
  canvas.width = targetWidth;
  canvas.height = targetHeight;

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  // Draw the selected crop rectangle onto 512x512 canvas
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    targetWidth,
    targetHeight
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Canvas blob generation failed'));
          return;
        }
        const ext = mimeType === 'image/webp' ? 'webp' : 'jpg';
        const file = new File([blob], `avatar.${ext}`, { type: mimeType });
        resolve(file);
      },
      mimeType,
      quality
    );
  });
}
