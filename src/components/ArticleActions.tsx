import Link from "next/link";
import React from "react";
import { IMG_PATH } from "../constants";
import Publish from "../components/Publish";
import styles from "../styles/ArticleActions.module.scss";

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
            <Link href={`/editor/article/${id}`}><a><img src={IMG_PATH + "/icons/keyboard-regular.svg"} alt={`edit article ${id}`}/></a></Link>
            <img onClick={deleteArticle} src={IMG_PATH + "/icons/trash-can-regular.svg"} alt={`delete article ${id}`}/>
        </div>
    )
}

export default ArticleActions;
