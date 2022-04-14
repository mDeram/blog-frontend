import React from "react";
import { ArticlesPublishedDocument, useArticlesPublishedQuery } from "../generated/graphql";
import ArticleCard from "../components/ArticleCard";
import createUrqlClient from "../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import Layout from "../components/Layout";
import { GetStaticProps, NextPage } from "next";
import createUrqlClientOnServer from "../utils/createUrqlClientOnServer";

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
    const { client, ssrCache } = createUrqlClientOnServer();
    await client?.query(ArticlesPublishedDocument).toPromise();

    return {
        props: {
            urqlState: ssrCache.extractData()
        },
    };
}

export default withUrqlClient(createUrqlClient)(Index);
