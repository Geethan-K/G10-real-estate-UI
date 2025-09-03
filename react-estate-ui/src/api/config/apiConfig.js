//const BASE_URL = process.env.REACT_APP_API_BASE_URL || `http://localhost:3000/api`;

const API_ENDPOINTS = {
    PROPERTY:{
        GET_POST: (postId) => `/posts/${postId}`,
        GET_POSTS: (query) => `/posts/?${query}`,
        GET_USERS_POSTS:  `/users/profilePosts`,
        ADD:`/posts/`
    },
    NEWS_FEED:{
        GET_FEED: ({cursor,limit}) => `/newsFeed/getFeed?cursor=${cursor || ""}&limit=${limit || 5}`,
        GET_USER_POSTS: (userId) => `/newsFeed/getUserPosts/${userId}`,
        GET_POST_BY_ID: (postId) => `/newsFeed/getPostById/${postId}`,
        CREATE_POST:`/newsFeed/createPost`
    },
    FOLLOW:{
        FOLLOW_USER:`/follow/followUser`,
        UNFOLLOW_USER:`/follow/unfollowUser`,
        IS_FOLLOWING: (userId,followingId) => `/follow/user/${userId}/isFollowing/${followingId}`,
        GET_FOLLOWINGS: (userId) => `/follow/user/${userId}/getFollowers`,
        GET_FOLLOWERS: (userId) => `/follow/user/${userId}/getFollowings`
    },
    LIKE:{
        LIKE:`/like`,
        GET_LIKES: (postId) => `/like/${postId}`
    },
    SHARE:{
        GET_SHARED_COUNT: (postId) => `/share/getSharesCount/${post}`,
        SHARE_POST:`/share`
    },
    COMMENT:{
        GET_COMMENTS: (postId) => `/comment/add/:${postId}`,
        POST_COMMENT: `/comment`
    },
    BLOCK:{
        GET_BLOCKED_USERS: (userId) => `/blockUser/${userId}`,
        BLOCK_USER:`/blockUser`
    },
    NOTIFICATION:{
        GET: (userId) => `/notification/getNotifications/${userId}`,
        SEND:`/notification/send`
    },
    CHATS:{
        GET_ALL_CHATS: '/chats',
        GET_CHAT:(id) => `/chats/${id}`,
        GET_RECEIVER_STATUS:(id) => `/chats/receiverStatus/${id}`,
        UPDATE_SEEN_BY:(id) => `/chats/read/${id}`,
    },
    MESSAGE:{
        SEND: (chatId) => `/message/${chatId}`,
        SEARCH: (userId) => `/message/search/${userId}`
    }
   
}
export default API_ENDPOINTS