import Link from "next/link";
import React from "react";

interface ArticleCardProps {
    title: string;
    createdAt: Date;
    updatedAt: Date;
    contentShort: string;
    link: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
    title,
    createdAt,
    updatedAt,
    contentShort,
    link
}) => {
    return (
        <Link href={link}><a>
            <div>
                <h2>{title}</h2>
                <p>Created on {createdAt}</p>
                <p>Updated on {updatedAt}</p>
                <p>{contentShort}</p>
            </div>
        </a></Link>
    )
}

export default ArticleCard;
