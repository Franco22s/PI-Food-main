import {GET_RECIPES, GET_DIETS, GET_DETAIL_RECIPES, GET_RECIPES_BY_NAME, FILTER_BY_ORIGIN, FILTER_BY_DIET, ORDER_BY_HEALTH_SCORE, ORDER_BY_NAME, POST_RECIPES, FILTER_BY_NAME, SET_CURRENT_PAGE} from './actionType'


const initialState = {
    filteredRecipes: [],
    recipes: [],
    diets: [],
    details: [],
    currentPage: 1,
}


const reducer = (state= initialState, {type, payload}) => {
    switch(type){
        case GET_RECIPES:
            return {
                ...state,
                recipes:payload,
                filteredRecipes:payload
            };

        case GET_DIETS:
            return {
                ...state,
                diets: payload};

        case GET_DETAIL_RECIPES:
            return{
                ...state,
                details: payload};

        case FILTER_BY_NAME:
            const filteredRecipes = state.recipes.filter((recip) => recip.name.toLowerCase().includes(payload.toLowerCase())
                );
                return {
                    ...state,
                    filteredRecipes,
                    currentPage: 1
                };            


        case GET_RECIPES_BY_NAME:
            return {
                ...state,
                filteredRecipes: payload,
            };
        
                  
        case FILTER_BY_ORIGIN:
                const originValue = payload.toLowerCase();
                let filterRecipes = [];
              
                if (originValue === "database") {
                  filterRecipes = state.recipes.filter(recipe => {
                    return typeof recipe.id === "string" && recipe.id.includes("-");
                  });
                } else if (originValue === "api") {
                  filterRecipes = state.recipes.filter(recipe => {
                    return typeof recipe.id === "number" || (typeof recipe.id === "string" && !recipe.id.includes("-"));
                  });
                } else {
                  filterRecipes = state.recipes;
                }
              
                return {
                  ...state,
                  filteredRecipes: filterRecipes
                };
              
        

        case FILTER_BY_DIET:
            const filterValue = payload === "all" ? undefined : payload;
            const recipFilter = state.recipes.filter(recipe => {
                return !filterValue || (recipe.diets && recipe.diets.includes(filterValue));
            });

            return {
                ...state,
                filteredRecipes: recipFilter
            };

        case ORDER_BY_HEALTH_SCORE:
                const sorted = [...state.filteredRecipes].sort((a, b) => {
                  return a.healthScore - b.healthScore;
                });
              
                if (payload === "Descending") {
                    sorted.reverse();
                }
              
                return {
                  ...state,
                  filteredRecipes: sorted
                };
              
          

        case ORDER_BY_NAME:
                    const sortedRecipes = [...state.filteredRecipes].sort((a, b) => {
                        return a.name.localeCompare(b.name);
                    });
                    if (payload === "Z-A") {
                        sortedRecipes.reverse();
                    }
                    return {
                        ...state,
                        filteredRecipes: sortedRecipes
                    };

        case POST_RECIPES: 
            return{
                ...state};



        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: payload,
                    };     
                

        default:
            return state
    }
};




export default reducer; 