import { useParams } from "react-router-dom"
import {CategoryContainer, CategoryTitle} from './category.styles'
import { useState, useEffect, Fragment } from "react"
import { useSelector } from "react-redux"
import { selectCategoriesMap } from "../../store/categories/categories.selector"
import ProductsCard from "../../components/products-card/products-card.component"

const Category = () => {
    const { category } = useParams()
    const categoriesMap = useSelector(selectCategoriesMap)
    const [products, setProducts] = useState(categoriesMap[category])

    useEffect(() => {
        setProducts(categoriesMap[category])
    }, [category, categoriesMap])
    return (
        <Fragment>
            <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
            <CategoryContainer>
                {products && products.map((product) => (
                    <ProductsCard key={product.id} product={product} />
                ))}
            </CategoryContainer>
        </Fragment>
    )

}

export default Category