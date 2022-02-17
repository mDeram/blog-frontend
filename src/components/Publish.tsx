import { NotificationStore } from "../components/Notification";
import { useSetPublishedArticleMutation } from "../generated/graphql";

interface PublishProps {
    id: number;
    published: boolean;
}

const Publish: React.FC<PublishProps> = ({
    id,
    published,
}) => {
    const [,setPublished] = useSetPublishedArticleMutation();

    async function handlePublish(value: boolean) {
        const result = await setPublished({ id, published: value });
        const success = !!result.data?.setPublishArticle;
        if (success) {
            NotificationStore.NotificationPush({
                type: "Success",
                message: `Article as been ${value ? "published" : "unpublished"}`,
                duration: 2000
            });
        } else {
            NotificationStore.NotificationPush({
                type: "Error",
                message: `Article could not be ${value ? "published" : "unpublished"} try again later...`,
                duration: 3000
            });
        }
    }

    return (
        <>
            {published
                ? <button onClick={_ => handlePublish(false)}>Unpublish</button>
                : <button onClick={_ => handlePublish(true)}>Publish</button>
            }
        </>
    )
}

export default Publish;
