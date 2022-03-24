import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import styles from "../styles/LikeCounter.module.scss";

interface LikeCounterProps {
    likeCounter: number;
}

const LikeCounter: React.FC<LikeCounterProps> = ({
    likeCounter
}) => {
    return (
        <div className={styles.likeCounter}>
            {likeCounter > 0
                ? <><AiFillHeart title={`Likes: ${likeCounter}`}/><p>{likeCounter}</p></>
                : <AiOutlineHeart title="No likes yet"/>
            }
        </div>
    )
}

export default LikeCounter;
