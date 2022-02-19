import { GetServerSideProps, NextPage } from "next";
import React, { useEffect } from "react";
import { ArticleBySlugDocument, useArticleBySlugQuery } from "../../generated/graphql";
import { pushNotificationError } from "../../utils/defaultNotifications";
import ArticleComponent from "../../components/Article";
import createUrqlClient from "../../utils/createUrqlClient";
import { initUrqlClient, withUrqlClient } from "next-urql";
import { cacheExchange, dedupExchange, fetchExchange, ssrExchange } from "urql";

const Article: NextPage<{ slug: string }> = ({ slug }) => {
    const [{ data, fetching }] = useArticleBySlugQuery({ variables: { slug } });

    //TODO redirect instead
    useEffect(() => {
        if (!fetching && !data)
            pushNotificationError(`Could not fetch article: ${slug}`);
    }, [fetching, data]);

    return (
        <div>
            {data?.articleBySlug &&
                <ArticleComponent { ...data.articleBySlug }/>
            }
            {fetching &&
                <div>
                    <p>Loading article</p>
                </div>
            }
        </div>
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

    await client?.query(ArticleBySlugDocument, { slug }).toPromise();

    return {
        props: {
            slug,
            urqlState: ssrCache.extractData()
        }
    };
}

export default withUrqlClient(createUrqlClient)(Article);
