import React , {useState , useEffect , useRef} from "react";

export default function NewsFeedPage () {

    const [posts , setPosts] = useState([]);
    const [nextCursor , setNextCursor] = useState(null);
    const [loading , setLoading] = useState(false);
    const loaderRef = useRef();

    
}