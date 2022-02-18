import { createClient, dedupExchange, fetchExchange } from "urql";
import { cacheExchange } from "@urql/exchange-graphcache";
import { ArticlesDocument, ArticlesQuery } from "../generated/graphql";
import schema from "../generated/graphql";

const urqlClient = createClient({
    url: "http://localhost:7000/graphql",
    /*fetchOptions: {
        credentials: "include"
    }*/
    exchanges: [
        dedupExchange,
        cacheExchange({
            schema,
            updates: {
                Mutation: {
                    deleteArticle: (_result, args, cache, info) => {
                        cache.updateQuery<ArticlesQuery>({ query: ArticlesDocument }, data => {
                            if (!_result.deleteArticle) return data;

                            const result = data?.articles.filter(article => article.id !== args.id);
                            return { articles: result } as ArticlesQuery;
                        });
                    }
                }
            }
        }),
        fetchExchange
    ]
});

export default urqlClient;
