import React from "react"
import { Link } from "react-router-dom"
import BtnStyles from "../scss/CTA.module.scss"

interface CTAProps {
	link: boolean
	size: string
}

const CTA: React.FC<CTAProps> = props => {
	const linkName = "Zaksięguj"
	const btnSize = props.size === "small" ? BtnStyles.small : BtnStyles.big
	return (
		<>
			{props.link ? (
				<Link to='/zaksieguj' className={`${BtnStyles.btn} ${btnSize}`}>
					{linkName}
				</Link>
			) : (
				<button className={`${BtnStyles.btn} ${btnSize}`}>{linkName}</button>
			)}
		</>
	)
}

export default CTA
