export const selectCategoriesMap = (state) => {
  console.log('selector fired', state)
  return state.categories.categories.reduce((acc, categoriesArray)=>{
    const {title, items} = categoriesArray
    acc[title.toLowerCase()] = items
    return acc
  }, {})}
  