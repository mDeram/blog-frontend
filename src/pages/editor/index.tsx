import React, { useEffect, useRef, useState } from "react";
import { useArticlesQuery, useDeleteArticleMutation } from "../../generated/graphql";
import ArticleCard from "../../components/ArticleCard";
import DeleteArticle from "../../components/DeleteArticle";
import Link from "next/link";
import createUrqlClient from "../../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import ArticleActions from "../../components/ArticleActions";

const Editor: React.FC = () => {
    const [{ data, fetching }] = useArticlesQuery();
    const [popup, setPopup] = useState({ id: 0, name: "" });
    const [,deleteArticle] = useDeleteArticleMutation();
    const closePopupRef = useRef<Function>();
    const openPopupRef = useRef<Function>();

    useEffect(() => {
        // Is that useless?
        closePopupRef.current && closePopupRef.current();
    }, [data])

    function handleTryDeleteArticle(id: number, name: string) {
        setPopup({ id, name });
        openPopupRef.current && openPopupRef.current();
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
                    <div key={article.id}>
                        <ArticleCard
                            { ...article }
                            link={`/editor/article/${article.id}`}
                        />
                        <ArticleActions
                            deleteArticle={() => handleTryDeleteArticle(article.id, article.title)}
                            { ...article }
                        />
                    </div>
                )}
            </div>
            {fetching &&
                <div>
                    <p>Loading articles...</p>
                </div>
            }
            <DeleteArticle
                name={popup.name}
                deleteCb={() => handleDeleteArticle(popup.id)}
                openRef={openPopupRef}
                closeRef={closePopupRef}
            />
        </div>
    );
}

export default withUrqlClient(createUrqlClient)(Editor);
