import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./scss/main.scss"
import { BrowserRouter as Router } from "react-router-dom"
import { StorageContextProvider } from "./Contexts/storageContext.tsx"
import { CategoryContextProvider } from "./Contexts/categoryContext.tsx"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<Router>
		<StorageContextProvider>
			<CategoryContextProvider>
				<App />
			</CategoryContextProvider>
		</StorageContextProvider>
	</Router>
)
