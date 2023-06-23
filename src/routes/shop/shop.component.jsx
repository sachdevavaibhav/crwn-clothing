import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

import { fetchCategoriesStartAsync } from '../../store/categories/categories.action'
import { useDispatch } from 'react-redux'

import CategoriesPreview from '../categories-preview/categories-preview.component'
import Category from '../category/category.component'

const Shop = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCategoriesStartAsync())
    }, [])
    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=':category' element={<Category/>} />
        </Routes>
    )
}

export default Shop