import Link from "next/link";
import React from "react";

interface ArticleCardProps {
    title: string;
    createdAt: Date;
    updatedAt: Date;
    content: string;
    link: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
    title,
    createdAt,
    updatedAt,
    content,
    link
}) => {
    return (
        <Link href={link}><a>
            <div>
                <h2>{title}</h2>
                <p>Created on {createdAt}</p>
                <p>Updated on {updatedAt}</p>
                <p>{content.slice(0, 50)}</p>
            </div>
        </a></Link>
    )
}

export default ArticleCard;
