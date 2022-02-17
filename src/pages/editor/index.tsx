import React, { useEffect, useState } from "react";
import { useArticlesQuery, useDeleteArticleMutation } from "../../generated/graphql";
import ArticleCard from "../../components/ArticleCard";
import ConfirmDeleteArticlePopup from "../../components/ConfirmDeleteArticlePopup";
import Link from "next/link";

const Editor: React.FC = () => {
    const [{ data, fetching }] = useArticlesQuery();
    const [popup, setPopup] = useState({ show: false, id: 0, name: "" });
    const [,deleteArticle] = useDeleteArticleMutation();

    useEffect(() => {
        hidePopup();
    }, [data])

    function hidePopup() {
        setPopup(prev => {
            return {
                ...prev,
                show: false
            }
        })
    }

    async function handleDeleteArticle(id: number): Promise<boolean> {
        const result = await deleteArticle({ id });
        const isArticleDeleted = !!result.data?.deleteArticle;

        return isArticleDeleted;
    }

    return (
        <div>
            <h1>Articles Editor</h1>
            <Link href="/editor/create"><a>+</a></Link>
            <div>
                {data?.articles.map(article =>
                    <ArticleCard
                        key={article.id}
                        deleteArticle={(id: number) => setPopup({ show: true, id, name: article.title })}
                        { ...article }
                    />
                )}
            </div>
            {fetching &&
                <div>
                    <p>Loading articles...</p>
                </div>
            }
            <ConfirmDeleteArticlePopup
                show={popup.show}
                name={popup.name}
                closeCb={() => hidePopup()}
                deleteCb={() => handleDeleteArticle(popup.id)}
            />
        </div>
    );
}

export default Editor;
