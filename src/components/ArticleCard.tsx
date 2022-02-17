import { useRouter } from "next/router";
import React from "react";
import Publish from "../components/Publish";

interface ArticleCardProps {
    id: number;
    title: string;
    createdAt: Date;
    updatedAt: Date;
    content: string;
    published: boolean;
    deleteArticle: (id: number) => void;
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
    const router = useRouter();

    return (
        <div>
            <h2>{title}</h2>
            <p>Create on {createdAt}</p>
            <p>Updated on {updatedAt}</p>
            <p>{content.slice(0, 50)}</p>
            {/* Preview popup */}
            <Publish id={id} published={published} />
            <button onClick={_ => router.push(`/editor/article/${id}`)}>Edit</button>
            <button onClick={_ => deleteArticle(id)}>Delete</button>
        </div>
    )
}

export default ArticleCard;
