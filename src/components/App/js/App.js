import React, { useState } from 'react';
import { useUID } from 'react-uid';

import '../styles/App.scss';
import UserTable from '../../Tables/js/UserTable';
import AddEditForm from '../../Form/js/AddEditForm';

const App = () => {
  // static initial state
  const usersData = [
      { id: 1, name: 'Tania', username: 'floppydiskette' },
      { id: 2, name: 'Craig', username: 'siliconeidolon' },
      { id: 3, name: 'Ben', username: 'benisphere' },
    ],
    UID=useUID(),

    // users hook
    [users, setUsers] = useState(usersData),
    [editUser, setEditUser] = useState({name: '', username: ''}),
    
    // logic for handling add or edit user submit
    handleAddEditSubmit = (userData) => {
      // if userData.id is present then it means that it is an edit action.
      if (userData.id) {
        setUsers(users.map(user => user.id === userData.id ? userData: user));
      }
      
      // else add action
      else{
        userData.id = UID;
        setUsers([...users, userData]);
      }

      // clear the form after submit
      setEditUser({name: '', username: ''});
    },
    handleEditUser = (userId) => { 
      const user = users.find(function (user) {
        return user.id === userId;
      });
      setEditUser(user);
    },
    handleDeleteUser = (userId) => {
      // @todo: can't delete a user which is in editing mode
      // use isEditing state to indicate the editing mode
      const filteredUsers = users.filter(user => user.id !== userId);
      setUsers(filteredUsers);
    };

  return (
    <div className="container">
      <h1>Simple CRUD App</h1>
      <div className="flex-row">
        <div className="flex-large">
          <AddEditForm onAddEditSubmit={handleAddEditSubmit} user={editUser}/>
        </div>
        <div className="flex-large">
          <h2>View users</h2>
          <UserTable 
            users={users} 
      
            onEditUser={handleEditUser} 
            onDeleteUser={handleDeleteUser}
          />
        </div>
      </div>
    </div>
  )
};

export default App;
