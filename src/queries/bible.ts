import { getBibles } from "@/actions/bible";
import { queryOptions, useQuery } from "@tanstack/react-query";

const biblesQueryOptions = queryOptions({
    queryKey: ['bibles'],
    queryFn: getBibles
})

export const useBibles = () => useQuery(biblesQueryOptions)