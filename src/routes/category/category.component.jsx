import { useParams } from "react-router-dom"
import {CategoryContainer, CategoryTitle} from './category.styles'
import { useContext, useState, useEffect, Fragment } from "react"
import { CategoriesContext } from "../../contexts/categories.context"
import ProductsCard from "../../components/products-card/products-card.component"

const Category = () => {
    const { category } = useParams()
    const {categoriesMap} = useContext(CategoriesContext)
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