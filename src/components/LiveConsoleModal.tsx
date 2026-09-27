import React, { useState, useEffect } from 'react';
import { EventItem } from '../types';

interface LiveConsoleModalProps {
  isOpen: boolean;
  event: EventItem | null;
  onClose: () => void;
  onCaptureAndBlast: () => void;
}

export const LiveConsoleModal: React.FC<LiveConsoleModalProps> = ({
  isOpen,
  event,
  onClose,
  onCaptureAndBlast,
}) => {
  const [viewCount, setViewCount] = useState(18420);
  const [activeCamera, setActiveCamera] = useState<'main' | 'crowd' | 'stage'>('main');
  const [broadcastActive, setBroadcastActive] = useState(true);

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setViewCount((prev) => prev + Math.floor(Math.random() * 5));
    }, 2000);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen || !event) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl rounded-3xl bg-[#131b2e] text-white shadow-2xl border border-white/15 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 px-6 border-b border-white/10 flex items-center justify-between bg-black/40">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">{event.title} — Live Console</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-400/30">
                  {broadcastActive ? 'ON AIR' : 'PAUSED'}
                </span>
              </div>
              <span className="text-xs text-white/60">Feed #TS26-01 · Moscone Center, Mumbai</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-white/80 bg-white/10 px-3 py-1.5 rounded-full">
              <span className="material-symbols-outlined text-[16px] text-emerald-400">visibility</span>
              <span className="font-bold">{viewCount.toLocaleString()}</span>
              <span>Live Views</span>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>

        {/* Main Video Viewport & Controls */}
        <div className="p-6 flex flex-col gap-4 overflow-y-auto custom-scroll flex-1">
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black border border-white/10 shadow-inner">
            <img
              src={event.image}
              alt="Live Broadcast"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none"></div>

            {/* Overlays */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-red-600 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                <span>Live Keynote</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-semibold border border-white/20">
                1080p60 · Ultra HD Multi-cast
              </span>
            </div>

            {/* Camera Switcher */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2">
              <button
                onClick={() => setActiveCamera('main')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeCamera === 'main'
                    ? 'bg-[#3525cd] text-white shadow-md'
                    : 'bg-black/60 text-white/80 hover:bg-black'
                }`}
              >
                Cam 1: Stage Center
              </button>
              <button
                onClick={() => setActiveCamera('crowd')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeCamera === 'crowd'
                    ? 'bg-[#3525cd] text-white shadow-md'
                    : 'bg-black/60 text-white/80 hover:bg-black'
                }`}
              >
                Cam 2: Auditorium Crowd
              </button>
              <button
                onClick={() => setActiveCamera('stage')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeCamera === 'stage'
                    ? 'bg-[#3525cd] text-white shadow-md'
                    : 'bg-black/60 text-white/80 hover:bg-black'
                }`}
              >
                Cam 3: Speaker Close-Up
              </button>
            </div>

            <div className="absolute bottom-4 right-4 flex items-center gap-2">
              <button
                onClick={() => setBroadcastActive(!broadcastActive)}
                className="px-3.5 py-1.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs font-bold transition-all cursor-pointer"
              >
                {broadcastActive ? 'Pause Broadcast' : 'Resume Broadcast'}
              </button>
            </div>
          </div>

          {/* Connected Syndication Outlets */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-white/60 block">Social Nodes</span>
                <span className="text-xs font-bold text-white">4 Networks Armed</span>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-white/60 block">Live Streams</span>
                <span className="text-xs font-bold text-white">IG, FB, LinkedIn, X</span>
              </div>
              <span className="material-symbols-outlined text-emerald-400 text-[18px]">cell_tower</span>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-white/60 block">Attendee Submissions</span>
                <span className="text-xs font-bold text-white">284 Photos in Pipeline</span>
              </div>
              <span className="material-symbols-outlined text-[#acedff] text-[18px]">photo_library</span>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 px-6 border-t border-white/10 bg-black/40 flex items-center justify-between">
          <span className="text-xs text-white/60">
            Real-time latency: <strong className="text-emerald-400">142ms</strong> · Stream status healthy
          </span>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-full border border-white/20 text-white text-xs font-bold hover:bg-white/10 cursor-pointer"
            >
              Exit Console
            </button>
            <button
              onClick={() => {
                onClose();
                onCaptureAndBlast();
              }}
              className="px-5 py-2 rounded-full bg-[#3525cd] hover:bg-[#4f46e5] text-white text-xs font-bold shadow-lg shadow-[#3525cd]/40 flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">photo_camera</span>
              <span>Capture &amp; Blast Moment</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
