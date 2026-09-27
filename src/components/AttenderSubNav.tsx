import React from 'react';
import { AttenderTab } from '../types';

interface AttenderSubNavProps {
  activeTab: AttenderTab;
  setActiveTab: (tab: AttenderTab) => void;
  myEventsCount?: number;
}

export const AttenderSubNav: React.FC<AttenderSubNavProps> = ({
  activeTab,
  setActiveTab,
  myEventsCount = 2,
}) => {
  return (
    <nav className="bg-white border-b border-[#c7c4d8]/30 sticky top-16 z-30 shadow-xs backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-13">
        <div className="flex items-center gap-6 md:gap-8 overflow-x-auto custom-scroll">
          {/* Discover Events */}
          <button
            onClick={() => setActiveTab('discover')}
            className={`text-sm py-3.5 flex items-center gap-2 font-bold tracking-tight border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'discover'
                ? 'text-[#3525cd] border-[#3525cd]'
                : 'text-[#464555] hover:text-[#131b2e] border-transparent'
            }`}
          >
            <span
              className="material-symbols-outlined text-[18px]"
              style={activeTab === 'discover' ? { fontVariationSettings: "'FILL' 1" } : undefined}
            >
              explore
            </span>
            <span>Discover Events</span>
          </button>

          {/* My Events */}
          <button
            onClick={() => setActiveTab('my-events')}
            className={`text-sm py-3.5 flex items-center gap-2 font-bold tracking-tight border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'my-events'
                ? 'text-[#3525cd] border-[#3525cd]'
                : 'text-[#464555] hover:text-[#131b2e] border-transparent'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">event</span>
            <span>My Events</span>
            <span className="bg-[#eaedff] text-[#3525cd] text-xs px-2 py-0.5 rounded-full font-bold">
              {myEventsCount}
            </span>
          </button>

          {/* Upload Photos */}
          <button
            onClick={() => setActiveTab('upload-photos')}
            className={`text-sm py-3.5 flex items-center gap-2 font-bold tracking-tight border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'upload-photos'
                ? 'text-[#3525cd] border-[#3525cd]'
                : 'text-[#464555] hover:text-[#131b2e] border-transparent'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">add_a_photo</span>
            <span>Upload Photos</span>
          </button>

          {/* My Posts / Syndication */}
          <button
            onClick={() => setActiveTab('my-posts')}
            className={`text-sm py-3.5 flex items-center gap-2 font-bold tracking-tight border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'my-posts'
                ? 'text-[#3525cd] border-[#3525cd]'
                : 'text-[#464555] hover:text-[#131b2e] border-transparent'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">send</span>
            <span>My Posts &amp; Syndications</span>
          </button>
        </div>

        {/* Quick Status telemetry */}
        <div className="hidden md:flex items-center gap-2 text-[#777587] text-xs font-semibold">
          <span className="material-symbols-outlined text-sm text-[#3525cd] animate-spin">
            sync
          </span>
          <span>Auto-tagging &amp; Syndication active</span>
        </div>
      </div>
    </nav>
  );
};
