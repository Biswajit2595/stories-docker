"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface Story {
  id: number;
  image: string;
  user: string;
}

interface StoryViewerProps {
  story: Story;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function StoryViewer({
  story,
  onClose,
  onNext,
  onPrev,
}: StoryViewerProps) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setLoading(true);
    setProgress(0);
  }, [story]);

  useEffect(() => {
    if (loading) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          onNext();
          return 0;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [loading, story, onNext]);

  const handleImageLoad = () => {
    setLoading(false);
  };

  const handleLeftTap = () => {
    onPrev();
  };

  const handleRightTap = () => {
    onNext();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black overflow-hidden">
      {/* Top overlay */}
      <div className="absolute top-0 left-0 right-0 z-20 px-3 pt-3">
        {/* Progress */}
        <div className="h-1 w-full rounded-full bg-white/20 overflow-hidden">
          <div
            className="h-full bg-white rounded-full"
            style={{
              width: `${progress}%`,
              transition: "width 0.1s linear",
            }}
          />
        </div>

        {/* Header */}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[2px]">
              <div className="w-full h-full rounded-full overflow-hidden bg-black">
                <Image
                  src={story.image}
                  alt={story.user}
                  width={36}
                  height={36}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-white leading-none">
                {story.user}
              </p>
              <p className="text-xs text-gray-300 mt-1">Just now</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-white text-3xl leading-none px-2 active:scale-90 transition"
          >
            ×
          </button>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="absolute inset-0 z-30 flex items-center justify-center">
          <div className="w-10 h-10 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      )}

      {/* Image */}
      <div className="relative h-full w-full">
        <Image
          src={story.image}
          alt={story.user}
          fill
          priority
          onLoad={handleImageLoad}
          className={`object-cover transition-all duration-500 ${
            loading ? "scale-105 blur-sm opacity-0" : "scale-100 blur-0 opacity-100"
          }`}
        />

        {/* Premium cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/30" />
      </div>

      {/* Tap zones */}
      <button
        onClick={handleLeftTap}
        className="absolute left-0 top-0 h-full w-1/2 z-10"
      />

      <button
        onClick={handleRightTap}
        className="absolute right-0 top-0 h-full w-1/2 z-10"
      />

      {/* Bottom hint */}
      <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center">
        <div className="px-4 py-2 rounded-full bg-black/40 backdrop-blur-md text-xs text-white/80">
          Tap left / right to navigate
        </div>
      </div>
    </div>
  );
}