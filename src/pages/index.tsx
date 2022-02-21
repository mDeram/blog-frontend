import React from "react";
import { useArticlesQuery } from "../generated/graphql";
import ArticleCard from "../components/ArticleCard";
import createUrqlClient from "../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import Layout from "../components/Layout";
import styles from "../Index.module.scss";

const Index: React.FC = () => {
    const [{ data }] = useArticlesQuery();

    return (
        <Layout>
            <div>
                {data?.articles
                    ? data.articles.map(article =>
                        <div key={article.id}>
                            <ArticleCard
                                { ...article }
                                link={`/article/${article.slug}`}
                            />
                        </div>
                    )
                    : <p>An error occured while loading articles, please try again later...</p>
                }
            </div>
        </Layout>
    );
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
