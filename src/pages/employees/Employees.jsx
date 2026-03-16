import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Employees = () => {
    const {user} = useContext(AuthContext)
    console.log(user);
    return (
        <div>
            this is emply list
        </div>
    );
};

export default Employees;