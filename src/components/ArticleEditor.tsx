import React, { useState } from "react";
import { customSlugify } from "../utils/customSlugify";
import ArticleEditorForm from "../components/ArticleEditorForm";
import ArticleComponent from "../components/Article";
import { Article, DefaultArticleFragment } from "../generated/graphql";
import Discard from "../components/Discard";
import styles from "../styles/ArticleEditor.module.scss";
import Header from "../components/Header";
import Link from "next/link";
import { isEqual } from "lodash";

interface ArticleEditorProps {
    initialArticle?: DefaultArticleFragment;
    saveArticle: (article: any) => any;
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

    function handleArticleChange(changes: Partial<Article>) {
        setArticle(article => {
            if (changes.title)
                changes.slug = customSlugify(changes.title);

            return {
                ...article,
                ...changes
            }
        });
    }

    function handleSave() {
        saveArticle({
            id: article.id,
            author:  article.author,
            title: article.title,
            markdown: article.markdown,
            description: article.description
        });
    }

    function renderDiscardOrBack() {
        if (!isEqual(article, initialArticle))
            return <Discard />

        return <Link href="/editor"><a>Back</a></Link>
    }

    return (
        <div>
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
        </div>
    );
}

export default ArticleEditor;
