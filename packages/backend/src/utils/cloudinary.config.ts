import cloudinary from 'cloudinary';

// Configurando Cloudinary con mi clave de API
export default function configureCloudinary() {
    cloudinary.v2.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
}
