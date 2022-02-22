import Link from "next/link";
import React from "react";
import styles from "../styles/ArticleCard.module.scss";

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
    function formatCreatedAtDate() {
        const [_, month, day, year] = createdAt.toDateString().split(" ");
        return `${month.toUpperCase()} ${day}, ${year}`;
    }

    return (
        <div className={styles.articleCard}>
            <Link href={link}><a>
                <h2>{title}</h2>
                <p className={styles.contentShort}>{contentShort}...</p>
                <p className={styles.createdAt}>{formatCreatedAtDate()}</p>
            </a></Link>
        </div>
    )
}

export default ArticleCard;
