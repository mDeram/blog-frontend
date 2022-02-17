import React, { useState } from "react";
import { useArticlesQuery, useDeleteArticleMutation } from "../../generated/graphql";
import ArticleCard from "../../components/ArticleCard";
import ConfirmDeletePopup from "../../components/ConfirmDeletePopup";

const Editor: React.FC = () => {
    const [{ data, fetching }] = useArticlesQuery();
    const [popup, setPopup] = useState({ show: false, id: 0 });
    const [,deleteArticle] = useDeleteArticleMutation();

    async function handleDeleteArticle(): Promise<boolean> {
        const result = await deleteArticle({ id: popup.id});
        const isArticleDeleted = !!result.data?.deleteArticle;

        return isArticleDeleted;
    }

    function showPopup() {
        if (!popup.show) return;
        const article = data?.articles.find(article => article.id === popup.id);
        if (!article) return;

        return (
            <ConfirmDeletePopup
                name={article.title}
                closeCb={() => setPopup({ show: false, id: 0 })}
                deleteCb={() => handleDeleteArticle()}
            />
        );
    }

    return (
        <div>
            <h1>Articles Editor</h1>
            <button>+</button>
            <div>
                {data?.articles.map(article =>
                    <ArticleCard
                        key={article.id}
                        deleteArticle={(id: number) => setPopup({ show: true, id })}
                        { ...article }
                    />
                )}
            </div>
            {fetching &&
                <div>
                    <p>Loading articles...</p>
                </div>
            }
            {showPopup()}
        </div>
    );
}

export default Editor;
