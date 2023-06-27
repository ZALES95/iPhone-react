import React, { useState, useEffect } from "react"
import PhoneInterface from "../interfaces/PhoneInterface"
import {
	onSnapshot,
	addDoc,
	deleteDoc,
	doc,
	serverTimestamp,
	updateDoc,
} from "firebase/firestore"
import { orderedDevicesRef, db, devicesRef } from "../firebaseSetup"
import PurchaseInterface from "../interfaces/PurchaseInterface"
import ContextType from "../interfaces/StorageContextType"
import SalesInterface from "../interfaces/SalesInterface"

const StorageContext = React.createContext<ContextType | undefined>(undefined)

const StorageContextProvider = (props: { children: React.ReactNode }) => {
	const [storagePhones, setStoragePhones] = useState<PhoneInterface[]>()

	useEffect(() => {
		onSnapshot(orderedDevicesRef, snapshot => {
			const devices: any = []
			snapshot.docs.forEach(doc => {
				devices.push({ ...doc.data(), id: doc.id })
			})
			setStoragePhones(devices)
		})
	}, [])

	const addingDevice = (
		form: PurchaseInterface,
		setForm: (object: PurchaseInterface) => void
	) => {
		addDoc(devicesRef, {
			box: form.box,
			name: form.name,
			color: form.color,
			battery: form.battery,
			memory: form.memory,
			purchaseDate: form.purchaseDate?.toLocaleDateString("pl", {
				month: "short",
				day: "numeric",
				year: "numeric",
			}),
			purchasePrice: form.purchasePrice,
			saleDate: "",
			salePrice: "",
			isSold: false,
			img: form.img,
			createdAt: serverTimestamp(),
		}).then(() => {
			setForm({
				box: "",
				name: "",
				color: "",
				battery: "",
				memory: "",
				purchaseDate: "",
				purchasePrice: "",
				img: "",
			})
		})
	}

	const deletingDevice = (id: string) => {
		const deletedDocRef = doc(db, "devices", id)
		deleteDoc(deletedDocRef)
	}

	const updatingDevice = (
		form: SalesInterface,
		setForm: (object: SalesInterface) => void,
		id: string
	) => {
		const updatingDocRef = doc(db, "devices", id)
		updateDoc(updatingDocRef, {
			isSold: "true",
			saleDate: form.sellingDate.toLocaleDateString("pl", {
				month: "short",
				day: "numeric",
				year: "numeric",
			}),
			salePrice: form.sellingPrice,
		}).then(() => {
			setForm({
				isSoldCheckbox: false,
				sellingPrice: "",
				sellingDate: "",
			})
		})
	}

	return (
		<StorageContext.Provider
			value={{ storagePhones, addingDevice, deletingDevice, updatingDevice }}>
			{props.children}
		</StorageContext.Provider>
	)
}

export { StorageContextProvider, StorageContext }
