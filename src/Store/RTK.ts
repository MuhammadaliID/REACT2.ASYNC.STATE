import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export let getUsers = createAsyncThunk("users/getUsers",
    async () => {
        try {
            let { data } = await axios.get("https://6a56fbf4b17de7bebbdeaff0.mockapi.io/PEOPLE")
            return data
        } catch (error) {
            console.log();

        }
    }
)

// DELETE
export let deleteUser = createAsyncThunk("users/deleteUser",
    async (id, { dispatch }) => {
        await axios.delete(`https://6a56fbf4b17de7bebbdeaff0.mockapi.io/PEOPLE/${id}`)
        dispatch(getUsers())
    }
)

// ADD
export let addUser = createAsyncThunk("users/addUser",
    async (user) => {
        await axios.post(`https://6a56fbf4b17de7bebbdeaff0.mockapi.io/PEOPLE`, user);
        return user
    }
)

// EDIT
export let editUser = createAsyncThunk("users/editUser",
    async (user) => {
        await axios.put(`https://6a56fbf4b17de7bebbdeaff0.mockapi.io/PEOPLE/${user.id}`, user)
        return user
    }
)

let userSlice = createSlice({
    name: "users",

    initialState: {
        users: [],
        loading: false
    },
    reducers: {},

    extraReducers: (builder) => {
        builder.addCase(getUsers.pending, (state) => {
            state.loading = true
        })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.loading = false
                state.users = action.payload
            })
            // DELETE
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.users = state.users.filter(
                    (elem) => elem.id !== action.payload
                )
            })

            // ADD
            .addCase(addUser.fulfilled, (state, action) => {
                state.users.push(action.payload)
            })
            // EDIT
            .addCase(editUser.fulfilled, (state, action) => {
                let index = state.users.findIndex(
                    (elem) => elem.id === action.payload.id
                );

                if (index !== -1) {
                    state.users[index] = action.payload;
                }
            })

    },




})

export let store = configureStore({
    reducer: {
        users: userSlice.reducer
    }
});