import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

import { setCategoriesMap } from '../../store/categories/categories.action'
import { useDispatch } from 'react-redux'
import {getCategoriesAndDocumnets} from '../../utils/firebase/firebase.utils.js'

import CategoriesPreview from '../categories-preview/categories-preview.component'
import Category from '../category/category.component'

const Shop = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const getCategoryMap = async () => {
            const categoryMap = await getCategoriesAndDocumnets()
            dispatch(setCategoriesMap(categoryMap))
        }
        getCategoryMap() 
    }, [])
    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=':category' element={<Category/>} />
        </Routes>
    )
}

export default Shop