import { configureStore } from "@reduxjs/toolkit"
import categoryReducer from "./features/category.ts"

const store = configureStore({
	reducer: {
		selectedCategory: categoryReducer,
	},
})

export default store
