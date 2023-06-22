import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

import { setCategories } from '../../store/categories/categories.action'
import { useDispatch } from 'react-redux'
import {getCategoriesAndDocumnets} from '../../utils/firebase/firebase.utils.js'

import CategoriesPreview from '../categories-preview/categories-preview.component'
import Category from '../category/category.component'

const Shop = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const getCategoryMap = async () => {
            console.log('shop component effect')
            const categoriesArray = await getCategoriesAndDocumnets()
            dispatch(setCategories(categoriesArray))
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