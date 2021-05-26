const todos = (state = [], action) => {
    switch (action.type) {
        case 'User_Info':
          return action.Obj
        default:
          return state
      }
  }
  
  export default todos
  