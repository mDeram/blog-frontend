import React from "react";
import parseHtml from "html-react-parser";

interface ArticleProps {
    title: string;
    content: string;
    author: string;
    updatedAt: string;
}

const Article: React.FC<ArticleProps> = ({
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
            <p>updated on {updatedAt.toString()}</p>
            <div>{parseHtml(content)}</div>
        </div>
    )
}

export default Article;
