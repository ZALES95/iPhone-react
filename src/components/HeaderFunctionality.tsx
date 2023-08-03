import "../scss/header.scss"
import React, { ReactNode } from "react"

type HeaderFunctionalityProps = {
	children: ReactNode
	img: {
		display: boolean
		src?: string
	}
}

const HeaderFunctionality: React.FC<HeaderFunctionalityProps> = props => {
	return (
		<header className='header section-padding'>
			<div className='wrapper'>
				<div className='header__info'>{props.children}</div>
				{props.img.display && (
					<img
						src={props.img.src}
						alt='Zdjęcie iPhone z tryskającymi kolorami'
						className='header__image'
					/>
				)}
			</div>
		</header>
	)
}

export default HeaderFunctionality
