import Link from "next/link";
import React from "react";
import Publish from "../components/Publish";

interface ArticleCardProps {
    title: string;
    createdAt: Date;
    updatedAt: Date;
    content: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
    title,
    createdAt,
    updatedAt,
    content,
}) => {
    return (
        <div>
            <h2>{title}</h2>
            <p>Create on {createdAt}</p>
            <p>Updated on {updatedAt}</p>
            <p>{content.slice(0, 50)}</p>
        </div>
    )
}

export default ArticleCard;
