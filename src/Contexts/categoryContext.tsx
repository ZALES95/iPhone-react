import React, { useState } from "react"

const CategoryContext = React.createContext<object | undefined>(undefined)

const CategoryContextProvider = (props: { children: React.ReactNode }) => {
	const [selectedCategory, setSelectedCategory] = useState<string>("all")
	return (
		<CategoryContext.Provider
			value={{ selectedCategory, setSelectedCategory }}>
			{props.children}
		</CategoryContext.Provider>
	)
}

export { CategoryContextProvider, CategoryContext }
