import { useRouter } from "next/router";
import React from "react";
import { useSetPublishedArticleMutation } from "../generated/graphql";

//TODO add a confirmation popup on delete

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
    const [,setPublish] = useSetPublishedArticleMutation();
    const router = useRouter();

    return (
        <div>
            <h2>{title}</h2>
            <p>Create on {createdAt}</p>
            <p>Updated on {updatedAt}</p>
            <p>{content.slice(0, 50)}</p>
            {/* Preview popup */}
            {published
                ? <button onClick={_ => setPublish({ id, published: false })}>Unpublish</button>
                : <button onClick={_ => setPublish({ id, published: true })}>Publish</button>
            }
            <button onClick={_ => router.push(`/editor/${id}`)}>Edit</button>
            <button onClick={_ => deleteArticle(id)}>Delete</button>
        </div>
    )
}

export default ArticleCard;
