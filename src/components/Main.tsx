import React, { useState, useContext, useEffect } from "react"
import "../scss/mainSection.scss"
import { StorageContext } from "../Contexts/storageContext"
import SingleCard from "./SingleCard"
import PhoneInterface from "../interfaces/PhoneInterface"
import AllStats from "./AllStats"
import { useSelector, useDispatch } from "react-redux"
import { setCategory } from "../features/category"

const Main: React.FC = () => {
	const category = useSelector((state: any) => state.selectedCategory.value)
	const dispatch = useDispatch()

	const { storagePhones } = useContext<any>(StorageContext)
	const [displayedCards, setDisplayedCards] = useState<
		PhoneInterface[] | undefined
	>()
	const [statsToDisplay, setStatsToDisplay] = useState<
		JSX.Element | undefined
	>()
	const [allCards, setAllCards] = useState<
		JSX.Element[] | JSX.Element | undefined
	>([])

	const handleCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
		dispatch(setCategory(e.target.value))
	}

	useEffect(() => {
		if (storagePhones) {
			setDisplayedCards(storagePhones)
		} else {
			setDisplayedCards([])
		}
	}, [storagePhones])

	useEffect(() => {
		switch (category) {
			case "all":
				setDisplayedCards(storagePhones)
				break
			case "current":
				setDisplayedCards(
					storagePhones?.filter((el: PhoneInterface) => !el.isSold)
				)
				break
			case "sold":
				setDisplayedCards(
					storagePhones?.filter((el: PhoneInterface) => el.isSold)
				)
				break
			case "stats":
				setDisplayedCards([])
				setStatsToDisplay(<AllStats />)
				break
			default:
				setDisplayedCards(storagePhones)
		}
	}, [category])

	useEffect(() => {
		if (displayedCards) {
			if (category !== "stats") {
				setAllCards(
					displayedCards?.map(el => {
						return <SingleCard key={el.id.toString()} info={el} />
					}) || []
				)
			} else {
				setAllCards(statsToDisplay)
			}
		} else {
			setAllCards([])
		}
	}, [displayedCards])

	return (
		<main className='main' id='main'>
			<div className='wrapper'>
				<div className='main__category'>
					<select
						onChange={handleCategory}
						name='shownCategory'
						id='shownCategory'
						className='main__select'
						value={category}>
						<option value='all'>wszystkie</option>
						<option value='current'>posiadane</option>
						<option value='sold'>sprzedane</option>
						<option value='stats'>statystyki</option>
					</select>
				</div>
				<div className='main__cards'>{allCards}</div>
			</div>
		</main>
	)
}

export default Main
