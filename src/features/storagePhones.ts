import {createSlice} from "@reduxjs/toolkit"
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

// export const storagePhonesSlice = createSlice({

// })