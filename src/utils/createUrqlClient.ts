import { dedupExchange, fetchExchange } from "urql";
import { cacheExchange } from "@urql/exchange-graphcache";
import { Article, ArticlesDocument, ArticlesQuery } from "../generated/graphql";
import schema from "../generated/graphql";
import { NextUrqlClientConfig } from "next-urql";
import { transformToDate } from "../cache/transformToDate";
import { ___prod___ } from "../constants";

const createUrqlClient: NextUrqlClientConfig = (ssrExchange) => ({
    url: ___prod___ ? "https://mderam.com/blog/graphql" : "http://localhost:7000/graphql",
    fetchOptions: {
        credentials: "include"
    },
    exchanges: [
        dedupExchange,
        cacheExchange({
            schema,
            /*resolvers: {
                Query: {
                    article: (parent, args, cache, info) => {
                        const articles = cache.inspectFields("Query")
                            .find(field => field.fieldName === "articles");
                        console.log(articles);
                        const art = cache.resolve("Query", "articles");
                        console.log(art);
                            //?.find((article: Article) => article.id === args.id);
                        if (!articles) return null;
                        return null;
                    }
                }
            },*/
            resolvers: {
                Article: {
                    updatedAt: transformToDate,
                    createdAt: transformToDate,
                },
                Query: {
                    article: (parent, args, cache, info) => {
                        return {
                            __typename: "Article",
                            id: args.id
                        };
                    }
                }
            },
            updates: {
                Mutation: {
                    createArticle: (_result, args, cache, info) => {
                        cache.updateQuery<ArticlesQuery>({ query: ArticlesDocument }, data => {
                            if (!_result.createArticle) return data;

                            data?.articles.push(_result.createArticle as Article);
                            return data;
                        });
                    },
                    updateArticle: (_result, args, cache, info) => {
                        if (!_result.updateArticle) return;

                        cache.invalidate("Query", "article", { id: args.id });
                    },
                    deleteArticle: (_result, args, cache, info) => {
                        cache.updateQuery<ArticlesQuery>({ query: ArticlesDocument }, data => {
                            if (!_result.deleteArticle) return data;

                            const result = data?.articles.filter(article => article.id !== args.id);
                            return { articles: result } as ArticlesQuery;
                        });
                    },
                    setPublishArticle: (_result, args, cache, info) => {
                        cache.updateQuery<ArticlesQuery>({ query: ArticlesDocument }, data => {
                            if (!_result.setPublishArticle) return data;

                            const result = data?.articles.find(article => article.id === args.id) as Article;
                            result.published = args.published as boolean;
                            return data;
                        });
                    }
                }
            }
        }),
        ssrExchange,
        /*errorExchange({
            onError(error) {
                if (error.message.includes("Not authenticated"))
                    Router.push("/editor/login");
            }
        }),*/
        fetchExchange
    ]
});

export default createUrqlClient;
