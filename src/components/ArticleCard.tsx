import Link from "next/link";
import React from "react";
import { formatDateDefault } from "../utils/formatDateDefault";
import styles from "../styles/ArticleCard.module.scss";

interface ArticleCardProps {
    title: string;
    createdAt: Date;
    updatedAt: Date;
    description: string;
    link: string | null;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
    title,
    createdAt,
    description,
    link
}) => {
    function renderCard() {
        return (
            <>
            <h2>{title}</h2>
            <p className={styles.description}>{description}</p>
            <p className={styles.createdAt}>{formatDateDefault(createdAt)}</p>
            </>
        );
    }

    return (
        <div className={styles.articleCard}>
            {link
                ? <Link  href={link}><a>{renderCard()}</a></Link>
                : <div>{renderCard()}</div>
            }
        </div>
    );
}

export default ArticleCard;
