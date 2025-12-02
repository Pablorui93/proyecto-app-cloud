const fetchUserProfileWithCache = async (userId) => {
    const profileCache = {}; 
    
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    if (profileCache[userId]) {
        console.log(`Cache Hit: Perfil ${userId} encontrado.`);
        return profileCache[userId];
    }

    console.log(`Cache Miss: Consultando API para el perfil ${userId}.`);
    
    try {
        const response = await fetch(`${API_BASE_URL}/users/${userId}`);
        
        if (response.ok) {
            const profileData = await response.json();

            profileCache[userId] = profileData;
            return profileData;
        } else {
            return { username: "Desconocido", profilePhotoURL: "/default-avatar.png" };
        }
    } catch (error) {
        console.error("Error de red al obtener perfil:", error);
        return { username: "Error de Red", profilePhotoURL: "/default-avatar.png" };
    }
};

export default fetchUserProfileWithCache;