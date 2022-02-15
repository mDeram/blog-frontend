import React from "react";

interface ArticlePreviewerProps {
    title: string;
    content: string;
}

const ArticlePreviewer: React.FC<ArticlePreviewerProps> = ({
    title,
    content
}) => {
    return (
        <div>
            <h1>{title}</h1>
            <p>{content}</p>
        </div>
    )
}

export default ArticlePreviewer;
