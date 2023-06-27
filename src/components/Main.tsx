import React, { useState, useContext, useEffect } from "react"
import "../scss/mainSection.scss"
import { StorageContext } from "../Contexts/storageContext"
import { CategoryContext } from "../Contexts/categoryContext"
import SingleCard from "./SingleCard"
import PhoneInterface from "../interfaces/PhoneInterface"
import AllStats from "./AllStats"

const Main: React.FC = () => {
	const { selectedCategory, setSelectedCategory } =
		useContext<any>(CategoryContext)
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
		setSelectedCategory(e.target.value)
	}

	useEffect(() => {
		if (storagePhones) {
			setDisplayedCards(storagePhones)
		} else {
			setDisplayedCards([])
		}
	}, [storagePhones])

	useEffect(() => {
		switch (selectedCategory) {
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
	}, [selectedCategory])

	useEffect(() => {
		if (displayedCards) {
			if (selectedCategory !== "stats") {
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
						value={selectedCategory}>
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
