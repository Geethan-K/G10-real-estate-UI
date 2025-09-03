import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAllPostsRequest } from "../../store/Posts/postsSlice"

export default function NewsFeed() {

    const dispatch = useDispatch();
    const { posts, loading, hasMore } = useSelector(state => state.newsFeed);
    //  const currentUser = useSelector((state) => state.auth.currentUser)

    useEffect(() => {
        dispatch(fetchAllPostsRequest())
    }, [dispatch])

    const handleScroll = (e) => {
        if (!hasMore || loading) return;

        const { scrollTop, clientHeight, scrollHeight } = e.target.documentElement;
        if (scrollHeight - scrollTop <= clientHeight + 50) {
            dispatch(fetchFeedRequest());
        }
    };
    // useEffect(() => {
    //     window.addEventListener("scroll", handleScroll);
    //     return () => window.removeEventListener("scroll", handleScroll);
    // }, [loading, hasMore, page]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [hasMore, loading]);


    return (
        <div>
            {posts.map(post => (
                <div key={post.id} className="card">
                    <p>{post.author.username}</p>
                    <p>{post.caption}</p>
                    {post.imageUrl && <img src={post.imageUrl} alt="post" />}
                </div>
            ))}
            {loading && <p>Loading...</p>}
            {!hasMore && <p>No more posts</p>}
        </div>
    );
}