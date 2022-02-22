import React, { useState } from "react";
import { customSlugify } from "../utils/customSlugify";
import ArticleEditorForm from "../components/ArticleEditorForm";
import ArticleComponent from "../components/Article";
import { Article, DefaultArticleFragment } from "../generated/graphql";
import { marked } from "marked";
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
        createdAt: new Date(),
        updatedAt: new Date()
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

    function handleSave() {
        saveArticle({
            id: article.id,
            author:  article.author,
            title: article.title,
            markdown: article.markdown
        });
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
