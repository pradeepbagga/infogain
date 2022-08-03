import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const addTransactionSlice = createSlice({
    name: "Add Transaction",
    initialState: {
        error: null,
        loader: false,
        message: null
    },
    reducers: {
        clearError(state, action) {
            state.error = null
        },
        clearMessage(state, action) {
            state.message = null
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addTransactionAction.pending, (state, action) => {
            // console.log("addCase PENDING - ");
            // console.log("addCase action - ", action);
            state.loader = true;
        });
        builder.addCase(addTransactionAction.fulfilled, (state, action) => {
            // console.log("addCase fulfilled - ");
            // console.log("addCase action - ", action);
            state.loader = false;
            state.message = action.payload.message;
        });
        builder.addCase(addTransactionAction.rejected, (state, action) => {
            // console.log("addCase rejected - ");
            // console.log("addCase action - ", action);
            state.loader = false;
            state.error = action.payload;
        });
    }
});

export const { clearError, clearMessage } = addTransactionSlice.actions;
export default addTransactionSlice.reducer;

export const addTransactionAction = createAsyncThunk("transaction/add", 
    async (formData, {rejectWithValue}) => {
        // console.log("ACTION - ", formData);
        const config = { headers: { "Content-Type":"application/json"} };
        try {
            const res = await axios.post('/api/addTransaction', formData, config)            ;
            // console.log("res - ", res);
            return res.data;
            // if(res.data) {
            //     return res.data
            // }
            // else {
            //     return rejectWithValue()
            // }
        } catch (error) {
            // console.log("error - ", error);     
            // if(error) {
            //     throw error;
            // }
            return rejectWithValue(error.response.data.error);
        }
    }
);