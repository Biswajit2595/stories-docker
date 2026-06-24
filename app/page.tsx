"use client";

import { useState, useEffect } from "react";
import StoriesList from "./components/StoriesList";
import StoryViewer from "./components/StoryViewer";
import Feed from "./components/Feed";

interface Story {
  id: number;
  image: string;
  user: string;
}

export default function Home() {
  const [stories, setStories] = useState<Story[]>([]);
  const [currentStoryIndex, setCurrentStoryIndex] = useState<number | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();

    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    fetch("/stories.json")
      .then((res) => res.json())
      .then((data) => {
        setStories(data);
        setLoading(false);
      });
  }, []);

  const openStory = (index: number) => setCurrentStoryIndex(index);
  const closeStory = () => setCurrentStoryIndex(null);

  const nextStory = () => {
    if (currentStoryIndex !== null && currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
    } else {
      closeStory();
    }
  };

  const prevStory = () => {
    if (currentStoryIndex !== null && currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
    }
  };

  /* DESKTOP */
  if (!isMobile) {
    return (
      <div className="min-h-screen bg-[#0f0f10] flex items-center justify-center px-6">
        <div className="max-w-sm text-center">
          <div className="text-5xl mb-5">📱</div>
          <h1 className="text-white text-3xl font-semibold mb-3">
            Mobile Experience
          </h1>
          <p className="text-gray-400 leading-6 text-sm">
            This interface is designed for phones. Resize the browser or open it
            on mobile.
          </p>
        </div>
      </div>
    );
  }

  /* LOADING */
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0f10] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 rounded-full border-2 border-white/10 border-t-white animate-spin mx-auto" />
          <p className="text-white/70 text-sm mt-4">Loading feed...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0f0f10] flex justify-center">
      {/* DEVICE */}
      <section className="relative w-full max-w-md min-h-screen bg-[#111214] text-white overflow-hidden border-x border-white/5">
        {/* HEADER */}
        <header className="sticky top-0 z-30 px-4 py-4 bg-[#111214]/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">
            Instagram
          </h1>

          <div className="flex items-center gap-5 text-xl">
            <button className="transition active:scale-90">♡</button>

            <button className="relative transition active:scale-90">
              ✉
              <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-red-500 text-[10px] flex items-center justify-center">
                2
              </span>
            </button>
          </div>
        </header>

        {/* CONTENT */}
        <div className="pb-24">
          {/* STORIES */}
          <div className="">
            <StoriesList stories={stories} onStoryClick={openStory} />
          </div>

          {/* FEED */}
          <Feed />
        </div>

        {/* BOTTOM NAV */}
        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-40 bg-[#111214]/90 backdrop-blur-xl border-t border-white/5 px-6 py-3">
          <div className="flex items-center justify-between text-2xl">
            <button className="active:scale-90 transition">⌂</button>
            <button className="active:scale-90 transition">⌕</button>

            <button className="w-10 h-10 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-xl active:scale-90 transition">
              ＋
            </button>

            <button className="active:scale-90 transition">🎬</button>

            <button className="w-8 h-8 rounded-full overflow-hidden border border-white/10">
              <div className="w-full h-full bg-gradient-to-tr from-zinc-200 to-zinc-500" />
            </button>
          </div>
        </nav>

        {/* STORY MODAL */}
        {currentStoryIndex !== null && (
          <StoryViewer
            story={stories[currentStoryIndex]}
            onClose={closeStory}
            onNext={nextStory}
            onPrev={prevStory}
          />
        )}
      </section>
    </main>
  );
}