import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Forum() {
  const [posts, setPosts] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [newPost, setNewPost] = useState({
    emoji: "💬",
    title: "",
    message: "",
    tag: "General",
    comments: [],
    anonymous: false,
  });
  const [filterEmoji, setFilterEmoji] = useState("All");

  // Load posts from localStorage
  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("sahayak-forum-posts")) || [];
    setPosts(savedPosts);
  }, []);

  // Save posts to localStorage
  useEffect(() => {
    localStorage.setItem("sahayak-forum-posts", JSON.stringify(posts));
  }, [posts]);

  const handlePostSubmit = () => {
    const updatedPosts = [
      ...posts,
      {
        ...newPost,
        date: new Date().toLocaleString(),
        upvotes: 0,
        reactions: {
          heart: 0,
          hug: 0,
          clap: 0,
        },
      },
    ];
    setPosts(updatedPosts);
    setNewPost({ emoji: "💬", title: "", message: "", tag: "General", comments: [], anonymous: false });
    setFormOpen(false);
  };

  const handleDelete = (indexToDelete) => {
    const updatedPosts = posts.filter((_, i) => i !== indexToDelete);
    setPosts(updatedPosts);
  };

  const handleEdit = (indexToEdit) => {
    const postToEdit = posts[indexToEdit];
    setNewPost(postToEdit);
    setFormOpen(true);
    handleDelete(indexToEdit);
  };

  const handleAddComment = (index, comment) => {
    const updatedPosts = [...posts];
    updatedPosts[index].comments.push(comment);
    setPosts(updatedPosts);
  };

  const handleReaction = (index, type) => {
    const updatedPosts = [...posts];
    updatedPosts[index].reactions[type]++;
    setPosts(updatedPosts);
  };

  const handleUpvote = (index) => {
    const updatedPosts = [...posts];
    updatedPosts[index].upvotes++;
    setPosts(updatedPosts);
  };

  const filteredPosts =
    filterEmoji === "All" ? posts : posts.filter((post) => post.emoji === filterEmoji);

  return (
    <div className="min-h-auto bg-[#FFE4D7] pt-28 pb-16 px-6 text-center">
      <h1 className="text-4xl font-bold text-black mb-6">Community Forum </h1>
      <p className="text-gray-600 mb-6 max-w-xl mx-auto">
        Post your thoughts, questions, or even victories. Your voice matters.
      </p>

      {/* Emoji Filter */}
      <div className="mb-6">
        <label className="mr-2 font-semibold text-black">Filter by emoji:</label>
        <select
          value={filterEmoji}
          onChange={(e) => setFilterEmoji(e.target.value)}
          className="border px-3 py-1 rounded text-lg"
        >
          <option>All</option>
          <option>💬</option>
          <option>😊</option>
          <option>💡</option>
          <option>🥺</option>
          <option>❤️</option>
          <option>🙋‍♀️</option>
        </select>
      </div>

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setFormOpen(!formOpen)}
        className="mb-6 px-6 py-2 bg-[#F1A6B4] text-black rounded-full shadow-md hover:bg-opacity-90"
      >
        {formOpen ? "Cancel" : " New Post"}
      </motion.button>

      {/* New Post Form */}
      {formOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-lg mb-10"
        >
          <div className="flex items-center gap-2 mb-4">
            <label className="text-xl">Emoji:</label>
            <select
              value={newPost.emoji}
              onChange={(e) => setNewPost({ ...newPost, emoji: e.target.value })}
              className="text-xl border rounded px-2 py-1"
            >
              <option>💬</option>
              <option>😊</option>
              <option>💡</option>
              <option>🥺</option>
              <option>❤️</option>
              <option>🙋‍♀️</option>
            </select>
          </div>
          <input
            type="text"
            placeholder="Title"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            className="w-full mb-3 p-2 border rounded"
          />
          <textarea
            rows="4"
            placeholder="Write your message..."
            value={newPost.message}
            onChange={(e) => setNewPost({ ...newPost, message: e.target.value })}
            className="w-full p-2 border rounded mb-4"
          />
          <input
            type="text"
            placeholder="Tag (e.g. Anxiety, ADHD, Self-Esteem)"
            value={newPost.tag}
            onChange={(e) => setNewPost({ ...newPost, tag: e.target.value })}
            className="w-full p-2 border rounded mb-4"
          />
          <label className="flex items-center gap-2 mb-4 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={newPost.anonymous}
              onChange={(e) => setNewPost({ ...newPost, anonymous: e.target.checked })}
            />
            Post anonymously
          </label>
          <button onClick={handlePostSubmit} className="px-6 py-2 bg-[#F1A6B4] text-black rounded-full">
            Post
          </button>
        </motion.div>
      )}

      {/* Posts List */}
      <div className="grid gap-6 max-w-3xl mx-auto">
        {filteredPosts.length === 0 ? (
          <p className="text-gray-500">No posts yet. Be the first to share something 💬</p>
        ) : (
          filteredPosts
            .slice()
            .reverse()
            .map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl p-6 text-left shadow-md"
              >
                <div className="text-2xl">{post.emoji}</div>
                <h3 className="text-xl font-semibold text-BLACK mt-1">
                  {post.anonymous ? "Anonymous" : post.title}
                </h3>
                {!post.anonymous && <p className="text-gray-700 mt-1">{post.message}</p>}
                <p className="text-sm mt-1 text-[#F1A6B4] font-medium">#{post.tag}</p>
                <p className="text-xs text-gray-400 mt-2">{post.date}</p>

                {/* Edit/Delete Buttons */}
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => handleEdit(index)}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="text-red-500 hover:underline text-sm"
                  >
                    Delete
                  </button>
                </div>

                {/* Reactions */}
                <div className="mt-3 flex items-center gap-4 text-sm">
                  <button onClick={() => handleUpvote(index)} className="hover:scale-110 transition">
                    👍 {post.upvotes}
                  </button>
                  <button onClick={() => handleReaction(index, "heart")} className="hover:scale-110 transition">
                    ❤️ {post.reactions.heart}
                  </button>
                  <button onClick={() => handleReaction(index, "hug")} className="hover:scale-110 transition">
                    🤗 {post.reactions.hug}
                  </button>
                  <button onClick={() => handleReaction(index, "clap")} className="hover:scale-110 transition">
                    👏 {post.reactions.clap}
                  </button>
                </div>

                {/* Comments Section */}
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Comments:</h4>
                  {post.comments.length === 0 ? (
                    <p className="text-gray-400 text-sm mb-2">No comments yet.</p>
                  ) : (
                    <ul className="list-decimal list-inside text-sm text-gray-600 mb-2">
                      {post.comments.map((comment, cIndex) => (
                        <li key={cIndex}>{comment}</li>
                      ))}
                    </ul>
                  )}
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && e.target.value.trim()) {
                        handleAddComment(index, e.target.value.trim());
                        e.target.value = "";
                      }
                    }}
                    className="w-full border px-2 py-1 rounded text-sm"
                  />
                </div>
              </motion.div>
            ))
        )}
      </div>
    </div>
  );
}
