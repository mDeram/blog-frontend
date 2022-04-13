import React, { useState } from "react";
import { customSlugify } from "../utils/customSlugify";
import ArticleEditorForm from "../components/ArticleEditorForm";
import ArticleComponent from "../components/Article";
import { Article, DefaultArticleFragment, MutationCreateArticleArgs, MutationUpdateArticleArgs } from "../generated/graphql";
import Discard from "../components/Discard";
import styles from "../styles/ArticleEditor.module.scss";
import Header from "../components/Header";
import Link from "next/link";
import { isEqual } from "lodash";
import { pushNotificationSuccess } from "../utils/defaultNotifications";
import LocalArticle from "../components/LocalArticle";

interface ArticleEditorProps {
    initialArticle?: DefaultArticleFragment;
    saveArticle: (article: MutationUpdateArticleArgs) => Promise<boolean>;
}

const ArticleEditor: React.FC<ArticleEditorProps> = ({
    initialArticle,
    saveArticle
}) => {
    const [article, setArticle] = useState<DefaultArticleFragment>(initialArticle || {
        id: 0,
        author: "",
        slug: "",
        title: "",
        description: "",
        markdown: "",
        published: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        likeCounter: 0
    });
    const [savedArticle, setSavedArticle] = useState<DefaultArticleFragment>(article);

    function handleArticleChange(changes: Partial<Article>) {
        setArticle(prevArticle => {
            if (changes.title)
                changes.slug = customSlugify(changes.title);

            return {
                ...prevArticle,
                ...changes
            }
        });
    }

    async function handleSave() {
        if (isEqual(article, savedArticle)) {
            pushNotificationSuccess(`Article is already saved`);
            return;
        }

        const isSaved = await saveArticle({
            id: article.id,
            author:  article.author,
            title: article.title,
            markdown: article.markdown,
            description: article.description
        });

        if (!isSaved) return;

        setSavedArticle({ ...article });
    }

    function renderDiscardOrBack() {
        if (!isEqual(article, savedArticle))
            return <Discard />

        return <Link href="/editor"><a>Back</a></Link>
    }

    return (
        <LocalArticle article={article} handleArticleChange={handleArticleChange}>
            <Header title={`editing article "${article.title.slice(0, 50)}"`}/>
            <div className={styles.editorContainer}>
                <div className={styles.editorContainerChild}>
                    <ArticleEditorForm { ...article } handleChange={handleArticleChange}/>
                </div>
                <div className={styles.editorContainerChild}>
                    <ArticleComponent { ...article }/>
                </div>
            </div>
            <div className={styles.optionBar}>
                {renderDiscardOrBack()}
                <button onClick={handleSave}>Save</button>
            </div>
        </LocalArticle>
    );
}

export default ArticleEditor;
