import "../scss/header.scss"
import React from "react"
import HeaderFunctionality from "./HeaderFunctionality"
import CTA from "./CTA"
import headerPhoto from "../assets/header-photo2.png"

const Header: React.FC = () => {
	return (
		<HeaderFunctionality img={{ display: true, src: headerPhoto }}>
			<h1 className='header__title'>Zaksięguj swój zakup</h1>
			<p className='header__desc'>
				Wpisz jaki produkt ostatnio kupiłeś lub sprzedałeś. Miej wgląd do Twoich
				zakupów i analizuj statystyki związane ze sprzedażą!
			</p>
			<CTA link={true} size='big' />
		</HeaderFunctionality>
	)
}

export default Header
