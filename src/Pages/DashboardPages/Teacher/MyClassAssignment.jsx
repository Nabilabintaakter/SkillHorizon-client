import React from 'react';
import { useParams } from 'react-router-dom';

const MyClassAssignment = () => {
    const {id} = useParams()
    return (
        <div>
            <h1 className="text-4xl font-bold">MyClassAssignment id is {id}</h1>
        </div>
    );
};

export default MyClassAssignment;