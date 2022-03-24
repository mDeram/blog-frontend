import { dedupExchange, fetchExchange } from "urql";
import { cacheExchange } from "@urql/exchange-graphcache";
import { Article, ArticlesDocument, ArticlesQuery, LikeDocument, LikeQuery } from "../generated/graphql";
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
                        if (!_result.createArticle) return;

                        cache.updateQuery<ArticlesQuery>({ query: ArticlesDocument }, data => {
                            if (!data) return null;

                            data.articles.push(_result.createArticle as Article);
                            return data;
                        });
                    },
                    updateArticle: (_result, args, cache, info) => {
                        if (!_result.updateArticle) return;

                        cache.invalidate("Query", "article", { id: args.id });
                    },
                    deleteArticle: (_result, args, cache, info) => {
                        if (!_result.deleteArticle) return;

                        cache.updateQuery<ArticlesQuery>({ query: ArticlesDocument }, data => {
                            if (!data) return null;

                            const result = data.articles.filter(article => article.id !== args.id);
                            return { articles: result } as ArticlesQuery;
                        });
                    },
                    setPublishArticle: (_result, args, cache, info) => {
                        if (!_result.setPublishArticle) return;

                        cache.updateQuery<ArticlesQuery>({ query: ArticlesDocument }, data => {
                            if (!data) return null;

                            const result = data.articles.find(article => article.id === args.id) as Article;
                            result.published = args.published as boolean;
                            return data;
                        });
                    },
                    toggleLike: (_result, args, cache, info) => {
                        if (!_result.toggleLike) return;

                        cache.updateQuery({ query: LikeDocument, variables: { articleId: args.articleId } }, data => {
                            if (!data) return null;

                            data.like = !data.like;
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
