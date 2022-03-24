import Link from "next/link";
import React from "react";
import Publish from "../components/Publish";
import styles from "../styles/ArticleActions.module.scss";
import { HiOutlineXCircle, HiOutlinePencilAlt } from "react-icons/hi";

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
        <div className={styles.articleActions}>
            {/* Preview popup */}
            <Publish id={id} published={published} />
            <Link href={`/editor/article/${id}`}><a><HiOutlinePencilAlt title="Edit"/></a></Link>
            <HiOutlineXCircle className={styles.delete + " action"} onClick={deleteArticle} title="Delete"/>
        </div>
    )
}

export default ArticleActions;
