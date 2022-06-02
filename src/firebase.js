//firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDV6OdaXpIyafCV3wg2-NeXhaRkr7Tif_o",
    authDomain: "vocab-24703.firebaseapp.com",
    projectId: "vocab-24703",
    storageBucket: "vocab-24703.appspot.com",
    messagingSenderId: "190844109969",
    appId: "1:190844109969:web:e8e2e0256a57b22c006b30",
    measurementId: "G-V8XR8474KD"
  };

// firebaseConfig 정보로 firebase 시작
initializeApp(firebaseConfig);

// firebase의 firestore 인스턴스를 변수에 저장
const db = getFirestore();

// 필요한 곳에서 사용할 수 있도록 내보내기
export { db };