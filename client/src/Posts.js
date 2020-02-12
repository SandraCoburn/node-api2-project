import React, { useState, useEffect } from "react";
import axios from "axios";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/posts")
      .then(res => {
        console.log("Posts data", res);
        setPosts(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      {posts.map(post => (
        <div key={post.id} className="props">
          <ol>
            <li>Title: {post.title}</li>
            <li>Contents: {post.contents}</li>
          </ol>
          {/* <p>Title: {post.title}</p>
          <p>Contents: {post.contents}</p> */}
        </div>
      ))}
    </div>
  );
};
export default Posts;
