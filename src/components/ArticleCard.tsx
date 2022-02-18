import Link from "next/link";
import React from "react";
import Publish from "../components/Publish";

interface ArticleCardProps {
    id: number;
    title: string;
    createdAt: Date;
    updatedAt: Date;
    content: string;
    published: boolean;
    deleteArticle: () => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
    id,
    title,
    createdAt,
    updatedAt,
    content,
    deleteArticle,
    published,
}) => {
    return (
        <div>
            <h2>{title}</h2>
            <p>Create on {createdAt}</p>
            <p>Updated on {updatedAt}</p>
            <p>{content.slice(0, 50)}</p>
            {/* Preview popup */}
            <Publish id={id} published={published} />
            <Link href={`/editor/article/${id}`}><a>Edit</a></Link>
            <button onClick={deleteArticle}>Delete</button>
        </div>
    )
}

export default ArticleCard;
