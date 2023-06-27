import "../scss/header.scss"
import React, { useState, useContext } from "react"
import HeaderFunctionality from "./HeaderFunctionality"
import CTA from "./CTA"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { registerLocale } from "react-datepicker"
import pl from "date-fns/locale/pl"
registerLocale("pl", pl)
import PhotosData from "../PhotosData"
import { nanoid } from "nanoid"
import PurchaseInterface from "../interfaces/PurchaseInterface"
import { StorageContext } from "../Contexts/storageContext"
import HeaderPhoto2 from "../assets/header-photo2.png"

const BookingInputs: React.FC = () => {
	const { addingDevice } = useContext<any>(StorageContext)
	const [nameOptions, setNameOptions] = useState<JSX.Element[]>([])
	const [notValidInputs, setNotValidInputs] = useState<boolean>(false)
	const [purchaseForm, setPurchaseForm] = useState<PurchaseInterface>({
		box: "",
		name: "",
		color: "",
		battery: "",
		memory: "",
		purchaseDate: "",
		purchasePrice: "",
		img: "",
	})

	const handleChange = (e: any) => {
		const { name, type, checked } = e.target
		let { value } = e.target
		if (name === "battery" || name === "purchasePrice") {
			if (value < 0) {
				value *= -1
			} else if (name === "battery" && value > 100) {
				value = value.slice(0, -1)
			}
		}
		if (name === "name") {
			let searchedPhoto = PhotosData.find(el => el.name === value)?.img
			if (searchedPhoto === undefined) {
				searchedPhoto = HeaderPhoto2
			}
			setPurchaseForm((prevObj: any) => {
				return {
					...prevObj,
					img: searchedPhoto,
				}
			})
		}
		setPurchaseForm(prevObj => {
			return {
				...prevObj,
				[name]: type === "checkbox" ? checked : value,
			}
		})
	}

	const handleSubmit = (e: any) => {
		e.preventDefault()
		if (purchaseForm.name === "Sony WH-1000XM3") {
			if (validateInputs("Sony WH-1000XM3")) {
				setNotValidInputs(false)
				addingDevice(purchaseForm, setPurchaseForm)
			} else {
				setNotValidInputs(true)
			}
		} else {
			if (validateInputs()) {
				setNotValidInputs(false)
				addingDevice(purchaseForm, setPurchaseForm)
			} else {
				setNotValidInputs(true)
			}
		}
	}

	const validateInputs = (purchaseName?: string) => {
		if (purchaseName === "Sony WH-1000XM3") {
			if (
				purchaseForm.color !== "" &&
				purchaseForm.purchaseDate !== "" &&
				purchaseForm.purchaseDate !== null &&
				purchaseForm.purchasePrice !== ""
			) {
				return true
			} else {
				return false
			}
		} else {
			let shouldValidate = true
			for (const property in purchaseForm) {
				if (
					(typeof (purchaseForm as any)[property] === "string" &&
						(purchaseForm as any)[property].trim() === "") ||
					(purchaseForm as any)[property] === null
				) {
					shouldValidate = false
				}
			}
			return shouldValidate
		}
	}

	React.useEffect(() => {
		const optionsArr: JSX.Element[] = []
		for (const phone of PhotosData) {
			optionsArr.push(
				<option key={nanoid()} value={phone.name}>
					{phone.name}
				</option>
			)
		}

		setNameOptions(optionsArr)
	}, [])

	return (
		<HeaderFunctionality img={{ display: false }}>
			<h1 className='header__title'>Zaksięguj swój zakup</h1>
			<form onSubmit={handleSubmit} className='header__form'>
				<div className='header__allInputs'>
					<select
						onChange={handleChange}
						name='name'
						className='header__input'
						value={purchaseForm.name}>
						<option value='' disabled>
							Nazwa
						</option>
						{nameOptions}
					</select>
					<select
						onChange={handleChange}
						name='color'
						className='header__input'
						value={purchaseForm.color}>
						<option value='' disabled>
							Kolor
						</option>
						<option value='czarny'>czarny</option>
						<option value='srebrny'>srebrny</option>
						{purchaseForm.name !== "Sony WH-1000XM3" && (
							<>
								<option value='czerwony'>czerwony</option>
								<option value='fioletowy'>fioletowy</option>
								<option value='zielony'>zielony</option>
								<option value='żółty'>żółty</option>
								<option value='niebieski'>niebieski</option>
								<option value='złoty'>złoty</option>
							</>
						)}
					</select>
					{purchaseForm.name !== "Sony WH-1000XM3" && (
						<>
							<input
								type='number'
								name='battery'
								placeholder='Kondycja'
								value={purchaseForm.battery}
								onChange={handleChange}
								className='header__input'
								min={0}
								max='100'
							/>

							<select
								onChange={handleChange}
								name='memory'
								className='header__input'
								value={purchaseForm.memory}>
								<option value='' disabled>
									Pamięć
								</option>
								<option value='64'>64GB</option>
								<option value='128'>128GB</option>
								<option value='256'>256GB</option>
							</select>
							<select
								onChange={handleChange}
								name='box'
								className='header__input'
								value={purchaseForm.box}>
								<option value='' disabled>
									Pudełko
								</option>
								<option value='tak'>Tak</option>
								<option value='nie'>Nie</option>
							</select>
						</>
					)}

					<input
						type='number'
						name='purchasePrice'
						placeholder='Cena zakupu'
						value={purchaseForm.purchasePrice}
						onChange={handleChange}
						className='header__input'
						min={0}
					/>
					<DatePicker
						placeholderText='Data zakupu'
						name='purchaseName'
						locale='pl'
						selected={purchaseForm.purchaseDate}
						onChange={date =>
							setPurchaseForm(prevForm => {
								return {
									...prevForm,
									purchaseDate: date,
								}
							})
						}
						className='header__input'
					/>
				</div>
				{notValidInputs && (
					<div className='header__errorMsg'>
						Musisz wypełnić wszystkie pola!
					</div>
				)}
				<CTA link={false} size='big' />
			</form>
		</HeaderFunctionality>
	)
}

export default BookingInputs
