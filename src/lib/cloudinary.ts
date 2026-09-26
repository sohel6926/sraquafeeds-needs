/**
 * Cloudinary image upload utility.
 * Sends image data to /api/upload which securely signs with the API secret
 * and uploads to Cloudinary folder 'sraqua'.
 */
export async function uploadImageToCloudinary(fileOrDataUrl: string | File): Promise<string> {
  // If it's already an external HTTP/HTTPS URL, no need to re-upload
  if (typeof fileOrDataUrl === 'string' && fileOrDataUrl.startsWith('http')) {
    return fileOrDataUrl;
  }

  let payload = '';

  if (typeof fileOrDataUrl === 'string') {
    payload = fileOrDataUrl;
  } else {
    // Convert File to data url
    payload = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(fileOrDataUrl);
    });
  }

  const response = await fetch('/api/upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ file: payload }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to upload image to Cloudinary');
  }

  const data = await response.json();
  if (!data.url) {
    throw new Error('No image URL returned from Cloudinary');
  }

  return data.url;
}
