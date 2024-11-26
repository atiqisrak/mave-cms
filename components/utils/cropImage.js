// src/utils/cropImage.js

/**
 * Creates an HTMLImageElement from a given URL.
 * @param {string} url - The source URL of the image.
 * @returns {Promise<HTMLImageElement>} - A promise that resolves to the loaded image.
 */
const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous"); // This enables CORS
    image.src = url;
  });

/**
 * Returns the cropped image as a blob URL.
 * @param {string} imageSrc - The source URL of the image.
 * @param {Object} pixelCrop - The cropping area in pixels.
 * @param {number} rotation - The rotation angle in degrees.
 * @returns {Promise<string>} - A promise that resolves to the cropped image URL.
 */
export default async function getCroppedImg(imageSrc, pixelCrop, rotation = 0) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const maxSize = Math.max(image.width, image.height);
  const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

  // Set canvas dimensions to the safe area to accommodate rotation
  canvas.width = safeArea;
  canvas.height = safeArea;

  // Translate and rotate the canvas context
  ctx.translate(safeArea / 2, safeArea / 2);
  ctx.rotate((rotation * Math.PI) / 180);
  ctx.translate(-safeArea / 2, -safeArea / 2);

  // Draw the rotated image onto the canvas
  ctx.drawImage(
    image,
    safeArea / 2 - image.width / 2,
    safeArea / 2 - image.height / 2
  );

  // Extract the cropped area from the rotated image
  const data = ctx.getImageData(0, 0, safeArea, safeArea);

  // Set canvas dimensions to the size of the cropped area
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // Draw the cropped image data onto the new canvas
  ctx.putImageData(
    data,
    Math.round(-safeArea / 2 + image.width / 2 - pixelCrop.x),
    Math.round(-safeArea / 2 + image.height / 2 - pixelCrop.y)
  );

  // Convert the canvas to a blob and create a URL for it
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error("Canvas is empty"));
        return;
      }
      const croppedImageUrl = URL.createObjectURL(blob);
      resolve(croppedImageUrl);
    }, "image/jpeg");
  });
}
