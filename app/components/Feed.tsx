"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Heart, MessageCircle, Send, Bookmark } from "lucide-react";

interface Post {
  id: number;
  user: string;
  image: string;
  likes: string;
  caption: string;
}

const allPosts: Post[] = [
  {
    id: 1,
    user: "alex",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    likes: "12,482",
    caption: "Golden hour in the wild.",
  },
  {
    id: 2,
    user: "emma",
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80",
    likes: "8,219",
    caption: "Soft tones and city moods.",
  },
  {
    id: 3,
    user: "noah",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80",
    likes: "19,034",
    caption: "Sunday energy.",
  },
  {
    id: 4,
    user: "olivia",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80",
    likes: "5,993",
    caption: "Street frames.",
  },
  {
    id: 5,
    user: "liam",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
    likes: "24,501",
    caption: "Moments worth pausing for.",
  },
  {
    id: 6,
    user: "ava",
    image:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=1200&q=80",
    likes: "7,840",
    caption: "Minimal but loud.",
  },
  {
    id: 7,
    user: "mia",
    image:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=1200&q=80",
    likes: "11,230",
    caption: "Coffee first. Chaos later.",
  },
  {
    id: 8,
    user: "ethan",
    image:
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=1200&q=80",
    likes: "14,220",
    caption: "Roads remember footsteps.",
  },
];

// const allPosts: Post[] = [
//   {
//     id: 1,
//     user: "alex",
//     image:
//       "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200",
//     likes: "12,482",
//     caption: "Golden hour in the wild.",
//   },
//   {
//     id: 2,
//     user: "emma",
//     image:
//       "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=1200",
//     likes: "8,219",
//     caption: "Soft tones and city moods.",
//   },
//   {
//     id: 3,
//     user: "noah",
//     image:
//       "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1200",
//     likes: "19,034",
//     caption: "Sunday energy.",
//   },
//   {
//     id: 4,
//     user: "olivia",
//     image:
//       "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200",
//     likes: "5,993",
//     caption: "Street frames.",
//   },
//   {
//     id: 5,
//     user: "liam",
//     image:
//       "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1200",
//     likes: "24,501",
//     caption: "Moments worth pausing for.",
//   },
//   {
//     id: 6,
//     user: "ava",
//     image:
//       "https://images.unsplash.com/photo-1500648767791-00dcc994a43d?w=1200",
//     likes: "7,840",
//     caption: "Minimal but loud.",
//   },
//   {
//     id: 7,
//     user: "mia",
//     image:
//       "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=1200",
//     likes: "11,230",
//     caption: "Coffee first. Chaos later.",
//   },
//   {
//     id: 8,
//     user: "ethan",
//     image:
//       "https://images.unsplash.com/photo-1504593811423-6dd665756598?w=1200",
//     likes: "14,220",
//     caption: "Roads remember footsteps.",
//   },
// ];

export default function Feed() {
  const [visiblePosts, setVisiblePosts] = useState<Post[]>(
    allPosts.slice(0, 3),
  );
  const [loadingMore, setLoadingMore] = useState(false);

  const loadMorePosts = () => {
    if (loadingMore || visiblePosts.length >= allPosts.length) return;

    setLoadingMore(true);

    setTimeout(() => {
      const nextPosts = allPosts.slice(
        0,
        Math.min(visiblePosts.length + 2, allPosts.length),
      );

      setVisiblePosts(nextPosts);
      setLoadingMore(false);
    }, 1200);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 300;

      if (scrollPosition) {
        loadMorePosts();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [visiblePosts, loadingMore]);

  return (
    <div className="pb-6">
      {visiblePosts.map((post) => (
        <div
          key={post.id}
          className="mb-6 border-b border-white/5 pb-5 bg-[#111214]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[2px]">
                <div className="w-full h-full rounded-full bg-zinc-800 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.user}
                    width={36}
                    height={36}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-white">{post.user}</p>
                <p className="text-[11px] text-gray-400">Suggested for you</p>
              </div>
            </div>

            <button className="text-white text-xl">⋯</button>
          </div>

          {/* Image */}
          <div className="relative w-full h-[440px] bg-zinc-900">
            <Image
              src={post.image}
              alt={post.user}
              fill
              className="object-cover"
            />
          </div>
          <div className="px-4 pt-3">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-4">
                <button className="hover:scale-110 active:scale-90 transition">
                  <Heart size={24} strokeWidth={1.8} />
                </button>

                <button className="hover:scale-110 active:scale-90 transition">
                  <MessageCircle size={24} strokeWidth={1.8} />
                </button>

                <button className="hover:scale-110 active:scale-90 transition">
                  <Send size={22} strokeWidth={1.8} />
                </button>
              </div>

              <button className="hover:scale-110 active:scale-90 transition">
                <Bookmark size={24} strokeWidth={1.8} />
              </button>
            </div>

            {/* Likes */}
            <p className="text-sm text-white font-semibold mt-3">
              {post.likes} likes
            </p>

            {/* Caption */}
            <p className="text-sm text-white mt-1 leading-6">
              <span className="font-semibold mr-2">{post.user}</span>
              {post.caption}
            </p>

            <p className="text-[11px] text-gray-500 mt-2 uppercase tracking-wider">
              2 HOURS AGO
            </p>
          </div>
        </div>
      ))}

      {loadingMore && (
        <div className="py-8 flex flex-col items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-white/10 border-t-white animate-spin" />
          <p className="text-sm text-gray-400 mt-3">Loading more posts...</p>
        </div>
      )}

      {!loadingMore && visiblePosts.length === allPosts.length && (
        <div className="py-8 text-center text-sm text-gray-500">
          You’re all caught up ✨
        </div>
      )}
    </div>
  );
}
