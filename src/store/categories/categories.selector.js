import { createSelector } from "reselect"

const selectCategoryReducer = (state) => state.categories

export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
) 

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) => 
      categories.reduce((acc, categoriesArray)=>{
      const {title, items} = categoriesArray
      acc[title.toLowerCase()] = items
      return acc
    }, {})
)
  