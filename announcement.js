import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore, doc, getDoc, getDocs, collection, setDoc, Timestamp,  } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-analytics.js'
import { getStorage, uploadBytes, ref } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-storage.js'

document.addEventListener('DOMContentLoaded', () => {
    main();
});

let logAllFormElements;

function main() {
    const firebaseConfig = {
        apiKey: "AIzaSyB1BGeV-hh8I1KzPbT2Pj7CFAc57He18GA",
        authDomain: "purrfect-match-b4b6d.firebaseapp.com",
        projectId: "purrfect-match-b4b6d",
        storageBucket: "purrfect-match-b4b6d.appspot.com",
        messagingSenderId: "820376621662",
        appId: "1:820376621662:web:c01b0d00202f634697dacf",
        measurementId: "G-ZHXVXF04LE"
    };

    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const db = getFirestore(app);
    const storage = getStorage(app)

    const title = document.querySelector('input[name="title"]');
    const orgName = document.querySelector('input[name="orgName"]');
    const body = document.getElementById("body")




    /*
     Form elements
     */




    const form = document.getElementById('newcat');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const docTitle = title.value;
        const docOrg = orgName.value;
        const docBody = body.value;

        await setDoc(doc(db, "announcements", docTitle+docOrg), {
            title : docTitle,
            organization : docOrg,
            body : docBody,
            time : Date.now()
        }).then (() => {
            alert('Submitted document!')


        })



    })




}


function getFileExtension (filename){
    return filename.substring(filename.lastIndexOf('.')+1, filename.length) || filename;
}



