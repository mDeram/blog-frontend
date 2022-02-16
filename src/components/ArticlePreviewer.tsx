import React from "react";
import parseHtml from "html-react-parser";

interface ArticlePreviewerProps {
    title: string;
    content: string;
    author: string;
    updatedAt: string;
}

const ArticlePreviewer: React.FC<ArticlePreviewerProps> = ({
    title,
    content,
    author,
    updatedAt
}) => {
    return (
        <div>
            <h1>{title}</h1>
            <p>{author}</p>
            {//<p>created on {createdAt}</p>
            }
            <p>updated on {updatedAt}</p>
            <div>{parseHtml(content)}</div>
        </div>
    )
}

export default ArticlePreviewer;
