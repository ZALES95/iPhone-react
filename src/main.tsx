import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./scss/main.scss"
import { BrowserRouter as Router } from "react-router-dom"
import { StorageContextProvider } from "./Contexts/storageContext.tsx"
import { Provider } from "react-redux"
import store from "./store.ts"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<Router>
		<StorageContextProvider>
			<Provider store={store}>
				<App />
			</Provider>
		</StorageContextProvider>
	</Router>
)
