export const uploadFileToS3 = async (file, userId) => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const getUrlResponse = await fetch(
        `${API_BASE_URL}/upload-url?fileName=${encodeURIComponent(file.name)}&fileType=${encodeURIComponent(file.type)}`,
        { method: 'GET' }
    );

    if (!getUrlResponse.ok) {
        const err = await getUrlResponse.text();
        throw new Error("Error obteniendo URL firmada: " + err);
    }

    const data = await getUrlResponse.json();

    const uploadURL = data.uploadURL; 
    if (!uploadURL) throw new Error("Lambda no devolvió la URL firmada");

    const s3Upload = await fetch(uploadURL, {
        method: 'PUT',
        headers: { "content-type": file.type },
        body: file
    });

    if (!s3Upload.ok) {
        throw new Error("Error subiendo el archivo a S3");
    }

    const publicFileURL = uploadURL.split("?")[0];

    const updateDb = await fetch(`${API_BASE_URL}/users/profile`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
            userId: userId,
            profilePhotoURL: publicFileURL
        })
    });

    if (!updateDb.ok) {
        throw new Error("Error actualizando perfil del usuario");
    }

    return publicFileURL;
};
