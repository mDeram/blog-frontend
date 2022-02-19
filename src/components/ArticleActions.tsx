import Link from "next/link";
import React from "react";
import Publish from "../components/Publish";

interface ArticleActionsProps {
    id: number;
    published: boolean;
    deleteArticle: () => void;
}

const ArticleActions: React.FC<ArticleActionsProps> = ({
    id,
    published,
    deleteArticle
}) => {
    return (
        <div>
            {/* Preview popup */}
            <Publish id={id} published={published} />
            <Link href={`/editor/article/${id}`}><a>Edit</a></Link>
            <button onClick={deleteArticle}>Delete</button>
        </div>
    )
}

export default ArticleActions;
