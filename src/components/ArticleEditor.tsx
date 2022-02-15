import React from "react";
import { Article } from "src/generated/graphql";

interface ArticleEditorProps {
    handleChange: (change: Partial<Article>) => void;
    title: string;
    markdown: string;
}

const ArticleEditor: React.FC<ArticleEditorProps> = ({
    handleChange,
    title,
    markdown
}) => {
    return (
        <div>
            <h1>{title}</h1>
            <p>{markdown}</p>
        </div>
    )
}

export default ArticleEditor;
