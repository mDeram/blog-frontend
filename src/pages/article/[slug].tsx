import { GetServerSideProps, NextPage } from "next";
import React from "react";
import { ArticleBySlugDocument, useArticleBySlugQuery } from "../../generated/graphql";
import ArticleComponent from "../../components/Article";
import createUrqlClient from "../../utils/createUrqlClient";
import { initUrqlClient, withUrqlClient } from "next-urql";
import { cacheExchange, dedupExchange, fetchExchange, ssrExchange } from "urql";
import Layout from "../../components/Layout";

const Article: NextPage<{ slug: string }> = ({ slug }) => {
    const [{ data }] = useArticleBySlugQuery({ variables: { slug } });

    return (
        <Layout>
            {data?.articleBySlug &&
                <ArticleComponent { ...data.articleBySlug }/>
            }
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps = async(context) => {
    let slug = "";
    if (typeof context.params?.slug === "string")
        slug = context.params?.slug;

    const ssrCache = ssrExchange({ isClient: false });
    const client = initUrqlClient({
        url: "http://localhost:7000/graphql",
        exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
    }, false);

    const result = await client?.query(ArticleBySlugDocument, { slug }).toPromise();
    const isArticleFound = !!result?.data.articleBySlug;

    if (!isArticleFound) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    return {
        props: {
            slug,
            urqlState: ssrCache.extractData()
        }
    };
}

export default withUrqlClient(createUrqlClient)(Article);
