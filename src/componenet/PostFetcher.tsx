import React from "react";
import { useState, useEffect } from "react";

function PostFetcher(){
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [postId, setPostId] = useState(1);

  useEffect(() => {

        const fetchPost = async() =>{
            try {
                    setLoading(true);
                    setError("");
                    const response = await fetch (`https://jsonplaceholder.typicode.com/posts/${postId}`)
                    if (!response.ok) {
                        throw new Error("Error fetching data")
                    }
                    const data = await response.json();
                    setPost(data)
                } catch (error){
                    console.error(error.message)
                    setError(error.message)
                } finally {
                    setLoading(false)
                }
        }
            
        fetchPost();
    }, [postId]);

    return (
        <div> 
            <h1> Post Fetcher</h1>
            {loading && <h1>loading....</h1>}
            {error && <h1>{error}</h1>    }
            <h3>{post && post.title}</h3>
            <p>{post && post.body}</p>
            <div>
                <button onClick={() => setPostId(postId-1)} disabled={postId===1}> previous  </button>
                <button onClick={() => setPostId(postId+1)}>  next  </button>

            </div>
        </div>
    )
}
export default PostFetcher;