import { initUrqlClient } from "next-urql";
import { cacheExchange, dedupExchange, fetchExchange, ssrExchange } from "urql";

const createUrqlClientOnServer = () => {
    const ssrCache = ssrExchange({ isClient: false });
    const client = initUrqlClient({
        url: process.env.GRAPHQL_ENDPOINT || "",
        exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
    }, false);

    return { client, ssrCache };
}

export default createUrqlClientOnServer;
