import React from "react";
import { Article } from "../generated/graphql";

interface ArticleEditorFormProps {
    handleChange: (change: Partial<Article>) => void;
    title: string;
    description: string;
    author: string;
    markdown: string;
    slug: string;
}

const ArticleEditorForm: React.FC<ArticleEditorFormProps> = ({
    handleChange,
    title,
    description,
    author,
    markdown,
    slug
}) => {
    return (
        <div>
            <input
                type="text"
                id="title"
                value={title}
                onChange={e => handleChange({ title: e.target.value })}
                placeholder="Title"
            />
            <p>slug: {slug}</p>
            <input
                type="text"
                id="author"
                value={author}
                onChange={e => handleChange({ author: e.target.value })}
                placeholder="Author"
            />
            <textarea
                id="description"
                value={description}
                onChange={e => handleChange({ description: e.target.value })}
                placeholder="Write down a short description about your article"
            />
            <textarea
                id="markdown"
                value={markdown}
                onChange={e => handleChange({ markdown: e.target.value })}
                placeholder="Write down your article using markdown"
            />
        </div>
    )
}

export default ArticleEditorForm;
