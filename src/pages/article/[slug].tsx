import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import React from "react";
import { ArticleBySlugDocument, ArticlesPublishedDocument, useArticleBySlugQuery } from "../../generated/graphql";
import ArticleComponent from "../../components/Article";
import createUrqlClient from "../../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import Layout from "../../components/Layout";
import Like from "../../components/Like";
import Title from "../../components/Title";
import createUrqlClientOnServer from "../../utils/createUrqlClientOnServer";

const Article: NextPage<{ slug: string }> = ({ slug }) => {
    const [{ data }] = useArticleBySlugQuery({ variables: { slug } });

    return (
        <>
        <Title prefix={data?.articleBySlug?.title} />
        <Layout>
            {data?.articleBySlug &&
                <>
                <ArticleComponent { ...data.articleBySlug }/>
                <Like articleId={data.articleBySlug.id}/>
                </>
            }
        </Layout>
        </>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const { client } = createUrqlClientOnServer();
    const articles = await client?.query(ArticlesPublishedDocument).toPromise();
    const paths = articles?.data.articlesPublished
        .filter((article: any) => article.slug !== "")
        .map((article: any) => {
        return {
            params: {
                slug: article.slug
            }
        }
    });

    return {
        paths,
        fallback: "blocking"
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    if (!params?.slug || typeof params.slug !== "string") {
        return {
            redirect: {
                destination: "/",
                permanent: true
            }
        }
    }

    const slug = params.slug;

    const { client, ssrCache } = createUrqlClientOnServer();
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
