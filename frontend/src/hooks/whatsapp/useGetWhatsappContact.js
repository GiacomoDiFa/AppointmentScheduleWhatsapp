import { useQuery } from "react-query";
import { getWhatsappContact } from "../../api/whatsapp/whatsappAxios";

export function useGetWhatsappContact() {
    const { isError, isLoading, data } = useQuery(
        ['whatsapp-contacts'],
        () => getWhatsappContact(),
        {
            onError: (error) => {
                console.log("Errore nel recupero degli utenti:", error);
            }
        }
    )
    return { isError, isLoading, data }
}