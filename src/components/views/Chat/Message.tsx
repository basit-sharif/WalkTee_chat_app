import React from 'react';

const Message = ({ alldataOfSingleUser, name, message, id, isOwner }: any) => {
    return (
        <div className={`bg-gray-100 py-1 px-2 rounded-sm shadow-md mb-4 max-w-sm ${isOwner ? "ml-auto" : "mr-auto"}`}>
            <h3 className="text-xs font-semibold text-gray-600">SenderName : <span className='text-purple-500'>{alldataOfSingleUser?.fullname ? alldataOfSingleUser.fullname : "NaN"}</span> , WT ID: <span className='text-purple-500'>{id}</span></h3>
            <p className="text-gray-900 ">{message}</p>
        </div>
    );
};

export default Message;