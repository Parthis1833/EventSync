import React from 'react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl rounded-2xl bg-white shadow-2xl border border-[#c7c4d8]/40 overflow-hidden flex flex-col max-h-[85vh]">
        <div className="p-5 border-b border-[#c7c4d8]/30 flex items-center justify-between bg-[#f2f3ff]/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#3525cd] text-white flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[20px]">help</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-[#131b2e]">EventSync Help &amp; Guide</h3>
              <p className="text-xs text-[#464555]">
                How automated social media syndication works
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

        <div className="p-6 space-y-4 overflow-y-auto custom-scroll text-xs md:text-sm text-[#464555] leading-relaxed">
          <div className="p-4 rounded-xl bg-[#faf8ff] border border-[#c7c4d8]/30">
            <h4 className="font-bold text-[#131b2e] mb-1 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#3525cd] text-[18px]">cell_tower</span>
              <span>1. For Event Planners</span>
            </h4>
            <p>
              Set up automated syndication pipelines for your events. When you publish an event, configure verified official hashtags, partner handles, and geotags. When attendees upload photos, they receive verified accreditation and broadcast simultaneously to Instagram, X, Facebook, and LinkedIn.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#faf8ff] border border-[#c7c4d8]/30">
            <h4 className="font-bold text-[#131b2e] mb-1 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#3525cd] text-[18px]">photo_camera</span>
              <span>2. For Event Attendees</span>
            </h4>
            <p>
              Check into events via NFC or GPS location verification. Snap photos during keynotes, panels, and networking sessions. EventSync auto-calibrates lighting, tags official speakers, and lets you blast your high-res moments in 1 click!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#faf8ff] border border-[#c7c4d8]/30">
            <h4 className="font-bold text-[#131b2e] mb-1 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#3525cd] text-[18px]">verified_user</span>
              <span>3. Verified Badges &amp; Safety Moderation</span>
            </h4>
            <p>
              All broadcasts undergo safety checks to prevent spam while guaranteeing high-resolution lossless upload to social story and feed formats.
            </p>
          </div>
        </div>

        <div className="p-4 border-t border-[#c7c4d8]/30 bg-[#f2f3ff]/40 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-[#3525cd] text-white text-xs font-bold hover:bg-[#4f46e5] cursor-pointer"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
