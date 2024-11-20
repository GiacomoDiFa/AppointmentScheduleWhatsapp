import { useMutation, useQueryClient } from "react-query";
import { postContact } from "../../api/contact/contactAxios";

export function usePostContact() {
    const queryClient = useQueryClient();

    const { mutate: addContact, isLoading } = useMutation(postContact, {
        onSuccess: () => {
            queryClient.invalidateQueries('contacts');
        },
        onError: (error) => {
            console.error("Errore durante l'aggiunta dell'utente:", error);
            window.alert('Si è verificato un errore. Verifica i dati inseriti.');
        },
    });

    return {
        addContact,
        isLoading,
    };
}
