
import { collection, addDoc } from "firebase/firestore";
import { db, fireStorage } from "@/../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export async function POST(request) {
    const postData = await request.formData();
    try {
        // console.log('Input Data', postData, typeof(postData));
        const imgFile = postData.get('targetFile');
        const nonFieldData = JSON.parse(postData.get('nonFieldData'));
        // console.log(imgFile, nonFieldData);
        const storageRef = ref(fireStorage, `firstUploads/${imgFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, imgFile);
        const downloadURL = await getDownloadURL(storageRef);
        nonFieldData.imgFileDownloadURL = downloadURL;
        const docRef = await addDoc(collection(db, "form-data"), nonFieldData);
        console.log("Document written with ID: ", docRef.id);
        return new Response(JSON.stringify({ message: 'POST request received', data: postData }), {
            status: 200,
            headers: {
            'Content-Type': 'application/json',
            },
        });
    } catch (e) {
        console.error("Error adding document: ", e);
        return new Response(JSON.stringify({ error: 'POST request received' }), {
            status: 400,
            headers: {
            'Content-Type': 'application/json',
            },
        });
    }
  }
