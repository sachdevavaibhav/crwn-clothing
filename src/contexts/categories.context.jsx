import { createContext, useState, useEffect } from "react"

import {getCategoriesAndDocumnets} from '../utils/firebase/firebase.utils.js'

// import SHOP_DATA from '../shop-data.js'

export const CategoriesContext = createContext({
    categoriesMap: {}
})

export const CategoriesProvider = ({ children }) => {
    const [categoriesMap, setCategoriesMap] = useState({})
    useEffect(() => {
        const getCategoryMap = async () => {
            const categoryMap = await getCategoriesAndDocumnets()
            setCategoriesMap(categoryMap)
        }
        getCategoryMap() 
    }, [])
    const value = {  categoriesMap }
    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
}

