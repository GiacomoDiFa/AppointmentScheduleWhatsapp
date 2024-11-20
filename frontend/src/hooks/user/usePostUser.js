import { useMutation, useQueryClient } from "react-query";
import { postUser } from "../../api/user/userAxios.js";

export function usePostUser(giorno) {
    const queryClient = useQueryClient()

    const { mutate: addUser, isLoading } = useMutation(postUser, {
        onSuccess: (data) => {
            queryClient.invalidateQueries(['users', giorno]);
        },
        onError: (error) => {
            console.error("Errore durante la mutazione:", error);
        }
    });
    
    return { addUser, isLoading }
}

