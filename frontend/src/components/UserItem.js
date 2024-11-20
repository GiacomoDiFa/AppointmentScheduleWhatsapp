import React from 'react';
import { GoPerson } from 'react-icons/go';
import { FaCalendarDay } from 'react-icons/fa';
import { CiClock1, CiTrash } from 'react-icons/ci';
import { BsTelephone } from 'react-icons/bs';

const UserItem = ({ user, handleDeleteUser, showDateAndTime = false }) => {
  return (
    <div key={user.numero} className="flex w-full items-center border-b border-gray-200 mt-1">
      <div>
        <div className="flex items-center gap-x-2 ml-4">
          <GoPerson size={20} />
          <div className="text-gray-800 font-medium text-lg">
            {user.nome} {user.cognome}
          </div>
        </div>
        <div className="flex items-center gap-x-2 ml-4 text-gray-500">
          {showDateAndTime ? (
            <>
              <FaCalendarDay size={20} />
              <div>{user.data}</div>
              <CiClock1 size={20} />
              <div>{user.orario}</div>
            </>
          ) : (
            <>
              <BsTelephone size={20} />
              <div>{user.numero}</div>
            </>
          )}
        </div>
      </div>

      <div className="flex ml-auto mr-4">
        <div onClick={() => handleDeleteUser(user)} className="cursor-pointer">
          <CiTrash color="red" size={30} />
        </div>
      </div>
    </div>
  );
};

export default UserItem;
