import { GetServerSideProps, NextPage } from "next";
import router from "next/router";
import React, { useEffect, useState } from "react";
import ArticleEditor from "../../../components/ArticleEditor";
import ArticlePreviewer from "../../../components/ArticlePreviewer";
import { Article, ArticleQuery, useArticleQuery } from "../../../generated/graphql";

//TODO SSR

const EditArticle: NextPage<{ id: number }> = ({ id }) => {
    const [{ data, fetching }] = useArticleQuery({ variables: { id } });
    const [article, setArticle] = useState<Article | null>(null);

    useEffect(() => {
        if (!data?.article) return;
        const newArticle = { ...data.article, categories: [] }; //TODO fix query

        setArticle({ ...newArticle });
    }, [data])

    function handleArticleChange(changes: Partial<Article>) {
        setArticle(article => {
            if (!article) return null;
            return {
                ...article,
                ...changes
            }
        });
    }

    return (
        <div>
            <h1>Edit Article</h1>
            <div>
                {article &&
                    <>
                    <ArticleEditor { ...article } handleChange={handleArticleChange}/>
                    <ArticlePreviewer { ...article }/>
                    </>
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

export const getServerSideProps: GetServerSideProps = async(context) => {
    let id = 0;
    if (typeof context.query.id === "string")
        id = parseInt(context.query.id);
    return { props: { id } }
}

export default EditArticle;
