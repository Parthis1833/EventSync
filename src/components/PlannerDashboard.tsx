import React, { useState } from 'react';
import { EventItem } from '../types';

interface PlannerDashboardProps {
  events: EventItem[];
  onCreateEvent: () => void;
  onOpenLiveConsole: (event: EventItem) => void;
  onOpenReviewQueue: () => void;
  onOpenConfigureChannels: () => void;
  onSyndicateNow: () => void;
  onExportReport: () => void;
  onNavigateToEvents?: () => void;
  onPublishDraft?: (eventId: string) => void;
  onOpenScheduleModal?: (event: EventItem) => void;
  onEditEvent?: (event: EventItem) => void;
}

export const PlannerDashboard: React.FC<PlannerDashboardProps> = ({
  events,
  onCreateEvent,
  onOpenLiveConsole,
  onOpenReviewQueue,
  onOpenConfigureChannels,
  onSyndicateNow,
  onExportReport,
  onNavigateToEvents,
  onPublishDraft,
  onOpenScheduleModal,
  onEditEvent,
}) => {
  const [filterState, setFilterState] = useState<'all' | 'live' | 'upcoming' | 'completed' | 'drafts'>('all');
  const [sortBy, setSortBy] = useState('date-asc');

  const draftEvents = events.filter((e) => e.status === 'draft' || e.status === 'scheduled');
  const featuredLiveEvent = events.find((e) => e.status === 'live') || events[0];
  const upcomingEvents = events.filter((e) => e.id !== featuredLiveEvent?.id);

  const filteredEvents = events.filter((ev) => {
    if (filterState === 'live') return ev.status === 'live';
    if (filterState === 'upcoming') return ev.status === 'upcoming';
    if (filterState === 'completed') return ev.status === 'completed';
    if (filterState === 'drafts') return ev.status === 'draft' || ev.status === 'scheduled';
    return true;
  });

  return (
    <div className="space-y-8 max-w-[1440px] w-full mx-auto p-6 md:p-8">
      {/* Workspace Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#131b2e] tracking-tight">
              Operations Dashboard
            </h1>
            <span className="bg-[#eaedff] text-[#3525cd] px-3 py-0.5 rounded-full text-xs font-bold shadow-2xs">
              Live Mission Control
            </span>
          </div>
          <p className="text-sm md:text-base text-[#464555] mt-1">
            Real-time syndication command center, live broadcast monitor &amp; draft launcher.
          </p>
        </div>

        {/* High-Contrast Primary CTA */}
        <div className="flex items-center gap-3">
          {onNavigateToEvents && (
            <button
              onClick={onNavigateToEvents}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#c7c4d8]/60 bg-white text-[#131b2e] text-sm font-semibold shadow-xs hover:bg-[#f2f3ff] transition-all cursor-pointer active:scale-[0.98]"
            >
              <span className="material-symbols-outlined text-[18px]">folder_open</span>
              <span>My Events Catalog ({events.length})</span>
            </button>
          )}
          <button
            onClick={onCreateEvent}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#4f46e5] text-white text-sm font-bold shadow-md shadow-[#4f46e5]/30 hover:bg-[#3525cd] transition-all active:scale-[0.98] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            <span>+ Create New Event</span>
          </button>
        </div>
      </div>

      {/* Quick Stats Row (Bento Style Matrix) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Events */}
        <div className="p-5 rounded-2xl bg-white border border-[#c7c4d8]/30 shadow-xs flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <span className="text-xs font-semibold text-[#464555] uppercase tracking-wider block">
              Active Events
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-bold text-[#131b2e]">4</span>
              <span className="text-xs text-[#4648d4] font-bold">+1 this week</span>
            </div>
            <span className="text-xs text-[#777587] mt-1 block">1 live now, 3 scheduled</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#f2f3ff] flex items-center justify-center text-[#3525cd]">
            <span className="material-symbols-outlined text-[24px]">event_available</span>
          </div>
        </div>

        {/* Total Attenders */}
        <div className="p-5 rounded-2xl bg-white border border-[#c7c4d8]/30 shadow-xs flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <span className="text-xs font-semibold text-[#464555] uppercase tracking-wider block">
              Total Attenders
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-bold text-[#131b2e]">28.4k</span>
              <span className="text-xs text-[#006a7c] font-bold">+18.2%</span>
            </div>
            <span className="text-xs text-[#777587] mt-1 block">Registered attendees across all</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#f2f3ff] flex items-center justify-center text-[#4648d4]">
            <span className="material-symbols-outlined text-[24px]">group</span>
          </div>
        </div>

        {/* Syndicated Blasts */}
        <div className="p-5 rounded-2xl bg-white border border-[#c7c4d8]/30 shadow-xs flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <span className="text-xs font-semibold text-[#464555] uppercase tracking-wider block">
              Syndicated Blasts
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-bold text-[#131b2e]">142k</span>
              <span className="text-xs text-[#3525cd] font-bold">99.8% Sync</span>
            </div>
            <span className="text-xs text-[#777587] mt-1 block">Automated social media dispatches</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#f2f3ff] flex items-center justify-center text-[#4f46e5]">
            <span className="material-symbols-outlined text-[24px]">send_time_extension</span>
          </div>
        </div>

        {/* Live Channels */}
        <div className="p-5 rounded-2xl bg-white border border-[#c7c4d8]/30 shadow-xs flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <span className="text-xs font-semibold text-[#464555] uppercase tracking-wider block">
              Live Channels
            </span>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-pulse"></span>
              <span className="text-xl font-bold text-[#131b2e]">4 Connected</span>
            </div>
            <span className="text-xs text-[#777587] mt-1 block">IG, FB, X, LinkedIn</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#f2f3ff] flex items-center justify-center text-[#00505f]">
            <span className="material-symbols-outlined text-[24px]">sensors</span>
          </div>
        </div>
      </section>

      {/* Connected Social Accounts Status Bar */}
      <div className="p-4.5 rounded-2xl bg-white border border-[#c7c4d8]/30 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#eaedff] text-[#3525cd]">
            <span className="material-symbols-outlined text-[20px]">sync_saved_locally</span>
          </div>
          <div>
            <span className="text-sm font-bold text-[#131b2e] block leading-tight">
              Channel Health &amp; Real-time Syndication Nodes
            </span>
            <span className="text-xs text-[#464555] block leading-tight mt-0.5">
              All 4 target platforms authenticated with OAuth 2.0 active webhooks.
            </span>
          </div>
        </div>

        <div className="flex items-center flex-wrap gap-2.5">
          {/* Instagram */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f2f3ff] border border-[#c7c4d8]/30">
            <div className="w-2 h-2 rounded-full bg-[#10b981]"></div>
            <span className="text-xs font-bold text-[#131b2e]">Instagram</span>
            <span className="text-xs text-[#777587]">@eventsync_live</span>
          </div>
          {/* Facebook */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f2f3ff] border border-[#c7c4d8]/30">
            <div className="w-2 h-2 rounded-full bg-[#10b981]"></div>
            <span className="text-xs font-bold text-[#131b2e]">Facebook</span>
            <span className="text-xs text-[#777587]">EventSync Official</span>
          </div>
          {/* X */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f2f3ff] border border-[#c7c4d8]/30">
            <div className="w-2 h-2 rounded-full bg-[#10b981]"></div>
            <span className="text-xs font-bold text-[#131b2e]">X</span>
            <span className="text-xs text-[#777587]">@EventSyncHQ</span>
          </div>
          {/* LinkedIn */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f2f3ff] border border-[#c7c4d8]/30">
            <div className="w-2 h-2 rounded-full bg-[#10b981]"></div>
            <span className="text-xs font-bold text-[#131b2e]">LinkedIn</span>
            <span className="text-xs text-[#777587]">EventSync Enterprise</span>
          </div>

          <button
            onClick={onOpenConfigureChannels}
            className="p-1.5 text-[#3525cd] hover:bg-[#eaedff] rounded-full transition-colors ml-1 cursor-pointer"
            title="Configure Channels"
          >
            <span className="material-symbols-outlined text-[20px]">tune</span>
          </button>
        </div>
      </div>

      {/* Drafts & Scheduled Launches Pipeline Shelf */}
      {draftEvents.length > 0 && (
        <div className="p-5 rounded-3xl bg-linear-to-r from-amber-50/70 via-purple-50/40 to-white border border-amber-200/80 shadow-xs space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
                <span className="material-symbols-outlined text-[18px]">pending_actions</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-extrabold text-[#131b2e]">
                    Drafts &amp; Scheduled Launches ({draftEvents.length})
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
                    Ready to publish or schedule
                  </span>
                </div>
                <p className="text-xs text-[#464555]">
                  Publish immediately whenever ready, or configure automated release countdowns.
                </p>
              </div>
            </div>

            {onNavigateToEvents && (
              <button
                onClick={onNavigateToEvents}
                className="text-xs font-bold text-[#3525cd] hover:underline flex items-center gap-1 cursor-pointer self-start sm:self-auto"
              >
                <span>Manage in Catalog</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            {draftEvents.slice(0, 2).map((draft) => (
              <div
                key={draft.id}
                className="p-3.5 rounded-2xl bg-white border border-[#c7c4d8]/40 shadow-2xs flex items-center justify-between gap-3 hover:border-[#3525cd]/40 transition-all"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={draft.image}
                    alt={draft.title}
                    className="w-12 h-12 rounded-xl object-cover shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-[#131b2e] block truncate">
                      {draft.title}
                    </span>
                    <span className="text-[11px] text-[#777587] block">
                      {draft.venue}, {draft.city}
                    </span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.2 rounded uppercase ${
                          draft.status === 'scheduled'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {draft.status === 'scheduled' ? 'Scheduled' : 'Draft'}
                      </span>
                      {draft.scheduledPublishDate && (
                        <span className="text-[10px] text-purple-700 font-semibold truncate">
                          {draft.scheduledPublishDate}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {onPublishDraft && (
                    <button
                      onClick={() => onPublishDraft(draft.id)}
                      className="px-3 py-1.5 rounded-full bg-[#3525cd] hover:bg-[#4f46e5] text-white text-[11px] font-bold shadow-xs cursor-pointer flex items-center gap-1"
                      title="Publish & Activate Now"
                    >
                      <span className="material-symbols-outlined text-[13px]">rocket_launch</span>
                      <span>Publish</span>
                    </button>
                  )}
                  {onOpenScheduleModal && (
                    <button
                      onClick={() => onOpenScheduleModal(draft)}
                      className="px-2.5 py-1.5 rounded-full border border-[#c7c4d8]/60 hover:bg-[#eaedff] text-[#131b2e] text-[11px] font-bold cursor-pointer"
                      title="Schedule Publication Time"
                    >
                      Schedule
                    </button>
                  )}
                  {onEditEvent && (
                    <button
                      onClick={() => onEditEvent(draft)}
                      className="w-8 h-8 rounded-full border border-[#c7c4d8]/50 hover:bg-[#eaedff] flex items-center justify-center text-[#464555] cursor-pointer"
                      title="Resume Editing Draft"
                    >
                      <span className="material-symbols-outlined text-[15px]">edit</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filter Tabs & Quick Search Control Deck */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#c7c4d8]/30 pb-4">
        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 custom-scroll">
          <button
            onClick={() => setFilterState('all')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              filterState === 'all'
                ? 'bg-[#3525cd] text-white shadow-xs'
                : 'text-[#464555] hover:text-[#131b2e] hover:bg-[#eaedff]'
            }`}
          >
            All Events
          </button>
          <button
            onClick={() => setFilterState('live')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              filterState === 'live'
                ? 'bg-[#3525cd] text-white shadow-xs'
                : 'text-[#464555] hover:text-[#131b2e] hover:bg-[#eaedff]'
            }`}
          >
            <span>Live Now</span>
            <span className="w-5 h-5 rounded-full bg-[#10b981]/20 text-[#065F46] font-bold text-[11px] flex items-center justify-center">
              1
            </span>
          </button>
          <button
            onClick={() => setFilterState('upcoming')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              filterState === 'upcoming'
                ? 'bg-[#3525cd] text-white shadow-xs'
                : 'text-[#464555] hover:text-[#131b2e] hover:bg-[#eaedff]'
            }`}
          >
            <span>Upcoming</span>
            <span className="w-5 h-5 rounded-full bg-[#e2e7ff] text-[#131b2e] font-bold text-[11px] flex items-center justify-center">
              3
            </span>
          </button>
          <button
            onClick={() => setFilterState('completed')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              filterState === 'completed'
                ? 'bg-[#3525cd] text-white shadow-xs'
                : 'text-[#464555] hover:text-[#131b2e] hover:bg-[#eaedff]'
            }`}
          >
            <span>Completed</span>
            <span className="w-5 h-5 rounded-full bg-[#e2e7ff] text-[#131b2e] font-bold text-[11px] flex items-center justify-center">
              8
            </span>
          </button>
          <button
            onClick={() => setFilterState('drafts')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              filterState === 'drafts'
                ? 'bg-[#3525cd] text-white shadow-xs'
                : 'text-[#464555] hover:text-[#131b2e] hover:bg-[#eaedff]'
            }`}
          >
            <span>Drafts</span>
            <span className="w-5 h-5 rounded-full bg-[#e2e7ff] text-[#131b2e] font-bold text-[11px] flex items-center justify-center">
              2
            </span>
          </button>
        </div>

        {/* Sort and View Option */}
        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
          <span className="text-xs font-semibold text-[#777587]">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white border border-[#c7c4d8]/40 rounded-full px-3 py-1.5 text-xs text-[#131b2e] font-semibold focus:outline-none focus:border-[#3525cd]"
          >
            <option value="date-asc">Event Date (Ascending)</option>
            <option value="attenders-desc">Most Attenders</option>
            <option value="recent">Recently Updated</option>
          </select>
        </div>
      </div>

      {/* Main Event Cards Grid (Responsive 12-Column Shell) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* CARD 1: Featured Live Event (Span 12 Columns for high visual impact) */}
        {featuredLiveEvent && (filterState === 'all' || filterState === 'live') && (
          <div className="lg:col-span-12 rounded-2xl bg-white border border-[#c7c4d8]/40 shadow-xs overflow-hidden hover:shadow-md transition-all flex flex-col xl:flex-row group">
            {/* Event Cover Photo Viewport */}
            <div className="xl:w-5/12 relative min-h-[260px] xl:min-h-full overflow-hidden">
              <img
                className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-300"
                src={featuredLiveEvent.image}
                alt="Tech Summit Keynote Live Stage"
              />
              <div className="absolute inset-0 bg-gradient-to-t xl:bg-gradient-to-r from-black/70 via-black/20 to-transparent"></div>

              {/* Floating Live Now Indicator Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md shadow-md border border-white/60">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-ping"></span>
                <span className="text-[11px] font-bold text-[#065F46] uppercase tracking-wider">
                  Live Now
                </span>
              </div>

              {/* Cover Photo Overlay Details */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-xs text-white/80 font-medium block">
                  {featuredLiveEvent.badgeType || 'Keynote Main Stage Broadcast'}
                </span>
                <span className="text-xl font-bold block text-white drop-shadow-md">
                  Live Stream Feed #TS26-01
                </span>
              </div>
            </div>

            {/* Event Content & Control Deck (Right Column) */}
            <div className="xl:w-7/12 p-6 flex flex-col justify-between space-y-6">
              <div>
                {/* Header Row with Hashtags */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-[#eaedff] text-[#3525cd] text-xs font-bold">
                      #TechSummit2026
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-[#e2e7ff] text-[#464555] text-xs font-medium">
                      Hybrid Conference
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#464555] text-xs font-semibold">
                    <span className="material-symbols-outlined text-[16px] text-[#3525cd]">visibility</span>
                    <span>{featuredLiveEvent.viewsCount || '18.4k Live Views'}</span>
                  </div>
                </div>

                {/* Event Title */}
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#131b2e] tracking-tight">
                  {featuredLiveEvent.title}
                </h2>

                {/* Key Metadata Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <div className="flex items-center gap-2.5 text-[#464555]">
                    <div className="w-8 h-8 rounded-full bg-[#f2f3ff] flex items-center justify-center text-[#3525cd] shrink-0">
                      <span className="material-symbols-outlined text-[18px]">calendar_clock</span>
                    </div>
                    <div>
                      <span className="text-[11px] text-[#777587] block">Date &amp; Time</span>
                      <span className="text-xs md:text-sm font-semibold text-[#131b2e] block">
                        {featuredLiveEvent.date} · {featuredLiveEvent.time}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 text-[#464555]">
                    <div className="w-8 h-8 rounded-full bg-[#f2f3ff] flex items-center justify-center text-[#3525cd] shrink-0">
                      <span className="material-symbols-outlined text-[18px]">location_on</span>
                    </div>
                    <div>
                      <span className="text-[11px] text-[#777587] block">Venue</span>
                      <span className="text-xs md:text-sm font-semibold text-[#131b2e] block">
                        {featuredLiveEvent.venue}, {featuredLiveEvent.city}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 text-[#464555]">
                    <div className="w-8 h-8 rounded-full bg-[#f2f3ff] flex items-center justify-center text-[#3525cd] shrink-0">
                      <span className="material-symbols-outlined text-[18px]">how_to_reg</span>
                    </div>
                    <div>
                      <span className="text-[11px] text-[#777587] block">Attendee Engagement</span>
                      <span className="text-xs md:text-sm font-semibold text-[#131b2e] block">
                        {featuredLiveEvent.attendeesCount}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 text-[#464555]">
                    <div className="w-8 h-8 rounded-full bg-[#f2f3ff] flex items-center justify-center text-[#3525cd] shrink-0">
                      <span className="material-symbols-outlined text-[18px]">alternate_email</span>
                    </div>
                    <div>
                      <span className="text-[11px] text-[#777587] block">Mentions</span>
                      <span className="text-xs md:text-sm font-semibold text-[#131b2e] block truncate max-w-[200px]">
                        {featuredLiveEvent.mentions.join(', ')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Connected Channels Strip */}
                <div className="mt-5 pt-4 border-t border-[#c7c4d8]/30 flex flex-wrap items-center gap-2">
                  <span className="text-xs text-[#777587] font-semibold mr-1">Broadcasting to:</span>
                  <span className="px-2.5 py-1 rounded-full bg-[#10b981]/15 text-[#065F46] text-xs font-semibold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]"></span>
                    Instagram (Connected)
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-[#10b981]/15 text-[#065F46] text-xs font-semibold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]"></span>
                    X (Connected)
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-[#10b981]/15 text-[#065F46] text-xs font-semibold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]"></span>
                    LinkedIn (Connected)
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-[#10b981]/15 text-[#065F46] text-xs font-semibold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]"></span>
                    Facebook (Connected)
                  </span>
                </div>
              </div>

              {/* Card Quick Action Buttons */}
              <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-[#c7c4d8]/30">
                <button
                  onClick={() => onOpenLiveConsole(featuredLiveEvent)}
                  className="px-4 py-2 rounded-full border border-[#c7c4d8]/60 bg-white text-[#131b2e] text-xs md:text-sm font-semibold hover:bg-[#f2f3ff] transition-all cursor-pointer"
                >
                  View Event
                </button>
                <button
                  onClick={() => onOpenReviewQueue()}
                  className="px-4 py-2 rounded-full border border-[#c7c4d8]/60 bg-white text-[#131b2e] text-xs md:text-sm font-semibold hover:bg-[#f2f3ff] transition-all cursor-pointer"
                >
                  Manage / Analytics
                </button>
                <button
                  onClick={() => onOpenLiveConsole(featuredLiveEvent)}
                  className="px-5 py-2 rounded-full bg-[#3525cd] text-white text-xs md:text-sm font-bold shadow-md shadow-[#3525cd]/25 hover:bg-[#4f46e5] transition-all flex items-center gap-2 cursor-pointer active:scale-[0.98]"
                >
                  <span className="material-symbols-outlined text-[18px]">podium</span>
                  <span>Live Console</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* CARD 2 & CARD 3: Upcoming Events (6 Columns each) */}
        {upcomingEvents.slice(0, 2).map((ev) => (
          <div
            key={ev.id}
            className="lg:col-span-6 rounded-2xl bg-white border border-[#c7c4d8]/40 shadow-xs p-6 flex flex-col justify-between hover:shadow-md transition-all space-y-6"
          >
            <div>
              {/* Top Status Row */}
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-[#eaedff] text-[#4648d4] text-xs font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#4648d4]"></span>
                  Upcoming
                </span>
                <span className="text-xs text-[#777587] font-semibold">{ev.startsIn}</span>
              </div>

              {/* Title & Hashtag */}
              <div className="space-y-1">
                <span className="text-[#3525cd] text-xs font-bold block">{ev.hashtags[0]}</span>
                <h3 className="text-xl md:text-2xl font-bold text-[#131b2e] tracking-tight">
                  {ev.title}
                </h3>
              </div>

              {/* Metadata Items */}
              <div className="space-y-3 mt-4 text-[#464555]">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#777587] text-[18px]">
                    calendar_month
                  </span>
                  <span className="text-xs md:text-sm font-medium">
                    {ev.date} · {ev.time}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#777587] text-[18px]">
                    pin_drop
                  </span>
                  <span className="text-xs md:text-sm font-medium">
                    {ev.city} · {ev.venue}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#777587] text-[18px]">
                    group
                  </span>
                  <span className="text-xs md:text-sm font-bold text-[#131b2e]">
                    {ev.attendeesCount}
                  </span>
                  {ev.capacityPercentage && (
                    <span className="text-xs text-[#777587]">({ev.capacityPercentage})</span>
                  )}
                </div>
              </div>

              {/* Connected Channels Badges */}
              <div className="mt-5 pt-4 border-t border-[#c7c4d8]/30 flex items-center gap-2">
                <span className="text-xs text-[#777587] font-semibold">Configured Channels:</span>
                {ev.channels.map((ch) => (
                  <span
                    key={ch}
                    className="px-2.5 py-0.5 rounded-full bg-[#e2e7ff] text-[#131b2e] text-xs font-semibold"
                  >
                    {ch}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-[#c7c4d8]/30">
              <span className="text-xs text-[#777587]">
                {ev.id === 'design-systems-2026' ? 'Syndication pipeline armed' : 'Auto-schedule scheduled'}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={onCreateEvent}
                  className="px-4 py-1.5 rounded-full border border-[#c7c4d8]/60 text-[#131b2e] text-xs font-bold hover:bg-[#f2f3ff] transition-all cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => onOpenLiveConsole(ev)}
                  className="px-4 py-1.5 rounded-full bg-[#eaedff] text-[#3525cd] text-xs font-bold hover:bg-[#e2e7ff] transition-all cursor-pointer"
                >
                  Preview
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Timeline & Activity Syndication Feed Banner */}
      <div className="p-6 rounded-2xl bg-[#f2f3ff] border border-[#c7c4d8]/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#3525cd]/10 text-[#3525cd] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[24px]">rss_feed</span>
          </div>
          <div>
            <h4 className="text-base font-bold text-[#131b2e]">
              Automated Syndication Engine is Active
            </h4>
            <p className="text-xs md:text-sm text-[#464555] mt-0.5">
              Next automated social blast scheduled in 14 minutes for{' '}
              <strong className="text-[#131b2e]">#TechSummit2026</strong> across 4 connected
              accounts.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenReviewQueue}
            className="px-4.5 py-2 rounded-full bg-white border border-[#c7c4d8]/50 text-[#131b2e] text-xs md:text-sm font-bold hover:bg-[#eaedff] transition-all cursor-pointer shadow-2xs"
          >
            Review Queue (7)
          </button>
          <button
            onClick={onSyndicateNow}
            className="px-5 py-2 rounded-full bg-[#3525cd] text-white text-xs md:text-sm font-bold shadow-md shadow-[#3525cd]/25 hover:bg-[#4f46e5] transition-all cursor-pointer active:scale-[0.98]"
          >
            Syndicate Now
          </button>
        </div>
      </div>
    </div>
  );
};
