import React, { useState } from 'react';
import { StagedPhoto } from '../types';

interface AttenderSyndicationProps {
  initialCaption?: string;
  stagedPhotos?: StagedPhoto[];
  onUploadAnother: () => void;
  onViewLiveFeed: () => void;
}

export const AttenderSyndication: React.FC<AttenderSyndicationProps> = ({
  initialCaption,
  stagedPhotos,
  onUploadAnother,
  onViewLiveFeed,
}) => {
  const [selectedChannels, setSelectedChannels] = useState<{
    instagram: boolean;
    facebook: boolean;
    linkedin: boolean;
    x: boolean;
  }>({
    instagram: true,
    facebook: true,
    linkedin: true,
    x: false,
  });

  const [activePreviewTab, setActivePreviewTab] = useState<'instagram' | 'linkedin' | 'facebook'>('instagram');
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishProgress, setPublishProgress] = useState(92);
  const [showSuccessBanner, setShowSuccessBanner] = useState(true);
  const [storyModalOpen, setStoryModalOpen] = useState(false);
  const [postModalOpen, setPostModalOpen] = useState<string | null>(null);

  const selectedCount = Object.values(selectedChannels).filter(Boolean).length;

  const currentCaption =
    initialCaption ||
    'Unveiling next-gen distributed event pipelines live at mainstage! The synergy between real-time inference and low-latency edge delivery is mindblowing. @TechSummitOfficial #TechSummit2026 #SoftwareArchitecture #EdgeComputing';

  const previewImage =
    stagedPhotos && stagedPhotos.length > 0
      ? stagedPhotos[0].url
      : 'https://lh3.googleusercontent.com/aida-public/AB6AXuAW-eUVYRFDsXAMtSbLvtzlkVeuOtspOvqDG0h7_9_Y7L92lsX6FM6OxG7CqunkXKbamPtrTeEv7FONOnA1XMXsQyi-kWeP3fhOH6oiv92Svc-TnTmc6XSf3LH4PsaXSDDGQjzOvFhKMyM45FGvMpPJ2Vce7I854uItxRx4jWoVjRuG4hlcJNrW-1eEIScvWF7WbVnHrWE86LrRGmF_Xe1oAtmgK44YcqXk-HnVcQtM0NSuGUqWrvi7';

  const handlePublish = () => {
    setIsPublishing(true);
    setPublishProgress(25);
    setTimeout(() => setPublishProgress(60), 400);
    setTimeout(() => setPublishProgress(92), 800);
    setTimeout(() => {
      setPublishProgress(100);
      setIsPublishing(false);
      setShowSuccessBanner(true);
    }, 1200);
  };

  const toggleChannel = (channel: 'instagram' | 'facebook' | 'linkedin' | 'x') => {
    setSelectedChannels((prev) => ({ ...prev, [channel]: !prev[channel] }));
  };

  return (
    <div className="max-w-[1440px] w-full mx-auto p-6 md:p-8 flex flex-col gap-6">
      {/* Breadcrumbs & Headline */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#464555] mb-1">
            <span>Tech Summit 2026</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span>Keynote Live Capture</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-[#3525cd] font-bold">Syndicate Post</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#131b2e] tracking-tight">
            Post Preview &amp; Multi-Platform Syndication
          </h2>
          <p className="text-xs md:text-sm text-[#464555] mt-1">
            Review live rendering previews, select authorized partner networks, and broadcast instantly with automated telemetry.
          </p>
        </div>

        {/* Telemetry Quick Stat Pill */}
        <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-2xl border border-[#c7c4d8]/40 shadow-xs self-start md:self-auto">
          <div className="flex -space-x-1.5 overflow-hidden">
            <span className="inline-block w-6 h-6 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 ring-2 ring-white flex items-center justify-center text-[10px] text-white font-bold">
              IG
            </span>
            <span className="inline-block w-6 h-6 rounded-full bg-[#1877F2] ring-2 ring-white flex items-center justify-center text-[10px] text-white font-bold">
              f
            </span>
            <span className="inline-block w-6 h-6 rounded-full bg-[#0A66C2] ring-2 ring-white flex items-center justify-center text-[10px] text-white font-bold">
              in
            </span>
          </div>

          <div className="text-xs font-bold text-[#131b2e]">
            <span className="text-[#3525cd]">{selectedCount} of 4</span> Channels Selected
          </div>

          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1 animate-pulse"></span>
            <span>Sync Ready</span>
          </span>
        </div>
      </div>

      {/* SUCCESS STATE BANNER */}
      {showSuccessBanner && (
        <div className="w-full bg-emerald-50/90 border border-emerald-200/80 rounded-2xl p-4 shadow-xs backdrop-blur-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs">
              <span className="material-symbols-outlined text-[24px]">task_alt</span>
            </div>
            <div>
              <h3 className="text-sm md:text-base font-bold text-emerald-950">
                🎉 Blast Successful! Your moment is live across 3 networks.
              </h3>
              <p className="text-xs md:text-sm text-emerald-800 mt-0.5">
                Assets encoded and published with high-res telemetry to Instagram, Facebook, and LinkedIn.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 self-end md:self-auto">
            <button
              onClick={onUploadAnother}
              className="px-4 py-2 rounded-full bg-white hover:bg-emerald-100/50 text-emerald-900 border border-emerald-300 text-xs font-bold transition-all active:scale-[0.98] shadow-2xs flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">add_photo_alternate</span>
              <span>Upload Another Photo</span>
            </button>
            <button
              onClick={onViewLiveFeed}
              className="px-4 py-2 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all active:scale-[0.98] shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">stream</span>
              <span>View Live Event Feed</span>
            </button>
          </div>
        </div>
      )}

      {/* DUAL-PANEL PUBLISHING WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT PANEL: SELECT SOCIAL DESTINATIONS (5 cols) */}
        <section className="lg:col-span-5 flex flex-col gap-5">
          <div className="bg-white rounded-2xl border border-[#c7c4d8]/40 p-6 shadow-xs flex flex-col gap-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#c7c4d8]/30">
              <div>
                <h3 className="text-base font-bold text-[#131b2e]">Select Social Destinations</h3>
                <p className="text-xs text-[#464555]">Where do you want to publish?</p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#e2dfff] text-[#0f0069] text-xs font-bold">
                1-Click Syndication
              </span>
            </div>

            {/* Destination Cards Stack */}
            <div className="flex flex-col gap-3.5">
              {/* 1. Instagram Card */}
              <div
                onClick={() => toggleChannel('instagram')}
                className={`group relative flex items-center justify-between p-4 rounded-2xl border-2 transition-all shadow-2xs cursor-pointer ${
                  selectedChannels.instagram
                    ? 'border-[#3525cd] bg-white'
                    : 'border-[#c7c4d8]/40 bg-[#f2f3ff]/30 opacity-75'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <input
                    type="checkbox"
                    checked={selectedChannels.instagram}
                    onChange={() => {}}
                    className="w-5 h-5 rounded text-[#3525cd] focus:ring-[#3525cd]/30 border-[#c7c4d8] cursor-pointer"
                  />
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] flex items-center justify-center text-white shadow-xs shrink-0">
                    <span className="material-symbols-outlined text-[24px]">photo_camera</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[#131b2e]">Instagram</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800">
                        Story &amp; Feed
                      </span>
                    </div>
                    <p className="text-xs text-[#464555] font-semibold">@parthish</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[11px] text-emerald-800 font-bold">Connected</span>
                </div>
              </div>

              {/* 2. Facebook Card */}
              <div
                onClick={() => toggleChannel('facebook')}
                className={`group relative flex items-center justify-between p-4 rounded-2xl border-2 transition-all shadow-2xs cursor-pointer ${
                  selectedChannels.facebook
                    ? 'border-[#3525cd] bg-white'
                    : 'border-[#c7c4d8]/40 bg-[#f2f3ff]/30 opacity-75'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <input
                    type="checkbox"
                    checked={selectedChannels.facebook}
                    onChange={() => {}}
                    className="w-5 h-5 rounded text-[#3525cd] focus:ring-[#3525cd]/30 border-[#c7c4d8] cursor-pointer"
                  />
                  <div className="w-11 h-11 rounded-xl bg-[#1877F2] flex items-center justify-center text-white shadow-xs shrink-0 font-bold text-2xl font-serif">
                    f
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[#131b2e]">Facebook</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                        Page Sync
                      </span>
                    </div>
                    <p className="text-xs text-[#464555] font-semibold">Parthish Joshi</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[11px] text-emerald-800 font-bold">Connected</span>
                </div>
              </div>

              {/* 3. LinkedIn Card */}
              <div
                onClick={() => toggleChannel('linkedin')}
                className={`group relative flex items-center justify-between p-4 rounded-2xl border-2 transition-all shadow-2xs cursor-pointer ${
                  selectedChannels.linkedin
                    ? 'border-[#3525cd] bg-white'
                    : 'border-[#c7c4d8]/40 bg-[#f2f3ff]/30 opacity-75'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <input
                    type="checkbox"
                    checked={selectedChannels.linkedin}
                    onChange={() => {}}
                    className="w-5 h-5 rounded text-[#3525cd] focus:ring-[#3525cd]/30 border-[#c7c4d8] cursor-pointer"
                  />
                  <div className="w-11 h-11 rounded-xl bg-[#0A66C2] flex items-center justify-center text-white shadow-xs shrink-0 font-bold text-xl">
                    in
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[#131b2e]">LinkedIn</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 text-sky-800">
                        Article Feed
                      </span>
                    </div>
                    <p className="text-xs text-[#464555] font-semibold max-w-[170px] truncate">
                      Parthish Joshi (Lead Architect)
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[11px] text-emerald-800 font-bold">Connected</span>
                </div>
              </div>

              {/* 4. X (Twitter) Card */}
              <div
                onClick={() => toggleChannel('x')}
                className={`group relative flex items-center justify-between p-4 rounded-2xl border transition-all shadow-2xs cursor-pointer ${
                  selectedChannels.x
                    ? 'border-[#3525cd] bg-white'
                    : 'border-[#c7c4d8]/40 bg-[#f2f3ff]/30 opacity-85'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <input
                    type="checkbox"
                    checked={selectedChannels.x}
                    onChange={() => {}}
                    className="w-5 h-5 rounded text-[#3525cd] focus:ring-[#3525cd]/30 border-[#c7c4d8] cursor-pointer"
                  />
                  <div className="w-11 h-11 rounded-xl bg-[#0F1419] flex items-center justify-center text-white shadow-xs shrink-0 font-bold text-xl">
                    𝕏
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[#131b2e]">X</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-200 text-slate-700">
                        Microblog
                      </span>
                    </div>
                    <p className="text-xs text-[#777587] font-semibold">
                      {selectedChannels.x ? '@parthish_dev' : 'No account linked'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 bg-[#eaedff] px-2.5 py-1 rounded-full border border-[#c7c4d8]/40">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        selectedChannels.x ? 'bg-emerald-500' : 'bg-[#777587]'
                      }`}
                    ></span>
                    <span className="text-[11px] text-[#464555] font-semibold">
                      {selectedChannels.x ? 'Connected' : 'Not Connected'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick helper note */}
            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#f2f3ff]/60 border border-[#c7c4d8]/30 text-[#464555]">
              <span className="material-symbols-outlined text-[#3525cd] text-xl shrink-0 mt-0.5">
                bolt
              </span>
              <p className="text-xs leading-relaxed">
                <strong className="text-[#131b2e] font-bold">Quick Helper Note: </strong>
                One-click syndication distributes your post across all selected channels simultaneously. Custom aspect ratios and platform metadata are automatically normalized.
              </p>
            </div>

            {/* Pre-flight Publishing Settings Accordion / Tags */}
            <div className="pt-2 flex flex-col gap-2.5 border-t border-[#c7c4d8]/30">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#131b2e]">Automation Parameters</span>
                <span className="text-[11px] text-[#3525cd] font-semibold cursor-pointer hover:underline">
                  Edit Defaults
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-[#faf8ff] p-2.5 rounded-xl border border-[#c7c4d8]/30 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#3525cd] text-lg">schedule</span>
                  <div>
                    <div className="text-[11px] font-bold text-[#131b2e]">Blast Timing</div>
                    <div className="text-[11px] text-[#464555]">Instant Trigger</div>
                  </div>
                </div>
                <div className="bg-[#faf8ff] p-2.5 rounded-xl border border-[#c7c4d8]/30 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#4648d4] text-lg">auto_awesome</span>
                  <div>
                    <div className="text-[11px] font-bold text-[#131b2e]">AI Captioning</div>
                    <div className="text-[11px] text-[#464555]">Summit Lens v4</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Syndication Transmission Graph Domain Component */}
          <div className="bg-white rounded-2xl border border-[#c7c4d8]/40 p-5 shadow-xs">
            <h4 className="text-xs font-bold text-[#131b2e] mb-3 flex items-center gap-2 uppercase tracking-wider">
              <span className="material-symbols-outlined text-[#3525cd] text-[18px]">hub</span>
              <span>Syndication Pipeline Topology</span>
            </h4>

            <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#c7c4d8]/40">
              <div className="relative flex items-center gap-3">
                <span className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-[#3525cd] flex items-center justify-center text-white text-[10px] ring-4 ring-white font-bold">
                  ✓
                </span>
                <div>
                  <p className="text-xs font-bold text-[#131b2e]">Asset Ingestion &amp; Upscale</p>
                  <p className="text-[11px] text-[#464555]">4K lossless keynote frame buffer ready</p>
                </div>
              </div>

              <div className="relative flex items-center gap-3">
                <span className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-[#3525cd] flex items-center justify-center text-white text-[10px] ring-4 ring-white font-bold">
                  ✓
                </span>
                <div>
                  <p className="text-xs font-bold text-[#131b2e]">Compliance &amp; Tag Enrichment</p>
                  <p className="text-[11px] text-[#464555]">
                    #TechSummit2026, @TechSummitOfficial validated
                  </p>
                </div>
              </div>

              <div className="relative flex items-center gap-3">
                <span className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-[#06B6D4] animate-pulse flex items-center justify-center text-white text-[10px] ring-4 ring-white font-bold">
                  ●
                </span>
                <div>
                  <p className="text-xs font-bold text-[#3525cd]">Multi-Socket Handshake</p>
                  <p className="text-[11px] text-[#464555]">
                    {selectedCount} platform endpoints armed for simultaneous broadcast
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT PANEL: LIVE POST PREVIEW & ONE-CLICK BLAST (7 cols) */}
        <section className="lg:col-span-7 flex flex-col gap-6">
          {/* Preview & Action Container */}
          <div className="bg-white rounded-2xl border border-[#c7c4d8]/40 p-6 shadow-xs flex flex-col gap-5">
            {/* Header & Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-[#c7c4d8]/30">
              <div>
                <h3 className="text-base font-bold text-[#131b2e]">
                  Live Post Preview &amp; One-Click Blast
                </h3>
                <p className="text-xs text-[#464555]">Real-time simulator before immediate syndication</p>
              </div>

              <div className="inline-flex p-1 bg-[#eaedff] rounded-2xl border border-[#c7c4d8]/30 self-start sm:self-auto">
                <button
                  onClick={() => setActivePreviewTab('instagram')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    activePreviewTab === 'instagram'
                      ? 'bg-white text-[#3525cd] shadow-2xs'
                      : 'text-[#464555] hover:text-[#131b2e]'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-500 to-amber-500"></span>
                  <span>Instagram Story</span>
                </button>
                <button
                  onClick={() => setActivePreviewTab('linkedin')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    activePreviewTab === 'linkedin'
                      ? 'bg-white text-[#3525cd] shadow-2xs'
                      : 'text-[#464555] hover:text-[#131b2e]'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-[#0A66C2]"></span>
                  <span>LinkedIn Feed</span>
                </button>
                <button
                  onClick={() => setActivePreviewTab('facebook')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    activePreviewTab === 'facebook'
                      ? 'bg-white text-[#3525cd] shadow-2xs'
                      : 'text-[#464555] hover:text-[#131b2e]'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-[#1877F2]"></span>
                  <span>Facebook Post</span>
                </button>
              </div>
            </div>

            {/* SIMULATED DEVICE PREVIEW CONTAINER */}
            <div className="relative w-full rounded-2xl overflow-hidden border border-[#c7c4d8]/40 bg-[#f2f3ff]/40 p-4 sm:p-6 flex justify-center items-center">
              {/* Device Mockup */}
              <div className="relative w-full max-w-[390px] rounded-3xl bg-white shadow-xl border border-[#c7c4d8]/60 overflow-hidden flex flex-col transition-all">
                {/* Mockup Header */}
                <div className="p-3.5 bg-[#faf8ff]/90 backdrop-blur-md border-b border-[#c7c4d8]/30 flex items-center justify-between z-10">
                  <div className="flex items-center gap-2.5">
                    <div className="p-0.5 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600">
                      <img
                        className="w-8 h-8 rounded-full object-cover border-2 border-white"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDD4DEaejC0pJSHYzv0vMq0OT3ZFyEYxuC1-bN74p_PbuYhtOoVrxHqPqnV7hhzWVNvtIaGt6GXFzpVz0tEX5CYq5tY2X_9qBBS3vBgVCbxcqvsdGrPLZ3uM1wT2lryPZaZq2eJcPfU916R1vtFhGp_1pw_k2QltW4ECFviL5BUcScV_t0zbXNAZvinl9YBPl3NPECZvNBfwgnk0HhFi9rjodMC8_he1_2MpWHLafVCYtBq0Ukg2DX1"
                        alt="parthish"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold text-[#131b2e]">parthish</span>
                        <span
                          className="material-symbols-outlined text-[13px] text-[#3525cd]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          verified
                        </span>
                        <span className="text-[#777587] text-[11px]">· Just now</span>
                      </div>
                      <div className="flex items-center gap-0.5 text-[#464555] text-[11px] font-medium">
                        <span className="material-symbols-outlined text-[13px] text-[#ba1a1a]">
                          location_on
                        </span>
                        <span>Mumbai, Maharashtra</span>
                      </div>
                    </div>
                  </div>
                  <button className="text-[#777587] hover:text-[#131b2e]">
                    <span className="material-symbols-outlined text-lg">more_vert</span>
                  </button>
                </div>

                {/* Preview Image Viewport */}
                <div className="relative w-full aspect-[4/3] bg-[#d2d9f4] overflow-hidden group">
                  <img
                    className="w-full h-full object-cover"
                    src={previewImage}
                    alt="Keynote Live"
                  />
                  {/* Overlay Story Badge Tag */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md shadow-md border border-white/60">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                    <span className="text-[11px] font-bold text-[#131b2e]">Tech Summit '26 Live</span>
                  </div>
                  {/* Location Sticker Floating Pill */}
                  <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#3525cd]/90 text-white backdrop-blur-md shadow-md text-xs font-bold">
                    <span className="material-symbols-outlined text-[14px]">pin_drop</span>
                    <span>Mumbai Expo Center</span>
                  </div>
                </div>

                {/* Mockup Interaction Bar */}
                <div className="px-3.5 pt-3 pb-1 flex items-center justify-between text-[#131b2e]">
                  <div className="flex items-center gap-3">
                    <span
                      className="material-symbols-outlined text-[20px] text-rose-500 cursor-pointer"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      favorite
                    </span>
                    <span className="material-symbols-outlined text-[20px] text-[#777587] cursor-pointer">
                      chat_bubble
                    </span>
                    <span className="material-symbols-outlined text-[20px] text-[#777587] cursor-pointer">
                      send
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-[20px] text-[#777587] cursor-pointer">
                    bookmark
                  </span>
                </div>

                {/* Mockup Caption */}
                <div className="p-3.5 pt-1.5 flex flex-col gap-1.5 bg-white">
                  <p className="text-xs text-[#131b2e] leading-snug">
                    <strong className="font-bold text-[#131b2e] mr-1">parthish</strong>
                    {currentCaption}
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-[#c7c4d8]/20 text-[11px] text-[#464555] font-semibold">
                    <span>Simulated Reach: 18.4K Impressions</span>
                    <span className="text-emerald-700 font-bold flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-xs">check_circle</span>
                      <span>Preview Verified</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* BIG HIGH-CONTRAST PRIMARY CTA BUTTON */}
            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={handlePublish}
                disabled={isPublishing}
                className="w-full h-14 rounded-full bg-[#3525cd] hover:bg-[#2a1cba] text-white text-base md:text-lg font-bold shadow-lg shadow-[#3525cd]/30 hover:shadow-xl hover:shadow-[#3525cd]/40 flex items-center justify-center gap-3 transition-all duration-200 active:scale-[0.99] border border-white/20 cursor-pointer"
              >
                <span className="text-2xl animate-bounce">🚀</span>
                <span>
                  {isPublishing
                    ? `Broadcasting (${publishProgress}%)...`
                    : `Publish to ${selectedCount} Platforms (1-Click)`}
                </span>
                <span className="material-symbols-outlined text-xl">bolt</span>
              </button>
              <p className="text-center text-xs text-[#464555]">
                Instant delivery triggered simultaneously to Instagram (@parthish), Facebook, and LinkedIn.
              </p>
            </div>

            {/* REAL-TIME PUBLISHING STATUS DRAWER / WIDGET */}
            <div className="mt-2 rounded-2xl border border-[#c7c4d8]/50 bg-[#f2f3ff]/40 p-4 flex flex-col gap-3.5">
              <div className="flex items-center justify-between pb-2 border-b border-[#c7c4d8]/30">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#3525cd] animate-ping"></span>
                  <span className="text-sm font-bold text-[#131b2e]">
                    Real-Time Syndication Feed
                  </span>
                </div>
                <span className="text-xs text-[#464555] font-semibold">Broadcasting Node #08</span>
              </div>

              {/* Status Items Stack */}
              <div className="flex flex-col gap-2.5">
                {/* Instagram */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#c7c4d8]/30 shadow-2xs">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                      IG
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-[#131b2e]">Instagram</span>
                        <span className="text-[11px] text-[#464555]">(@parthish)</span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-bold">
                        <span>🟢 Published</span>
                        <span className="text-[#c7c4d8]">•</span>
                        <span>Just now</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setStoryModalOpen(true)}
                    className="px-3 py-1 rounded-full bg-[#eaedff] hover:bg-[#e2e7ff] text-[#3525cd] text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
                  >
                    <span>View Story</span>
                    <span className="material-symbols-outlined text-[14px]">north_east</span>
                  </button>
                </div>

                {/* Facebook */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#c7c4d8]/30 shadow-2xs">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-[#1877F2] flex items-center justify-center text-white text-xs font-bold font-serif">
                      f
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-[#131b2e]">Facebook</span>
                        <span className="text-[11px] text-[#464555]">(Parthish Joshi)</span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-bold">
                        <span>🟢 Published</span>
                        <span className="text-[#c7c4d8]">•</span>
                        <span>Just now</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setPostModalOpen('Facebook')}
                    className="px-3 py-1 rounded-full bg-[#eaedff] hover:bg-[#e2e7ff] text-[#3525cd] text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
                  >
                    <span>View Post</span>
                    <span className="material-symbols-outlined text-[14px]">north_east</span>
                  </button>
                </div>

                {/* LinkedIn */}
                <div className="flex flex-col gap-2 p-3 rounded-xl bg-white border border-[#6063ee]/30 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-[#0A66C2] flex items-center justify-center text-white text-xs font-bold">
                        in
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-[#131b2e]">LinkedIn</span>
                          <span className="text-[11px] text-[#464555]">(Parthish Joshi)</span>
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-amber-700 font-bold">
                          <span>
                            {publishProgress === 100 ? '🟢 Published' : '⏳ Publishing...'}
                          </span>
                          <span className="text-[#c7c4d8]">•</span>
                          <span>
                            {publishProgress === 100
                              ? 'Syndication confirmed'
                              : 'Encoding high-res feed asset'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-[#3525cd]">
                        {publishProgress}% complete
                      </span>
                    </div>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full bg-[#eaedff] rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-[#3525cd] h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${publishProgress}%` }}
                    ></div>
                  </div>
                </div>

                {/* X (Twitter) */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#f2f3ff]/20 border border-[#c7c4d8]/20 opacity-75">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-[#777587] flex items-center justify-center text-white text-xs font-bold">
                      𝕏
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#131b2e]">X</span>
                      <div className="flex items-center gap-1 text-[11px] text-[#777587] font-semibold">
                        <span>
                          {selectedChannels.x ? '🟢 Ready to dispatch' : '⚪ Not Selected'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-[#777587] font-semibold px-2.5 py-0.5 rounded-full bg-[#eaedff]">
                    {selectedChannels.x ? 'Active' : 'Skipped'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Story / Post Simulator Modal */}
      {storyModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-sm rounded-3xl overflow-hidden bg-black text-white shadow-2xl border border-white/20">
            <button
              onClick={() => setStoryModalOpen(false)}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
            <div className="relative h-[550px] w-full">
              <img src={previewImage} alt="Story" className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-gradient-to-r from-pink-500 to-amber-500 flex items-center justify-center text-xs font-bold">
                  IG
                </span>
                <div>
                  <span className="text-xs font-bold block">parthish</span>
                  <span className="text-[10px] text-white/70 block">Tech Summit 2026 Live</span>
                </div>
              </div>
              <div className="absolute bottom-6 inset-x-4 bg-black/60 backdrop-blur-md p-3 rounded-2xl border border-white/20">
                <p className="text-xs text-white/95 leading-relaxed">{currentCaption}</p>
                <div className="flex items-center justify-between text-[10px] text-white/70 mt-2 pt-2 border-t border-white/10">
                  <span>🟢 Broadcast active via EventSync</span>
                  <span>1.4k Story Views</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Post Modal */}
      {postModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-[#c7c4d8]/40">
            <div className="flex items-center justify-between pb-3 border-b border-[#c7c4d8]/30">
              <div className="flex items-center gap-2">
                <span className="font-bold text-base text-[#131b2e]">
                  Published {postModalOpen} Post
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                  Live
                </span>
              </div>
              <button
                onClick={() => setPostModalOpen(null)}
                className="w-8 h-8 rounded-full hover:bg-[#eaedff] flex items-center justify-center text-[#777587]"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="py-4 space-y-3">
              <p className="text-xs md:text-sm text-[#131b2e] leading-relaxed">{currentCaption}</p>
              <img
                src={previewImage}
                alt="Post Preview"
                className="w-full h-56 object-cover rounded-xl"
              />
              <div className="p-3 bg-[#f2f3ff] rounded-xl text-xs text-[#464555] flex items-center justify-between">
                <span>Webhook Reference ID: #SYN-8942-TS26</span>
                <span className="font-bold text-[#3525cd]">100% Delivery Verified</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
