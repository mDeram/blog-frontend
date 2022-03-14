import Link from "next/link";
import React from "react";
import { formatDateDefault } from "../utils/formatDateDefault";
import styles from "../styles/ArticleCard.module.scss";
import parseHtml from "html-react-parser";

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
    contentShort,
    link
}) => {
    return (
        <div className={styles.articleCard}>
            <Link href={link}><a>
                <h2>{title}</h2>
                <p className={styles.contentShort}>{parseHtml(contentShort)}...</p>
                <p className={styles.createdAt}>{formatDateDefault(createdAt)}</p>
            </a></Link>
        </div>
    )
}

export default ArticleCard;
