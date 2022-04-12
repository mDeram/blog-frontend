import React, { useEffect } from "react";
import parseHtml from "html-react-parser";
import { formatDateDefault } from "../utils/formatDateDefault";
import styles from "../styles/Article.module.scss";
import hljs from "highlight.js";
import "highlight.js/styles/monokai.css";

interface ArticleProps {
    id: number;
    title: string;
    content: string;
    author: string;
    createdAt: Date;
    updatedAt: Date;
}

const Article: React.FC<ArticleProps> = ({
    id,
    title,
    content,
    author,
    createdAt,
    updatedAt
}) => {
    useEffect(() => {
        document.querySelectorAll("pre code").forEach(block => {
            hljs.highlightElement(block as HTMLElement);
        });
    }, [content]);

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
            <div className={styles.content}>{parseHtml(content)}</div>
        </div>
    )
}

export default Article;
