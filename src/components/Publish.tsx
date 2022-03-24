import { pushNotificationError, pushNotificationSuccess } from "../utils/defaultNotifications";
import { useSetPublishedArticleMutation } from "../generated/graphql";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

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
                ? <HiOutlineEye className="action" onClick={_ => handlePublish(false)} title="Unpublish"/>
                : <HiOutlineEyeOff className="action" onClick={_ => handlePublish(true)} title="Publish"/>
            }
        </>
    )
}

export default Publish;
