import Link from "next/link";
import React from "react";
import { formatDateDefault } from "../utils/formatDateDefault";
import styles from "../styles/ArticleCard.module.scss";

interface ArticleCardProps {
    title: string;
    createdAt: Date;
    updatedAt: Date;
    description: string;
    link: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
    title,
    createdAt,
    description,
    link
}) => {
    return (
        <div className={styles.articleCard}>
            <Link href={link}><a>
                <h2>{title}</h2>
                <p className={styles.description}>{description}</p>
                <p className={styles.createdAt}>{formatDateDefault(createdAt)}</p>
            </a></Link>
        </div>
    )
}

export default ArticleCard;
