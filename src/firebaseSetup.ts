import { initializeApp } from "firebase/app"
import { getFirestore, collection, query, orderBy } from "firebase/firestore"

const firebaseConfig = {
	apiKey: import.meta.env.VITE_API_KEY,
	authDomain: "iphone-react-app.firebaseapp.com",
	projectId: "iphone-react-app",
	storageBucket: "iphone-react-app.appspot.com",
	messagingSenderId: "801822559376",
	appId: "1:801822559376:web:396b63ad8513e2a3c05c15",
}

//init firebase
initializeApp(firebaseConfig)

//init services (db to baza danych)
export const db = getFirestore()

//collection reference (podajemy skąd i jaka kolekcja)
export const devicesRef = collection(db, "devices")

//ordered by sth
export const orderedDevicesRef = query(devicesRef, orderBy("createdAt", "desc"))
