import { configureStore } from "@reduxjs/toolkit"
import  CreateSagaMiddleware  from "redux-saga"

import RootSagas from "./Sagas/RootSagas"
import RootReducer from "./Reducers/RootReducer"

const  sagaMiddleware = CreateSagaMiddleware()

const Store = configureStore({
    reducer:RootReducer,
    middleware : () => [sagaMiddleware]
})
export default Store

sagaMiddleware.run(RootSagas)