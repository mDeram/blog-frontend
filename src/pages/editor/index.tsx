import React, { useEffect, useRef, useState } from "react";
import { useArticlesQuery, useDeleteArticleMutation } from "../../generated/graphql";
import ArticleCard from "../../components/ArticleCard";
import DeleteArticle from "../../components/DeleteArticle";
import Link from "next/link";
import createUrqlClient from "../../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import ArticleActions from "../../components/ArticleActions";
import Layout from "../../components/Layout";
import styles from "../../styles/Editor.module.scss";
import { HiOutlinePencilAlt } from "react-icons/hi";
import LikeCounter from "../../components/LikeCounter";

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
        <Layout title="mDeram's blog editor">
            <div className={styles.createArticle}>
                <Link href="/editor/create"><a>
                    Create an article <HiOutlinePencilAlt title="Create Article"/>
                </a></Link>
            </div>
            <div>
                {data?.articles.map(article =>
                    <div key={article.id}>
                        <div className={styles.articleEditBox}>
                            <ArticleCard
                                { ...article }
                                link={article.published ? `/article/${article.slug}` : null}
                            />
                            <ArticleActions
                                deleteArticle={() => handleTryDeleteArticle(article.id, article.title)}
                                { ...article }
                            />
                        </div>
                        <LikeCounter likeCounter={article.likeCounter}/>
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
        </Layout>
    );
}

export default withUrqlClient(createUrqlClient)(Editor);
