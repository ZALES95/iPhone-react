import React from "react"
import "../scss/singleCard.scss"
import StatsProp from "../interfaces/StatsInterface"

const SingleStats: React.FC<StatsProp> = props => {
	return (
		<div className='singleCard'>
			<h3 className='singleCard__statTitle'>{props.name}</h3>
			<i className={`${props.iconClass} singleCard__icon`}></i>
			<p className='singleCard__stat'>{props.statNumber}</p>
		</div>
	)
}

export default SingleStats
