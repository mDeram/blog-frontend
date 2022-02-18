import React from "react";
import { useCreateArticleMutation } from "../../generated/graphql";
import ArticleEditor from "../../components/ArticleEditor";
import { useRouter } from "next/router";

const CreateArticle: React.FC = () => {
    const [,createArticle] = useCreateArticleMutation();
    const router = useRouter();

    async function handleSaveArticle(data: any) {
        const result = await createArticle(data);
        if (result.data) {
            router.push(`/editor/article/${result.data.createArticle.id}`)
        }

        return result;
    }

    return (
        <div>
            <h1>Create Article</h1>
            <ArticleEditor saveArticle={handleSaveArticle}/>
        </div>
    );
}

export default CreateArticle;
