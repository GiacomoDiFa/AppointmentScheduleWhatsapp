import { useQuery } from "react-query";
import { getQrCode } from "../../api/whatsapp/whatsappAxios";

export function useGetQrCode() {
    const { isError, isLoading, data } = useQuery(
        ['qrcode'],
        () => getQrCode(),
        {
            onError: (error) => {
                console.log("Errore nel recupero degli utenti:", error);
            }
        }
    )
    return { isError, isLoading, data }
}