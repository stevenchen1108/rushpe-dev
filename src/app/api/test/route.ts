
import { collection, addDoc } from "firebase/firestore";
import { db, fireStorage } from "@/../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        return new NextResponse(JSON.stringify({ message: 'GET request received' }), {
            status: 200,
            headers: {
            'Content-Type': 'application/json',
            },
        });
    } catch (e) {
        return new NextResponse(JSON.stringify({ error: 'GET request received' }), {
            status: 400,
            headers: {
            'Content-Type': 'application/json',
            },
        });
    }
  }

export async function POST(request: NextRequest) {
    const postData: any = await request.formData();
    try {
        // console.log('Input Data', postData, typeof(postData));
        const imgFile = postData.get('targetFile');
        const nonFieldData = JSON.parse(postData.get('nonFieldData'));
        // console.log(imgFile, nonFieldData);
        const storageRef = ref(fireStorage, `firstUploads/${imgFile.name}`);
        const uploadTask = await uploadBytesResumable(storageRef, imgFile);
        const downloadURL = await getDownloadURL(storageRef);
        nonFieldData.imgFileDownloadURL = downloadURL;
        const docRef = await addDoc(collection(db, "form-data"), nonFieldData);
        console.log("Document written with ID: ", docRef.id);
        const serverlessResponse = new NextResponse(JSON.stringify({ message: 'POST request received', data: postData }), {
            status: 200,
            headers: {
            'Content-Type': 'application/json',
            },
        });
        return serverlessResponse;
    } catch (e) {
        console.error("Error adding document: ", e);
        return new NextResponse(JSON.stringify({ error: 'POST request received' }), {
            status: 400,
            headers: {
            'Content-Type': 'application/json',
            },
        });
    }
  }
