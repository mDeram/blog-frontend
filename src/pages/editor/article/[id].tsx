import { GetServerSideProps, NextPage } from "next";
import React, { useEffect } from "react";
import { useArticleQuery, useUpdateArticleMutation } from "../../../generated/graphql";
import { pushNotificationError } from "../../../utils/defaultNotifications";
import ArticleEditor from "../../../components/ArticleEditor";

//TODO SSR

const EditArticle: NextPage<{ id: number }> = ({ id }) => {
    const [{ data, fetching }] = useArticleQuery({ variables: { id } });
    const [,updateArticle] = useUpdateArticleMutation();

    useEffect(() => {
        if (!fetching && !data)
            pushNotificationError(`Could not fetch article with id: ${id}`);
    }, [fetching, data]);

    function handleSaveArticle(data: any) {
        return updateArticle(data);
    }

    return (
        <div>
            <h1>Edit Article</h1>
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
    if (typeof context.query.id === "string")
        id = parseInt(context.query.id);
    return { props: { id } }
}

export default EditArticle;
