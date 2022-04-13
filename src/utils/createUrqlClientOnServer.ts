import { initUrqlClient } from "next-urql";
import { cacheExchange, dedupExchange, fetchExchange, ssrExchange } from "urql";

export const ssrCache = ssrExchange({ isClient: false });
const client = initUrqlClient({
    url: "http://localhost:7000/graphql",
    exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
}, false);

export default client;
