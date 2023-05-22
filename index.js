import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore, doc, getDoc, getDocs, collection, setDoc } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
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



    /*
     Form elements
     */

    const catName = document.querySelector('input[name="name"]');
    const orgName = document.querySelector('input[name="orgName"]');
    const catAge = document.querySelector('input[name="age"]');
    const gender = document.querySelector('input[name="gender"]');
    const imageRef = document.querySelector('input[name="image"]')
    const resetButton = document.getElementById('resetButton')



    logAllFormElements = () => {
        console.log(catName.value);
        console.log(orgName.value);
        console.log(catAge.value);
        console.log(gender.value);
        console.log(imageRef.value);

    }

    catName.addEventListener('keydown', (pressed)=>{
        if (pressed.keyCode == 'L'.charCodeAt(0)) {
            logAllFormElements();
        }
    })



    const form = document.getElementById('newcat');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const name = catName.value;
        const org = orgName.value;
        const age = catAge.value;
        const sex = gender.value;
        const image = imageRef.value;

        const ID = org+name;

        const file = imageRef.files[0];
        const fExtension = imageRef.files[0].type;
        const reader = new FileReader();
        reader.onload = (file) => {
            const blob = file.target.result;
            console.log(blob);
        }

        await setDoc(doc(db, "cats", ID), {
            name : name,
            org : org,
            age : age,
            sex : sex,
            imageID : ID,
            isAdopted: false,
            extension : fExtension
        })

        const storageRef = ref(storage, 'cats/' + ID)
        uploadBytes(storageRef, file).then((snapshot) => {
            resetButton.click()
            alert('Uploaded cat picture of ' + catName.value + ' successfully!')
        })


    })




}


function getFileExtension (filename){
    return filename.substring(filename.lastIndexOf('.')+1, filename.length) || filename;
}




