import React, { useState } from 'react';
import { EventItem } from '../types';

interface AttenderDiscoveryProps {
  events: EventItem[];
  onUploadPhotos: () => void;
  onOpenLiveConsole: (event: EventItem) => void;
  onToggleAttend: (eventId: string) => void;
  onOpenSyndicationGuide?: () => void;
}

export const AttenderDiscovery: React.FC<AttenderDiscoveryProps> = ({
  events,
  onUploadPhotos,
  onOpenLiveConsole,
  onToggleAttend,
  onOpenSyndicationGuide,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'nearby' | 'live' | 'upcoming' | 'tech' | 'music' | 'my-events'>('all');
  const [bookmarked, setBookmarked] = useState<Record<string, boolean>>({});

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredEvents = events.filter((ev) => {
    if (selectedFilter === 'live') return ev.status === 'live';
    if (selectedFilter === 'upcoming') return ev.status === 'upcoming';
    if (selectedFilter === 'my-events') return ev.isAttending;
    if (selectedFilter === 'nearby') return ev.city.toLowerCase().includes('mumbai');
    if (selectedFilter === 'tech') return ev.category.toLowerCase().includes('tech') || ev.category.toLowerCase().includes('cloud');
    return true;
  });

  const featuredEvent = events.find((e) => e.status === 'live') || events[0];
  const gridEvents = events.filter((e) => e.id !== featuredEvent.id);

  return (
    <div className="max-w-7xl w-full mx-auto px-6 py-6 space-y-6">
      {/* Sticky Active Check-in Alert Banner */}
      <div className="w-full bg-gradient-to-r from-[#3525cd] via-[#4f46e5] to-[#6063ee] rounded-2xl p-4 text-white shadow-md shadow-[#3525cd]/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[20px] animate-pulse">
              broadcast_on_personal
            </span>
          </div>
          <div>
            <p className="text-sm md:text-base font-bold flex flex-wrap items-center gap-2">
              <span>Currently checked into Tech Summit 2026</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-400/20 text-emerald-200 border border-emerald-300/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 mr-1.5 animate-ping"></span>
                Live Broadcast Ready
              </span>
            </p>
            <p className="text-xs md:text-sm text-white/80 mt-0.5">
              Ready to broadcast live moments with auto-applied organizer badges &amp; verified credits.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
          <button
            onClick={onUploadPhotos}
            className="px-5 py-2 rounded-full bg-white text-[#3525cd] hover:bg-[#f2f3ff] text-xs md:text-sm font-bold shadow-sm transition-all duration-150 flex items-center gap-2 cursor-pointer active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[18px]">photo_camera</span>
            <span>Blast Moments</span>
          </button>
        </div>
      </div>

      {/* Hero Banner / Page Header */}
      <div className="bg-white rounded-2xl border border-[#c7c4d8]/30 p-8 shadow-xs relative overflow-hidden">
        {/* Ambient decorative glow */}
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-[#3525cd]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute right-40 -bottom-20 w-60 h-60 bg-[#6063ee]/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eaedff] text-[#3525cd] text-xs font-bold mb-3 border border-[#3525cd]/15">
            <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
            <span>Event Attender Hub</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-[#131b2e] tracking-tight leading-tight">
            Discover Events &amp; Join the Broadcast
          </h1>
          <p className="text-sm md:text-base text-[#464555] mt-2.5 leading-relaxed">
            Find your event, join with 1 click, and seamlessly blast high-res moments to all your social networks with official tags.
          </p>

          {/* Social sync tags teaser */}
          <div className="mt-5 flex flex-wrap items-center gap-2 pt-3 border-t border-[#c7c4d8]/20">
            <span className="text-xs font-semibold text-[#777587]">Supported syndications:</span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#F58529]/10 via-[#DD2A7B]/10 to-[#8134AF]/10 text-[#131b2e] text-xs font-bold border border-[#DD2A7B]/30">
              <span className="material-symbols-outlined text-[14px] text-[#DD2A7B]">photo_camera</span>
              <span>Instagram Stories</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0A66C2]/10 text-[#0A66C2] text-xs font-bold border border-[#0A66C2]/30">
              <span className="material-symbols-outlined text-[14px]">work</span>
              <span>LinkedIn Feed</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0F1419]/10 text-[#131b2e] text-xs font-bold border border-[#c7c4d8]/40">
              <span className="material-symbols-outlined text-[14px]">tag</span>
              <span>X Live Threads</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1877F2]/10 text-[#1877F2] text-xs font-bold border border-[#1877F2]/30">
              <span className="material-symbols-outlined text-[14px]">public</span>
              <span>Facebook Live</span>
            </span>
          </div>
        </div>
      </div>

      {/* Filter & Category Pills Section */}
      <div className="flex items-center justify-between gap-4 overflow-x-auto pb-1 custom-scroll">
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-150 cursor-pointer ${
              selectedFilter === 'all'
                ? 'bg-[#3525cd] text-white shadow-xs'
                : 'bg-white border border-[#c7c4d8]/50 text-[#464555] hover:text-[#131b2e] hover:bg-[#eaedff]'
            }`}
          >
            All Events
          </button>
          <button
            onClick={() => setSelectedFilter('nearby')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-150 flex items-center gap-1.5 cursor-pointer ${
              selectedFilter === 'nearby'
                ? 'bg-[#3525cd] text-white shadow-xs'
                : 'bg-white border border-[#c7c4d8]/50 text-[#464555] hover:text-[#131b2e] hover:bg-[#eaedff]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px] text-[#3525cd]">location_on</span>
            <span>Nearby (Mumbai)</span>
          </button>
          <button
            onClick={() => setSelectedFilter('live')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-150 flex items-center gap-1.5 cursor-pointer ${
              selectedFilter === 'live'
                ? 'bg-[#3525cd] text-white shadow-xs'
                : 'bg-white border border-[#c7c4d8]/50 text-[#464555] hover:text-[#131b2e] hover:bg-[#eaedff]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
            <span>Live Today</span>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] px-1.5 py-0.5 rounded-full font-bold">
              1
            </span>
          </button>
          <button
            onClick={() => setSelectedFilter('upcoming')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-150 cursor-pointer ${
              selectedFilter === 'upcoming'
                ? 'bg-[#3525cd] text-white shadow-xs'
                : 'bg-white border border-[#c7c4d8]/50 text-[#464555] hover:text-[#131b2e] hover:bg-[#eaedff]'
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setSelectedFilter('tech')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-150 flex items-center gap-1.5 cursor-pointer ${
              selectedFilter === 'tech'
                ? 'bg-[#3525cd] text-white shadow-xs'
                : 'bg-white border border-[#c7c4d8]/50 text-[#464555] hover:text-[#131b2e] hover:bg-[#eaedff]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">smart_toy</span>
            <span>Tech &amp; AI</span>
          </button>
          <button
            onClick={() => setSelectedFilter('music')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-150 flex items-center gap-1.5 cursor-pointer ${
              selectedFilter === 'music'
                ? 'bg-[#3525cd] text-white shadow-xs'
                : 'bg-white border border-[#c7c4d8]/50 text-[#464555] hover:text-[#131b2e] hover:bg-[#eaedff]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">palette</span>
            <span>Music &amp; Arts</span>
          </button>
          <button
            onClick={() => setSelectedFilter('my-events')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-150 flex items-center gap-1.5 cursor-pointer ${
              selectedFilter === 'my-events'
                ? 'bg-[#3525cd] text-white shadow-xs'
                : 'bg-white border border-[#c7c4d8]/50 text-[#464555] hover:text-[#131b2e] hover:bg-[#eaedff]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">check_circle</span>
            <span>My Events</span>
            <span className="bg-[#eaedff] text-[#3525cd] text-[10px] px-1.5 py-0.5 rounded-full font-bold">
              2
            </span>
          </button>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setSelectedFilter('all')}
            className="px-3.5 py-2 rounded-full border border-[#c7c4d8]/50 bg-white text-[#464555] hover:text-[#131b2e] text-xs font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">tune</span>
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* LARGE VISUAL EVENT FEED (3-COLUMN RESPONSIVE BENTO/CARD GRID) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* CARD 1: FEATURED LIVE EVENT (Spans 2 columns on large screens) */}
        {featuredEvent && (
          <article className="lg:col-span-2 bg-white rounded-2xl border border-[#c7c4d8]/40 shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col group">
            {/* Event Image Viewport */}
            <div className="relative h-64 md:h-72 w-full overflow-hidden bg-[#d2d9f4]">
              <img
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                src={featuredEvent.image}
                alt="Tech Summit Keynote"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 pointer-events-none"></div>

              {/* Top Row Badges */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500 text-white text-xs shadow-md font-bold">
                    <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                    <span>🟢 Live Now</span>
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-white border border-white/20 text-xs font-semibold">
                    <span className="material-symbols-outlined text-[14px]">group</span>
                    <span>4.2k Attending</span>
                  </span>
                </div>

                <button
                  onClick={(e) => toggleBookmark(featuredEvent.id, e)}
                  className={`p-2 rounded-full backdrop-blur-md transition-colors border border-white/20 cursor-pointer ${
                    bookmarked[featuredEvent.id]
                      ? 'bg-[#3525cd] text-white'
                      : 'bg-black/40 text-white hover:bg-black/60'
                  }`}
                  title="Bookmark event"
                >
                  <span className="material-symbols-outlined text-[18px]">bookmark</span>
                </button>
              </div>

              {/* Bottom Title Anchor inside image */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="flex items-center gap-2 text-white/85 text-xs font-bold mb-1">
                  <span
                    className="material-symbols-outlined text-[16px] text-sky-400"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    verified
                  </span>
                  <span>Tech Summit Official</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white drop-shadow-sm">
                  {featuredEvent.title}
                </h2>
              </div>
            </div>

            {/* Event Details Body */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#464555] text-xs md:text-sm">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#3525cd] text-[18px]">
                      calendar_today
                    </span>
                    <span className="font-semibold text-[#131b2e]">Today · 18 Oct 2026</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#777587] text-[18px]">
                      pin_drop
                    </span>
                    <span>Moscone Center, Mumbai</span>
                  </div>
                </div>

                {/* Official Tags & Syndication Channel Chips */}
                <div className="pt-2 flex flex-wrap items-center gap-2 border-t border-[#c7c4d8]/30">
                  <span className="text-xs font-semibold text-[#777587]">Official Syndication Tags:</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#eaedff] text-xs font-bold text-[#3525cd]">
                    #TechSummit2026
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#eaedff] text-xs font-bold text-[#3525cd]">
                    @TechSummitOfficial
                  </span>
                </div>
              </div>

              {/* Card Actions: Active Attending State + Quick Blast CTA */}
              <div className="pt-3 border-t border-[#c7c4d8]/30 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 shadow-2xs">
                    <span
                      className="material-symbols-outlined text-[16px] text-emerald-600"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                    <span>✓ You're Attending</span>
                  </span>
                  <span className="text-[11px] text-[#777587] hidden sm:inline">
                    Pass verified via NFC
                  </span>
                </div>

                <button
                  onClick={onUploadPhotos}
                  className="px-5 py-2.5 rounded-full bg-[#3525cd] hover:bg-[#4f46e5] text-white text-xs md:text-sm font-bold shadow-md shadow-[#3525cd]/25 active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">photo_camera</span>
                  <span>📸 Upload Photos &amp; Blast</span>
                </button>
              </div>
            </div>
          </article>
        )}

        {/* CARD 2: GLOBAL AI INNOVATORS MIXER */}
        {gridEvents.map((ev, index) => {
          if (index === 0) {
            return (
              <article
                key={ev.id}
                className="bg-white rounded-2xl border border-[#c7c4d8]/40 shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col group"
              >
                <div className="relative h-48 w-full overflow-hidden bg-[#d2d9f4]">
                  <img
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                    src={ev.image}
                    alt={ev.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none"></div>

                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-[11px] shadow-xs font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                      <span>🔵 Upcoming</span>
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/40 backdrop-blur-md text-white border border-white/20 text-[11px] font-semibold">
                      <span className="material-symbols-outlined text-[12px]">group</span>
                      <span>1.1k Attending</span>
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-[11px] text-white/80 font-medium">Organizer: AI Guild</p>
                    <h3 className="text-lg font-bold text-white tracking-tight">{ev.title}</h3>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[#464555] text-xs md:text-sm">
                      <span className="material-symbols-outlined text-[#3525cd] text-[18px]">
                        calendar_month
                      </span>
                      <span className="font-semibold text-[#131b2e]">Tomorrow · 19 Oct 2026</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#464555] text-xs md:text-sm">
                      <span className="material-symbols-outlined text-[#777587] text-[18px]">
                        location_on
                      </span>
                      <span>Bandra Kurla Complex, Mumbai</span>
                    </div>
                    <p className="text-xs text-[#777587] pt-1">
                      Connect with leading LLM researchers and founders. Live syndicated photo-walls will feature attendee posts.
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#c7c4d8]/30 flex items-center justify-between">
                    <span className="text-xs text-[#777587] font-semibold">Open RSVP</span>
                    <button
                      onClick={() => onToggleAttend(ev.id)}
                      className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-150 flex items-center gap-1 active:scale-[0.98] cursor-pointer ${
                        ev.isAttending
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                          : 'border border-[#3525cd] text-[#3525cd] hover:bg-[#3525cd] hover:text-white'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        {ev.isAttending ? 'check' : 'add'}
                      </span>
                      <span>{ev.isAttending ? "You're Going" : "+ I'm Attending"}</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          }

          if (index === 1) {
            return (
              <article
                key={ev.id}
                className="bg-white rounded-2xl border border-[#c7c4d8]/40 shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col group"
              >
                <div className="relative h-48 w-full overflow-hidden bg-[#d2d9f4]">
                  <img
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                    src={ev.image}
                    alt={ev.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none"></div>

                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-[11px] shadow-xs font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                      <span>🔵 Upcoming</span>
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/40 backdrop-blur-md text-white border border-white/20 text-[11px] font-semibold">
                      <span className="material-symbols-outlined text-[12px]">group</span>
                      <span>850 Attending</span>
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-[11px] text-white/80 font-medium">Organizer: Cloud Architecture Forum</p>
                    <h3 className="text-lg font-bold text-white tracking-tight">{ev.title}</h3>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[#464555] text-xs md:text-sm">
                      <span className="material-symbols-outlined text-[#3525cd] text-[18px]">
                        calendar_month
                      </span>
                      <span className="font-semibold text-[#131b2e]">24 Oct 2026</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#464555] text-xs md:text-sm">
                      <span className="material-symbols-outlined text-[#777587] text-[18px]">
                        location_on
                      </span>
                      <span>NESCO Center, Mumbai</span>
                    </div>
                    <p className="text-xs text-[#777587] pt-1">
                      Enterprise Kubernetes, multi-cloud resilience, and platform engineering workshops with certified badge issuance.
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#c7c4d8]/30 flex items-center justify-between">
                    <span className="text-xs text-[#777587] font-semibold">Verified Entry</span>
                    <button
                      onClick={() => onToggleAttend(ev.id)}
                      className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-150 flex items-center gap-1 active:scale-[0.98] cursor-pointer ${
                        ev.isAttending
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                          : 'border border-[#3525cd] text-[#3525cd] hover:bg-[#3525cd] hover:text-white'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        {ev.isAttending ? 'check' : 'add'}
                      </span>
                      <span>{ev.isAttending ? "You're Going" : "+ I'm Attending"}</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          }

          if (index === 2) {
            return (
              <article
                key={ev.id}
                className="bg-white rounded-2xl border border-[#c7c4d8]/40 shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col group"
              >
                <div className="relative h-48 w-full overflow-hidden bg-[#d2d9f4]">
                  <img
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                    src={ev.image}
                    alt={ev.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none"></div>

                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-[11px] shadow-xs font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                      <span>🔵 Upcoming</span>
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/40 backdrop-blur-md text-white border border-white/20 text-[11px] font-semibold">
                      <span className="material-symbols-outlined text-[12px]">group</span>
                      <span>2.4k Attending</span>
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-[11px] text-white/80 font-medium">Organizer: India FinTech Council</p>
                    <h3 className="text-lg font-bold text-white tracking-tight">{ev.title}</h3>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[#464555] text-xs md:text-sm">
                      <span className="material-symbols-outlined text-[#3525cd] text-[18px]">
                        calendar_month
                      </span>
                      <span className="font-semibold text-[#131b2e]">02 Nov 2026</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#464555] text-xs md:text-sm">
                      <span className="material-symbols-outlined text-[#777587] text-[18px]">
                        location_on
                      </span>
                      <span>BKC Convention Hall, Mumbai</span>
                    </div>
                    <p className="text-xs text-[#777587] pt-1">
                      Cross-border payments, CBDC architecture, and AI fraud prevention discussions with prominent central bankers.
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#c7c4d8]/30 flex items-center justify-between">
                    <span className="text-xs text-[#777587] font-semibold">Priority Pass</span>
                    <button
                      onClick={() => onToggleAttend(ev.id)}
                      className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-150 flex items-center gap-1 active:scale-[0.98] cursor-pointer ${
                        ev.isAttending
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                          : 'border border-[#3525cd] text-[#3525cd] hover:bg-[#3525cd] hover:text-white'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        {ev.isAttending ? 'check' : 'add'}
                      </span>
                      <span>{ev.isAttending ? "You're Going" : "+ I'm Attending"}</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          }

          return null;
        })}

        {/* FEATURED PROMO / SYNDICATION CARD */}
        <article className="bg-gradient-to-br from-[#eaedff] to-[#e2e7ff] rounded-2xl border border-[#c7c4d8]/40 p-6 flex flex-col justify-between shadow-xs relative overflow-hidden">
          <div className="relative z-10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#3525cd] text-white flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-xl">share</span>
            </div>
            <h3 className="text-xl font-bold text-[#131b2e] leading-snug">
              Broadcasting as an Attender?
            </h3>
            <p className="text-xs md:text-sm text-[#464555] leading-relaxed">
              When you join an official event, your approved photos are automatically tagged with official handles and broadcasted to Twitter, Instagram, and LinkedIn in 4K resolution.
            </p>
          </div>

          <div className="pt-4 border-t border-[#c7c4d8]/30 flex items-center justify-between relative z-10">
            <span className="text-xs text-[#3525cd] font-bold">Learn how syndication works</span>
            <button
              onClick={onOpenSyndicationGuide}
              className="p-2 rounded-full bg-white text-[#3525cd] hover:bg-[#3525cd] hover:text-white shadow-2xs transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </article>
      </div>

      {/* FOOTER STATUS BAR */}
      <footer className="mt-8 border-t border-[#c7c4d8]/30 bg-white rounded-2xl py-4 px-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[#777587] text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>EventSync Attender Broadcast Node v4.12 · Connected to Mumbai Gateway</span>
          </div>
          <div className="flex items-center gap-6 font-semibold">
            <button onClick={onOpenSyndicationGuide} className="hover:text-[#131b2e] transition-colors cursor-pointer">
              Privacy Policy
            </button>
            <button onClick={onOpenSyndicationGuide} className="hover:text-[#131b2e] transition-colors cursor-pointer">
              Syndication Terms
            </button>
            <button onClick={onOpenSyndicationGuide} className="hover:text-[#131b2e] transition-colors cursor-pointer">
              Help Center
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
