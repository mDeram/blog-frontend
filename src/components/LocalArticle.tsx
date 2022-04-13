import { useEffect, useRef, useState } from "react";
import RestoreEditionPopup from "../components/RestoreEdition";
import { isServer } from "../utils/isServer";
import { Article, DefaultArticleFragment } from "../generated/graphql";

interface LocalArticleProps {
    article: DefaultArticleFragment,
    handleArticleChange: (changes: Partial<Article>) => void
}

const LocalArticle: React.FC<LocalArticleProps> = ({
    children,
    article,
    handleArticleChange
}) => {
    const restoreEditionOpenRef = useRef<Function>();
    const [initialLocalArticle] = useState(loadArticleFromLocalStorage());

    useEffect(() => {
        if (!initialLocalArticle) return;

        const data = initialLocalArticle.data;
        if (Date.parse(data.updatedAt) != article.updatedAt.valueOf()) return;
        if (data.author === article.author
         && data.title === article.title
         && data.description === article.description
         && data.markdown === article.markdown) return;

        restoreEditionOpenRef.current && restoreEditionOpenRef.current();
    }, [initialLocalArticle]);


    function loadArticleFromLocalStorage() {
        if (isServer()) return;

        const rawLocalArticle = localStorage.getItem(`article:${article.id}`);
        if (!rawLocalArticle) return;

        return JSON.parse(rawLocalArticle);
    }

    function saveArticleToLocalStorage() {
        localStorage.setItem(`article:${article.id}`, JSON.stringify({
            date: new Date(),
            data: article
        }));
    }

    function handleRestore() {
        const data = initialLocalArticle.data;
        handleArticleChange({
            author: data.author,
            title: data.title,
            description: data.description,
            markdown: data.markdown
        });
    }

    useEffect(() => {
        saveArticleToLocalStorage();
    }, [article]);

    return (
        <>
        {children}
        <RestoreEditionPopup restore={handleRestore} openRef={restoreEditionOpenRef} date={initialLocalArticle?.date}/>
        </>
    );
}

export default LocalArticle;
