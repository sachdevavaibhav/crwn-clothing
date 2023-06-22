import { createAction } from "../../utils/reducer/createAction.utils";
import { CATEGORIES_ACTION_TYPES } from "./categories.types";

export const setCategories = (categoriesArray) => {
    return createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categoriesArray)
}