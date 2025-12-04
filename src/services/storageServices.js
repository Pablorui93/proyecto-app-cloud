const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const BUCKET_NAME = 'TU-NOMBRE-DEL-BUCKET-S3-AQUI';

export const uploadFileToS3 = async (file, userId) => {

    const getUrlResponse = await fetch(
        `${API_BASE_URL}/upload-url?fileName=${file.name}&fileType=${file.type}`,
        { method: 'GET' }
    );

    if (!getUrlResponse.ok) throw new Error("Fallo al obtener la URL firmada.");

    const { uploadURL, fileKey } = await getUrlResponse.json();
    const publicFileURL = `https://${BUCKET_NAME}.s3.amazonaws.com/${fileKey}`;

    console.log("Subiendo directamente a AWS S3...");
    const s3UploadResponse = await fetch(uploadURL, {
        method: 'PUT',
        headers: { 'Content-Type': file.type },
        body: file,
    });

    if (!s3UploadResponse.ok) throw new Error("Fallo la subida a S3.");
    console.log("Subida a S3 exitosa.");

    const updateDbResponse = await fetch(`${API_BASE_URL}/users/profile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userId: userId,
            profilePhotoURL: publicFileURL
        })
    });

    if (updateDbResponse.ok) {
        return publicFileURL;
    }
    throw new Error("Fallo al actualizar el perfil en DynamoDB.");
};