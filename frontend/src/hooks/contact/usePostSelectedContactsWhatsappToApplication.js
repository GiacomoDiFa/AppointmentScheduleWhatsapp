import { useMutation, useQueryClient } from "react-query";
import { postSelectedContactsWhatsappToApplication } from "../../api/contact/contactAxios";

export function usePostSelectedContactsWhatsappToApplication() {
    const queryClient = useQueryClient()

    const { mutate: WhatsAppToApplication, isLoading } = useMutation(postSelectedContactsWhatsappToApplication, {
        onSuccess: () => {
            queryClient.invalidateQueries('contacts');
        },
        onError: (error) => {
            console.error("Errore durante l'aggiunta dell'utente:", error);
            window.alert('Si è verificato un errore. Verifica i dati inseriti.');
        },
    });

    return {
        WhatsAppToApplication,
        isLoading,
    };
}
