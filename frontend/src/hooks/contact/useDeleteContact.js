import { useMutation, useQueryClient } from "react-query";
import { deleteContact } from "../../api/contact/contactAxios";

export function useDeleteContact(){
    const queryClient = useQueryClient();

    const { mutate: deleteContactFn, isLoading } = useMutation(deleteContact, {
        onSuccess: () => {
            queryClient.invalidateQueries('contacts');
        },
        onError: (error) => {
            console.error("Errore durante l'aggiunta dell'utente:", error);
            window.alert('Si è verificato un errore. Verifica i dati inseriti.');
        },
    });

    return {
        deleteContactFn,
        isLoading,
    };
}