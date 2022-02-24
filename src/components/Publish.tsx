import { pushNotificationError, pushNotificationSuccess } from "../utils/defaultNotifications";
import { useSetPublishedArticleMutation } from "../generated/graphql";
import { IMG_PATH } from "../constants";

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
            pushNotificationSuccess(
                `Article as been ${value ? "published" : "unpublished"}`
            );
        } else {
            pushNotificationError(
                `Article could not be ${value ? "published" : "unpublished"} try again later...`
            );
        }
    }

    return (
        <>
            {published
                ? <img onClick={_ => handlePublish(false)} src={IMG_PATH + "/icons/eye-regular.svg"} alt={`unpublish article ${id}`}/>
                : <img onClick={_ => handlePublish(true)} src={IMG_PATH + "/icons/eye-slash-regular.svg"} alt={`publish article ${id}`}/>
            }
        </>
    )
}

export default Publish;
