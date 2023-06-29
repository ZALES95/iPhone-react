import React from "react"
import CTA from "./CTA"
import { Link } from "react-router-dom"
import "../scss/nav.scss"
import { useDispatch } from "react-redux"
import { setCategory } from "../features/category"

interface NavProps {
	link: boolean
}

const Nav: React.FC<NavProps> = props => {
	const dispatch = useDispatch()

	const handleCategoryChange = (category: string) => {
		setTimeout(() => dispatch(setCategory(category)), 300)
	}

	return (
		<nav style={{ borderBottom: "1px solid white" }} className='nav'>
			<ul className='wrapper nav__container'>
				<li className='nav__logo'>
					<Link to='/' className='nav__link'>
						<i className='fa-solid fa-book'></i>
						<span className='nav__logo-text'>Logo</span>
					</Link>
				</li>
				<li className='nav__item'>
					<a
						href='#main'
						className='nav__link'
						onClick={() => {
							handleCategoryChange("all")
						}}>
						Podgląd
					</a>
				</li>
				<li className='nav__item'>
					<a
						className='nav__link'
						href='#main'
						onClick={() => {
							handleCategoryChange("stats")
						}}>
						Statystyki
					</a>
				</li>
				<li className='nav__item'>
					<a className='nav__link' href='https://www.olx.pl/' target='_blank'>
						Kupuj
					</a>
				</li>
				<li className='nav__item'>
					<CTA link={props.link} size='small' />
				</li>
			</ul>
		</nav>
	)
}

export default Nav
