import {useQuery} from 'react-query'
import { getContact } from '../../api/contact/contactAxios'

export function useGetContact(){
    const {isError, isLoading, data} = useQuery(
        {
            queryKey:'contacts',
            queryFn: getContact,
        }
    )

    return {isError, isLoading, data}
}