import React, { useState, useEffect } from 'react';

const AddEditForm = (props) => {
    const initialState = {name: '', username: ''}, 
        [user, setUser] =  useState(props.user),
        handleChange = (e) => {
            const {name, value} = e.target;
            setUser({...user, [name]: value});
        },
        
        // returns a copy for add or edit user operation
        getAddEditCopy=() => {
            return user.id? 'Edit User': 'Add User';
        };

    useEffect(() => {
        setUser(props.user);
    }, [props.user]);

    return (
        <div>
            <h2>{getAddEditCopy()}</h2>
            <form>
                <label>Name</label>
                <input type='text' name='name' value={user.name} onChange={handleChange} />
                <label>Username</label>
                <input type='text' name='username'value={user.username}  onChange={handleChange} />
                <button onClick={(e) => { 
                    e.preventDefault();  
                    if (!user.name || !user.username) return;

                    props.onAddEditSubmit(user);
                    setUser(initialState);
                }}>{getAddEditCopy()}</button>
            </form>
        </div>     
    )
};

export default AddEditForm;