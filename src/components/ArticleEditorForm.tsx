import React from "react";
import { Article } from "../generated/graphql";

interface ArticleEditorFormProps {
    handleChange: (change: Partial<Article>) => void;
    title: string;
    author: string;
    markdown: string;
    slug: string;
}

const ArticleEditorForm: React.FC<ArticleEditorFormProps> = ({
    handleChange,
    title,
    author,
    markdown,
    slug
}) => {
    return (
        <div>
            <label htmlFor="title">Title</label>
            <input
                type="text"
                id="title"
                value={title}
                onChange={e => handleChange({ title: e.target.value })}
            />
            <p>The slug will be: {slug}</p>
            <label htmlFor="author">Author</label>
            <input
                type="text"
                id="author"
                value={author}
                onChange={e => handleChange({ author: e.target.value })}
            />
            <label htmlFor="markdown">Markdown</label>
            <textarea
                id="markdown"
                value={markdown}
                onChange={e => handleChange({ markdown: e.target.value })}
            />
        </div>
    )
}

export default ArticleEditorForm;
