import SingleStats from "./SingleStats"
import { StorageContext } from "../Contexts/storageContext"
import { useContext, useEffect, useState } from "react"

const AllStats: React.FC = () => {
	const { storagePhones } = useContext<any>(StorageContext)
	const [statsArr, setStatsArr] = useState<JSX.Element[] | undefined>(undefined)
	useEffect(() => {
		const calculateStats = (whatToCalculate: string) => {
			const arrToReturn = []
			if (storagePhones) {
				for (const el of storagePhones) {
					if (el.isSold) {
						if (whatToCalculate === "profit") {
							arrToReturn.push(
								parseInt(el.salePrice) - parseInt(el.purchasePrice)
							)
						}
						if (whatToCalculate === "saleSum") {
							arrToReturn.push(parseInt(el.salePrice))
						}
						if (whatToCalculate === "numberOfSales") {
							arrToReturn.push(parseInt(el.id))
						}
						if (whatToCalculate === "margin") {
							arrToReturn.push(
								((parseInt(el.salePrice) - parseInt(el.purchasePrice)) /
									parseInt(el.purchasePrice)) *
									100
							)
						}
					}
					if (whatToCalculate === "purchaseSum") {
						arrToReturn.push(parseInt(el.purchasePrice))
					}
					if (whatToCalculate === "numberOfPurchases") {
						arrToReturn.push(parseInt(el.id))
					}
				}

				if (
					whatToCalculate === "numberOfPurchases" ||
					whatToCalculate === "numberOfSales"
				) {
					return arrToReturn.length
				}

				if (whatToCalculate === "margin") {
					if (arrToReturn.length === 0) {
						return 0
					} else {
						return (
							arrToReturn.reduce((prev, current) => {
								return prev + current
							}, 0) / arrToReturn.length
						).toFixed(0)
					}
				}

				if (
					whatToCalculate === "purchaseSum" ||
					whatToCalculate === "saleSum" ||
					whatToCalculate === "profit"
				) {
					return arrToReturn.reduce((prev, current) => {
						return prev + current
					}, 0)
				}
			}
		}

		setStatsArr([
			<SingleStats
				key='zysk'
				name='zysk'
				iconClass='fa-solid fa-chart-line'
				statNumber={`${calculateStats("profit")}zł`}
			/>,
			<SingleStats
				key='kupiono za'
				name='kupiono za'
				iconClass='fa-solid fa-credit-card'
				statNumber={`${calculateStats("purchaseSum")}zł`}
			/>,
			<SingleStats
				key='sprzedano za'
				name='sprzedano za'
				iconClass='fa-solid fa-money-bill-transfer'
				statNumber={`${calculateStats("saleSum")}zł`}
			/>,
			<SingleStats
				key='ilość kupionych'
				name='ilość kupionych'
				iconClass='fa-solid fa-cart-shopping'
				statNumber={`${calculateStats("numberOfPurchases")}`}
			/>,
			<SingleStats
				key='ilość sprzedanych'
				name='ilość sprzedanych'
				iconClass='fa-solid fa-check'
				statNumber={`${calculateStats("numberOfSales")}`}
			/>,
			<SingleStats
				key='marża'
				name='marża'
				iconClass='fa-solid fa-percent'
				statNumber={`${calculateStats("margin")}%`}
			/>,
		])
	}, [storagePhones])

	return <>{statsArr}</>
}

export default AllStats
