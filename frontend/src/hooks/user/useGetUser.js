import { useQuery } from "react-query";
import { getUser } from "../../api/user/userAxios.js";

export function useGetUser(giorno) {
    const { isError, isLoading, data } = useQuery(
        ['users', giorno],
        () => getUser(giorno),
        {
            onError: (error) => {
                console.log("Errore nel recupero degli utenti:", error);
            }
        }
    )
    return { isError, isLoading, data }
}
