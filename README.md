📌 Commlink Chat — Proyecto Completo (Frontend + Backend Serverless)

Chat funcional con subida de fotos, perfiles, manejo de canales y mensajes, utilizando React + Vite y backend AWS Serverless (Lambda, API Gateway, DynamoDB, S3).

🧩 1. Descripción General del Proyecto

  Commlink Chat es una aplicación de mensajería que permite:

      Ver una lista de canales
      Seleccionar un canal y ver su historial
      Enviar mensajes de texto
      Enviar imágenes, que se almacenan en S3 mediante URLs firmadas
      Configurar una foto de perfil personalizada
      Guardar mensajes y perfiles en DynamoDB
      Consumir servicios serverless mediante API Gateway + Lambdas


🏛️ 2. Arquitectura General

El frontend está desarrollado en React (Vite) y deployeado en Vercel.
El backend es completamente serverless, sin servidores ni contenedores.

    React (Vite)
      |
      |  GET / POST (interacciones del frontend)
      v
    API Gateway (REST)
      |
      |  Invocación de endpoints
      v
    Lambda Functions
      |
      |  Lectura / escritura de datos
      v
    DynamoDB (Users, Messages)


    Subida de archivos (imágenes del chat):

    React (Vite)
      |
      |  Solicita una URL firmada (GET /upload-url)
      v
    API Gateway
      |
      v
    Lambda (get_signed_url)
      |
      |  Devuelve Signed URL
      v
    React (Vite)
      |
      |  PUT del archivo directamente a S3 usando la URL firmada
      v
    Amazon S3


🧬 3. Backend AWS — Detalles
  ✔️ 3.1. Endpoints creados
      📌 Upload de archivos
      Método	Endpoint	Lambda
      GET	/upload-url	chat_get_signed_url
      📌 Usuarios
      Método	Endpoint	Lambda
      GET	/users	GetUserById
      GET	/users/{userId}	GetUserById
      POST	/profile	chat_update_profile
      📌 Mensajes
      Método	Endpoint	Lambda
      POST	/messages	chat_post_message
      GET	/messages/{channelId}	chat_get_messages
    ✔️ 3.2. Lambda: Generar URL firmada (S3)

        Código implementado:

        upload_url = s3_client.generate_presigned_url(
            'put_object', 
            Params={
                'Bucket': BUCKET_NAME,
                'Key': object_key,
                'ContentType': content_type
            },
            ExpiresIn=300 
        )


        Devuelve:

        {
          "uploadURL": "...signed url...",
          "fileKey": "uploads/nombre.png"
        }

        ✔️ 3.3. Tabla DynamoDB

          Tabla: Users
            userId (PK)
            profilePhotoURL

          Tabla: Messages
            channelId (PK)
            timestamp (SK)
            userId
            content

          ✔️ 3.4. CORS S3 Fix (IMPORTANTE)

            Configuración aplicada:

            {
              "CORSRules": [
                {
                  "AllowedHeaders": ["*"],
                  "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
                  "AllowedOrigins": ["*"],
                  "ExposeHeaders": []
                }
              ]
            }

🎨 4. Frontend (React + Vite)
  ✔️ 4.1. Tecnologías usadas

      React
      React Hooks
      Fetch API
      Zustand (deprecated warning fijo)
      CSS modular (un archivo por componente)
      Vite
      Despliegue en Vercel

✔️ 4.2. Estructura del proyecto
  src/
  App.jsx
  App.css
  hooks/ useServices.js
  Components/
  --ChannelList/
  ----ChannelList.jsx
  ----ChannelList.css
  --MessageList/
  ----MessageList.jsx
  ----MessageList.css
  --MessageItem/
  ----MessageItem.jsx
  ----MessageItem.css
  --MessageInput/
  ----MessageInput.jsx
  ----MessageInput.css
  --UserProfileSettings/
  ----UserProfileSettings.jsx
  ----serProfileSettings.css

📸 5. Subida de Fotos
  ✔️ Flujo completo implementado

      El usuario selecciona un archivo.

      El frontend pide a la Lambda una URL firmada:
      GET /upload-url?fileName=...&fileType=...

      La Lambda devuelve un enlace PUT a S3.

      El frontend sube directamente la imagen a S3.

      La URL pública final se guarda en DynamoDB (perfil o mensaje).

      El chat muestra la imagen.

Código en frontend:

const getUrlResponse = await fetch(
    `${API_BASE_URL}/upload-url?fileName=${file.name}&fileType=${file.type}`
);

const uploadURL = data.uploadURL;

await fetch(uploadURL, {
    method: 'PUT',
    headers: { "content-type": file.type },
    body: file
});

🖼️ 6. Perfiles de Usuario

    El componente UserProfileSettings permite cargar foto.

    La imagen se sube a S3.
    DynamoDB guarda la URL final.
    MessageItem la usa como avatar automáticamente.

💬 7. Envío y visualización de mensajes
    ✔️ Flujo:

      MessageInput envía texto o imagen
      chat_post_message guarda en DynamoDB
      MessageList hace fetch periódico (poll) para actualizar
      MessageItem renderiza avatar, nombre, hora e imagen si existe



🚀 9. Despliegue en Vercel
    Pasos realizados:

    Subir repo a GitHub

    Importar en Vercel

    Configurar variables:
    VITE_API_BASE_URL=https://uw0muj9ubb.execute-api.us-east-2.amazonaws.com

    Deploy automático

🔧 10. Cómo correr local
      1. Instalar dependencias
      npm install

      2. Crear .env
      VITE_API_BASE_URL=https://uw0muj9ubb.execute-api.us-east-2.amazonaws.com

      3. Ejecutar:
      npm run dev