import { dedupExchange, fetchExchange } from "urql";
import { cacheExchange } from "@urql/exchange-graphcache";
import schema, { Article, ArticlesDocument, ArticlesQuery, LikeDocument } from "../generated/graphql";
import { NextUrqlClientConfig } from "next-urql";
import { transformToDate } from "../cache/transformToDate";

const createUrqlClient: NextUrqlClientConfig = (ssrExchange) => ({
    url: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "",
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
                    article: (_parent, args, _cache, _info) => {
                        return {
                            __typename: "Article",
                            id: args.id
                        };
                    }
                }
            },
            updates: {
                Mutation: {
                    createArticle: (result, _args, cache, _info) => {
                        if (!result.createArticle) return;

                        cache.updateQuery<ArticlesQuery>({ query: ArticlesDocument }, data => {
                            if (!data) return null;

                            data.articles = [result.createArticle as Article, ...data.articles];
                            return data;
                        });
                    },
                    updateArticle: (result, args, cache, _info) => {
                        if (!result.updateArticle) return;

                        cache.invalidate("Query", "articles");
                        cache.invalidate("Query", "article", { id: args.id });
                    },
                    deleteArticle: (result, args, cache, _info) => {
                        if (!result.deleteArticle) return;

                        cache.updateQuery<ArticlesQuery>({ query: ArticlesDocument }, data => {
                            if (!data) return null;

                            const filteredArticles = data.articles.filter(article => article.id !== args.id);
                            return { articles: filteredArticles } as ArticlesQuery;
                        });
                    },
                    setPublishArticle: (result, args, cache, _info) => {
                        if (!result.setPublishArticle) return;

                        cache.updateQuery<ArticlesQuery>({ query: ArticlesDocument }, data => {
                            if (!data) return null;

                            const resultArticle = data.articles.find(article => article.id === args.id) as Article;
                            resultArticle.published = args.published as boolean;
                            return data;
                        });
                    },
                    toggleLike: (result, args, cache, _info) => {
                        if (!result.toggleLike) return;

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
