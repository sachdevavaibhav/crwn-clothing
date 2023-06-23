import { useParams } from "react-router-dom"
import {CategoryContainer, CategoryTitle} from './category.styles'
import { useState, useEffect, Fragment } from "react"
import { useSelector } from "react-redux"
import Spinner from "../../components/spinner/spinner.component"
import { selectCategoriesMap, selectCategoriesIsLoading } from "../../store/categories/categories.selector"
import ProductsCard from "../../components/products-card/products-card.component"

const Category = () => {
    const { category } = useParams()
    console.log('render/re-rendering category component', category)
    const categoriesMap = useSelector(selectCategoriesMap)
    const isLoading = useSelector(selectCategoriesIsLoading)
    const [products, setProducts] = useState(categoriesMap[category])

    useEffect(() => {
        console.log('effect fired calling setProducts', products, categoriesMap)
        setProducts(categoriesMap[category])
    }, [category, categoriesMap])
    return (
        <Fragment>
            <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
            {isLoading ? <Spinner /> : 
                <CategoryContainer>
                    {products && products.map((product) => (
                        <ProductsCard key={product.id} product={product} />
                    ))}
                </CategoryContainer>
            }
        </Fragment>
    )

}

export default Category