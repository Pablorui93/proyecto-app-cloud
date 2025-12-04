
import React, { useState } from 'react';
import { uploadFileToS3 } from '../../services/storageServices';

function UserProfileSettings({ currentUserId }) {
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setLoading(true);
        setStatus('Iniciando subida...');

        try {
            await uploadFileToS3(file, currentUserId);
            setStatus(`¡Subida a S3 y perfil actualizado!`);
        } catch (error) {
            setStatus(`Error: ${error.message}`);
            console.error("Fallo la subida:", error);
        } finally {
            setLoading(false);
            event.target.value = null;
        }
    };

    return (
        <div className="profile-settings">
            <h4>{loading ? 'Subiendo...' : 'Actualizar Foto (S3)'}</h4>
            <input
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                disabled={loading}
            />
            <p className="status-message">{status}</p>
        </div>
    );
}

export default UserProfileSettings;