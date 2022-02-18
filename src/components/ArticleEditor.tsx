import React, { useState } from "react";
import { customSlugify } from "../utils/customSlugify";
import ArticleEditorForm from "../components/ArticleEditorForm";
import ArticleComponent from "../components/Article";
import { Article, DefaultArticleFragment } from "../generated/graphql";
import { marked } from "marked";
import { pushNotificationError, pushNotificationSuccess } from "../utils/defaultNotifications";
import Discard from "../components/Discard";

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
        content: "",
        slug: "",
        title: "",
        markdown: "",
        published: false,
        createdAt: Date.now(),
        updatedAt: Date.now()
    });

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
            <div>
                <ArticleEditorForm { ...article } handleChange={handleArticleChange}/>
                <ArticleComponent { ...article }/>
            </div>
            <Discard />
            <button onClick={handleSave}>Save</button>
        </div>
    );
}

export default ArticleEditor;
