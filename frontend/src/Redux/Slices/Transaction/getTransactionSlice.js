import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const getAllTransactionSlice = createSlice({
    name: "Get All Transaction",
    initialState: {
        error: null,
        loader: false,
        data: null
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
        builder.addCase(getAllTransactionAction.pending, (state, action) => {
            // console.log("addCase PENDING - ");
            // console.log("addCase action - ", action);
            state.loader = true;
        });
        builder.addCase(getAllTransactionAction.fulfilled, (state, action) => {
            // console.log("addCase fulfilled - ");
            // console.log("addCase action - ", action);
            state.loader = false;
            state.data = action.payload;
        });
        builder.addCase(getAllTransactionAction.rejected, (state, action) => {
            // console.log("addCase rejected - ");
            // console.log("addCase action - ", action);
            state.loader = false;
            state.error = action.payload;
        });
    }
});

export const { clearError, clearMessage } = getAllTransactionSlice.actions;
export default getAllTransactionSlice.reducer;

export const getAllTransactionAction = createAsyncThunk("transaction/getAllTrans", 
    async (payload, {rejectWithValue}) => {
        try {
            const {data} = await axios.get('/api/allTransaction');
            // console.log("res - ", data.data);
            return data.data;
        } catch (error) {
            // console.log("error - ", error);     
            // if(error) {
            //     throw error;
            // }
            return rejectWithValue(error.response.data.error);
        }
    }
);