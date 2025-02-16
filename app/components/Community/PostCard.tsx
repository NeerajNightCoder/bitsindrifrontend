"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/supabase";
import Link from "next/link";
import Image from "next/image";
import { Post } from "@/app/community/page";

export interface PostCardProps{
  post:Post;
  userId:string;
}

export interface Profile_Min{
  id: string;
  name: string;
  profileimg: string | null;
}

interface LikedUser{
  user_id:string;
  profiles:Profile_Min
}

interface Comment{
  id:string;
  content:string;
  created_at:string;
  profiles:Profile_Min
}

const PostCard = ({ post, userId }:PostCardProps) => {
    const supabase = createClient()
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [showLikes, setShowLikes] = useState(false);
  const [likedUsers, setLikedUsers] = useState<LikedUser[]>([]);

  useEffect(() => {
    fetchLikes();
    fetchComments();
  }, [supabase]);

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

  // Fetch users who liked the post
  const fetchLikedUsers = async () => {
    const { data, error } = await supabase
      .from("likes")
      .select("user_id, profiles(id, name, profileimg)")
      .eq("post_id", post.id);
  
    console.log("###", data?.[0]?.profiles); // Check if it's an object or an array
  
    if (!error && data) {
      setLikedUsers(
        data.map((item) => ({
          ...item,
          profiles: Array.isArray(item.profiles) ? item.profiles[0] : item.profiles,
        })) as LikedUser[]
      );
    }
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

    if (!error && data){
      setComments(data.map(item=>({...item,profiles:Array.isArray(item.profiles)?item.profiles[0]:item.profiles})) as Comment[]);
    } 
  };

  // Add new comment
  const handleCommentSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const {  error } = await supabase.from("comments").insert([
      {
        post_id: post.id,
        user_id: userId,
        content: newComment,
      },
    ]);

    if (!error) {
      fetchComments();
      setNewComment("");
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 w-full w-48">
      <Link href={`profile/${post.user_id}`}>
        <div className="flex items-center gap-3">
          <Image
            width={100}
            height={100}
            src={post.profiles?.profileimg || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
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
          className="w-full object-cover rounded mt-2"
        />
      )}

      <p className="text-sm text-gray-500">{new Date(post.created_at).toLocaleString()}</p>

      {/* Like and Comment Section */}
      <div className="flex justify-between items-center mt-3">
        <div className="flex gap-2 items-center">
          <button
            className={`flex items-center gap-1 ${hasLiked ? "text-red-500" : "text-gray-500"}`}
            onClick={handleLike}
          >
            ❤️ {likes}
          </button>
          <p className="text-gray-500 cursor-pointer" onClick={() => {
            fetchLikedUsers();
            setShowLikes(!showLikes);
            if(showComments)setShowComments(false)
            
          }}>
            {`${showLikes?"Hide Likes":"View Likes"}`}
          </p>
        </div>
        <p className="text-gray-500 cursor-pointer" onClick={() => {setShowComments(!showComments);if(showLikes)setShowLikes(false)}}>
            {`${showComments?"Hide Comments":`View ${comments.length} comments`}`}
          
        </p>
      </div>


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

      {/* Liked Users Section */}
      {showLikes && (
        <div className="mt-2 p-2 border rounded-lg max-h-40 overflow-y-scroll">
          <h3 className="text-sm font-semibold">Liked by:</h3>
          {likedUsers.length > 0 ? (
            likedUsers.map((user) => (
              <div key={user.user_id} className="flex items-center gap-2 p-2">
                <Image
                  width={30}
                  height={30}
                  src={user.profiles?.profileimg || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                  alt={user.profiles?.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <p className="text-sm">{user.profiles?.name}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No likes yet.</p>
          )}
        </div>
      )}

      {/* Comment Section */}
      {showComments && (
        <div className="mt-3">
          

          {/* Display Previous Comments */}
          <div className="mt-3 h-60 overflow-scroll">
            {comments.map((comment) => (
              <div key={comment.id} className="flex items-center gap-2 border-b py-2">
                <Image
                  width={30}
                  height={30}
                  src={comment.profiles?.profileimg || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
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
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
