const initialState = {
    dogs: [], 
    allDogs: [], 
    temperaments: [],
    detail: {}
}

function rootReducer(state = initialState, action){
    switch(action.type){
                case 'GET_ALL_DOGS':
                    return{
                        ...state,
                        dogs: action.payload,
                        allDogs: action.payload
                    }
                case 'GET_DETAILS': 
                    return{
                        ...state,
                        detail: action.payload
                    }
                case 'GET_NAME_DOGS': 
                return{
                    ...state,
                    dogs: action.payload
                }
                case "GET_TEMPERAMENTS":
                    return {
                        ...state, 
                        temperaments: action.payload
                }
                case "POST_DOGS":
                    return {
                        ...state
                }
                case 'ORDER_BY_A_Z':
                        let sortedAZ = action.payload === 'asc' ? state.dogs.sort((first, second) => { return first.name > second.name ? 1 : -1}) :
                        state.dogs.sort((first, second) => { return first.name > second.name ? -1 : 1});
                        return{
                            ...state,
                            dogs: sortedAZ
                        }
                case "ORDER_BY_WEIGHT":
                    let sortWeight = action.payload === 'Heavier' ? 
                    state.dogs.sort((first, second) => second.weight_min - first.weight_min) : state.dogs.sort((first, second) => first.weight_min - second.weight_min)
                    return{
                            ...state,
                            dogs: sortWeight
                        }
                case "FILTER_TEMPERAMENT":
                    const allDogs = state.allDogs;
                    const temperamentsFilter = action.payload === "all" ? allDogs : allDogs.filter(e => {return e.temperament.includes(action.payload)});
                    return {
                        ...state,
                        dogs: temperamentsFilter
                    }
                case 'FILTER_CREATED':
                    const createdFilter = action.payload === 'created' ? state.allDogs.filter(dog => dog.createId) :  state.allDogs.filter(dog => !dog.createId);
                    return{
                        ...state,
                        dogs: action.payload === 'all' ? state.allDogs : createdFilter
                    }  
                default:
                    return state
            }
}

export default rootReducer;