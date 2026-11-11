
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { getUsers, deleteUser, addUser, editUser } from './Store/RTK'

function RTK() {
    let dispatch = useDispatch()

    let { users, loading } = useSelector((state) => state.users)

    let [openAdd, setOpenAdd] = useState(false)
    let [openEdit, setOpenEdit] = useState(false)
    let [editingUser, setEditingUser] = useState(null)

    let { register, handleSubmit, reset } = useForm()

    useEffect(() => {
        dispatch(getUsers())
    }, [])

    // ADD
    let saveAdd = (data) => {
        dispatch(addUser(data))
        reset()
        setOpenAdd(false)
    }

    // EDIT
    let openEditDialog = (user) => {
        setEditingUser(user)

        reset({
            name: user.name,
            age: user.age,
            avatar: user.avatar
        })

        setOpenEdit(true)
    }

    let saveEdit = (data) => {
        dispatch(editUser({
            id: editingUser.id,
            name: data.name,
            age: data.age,
            avatar: data.avatar
        }))

        reset()
        setEditingUser(null)
        setOpenEdit(false)
    }

    return (
        <div>
            <h1>Users</h1>

            <button onClick={() => {
                reset()
                setOpenAdd(true)
            }}>
                ADD USER
            </button>

            {/* ADD DIALOG */}
            {openAdd && (
                <div className="dialog">
                    <form onSubmit={handleSubmit(saveAdd)}>
                        <h2>Add User</h2>

                        <input
                            {...register("name")}
                            placeholder="Name"
                        />

                        <input
                            {...register("age")}
                            placeholder="Age"
                        />

                        <input
                            {...register("avatar")}
                            placeholder="Image URL"
                        />

                        <button type="submit">ADD</button>

                        <button
                            type="button"
                            onClick={() => {
                                setOpenAdd(false)
                                reset()
                            }}
                        >
                            CLOSE
                        </button>
                    </form>
                </div>
            )}

            {/* EDIT DIALOG */}
            {openEdit && (
                <div className="dialog">
                    <form onSubmit={handleSubmit(saveEdit)}>
                        <h2>Edit User</h2>

                        <input
                            {...register("name")}
                            placeholder="Name"
                        />

                        <input
                            {...register("age")}
                            placeholder="Age"
                        />

                        <input
                            {...register("avatar")}
                            placeholder="Image URL"
                        />

                        <button type="submit">SAVE</button>

                        <button
                            type="button"
                            onClick={() => {
                                setOpenEdit(false)
                                setEditingUser(null)
                                reset()
                            }}
                        >
                            CLOSE
                        </button>
                    </form>
                </div>
            )}

            {loading && <h2>Loading...</h2>}

            {users.map((elem) => (
                <div key={elem.id}>
                    <img
                        src={elem.avatar}
                        alt=""
                        width="100"
                        height="100"
                        style={{ objectFit: "cover" }}
                    />

                    <h2>{elem.name}</h2>
                    <h3>{elem.age}</h3>

                    <button onClick={() => openEditDialog(elem)}>
                        EDIT
                    </button>

                    <button onClick={() => dispatch(deleteUser(elem.id))}>
                        DELETE
                    </button>
                </div>
            ))}
        </div>
    )
}

export default RTK
