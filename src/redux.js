import db from "./firestore";
 
const initialState = {
  filter: '',
  list: []
};

const SET_FILTER = "SET_FILTER";
const GET_PRODUCTS = 'GET_PRODUCTS';
const SWITCH_ITEM_CHECK_STATUS = 'SWITCH_ITEM_CHECK_STATUS';

export const setFilter = filterParam => ({
  type: SET_FILTER,
  payload: filterParam
})

export const switchItemCheckStatus = (checked, ref) => ({
  type: SWITCH_ITEM_CHECK_STATUS,
  ref: ref,
  payload: checked
})

export const getProducts = list => ({
  type: GET_PRODUCTS,
  payload: list
})

export const getProductsThunk = () => dispatch => {
  db.collection('products')
    .orderBy('name', 'asc')
    // .limit(15)
    .onSnapshot(collection => {

      const list = collection.docs.map(doc => ({
        ref: doc.id,
        name: doc.data().name,
        checked: doc.data().checked,
        onList: doc.data().onList,
        filter: true
      }))
      dispatch(getProducts(list))
    })
}


const rootReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case SET_FILTER:
      return {
        ...prevState,
        filter: action.payload
      }
    case GET_PRODUCTS:
      return {
        ...prevState,
        list: action.payload
      }
    case SWITCH_ITEM_CHECK_STATUS:
      return {
        ...prevState,
        list: prevState.list.map(item => 
          item.ref === action.ref
            ? {...item, checked: action.payload}
            : item
        )
      }
    default:
      return prevState;
  }
};

export default rootReducer;