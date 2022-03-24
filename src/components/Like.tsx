import { useLikeQuery, useToggleLikeMutation } from "../generated/graphql";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface LikeProps {
    articleId: number;
}

const Like: React.FC<LikeProps> = ({
    articleId
}) => {
    const [{ data }] = useLikeQuery({ variables: { articleId } });
    const [,toggleLike] = useToggleLikeMutation();

    function handleLike() {
        toggleLike({ articleId });
    }

    return (
        <>
            {data?.like
                ? <AiFillHeart onClick={handleLike}/>
                : <AiOutlineHeart onClick={handleLike}/>
            }
        </>
    )
}

export default Like;
