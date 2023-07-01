import React from 'react';
import '../css/UserTable.css';

function UserTable({ users }) {
    return (
        <div className="view-Area">
            <div className="user-table">
                <div className="title-table">
                    <h2>Searched Users</h2>
                </div>
                {users.length === 0 ? (
                    <p id="warn-msg">No users searched yet.</p>
                ) : (
                    <table>
                        <thead className='table-header'>
                            <tr>
                                <th>Name</th>
                                <th>Age</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={index}>
                                    <td>{user.name}</td>
                                    <td>{user.age ? (user.age) : 43}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default UserTable;
