import React, { useEffect, useState } from 'react'
import { useData } from './Store/Zustand'
import { useForm } from 'react-hook-form'

function Zustand() {
    let { data, getUser, deleteUsers, addUser, editUser } = useData()

let [open, setOpen] = useState(false)

let [editingUser, setEditingUser] = useState(null)

let {register, handleSubmit, reset} = useForm()


let save = (data) => {
    if(editingUser){
        editUser({
            ...data,
            id: editingUser.id
        })
    } else {
        addUser(data)
    }
    reset()
}


    useEffect(() => {
        getUser()
    }, [])

    return (
        <div>
            <h1>Users</h1>

            <button onClick={() => {
                setEditingUser(null)
                setOpen(true)
            }}>
                Add
            </button>

{open && (
    <form onSubmit={handleSubmit(save)} action="">
<input type="text" placeholder='Name' {...register("name")} />
<input type="text" placeholder='Age' {...register("age")} />
<input type="text" placeholder='Avatar' {...register("avatar")} />
<button type='submit'>Save</button>
    </form>
)}
    


            {data.map((elem) => (
                <div key={elem.id}>
                    <img src={elem.avatar} alt="" width="100" />
                    <h2>{elem.name}</h2>
                    <h3>{elem.age}</h3>
                    <button onClick={() => deleteUsers(elem.id)}>Delete</button>
                    <button onClick={() => {
                        setEditingUser(elem)
                        setOpen(true)
                    }}>Edit</button>
                </div>
            ))}
        </div>
    )
}

export default Zustand