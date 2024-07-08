import { configureStore } from "@reduxjs/toolkit";

import AuthSliceReducer from "./Slices/AuthSlice";
import TicketSliceReducer from "./Slices/TicketSlice";

const store = configureStore({
    reducer: {
        auth: AuthSliceReducer,
        tickets: TicketSliceReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
    devTools: true
});

export default store;