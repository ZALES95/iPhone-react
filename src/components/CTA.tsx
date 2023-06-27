import React from "react"
import { Link } from "react-router-dom"

interface CTAProps {
	link: boolean
	size: string
}

const CTA: React.FC<CTAProps> = props => {
	const linkName = "Zaksięguj"
	return (
		<>
			{props.link ? (
				<Link to='/zaksieguj' className={`header__link btn-${props.size}`}>
					{linkName}
				</Link>
			) : (
				<button className={`header__link btn-${props.size}`}>{linkName}</button>
			)}
		</>
	)
}

export default CTA
