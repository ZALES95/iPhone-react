import Main from "./components/Main"
import Header from "./components/Header"
import Nav from "./components/Nav"
import BookingInputs from "./components/BookingInputs"
import { Routes, Route } from "react-router-dom"

function App() {
	return (
		<>
			<Routes>
				<Route
					path='*'
					element={
						<>
							<Nav link={true} />
							<Header />
							<Main />
						</>
					}
				/>
				<Route
					path='/'
					element={
						<>
							<Nav link={true} />
							<Header />
							<Main />
						</>
					}
				/>
				<Route
					path='/zaksieguj'
					element={
						<>
							<Nav link={false} />
							<BookingInputs />
							<Main />
						</>
					}
				/>
			</Routes>
		</>
	)
}

export default App
