import React from "react"
import SingleCardStyles from "../scss/SingleCard.module.scss"
import StatsProp from "../interfaces/StatsInterface"

const SingleStats: React.FC<StatsProp> = props => {
	return (
		<div className={SingleCardStyles.singleCard}>
			<h3 className={SingleCardStyles.statTitle}>{props.name}</h3>
			<i className={`${props.iconClass} ${SingleCardStyles.icon}`}></i>
			<p className={SingleCardStyles.stat}>{props.statNumber}</p>
		</div>
	)
}

export default SingleStats
