import React from "react";
import { useCreateArticleMutation } from "../../generated/graphql";
import ArticleEditor from "../../components/ArticleEditor";
import { useRouter } from "next/router";
import { pushNotificationError, pushNotificationSuccess } from "../../utils/defaultNotifications";
import createUrqlClient from "../../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";

const CreateArticle: React.FC = () => {
    const [,createArticle] = useCreateArticleMutation();
    const router = useRouter();

    async function handleCreateArticle(data: any) {
        const result = await createArticle(data);
        const isArticleCreated = !!result.data?.createArticle;
        if (isArticleCreated) {
            pushNotificationSuccess(`Article as been created`);
            router.push(`/editor/article/${result.data!.createArticle!.id}`)
        } else {
            const error = result.error || "server error";
            pushNotificationError(`
                Could not create article
                Error: ${error}
            `);
        }

        return isArticleCreated;
    }

    return (
        <div>
            <ArticleEditor saveArticle={handleCreateArticle}/>
        </div>
    );
}

export default withUrqlClient(createUrqlClient)(CreateArticle);
