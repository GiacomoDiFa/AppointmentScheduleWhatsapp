import { useMutation, useQueryClient } from "react-query";
import { deleteUser } from "../../api/user/userAxios.js";

export function useDeleteUser(giorno) {
    const queryClient = useQueryClient()

    const { mutate: deleteUserFn, isLoading } = useMutation(deleteUser, {
        onSuccess: (data) => {
            queryClient.invalidateQueries(['users', giorno]);
        },
        onError: (error) => {
            console.error("Errore durante la mutazione:", error);
        }
    });

    return { deleteUserFn, isLoading }

}