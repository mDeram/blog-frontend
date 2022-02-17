import { useRouter } from "next/router";
import React from "react";
import { NotificationStore } from "../components/Notification";
import { useSetPublishedArticleMutation } from "../generated/graphql";

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

    async function handlePublish(value: boolean) {
        const result = await setPublish({ id, published: value });
        const success = !!result.data?.setPublishArticle;
        if (success) {
            NotificationStore.NotificationPush({
                type: "Success",
                message: `Article as been ${value ? "published" : "unpublished"}`,
                duration: 2000
            });
        } else {
            NotificationStore.NotificationPush({
                type: "Error",
                message: `Article could not be ${value ? "published" : "unpublished"} try again later...`,
                duration: 3000
            });
        }
    }

    return (
        <div>
            <h2>{title}</h2>
            <p>Create on {createdAt}</p>
            <p>Updated on {updatedAt}</p>
            <p>{content.slice(0, 50)}</p>
            {/* Preview popup */}
            {published
                ? <button onClick={_ => handlePublish(false)}>Unpublish</button>
                : <button onClick={_ => handlePublish(true)}>Publish</button>
            }
            <button onClick={_ => router.push(`/editor/article/${id}`)}>Edit</button>
            <button onClick={_ => deleteArticle(id)}>Delete</button>
        </div>
    )
}

export default ArticleCard;
