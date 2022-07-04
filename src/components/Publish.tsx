import { pushNotificationError, pushNotificationSuccess } from "../utils/defaultNotifications";
import { useSetPublishedArticleMutation } from "../generated/graphql";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { useState } from "react";

interface PublishProps {
    id: number;
    published: boolean;
}

const Publish: React.FC<PublishProps> = ({
    id,
    published,
}) => {
    const [,setPublished] = useSetPublishedArticleMutation();
    const [hover, setHover] = useState(false);

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

    function handleClick () {
        handlePublish(!published);
    }

    const props = published
        ? { title: "Unpublish", Icon: HiOutlineEye,    HoverIcon: HiOutlineEyeOff }
        : { title: "Publish",   Icon: HiOutlineEyeOff, HoverIcon: HiOutlineEye };

    return (
        <div className="action" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            {!hover
                ? <props.Icon className="action" onClick={handleClick} title={props.title}/>
                : <props.HoverIcon className="action" onClick={handleClick} title={props.title}/>
            }
        </div>
    )
}

export default Publish;
