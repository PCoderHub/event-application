import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    eventData: {},
}

const eventSlicer = createSlice({
    name: 'eventData',
    initialState,
    reducers: {
        addEventInfo: (state, action) => {
            state.eventData = {...action.payload}
            console.log(state.eventData);
        }
    }
});

export const {addEventInfo} = eventSlicer.actions;
export default eventSlicer.reducer;