import React from "react";
import parseHtml from "html-react-parser";
import { formatDateDefault } from "../utils/formatDateDefault";
import styles from "../styles/Article.module.scss";
import "highlight.js/styles/monokai.css";
import marked from "../utils/markedConfig";

interface ArticleProps {
    title: string;
    markdown: string;
    author: string;
    createdAt: Date;
    updatedAt: Date;
}

const Article: React.FC<ArticleProps> = ({
    title,
    markdown,
    author,
    createdAt,
    updatedAt
}) => {
    function getContent() {
        return marked.parse(markdown);
    }

    function getDate() {
        let createdAtFormated = formatDateDefault(createdAt);
        let updatedAtFormated = formatDateDefault(updatedAt);
        if (createdAtFormated !== updatedAtFormated)
            return `${createdAtFormated} - LAST UPDATE ${updatedAtFormated}`;
        return createdAtFormated;
    }

    return (
        <div className={styles.article}>
            <h2>{title}</h2>
            <div className={styles.details}>
                <p>{getDate()}</p>
                <p>by {author}</p>
            </div>
            <div className={styles.content}>{parseHtml(getContent())}</div>
        </div>
    )
}

export default Article;
