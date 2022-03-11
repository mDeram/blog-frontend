import React from "react";
import { ArticlesPublishedDocument, useArticlesPublishedQuery } from "../generated/graphql";
import ArticleCard from "../components/ArticleCard";
import createUrqlClient from "../utils/createUrqlClient";
import { initUrqlClient, withUrqlClient } from "next-urql";
import Layout from "../components/Layout";
import { cacheExchange, dedupExchange, fetchExchange, ssrExchange } from "urql";
import { GetStaticProps, NextPage } from "next";

const Index: NextPage= () => {
    const [{ data }] = useArticlesPublishedQuery();

    return (
        <Layout>
            {data?.articlesPublished
                ? data.articlesPublished.map(article =>
                    <div key={article.id}>
                        <ArticleCard
                            { ...article }
                            link={`/article/${article.slug}`}
                        />
                    </div>
                )
                : <p>An error occured while loading articles, please try again later...</p>
            }
        </Layout>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const ssrCache = ssrExchange({ isClient: false });
    const client = initUrqlClient({
        url: "http://localhost:7000/graphql",
        exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
    }, false);

    await client?.query(ArticlesPublishedDocument).toPromise();

    return {
        props: {
            urqlState: ssrCache.extractData()
        },
    };
}

export default withUrqlClient(createUrqlClient)(Index);
