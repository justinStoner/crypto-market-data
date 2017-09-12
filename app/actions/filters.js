export const addFilter = (action) => {
  return{
    type:'ADD_FILTER',
    payload:action
  }
}

export const removeFilter = (action) => {
  return{
    type:'REMOVE_FILTER',
    payload:action
  }
}
