import React, { useState, useContext } from "react"
// import "../scss/singleCard.scss"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { registerLocale } from "react-datepicker"
import pl from "date-fns/locale/pl"
registerLocale("pl", pl)
import { StorageContext } from "../Contexts/storageContext"
import SalesInterface from "../interfaces/SalesInterface"
import PhoneInterface from "../interfaces/PhoneInterface"
import SingleCardStyles from "../scss/SingleCard.module.scss"

interface SingleCardProps {
	info: PhoneInterface
}

const SingleCard: React.FC<SingleCardProps> = props => {
	const [salesForm, setSalesForm] = useState<SalesInterface>({
		isSoldCheckbox: false,
		sellingPrice: "",
		sellingDate: "",
	})

	const { deletingDevice, updatingDevice } = useContext<any>(StorageContext)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, type, checked } = e.target
		setSalesForm(prevObj => {
			return {
				...prevObj,
				[name]: type === "checkbox" ? checked : value,
			}
		})
	}

	const handleDeleting = (e: React.MouseEvent<Element>) => {
		const idToDelete = (e.target as HTMLElement)
			.closest(".singleCard")
			?.getAttribute("id")
		deletingDevice(idToDelete)
	}

	const handleUpdating = (e: React.MouseEvent<Element>) => {
		const idToUpdate = (e.target as HTMLElement)
			.closest(".singleCard")
			?.getAttribute("id")
		updatingDevice(salesForm, setSalesForm, idToUpdate)
	}

	const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (
			salesForm.sellingPrice !== "" &&
			salesForm.sellingDate !== "" &&
			salesForm.isSoldCheckbox &&
			salesForm.sellingDate !== null
		) {
			handleUpdating(e)
		}
	}

	return (
		<div
			className={`${SingleCardStyles.singleCard} singleCard`}
			id={props.info.id}>
			<i
				className={`fa-regular fa-trash-can ${SingleCardStyles.trashIcon}`}
				onClick={handleDeleting}></i>
			<h3 className={SingleCardStyles.title}>{props.info.name}</h3>
			<img
				src={props.info.img}
				alt='phone pic'
				className={SingleCardStyles.image}
			/>
			<div className={SingleCardStyles.infos}>
				<p>Kolor - {props.info.color}</p>
				{props.info.name !== "Sony WH-1000XM3" && (
					<>
						<p>Kondycja baterii - {props.info.battery}%</p>
						<p>Pamięć - {props.info.memory}GB</p>
						<p>Pudełko - {props.info.box === "true" ? "tak" : "nie"}</p>
					</>
				)}
				<p>Kupione za - {props.info.purchasePrice}zł</p>
				<p>Data kupna - {props.info.purchaseDate}</p>
				{props.info.isSold ? (
					<>
						<p>Sprzedane za - {props.info.salePrice}zł</p>
						<p>Data sprzedaży - {props.info.saleDate}</p>
					</>
				) : (
					<div className={SingleCardStyles.form}>
						<label
							htmlFor='singleCard__checkbox'
							className={SingleCardStyles.saleString}>
							Sprzedaj
						</label>
						<input
							type='checkbox'
							id='singleCard__checkbox'
							className={SingleCardStyles.checkbox}
							name='isSoldCheckbox'
							checked={salesForm.isSoldCheckbox}
							onChange={handleChange}
						/>
						{salesForm.isSoldCheckbox && (
							<form onSubmit={handleSubmit} className={SingleCardStyles.form}>
								<input
									type='number'
									name='sellingPrice'
									placeholder='Wpisz za ile sprzedano'
									value={salesForm.sellingPrice}
									onChange={handleChange}
									className={SingleCardStyles.input}
								/>
								<DatePicker
									placeholderText='Wpisz kiedy sprzedano'
									locale='pl'
									name='sellingName'
									selected={salesForm.sellingDate}
									onChange={date =>
										setSalesForm(prevForm => {
											return {
												...prevForm,
												sellingDate: date,
											}
										})
									}
									className={SingleCardStyles.input}
								/>
								<button className={SingleCardStyles.submitBtn}>
									Zatwierdź
								</button>
							</form>
						)}
					</div>
				)}
			</div>
		</div>
	)
}

export default SingleCard
