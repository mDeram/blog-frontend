import { GetServerSideProps, NextPage } from "next";
import React, { useEffect } from "react";
import { useArticleQuery, useUpdateArticleMutation } from "../../../generated/graphql";
import { pushNotificationError, pushNotificationSuccess } from "../../../utils/defaultNotifications";
import ArticleEditor from "../../../components/ArticleEditor";
import createUrqlClient from "../../../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";

//TODO SSR

const EditArticle: NextPage<{ id: number }> = ({ id }) => {
    const [{ data, fetching }] = useArticleQuery({ variables: { id } });
    const [,updateArticle] = useUpdateArticleMutation();

    useEffect(() => {
        if (!fetching && !data)
            pushNotificationError(`Could not fetch article with id: ${id}`);
    }, [fetching, data, id]);

    async function handleSaveArticle(data: any) {
        const result = await updateArticle(data);
        const isArticleSaved = !!result.data?.updateArticle;

        if (isArticleSaved) {
            pushNotificationSuccess(`Article as been saved`);
        } else {
            const error = result.error || "server error";
            pushNotificationError(`
                Could not save article
                Error: ${error}
            `);
        }

        return isArticleSaved;
    }

    return (
        <div>
            {data?.article &&
                <ArticleEditor
                    saveArticle={handleSaveArticle}
                    initialArticle={data.article}
                />
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
    let id = 0;
    if (typeof context.params?.id === "string")
        id = parseInt(context.params?.id);

    /*
    const ssrCache = ssrExchange({ isClient: false });
    const client = initUrqlClient({
        url: "http://localhost:7000/graphql",
        exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
    }, false);

    await client?.query(ArticleDocument, { id }).toPromise();

    return {
        props: {
            id,
            urqlState: ssrCache.extractData()
        }
    };
    */
    return { props: { id } };
}

export default withUrqlClient(createUrqlClient)(EditArticle);
