import React, { useState } from 'react';
import { QUEUED_BLASTS } from '../data/mockData';
import { SyndicationQueueItem } from '../types';

interface ReviewQueueModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDispatchImmediate: (item: SyndicationQueueItem) => void;
}

export const ReviewQueueModal: React.FC<ReviewQueueModalProps> = ({
  isOpen,
  onClose,
  onDispatchImmediate,
}) => {
  const [queue, setQueue] = useState<SyndicationQueueItem[]>(QUEUED_BLASTS);

  if (!isOpen) return null;

  const handleDispatch = (item: SyndicationQueueItem) => {
    setQueue((prev) =>
      prev.map((q) => (q.id === item.id ? { ...q, status: 'broadcasting' as const } : q))
    );
    setTimeout(() => {
      setQueue((prev) =>
        prev.map((q) => (q.id === item.id ? { ...q, status: 'completed' as const } : q))
      );
      onDispatchImmediate(item);
    }, 800);
  };

  const removeQueueItem = (id: string) => {
    setQueue((prev) => prev.filter((q) => q.id !== id));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl border border-[#c7c4d8]/40 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Modal Header */}
        <div className="p-5 border-b border-[#c7c4d8]/30 flex items-center justify-between bg-[#f2f3ff]/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#3525cd] text-white flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[18px]">send_time_extension</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-[#131b2e]">
                Automated Syndication Queue ({queue.length})
              </h3>
              <p className="text-xs text-[#464555]">
                Upcoming scheduled social blasts for #TechSummit2026
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-[#eaedff] flex items-center justify-center text-[#777587] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 overflow-y-auto space-y-3.5 custom-scroll flex-1">
          {queue.map((item, idx) => (
            <div
              key={item.id}
              className="p-4 rounded-xl border border-[#c7c4d8]/40 bg-white hover:border-[#3525cd]/40 transition-all shadow-2xs flex flex-col gap-2.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#eaedff] text-[#3525cd] text-[11px] font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span className="text-xs font-bold text-[#131b2e]">{item.eventName}</span>
                  <span className="text-xs text-[#777587]">• {item.scheduledTime}</span>
                </div>

                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    item.status === 'completed'
                      ? 'bg-emerald-100 text-emerald-800'
                      : item.status === 'broadcasting'
                      ? 'bg-blue-100 text-blue-800 animate-pulse'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {item.status === 'completed'
                    ? '✓ Dispatched'
                    : item.status === 'broadcasting'
                    ? 'Broadcasting...'
                    : '⏳ Queued'}
                </span>
              </div>

              <p className="text-xs text-[#131b2e] bg-[#faf8ff] p-2.5 rounded-lg border border-[#c7c4d8]/20 leading-relaxed font-medium">
                {item.caption}
              </p>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-[#777587] font-semibold">Targets:</span>
                  {item.channels.map((ch) => (
                    <span
                      key={ch}
                      className="px-2 py-0.5 rounded-md bg-[#eaedff] text-[10px] font-bold text-[#3525cd]"
                    >
                      {ch}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => removeQueueItem(item.id)}
                    className="text-xs text-[#ba1a1a] hover:underline cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDispatch(item)}
                    disabled={item.status !== 'scheduled'}
                    className="px-3 py-1 rounded-full bg-[#3525cd] text-white text-xs font-bold hover:bg-[#4f46e5] disabled:opacity-50 transition-all cursor-pointer"
                  >
                    Syndicate Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#c7c4d8]/30 bg-[#f2f3ff]/40 flex items-center justify-between">
          <span className="text-xs text-[#464555]">
            Engine status: <strong>99.8% Sync Reliability</strong>
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-[#3525cd] text-white text-xs font-bold hover:bg-[#4f46e5] transition-all cursor-pointer"
          >
            Close Queue
          </button>
        </div>
      </div>
    </div>
  );
};
