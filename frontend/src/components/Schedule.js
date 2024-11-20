import { useParams } from 'react-router-dom';
import UserItem from './UserItem';
import { useDeleteUser } from '../hooks/user/useDeleteUser';

function Schedule({ usersList }) {
    const { data } = useParams();

    const { deleteUserFn, isLoadingDeleteUser } = useDeleteUser(data);

    async function handleDeleteUser(user) {
        console.log("Deleting user:", user, "on date:", data);
        deleteUserFn({ user, giorno:data });
    }
    
    return (
        <>
            {usersList
                .sort((a, b) => a.orario.localeCompare(b.orario)) // Ordina per orario come stringhe
                .map(user => (
                    <UserItem
                        key={user.numero}
                        handleDeleteUser={handleDeleteUser}
                        user={user}
                        showDateAndTime={true} />
                ))}
        </>
    );
}

export default Schedule;
