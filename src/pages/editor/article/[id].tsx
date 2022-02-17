import { GetServerSideProps, NextPage } from "next";
import router from "next/router";
import React, { useEffect, useState } from "react";
import { customSlugify } from "../../../utils/customSlugify";
import ArticleEditor from "../../../components/ArticleEditor";
import ArticlePreviewer from "../../../components/ArticlePreviewer";
import { Article, ArticleQuery, useArticleQuery, useUpdateArticleMutation } from "../../../generated/graphql";
import { marked } from "marked";
import { NotificationStore } from "../../../components/Notification";

//TODO SSR

const EditArticle: NextPage<{ id: number }> = ({ id }) => {
    const [{ data, fetching }] = useArticleQuery({ variables: { id } });
    const [,updateArticle] = useUpdateArticleMutation();
    const [article, setArticle] = useState<Article | null>(null);

    useEffect(() => {
        if (!data?.article) return;
        const newArticle = { ...data.article, categories: [] }; //TODO fix query

        setArticle({ ...newArticle });
    }, [data])

    function handleArticleChange(changes: Partial<Article>) {
        setArticle(article => {
            if (!article) return null;

            if (changes.title)
                changes.slug = customSlugify(changes.title);
            if (changes.markdown)
                changes.content = marked.parse(changes.markdown);

            return {
                ...article,
                ...changes
            }
        });
    }

    async function handleSave() {
        if (!article) return;

        const result = await updateArticle({
            id: article.id,
            author:  article.author,
            title: article.title,
            markdown: article.markdown
        });

        if (result.data) {
            NotificationStore.NotificationPush({
                type: "Success",
                message: `Article ${article.title} as been saved`,
                duration: 2000
            });
        } else {
            NotificationStore.NotificationPush({
                type: "Error",
                message: `
                    Could not save article ${article.title}
                    Error: ${result.error}
                `,
                duration: 3000
            });
        }
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
            <button onClick={_ => handleSave()}>Save</button>
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
