import { NextPage } from "next";
import router from "next/router";
import React from "react";
import { useArticleQuery } from "../../generated/graphql";

//TODO SSR

const EditArticle: NextPage = () => {
    let token = 0;
    if (typeof router.query.token === "string")
        token = parseInt(router.query.token);
    const [{ data, fetching }] = useArticleQuery({ variables: { id: token } });

    return (
        <div>
            <h1>Edit Article</h1>
            <div>
                {//data?.article && <ArticleInput { ...data.article }/>}
}
                {//data?.article && <ArticlePreview { ...data.article }/>}
}
            </div>
            {fetching &&
                <div>
                    <p>Loading article</p>
                </div>
            }
        </div>
    );
}

export default EditArticle;
