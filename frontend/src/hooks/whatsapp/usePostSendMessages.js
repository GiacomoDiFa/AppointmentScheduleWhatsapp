import { useMutation, useQueryClient } from "react-query";
import { postSendMessages } from "../../api/whatsapp/whatsappAxios";

export function usePostSendMessages(giorno) {
    const queryClient = useQueryClient()
    const { mutate: sendMessages, isLoading } = useMutation(postSendMessages,{
        onSuccess:(data) => {
            queryClient.invalidateQueries(['whatsapp', giorno])
        },
        onError: (error) => {
            console.error("Errore durante la mutazione:", error);
        }
    }
        
    )
    return { sendMessages, isLoading }
}


// E' da fare una post e non una get