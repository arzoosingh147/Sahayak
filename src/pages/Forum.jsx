import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChatBubbleLeftRightIcon, 
  HandThumbUpIcon, 
  HeartIcon, 
  FaceSmileIcon, 
  TrashIcon, 
  PencilSquareIcon 
} from "@heroicons/react/24/outline";

export default function Forum() {
  const [posts, setPosts] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [filterEmoji, setFilterEmoji] = useState("All");
  const [newPost, setNewPost] = useState({
    emoji: "💬", title: "", message: "", tag: "General", anonymous: false,
  });

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("sahayak-forum-posts")) || [];
    setPosts(savedPosts);
  }, []);

  const handlePostSubmit = () => {
    if (!newPost.title || !newPost.message) return;
    const postData = {
      ...newPost,
      id: Date.now(),
      date: new Date().toLocaleString(),
      upvotes: 0,
      comments: [],
      reactions: { heart: 0, hug: 0, clap: 0 },
    };
    const updated = [postData, ...posts];
    setPosts(updated);
    localStorage.setItem("sahayak-forum-posts", JSON.stringify(updated));
    setNewPost({ emoji: "💬", title: "", message: "", tag: "General", anonymous: false });
    setFormOpen(false);
  };

  const handleReaction = (postId, type) => {
    const updated = posts.map(p => {
      if (p.id === postId) {
        return type === 'upvote' 
          ? { ...p, upvotes: p.upvotes + 1 }
          : { ...p, reactions: { ...p.reactions, [type]: p.reactions[type] + 1 } };
      }
      return p;
    });
    setPosts(updated);
    localStorage.setItem("sahayak-forum-posts", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-[#FFE4D7] pt-32 pb-20 px-6 text-[#093832]">
      <header className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Community Forum</h1>
        <p className="text-lg opacity-75">A safe, anonymous space to share your journey.</p>
      </header>

      {/* Control Bar */}
      <div className="max-w-4xl mx-auto flex flex-wrap justify-between items-center gap-4 mb-10 bg-white/50 p-4 rounded-3xl backdrop-blur-sm border border-white">
        <div className="flex items-center gap-3">
          <span className="font-bold text-sm uppercase tracking-wider opacity-60">Filter:</span>
          {["All", "💬", "😊", "💡", "🥺", "❤️"].map(e => (
            <button 
              key={e} 
              onClick={() => setFilterEmoji(e)}
              className={`w-10 h-10 rounded-full transition-all ${filterEmoji === e ? 'bg-[#F1A6B4] scale-110 shadow-md' : 'bg-white hover:bg-pink-100'}`}
            >
              {e === "All" ? "🏠" : e}
            </button>
          ))}
        </div>
        
        <button
          onClick={() => setFormOpen(!formOpen)}
          className="px-8 py-3 bg-[#093832] text-white rounded-full font-bold shadow-lg hover:bg-opacity-90 transition-all flex items-center gap-2"
        >
          {formOpen ? "Close Form" : "Create Post"}
        </button>
      </div>

      {/* Post Creation Form */}
      <AnimatePresence>
        {formOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="max-w-2xl mx-auto overflow-hidden mb-12"
          >
            <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border-t-8 border-[#F1A6B4]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text" placeholder="Post Title"
                  className="p-4 bg-[#FFE4D7]/30 rounded-2xl outline-none focus:ring-2 ring-[#F1A6B4]"
                  value={newPost.title} onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                />
                <select 
                  className="p-4 bg-[#FFE4D7]/30 rounded-2xl outline-none font-bold"
                  value={newPost.emoji} onChange={(e) => setNewPost({...newPost, emoji: e.target.value})}
                >
                  <option>💬 General</option><option>😊 Victory</option><option>💡 Insight</option><option>🥺 Support</option>
                </select>
              </div>
              <textarea
                placeholder="Share your thoughts..."
                className="w-full p-4 bg-[#FFE4D7]/30 rounded-2xl outline-none focus:ring-2 ring-[#F1A6B4] h-32 mb-4"
                value={newPost.message} onChange={(e) => setNewPost({...newPost, message: e.target.value})}
              />
              <div className="flex justify-between items-center">
                <label className="flex items-center gap-2 cursor-pointer font-medium">
                  <input type="checkbox" className="accent-[#F1A6B4] w-5 h-5" checked={newPost.anonymous} onChange={(e) => setNewPost({...newPost, anonymous: e.target.checked})} />
                  Post Anonymously
                </label>
                <button onClick={handlePostSubmit} className="bg-[#F1A6B4] px-10 py-3 rounded-full font-bold shadow-md hover:bg-pink-400 transition-all">
                  Publish Post
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Post Feed */}
      <div className="max-w-3xl mx-auto space-y-8">
        {posts.filter(p => filterEmoji === "All" || p.emoji.includes(filterEmoji)).map((post) => (
          <motion.div
            layout key={post.id}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="bg-white p-8 rounded-[2rem] shadow-xl border-l-8 border-[#F1A6B4] text-left relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 opacity-10 text-6xl select-none">
              {post.emoji}
            </div>
            
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#FFE4D7] rounded-full flex items-center justify-center font-bold text-[#F1A6B4]">
                {post.anonymous ? "A" : post.title.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl font-bold leading-tight">{post.title}</h3>
                <p className="text-xs font-bold uppercase tracking-widest opacity-40">
                  {post.anonymous ? "Anonymous Member" : "Community Member"} • {post.date}
                </p>
              </div>
            </div>

            <p className="text-lg leading-relaxed mb-6 opacity-80">{post.message}</p>

            <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-gray-100">
              <button onClick={() => handleReaction(post.id, 'upvote')} className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full hover:bg-blue-50 transition-colors">
                <HandThumbUpIcon className="w-5 h-5 text-blue-500" /> <span className="font-bold">{post.upvotes}</span>
              </button>
              <button onClick={() => handleReaction(post.id, 'heart')} className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full hover:bg-red-50 transition-colors">
                <HeartIcon className="w-5 h-5 text-red-500" /> <span className="font-bold">{post.reactions.heart}</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#093832] text-white rounded-full ml-auto shadow-md">
                <ChatBubbleLeftRightIcon className="w-5 h-5" />
                <span className="font-bold">Reply</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
