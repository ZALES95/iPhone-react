import { createSlice } from "@reduxjs/toolkit"

export const categorySlice = createSlice({
	name: "selectedCategory",
	initialState: { value: "all" },
	reducers: {
		setCategory: (state, action) => {
			state.value = action.payload
		},
	},
})

export const { setCategory } = categorySlice.actions

export default categorySlice.reducer
