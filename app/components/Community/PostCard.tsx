"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/supabase";
import Link from "next/link";
import Image from "next/image";

const PostCard = ({ post, userId }) => {
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showComments,setShowComments]=useState(false)

  useEffect(() => {
    fetchLikes();
    fetchComments();
  }, []);

  // Fetch likes count and check if user has liked the post
  const fetchLikes = async () => {
    const { data: likeCount, error: likeError } = await supabase
      .from("likes")
      .select("id", { count: "exact" })
      .eq("post_id", post.id);

    if (!likeError) setLikes(likeCount.length);

    const { data: userLike, error: userLikeError } = await supabase
      .from("likes")
      .select("id")
      .eq("post_id", post.id)
      .eq("user_id", userId);

    if (!userLikeError) setHasLiked(userLike.length > 0);
  };

  // Toggle Like
  const handleLike = async () => {
    if (hasLiked) {
      await supabase.from("likes").delete().match({ post_id: post.id, user_id: userId });
      setLikes(likes - 1);
    } else {
      await supabase.from("likes").insert([{ post_id: post.id, user_id: userId }]);
      setLikes(likes + 1);
    }
    setHasLiked(!hasLiked);
  };

  // Fetch comments
  const fetchComments = async () => {
    const { data, error } = await supabase
      .from("comments")
      .select("id, content, created_at, profiles(id, name, profileimg)")
      .eq("post_id", post.id)
      .order("created_at", { ascending: true });

    if (!error) setComments(data);
  };

  // Add new comment
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const { data, error } = await supabase.from("comments").insert([
      {
        post_id: post.id,
        user_id: userId,
        content: newComment,
      },
    ]);

    console.log('###',data)

    if (!error) {
        fetchComments()
      setNewComment("");
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <Link href={`profile/${post.user_id}`}>
        <div className="flex items-center gap-3">
          <Image width={100} height={100}
            src={post.profiles?.profileimg || "/default-avatar.png"}
            alt={post.profiles?.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold">{post.profiles?.name}</h3>
          </div>
        </div>
      </Link>

      <p className="mt-2">{post.content}</p>
      {post.image_url && (
        <img
          src={post.image_url}
          alt="Post"
          className="w-full h-40 object-cover rounded mt-2"
        />
      )}

      <p className="text-sm text-gray-500">
        {new Date(post.created_at).toLocaleString()}
      </p>

      {/* Like and Comment Section */}
      <div className="flex justify-between items-center mt-3">
        <button
          className={`flex items-center gap-1 ${hasLiked ? "text-red-500" : "text-gray-500"}`}
          onClick={handleLike}
        >
          ❤️ {likes}
        </button>
        <p className="text-gray-500" onClick={()=>setShowComments(true)}>View {comments.length} comments</p>
      </div>

      {/* Comment Section */}
      <div className="mt-3">
        <form onSubmit={handleCommentSubmit} className="flex gap-2">
          <input
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded"
          />
          <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded">
            Post
          </button>
        </form>

        {/* Display Previous Comments */}
        {showComments&&<div className="mt-3 h-60 overflow-scroll" >
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-center gap-2 border-b py-2">
              <Image width={30} height={30}
                src={comment.profiles?.profileimg || "/default-avatar.png"}
                alt={comment.profiles?.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">{comment.profiles?.name}</p>
                <p className="text-gray-600">{comment.content}</p>
                <p className="text-xs text-gray-400">
                  {new Date(comment.created_at).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>}
      </div>
    </div>
  );
};

export default PostCard;
