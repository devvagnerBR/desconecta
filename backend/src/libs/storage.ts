import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/database/firebase"



export class Storage {

    createImageUrl = async ( file: any ) => {

        const imageRef = ref( storage, `avatar/${file.originalname}` );
        const metadata = { contentType: file.mimetype };

        const snapshot = await uploadBytesResumable(
            imageRef,
            file.buffer,
            metadata
        );

        const URL: string = await getDownloadURL( snapshot.ref );
        return URL;

    }
}