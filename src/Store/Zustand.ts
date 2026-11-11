import axios from "axios";
import { create } from "zustand";




export let useData = create((set) => ({
    data: [],

    getUser: async () => {
        try {
            let { data } = await axios.get("https://6a56fbf4b17de7bebbdeaff0.mockapi.io/Zustand")
            set({ data: data })
        } catch (error) {
            console.log(error);
        }
    },

    deleteUsers: async (id) => {
        try {
            await axios.delete(`https://6a56fbf4b17de7bebbdeaff0.mockapi.io/Zustand/${id}`)
            set((state) => ({
                data: state.data.filter((elem) => elem.id !== id)
            }))
        } catch (error) {
            console.log(error);

        }
    },

    addUser: async (user) => {
        try {
            await axios.post(`https://6a56fbf4b17de7bebbdeaff0.mockapi.io/Zustand`, user)
            set((state) => ({
                data: [...state.data, user]
            }))
        } catch (error) {
            console.log(error);
        }
    },
    

    editUser: async (user) => {
        try {
            await axios.put(`https://6a56fbf4b17de7bebbdeaff0.mockapi.io/Zustand/${user.id}`, user)
            set((state) => ({
                data: state.data.map((elem) => elem.id === user.id ? user : elem)
            }))
        } catch (error) {
            console.log(error);
        }

}}))