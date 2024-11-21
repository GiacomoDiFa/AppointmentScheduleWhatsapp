import { useQuery } from "react-query";
import { getClientStatus } from "../../api/whatsapp/whatsappAxios";

export function useGetClientStatus() {
    const { isError, isLoading, data } = useQuery(
        ['client-status'],
        () => getClientStatus(),
        {
            onError: (error) => {
                console.log("Errore nel recupero degli utenti:", error);
            }
        }
    )
    return { isError, isLoading, data }
}