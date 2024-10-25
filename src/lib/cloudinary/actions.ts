'use server'
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryUploadWidgetInfo } from 'next-cloudinary';

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

export async function uploadImage(formData: FormData, name: string) {
    const image = formData.get('newProductImage') as File;   
    const arrayBuffer = await image.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    const cloudinaryResponse = await new Promise((resolve, reject) => {

        cloudinary.uploader.upload_stream({folder: "minimarket", }, function (error, result) {
            if (error) { reject(error); console.log(error.message);
            ;throw new Error(error.message); };
            resolve(result as CloudinaryUploadWidgetInfo)

        }).end(buffer)
    }
    )
    return cloudinaryResponse;
}

export async function updateImage (public_id: string) {
    const cloudinaryResponse = await new Promise((resolve, reject) => {
        cloudinary.uploader.destroy(public_id, {})

    }
    )

    return cloudinaryResponse;
}