
const profileCache = {};
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


export const fetchUserProfileWithCache = async (userId) => {
    if (profileCache[userId]) {
        console.log(`Cache Hit: ${userId}`);
        return profileCache[userId];
    }

    try {
        const response = await fetch(`${API_BASE_URL}/users/${userId}`);

        if (response.ok) {
            const profileData = await response.json();
            profileCache[userId] = profileData;
            return profileData;
        } else {
            return { username: userId, profilePhotoURL: "./question-mark-1019820_1280.webp" };
        }
    } catch (error) {
        console.error("Error de red al obtener perfil:", error);
        return { username: "Error de Red", profilePhotoURL: "/default-avatar.png" };
    }
};