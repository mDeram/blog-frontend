import React, { useState } from "react";
import { customSlugify } from "../utils/customSlugify";
import ArticleEditorForm from "../components/ArticleEditorForm";
import ArticlePreviewer from "../components/ArticlePreviewer";
import { Article } from "../generated/graphql";
import { marked } from "marked";
import { pushNotificationError, pushNotificationSuccess } from "../utils/defaultNotifications";
import Discard from "../components/Discard";

interface ArticleEditorProps {
    initialArticle: Article;
    saveArticle: (article: any) => any;
}

const ArticleEditor: React.FC<ArticleEditorProps> = ({
    initialArticle,
    saveArticle
}) => {
    const [article, setArticle] = useState<Article>(initialArticle);

    function handleArticleChange(changes: Partial<Article>) {
        setArticle(article => {
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
        //TODO check that code
        const result = await saveArticle({
            id: article.id,
            author:  article.author,
            title: article.title,
            markdown: article.markdown
        });

        if (result.data) {
            pushNotificationSuccess(`Article ${article.title} as been saved`);
        } else {
            pushNotificationError(`
                Could not save article ${article.title}
                Error: ${result.error}
            `);
        }
    }

    return (
        <div>
            <h1>Edit Article</h1>
            <div>
                <ArticleEditorForm { ...article } handleChange={handleArticleChange}/>
                <ArticlePreviewer { ...article }/>
            </div>
            <Discard />
            <button onClick={handleSave}>Save</button>
        </div>
    );
}

export default ArticleEditor;
