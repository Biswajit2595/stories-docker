"use client";

import Image from "next/image";

interface Story {
  id: number;
  image: string;
  user: string;
}

interface StoriesListProps {
  stories: Story[];
  onStoryClick: (index: number) => void;
}

export default function StoriesList({
  stories,
  onStoryClick,
}: StoriesListProps) {
  return (
    <div className="p-2 border-b border-gray-800">
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {stories.map((story, index) => (
          <button
            key={story.id}
            onClick={() => onStoryClick(index)}
            className="flex flex-col items-center shrink-0 cursor-pointer"
          >
            <div className="w-16.5 h-16.5 rounded-full bg-linear-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[2px]">
              {/* Black spacer ring */}
              <div className="w-full h-full rounded-full bg-black p-0.5 overflow-hidden">
                {/* Profile image */}
                <div className="w-full h-full rounded-full overflow-hidden">
                  <Image
                    src={story.image}
                    alt={story.user}
                    width={60}
                    height={60}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
            </div>

            {/* Username */}
            <span className="mt-1 w-16 truncate text-center text-xs text-gray-300">
              {story.user}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}