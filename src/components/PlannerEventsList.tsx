import React, { useState } from 'react';
import { EventItem } from '../types';

interface PlannerEventsListProps {
  events: EventItem[];
  onCreateEvent: () => void;
  onOpenLiveConsole: (event: EventItem) => void;
  onPublishDraft: (eventId: string) => void;
  onOpenScheduleModal: (event: EventItem) => void;
  onEditEvent: (event: EventItem) => void;
  onDeleteEvent: (eventId: string) => void;
  onExportReport: () => void;
}

export const PlannerEventsList: React.FC<PlannerEventsListProps> = ({
  events,
  onCreateEvent,
  onOpenLiveConsole,
  onPublishDraft,
  onOpenScheduleModal,
  onEditEvent,
  onDeleteEvent,
  onExportReport,
}) => {
  const [filterState, setFilterState] = useState<
    'all' | 'live' | 'upcoming' | 'scheduled' | 'drafts' | 'completed'
  >('all');
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const liveCount = events.filter((e) => e.status === 'live').length;
  const upcomingCount = events.filter((e) => e.status === 'upcoming').length;
  const scheduledCount = events.filter((e) => e.status === 'scheduled').length;
  const draftsCount = events.filter((e) => e.status === 'draft').length;
  const completedCount = events.filter((e) => e.status === 'completed').length;

  const filteredEvents = events
    .filter((ev) => {
      if (filterState === 'live') return ev.status === 'live';
      if (filterState === 'upcoming') return ev.status === 'upcoming';
      if (filterState === 'scheduled') return ev.status === 'scheduled';
      if (filterState === 'drafts') return ev.status === 'draft';
      if (filterState === 'completed') return ev.status === 'completed';
      return true;
    })
    .filter((ev) => {
      if (!search) return true;
      const q = search.toLowerCase();
      return (
        ev.title.toLowerCase().includes(q) ||
        ev.venue.toLowerCase().includes(q) ||
        ev.city.toLowerCase().includes(q) ||
        ev.category.toLowerCase().includes(q)
      );
    });

  return (
    <div className="space-y-6 max-w-[1440px] w-full mx-auto p-6 md:p-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#131b2e] tracking-tight">
              My Events Catalog
            </h1>
            <span className="bg-[#eaedff] text-[#3525cd] px-3 py-0.5 rounded-full text-xs font-bold shadow-2xs">
              {events.length} Total
            </span>
          </div>
          <p className="text-sm md:text-base text-[#464555] mt-1">
            Manage your live broadcasts, upcoming events, drafts, and scheduled publication pipelines.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onExportReport}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#c7c4d8]/60 bg-white text-[#131b2e] text-xs md:text-sm font-semibold shadow-xs hover:bg-[#f2f3ff] transition-all cursor-pointer active:scale-98"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>Export Catalog</span>
          </button>
          <button
            onClick={onCreateEvent}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#4f46e5] text-white text-xs md:text-sm font-bold shadow-md shadow-[#4f46e5]/30 hover:bg-[#3525cd] transition-all active:scale-98 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            <span>+ Create New Event</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs & Quick Search */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#c7c4d8]/30 pb-4">
        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 custom-scroll">
          <button
            onClick={() => setFilterState('all')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              filterState === 'all'
                ? 'bg-[#3525cd] text-white shadow-xs'
                : 'text-[#464555] hover:text-[#131b2e] hover:bg-[#eaedff]'
            }`}
          >
            All Events ({events.length})
          </button>
          <button
            onClick={() => setFilterState('live')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              filterState === 'live'
                ? 'bg-[#3525cd] text-white shadow-xs'
                : 'text-[#464555] hover:text-[#131b2e] hover:bg-[#eaedff]'
            }`}
          >
            <span>Live Now</span>
            <span className="w-5 h-5 rounded-full bg-[#10b981]/20 text-[#065F46] font-bold text-[11px] flex items-center justify-center">
              {liveCount}
            </span>
          </button>
          <button
            onClick={() => setFilterState('upcoming')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              filterState === 'upcoming'
                ? 'bg-[#3525cd] text-white shadow-xs'
                : 'text-[#464555] hover:text-[#131b2e] hover:bg-[#eaedff]'
            }`}
          >
            <span>Upcoming</span>
            <span className="w-5 h-5 rounded-full bg-[#e2e7ff] text-[#131b2e] font-bold text-[11px] flex items-center justify-center">
              {upcomingCount}
            </span>
          </button>
          <button
            onClick={() => setFilterState('scheduled')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              filterState === 'scheduled'
                ? 'bg-[#3525cd] text-white shadow-xs'
                : 'text-[#464555] hover:text-[#131b2e] hover:bg-[#eaedff]'
            }`}
          >
            <span>Scheduled</span>
            <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-800 font-bold text-[11px] flex items-center justify-center">
              {scheduledCount}
            </span>
          </button>
          <button
            onClick={() => setFilterState('drafts')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              filterState === 'drafts'
                ? 'bg-[#3525cd] text-white shadow-xs'
                : 'text-[#464555] hover:text-[#131b2e] hover:bg-[#eaedff]'
            }`}
          >
            <span>Drafts</span>
            <span className="w-5 h-5 rounded-full bg-[#fef3c7] text-[#92400e] font-bold text-[11px] flex items-center justify-center">
              {draftsCount}
            </span>
          </button>
          <button
            onClick={() => setFilterState('completed')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              filterState === 'completed'
                ? 'bg-[#3525cd] text-white shadow-xs'
                : 'text-[#464555] hover:text-[#131b2e] hover:bg-[#eaedff]'
            }`}
          >
            <span>Completed</span>
            <span className="w-5 h-5 rounded-full bg-[#e2e7ff] text-[#131b2e] font-bold text-[11px] flex items-center justify-center">
              {completedCount}
            </span>
          </button>
        </div>

        {/* Search & View Mode Switcher */}
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#777587] text-[16px]">
              search
            </span>
            <input
              type="text"
              placeholder="Search catalog..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-3 py-1.5 text-xs rounded-full border border-[#c7c4d8]/60 bg-white focus:outline-none focus:border-[#3525cd] text-[#131b2e] w-48 sm:w-60"
            />
          </div>

          <div className="bg-[#f2f3ff] p-1 rounded-full border border-[#c7c4d8]/40 flex items-center">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-full transition-all cursor-pointer ${
                viewMode === 'grid' ? 'bg-white shadow-2xs text-[#3525cd]' : 'text-[#777587]'
              }`}
              title="Grid View"
            >
              <span className="material-symbols-outlined text-[18px]">grid_view</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-full transition-all cursor-pointer ${
                viewMode === 'table' ? 'bg-white shadow-2xs text-[#3525cd]' : 'text-[#777587]'
              }`}
              title="Table View"
            >
              <span className="material-symbols-outlined text-[18px]">view_list</span>
            </button>
          </div>
        </div>
      </div>

      {/* GRID VIEW */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredEvents.map((ev) => (
            <div
              key={ev.id}
              className="bg-white rounded-3xl border border-[#c7c4d8]/40 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Event Card Header with Image */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                  <img
                    src={ev.image}
                    alt={ev.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />

                  {/* Status & Category Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-extrabold flex items-center gap-1.5 shadow-sm ${
                        ev.status === 'live'
                          ? 'bg-emerald-500 text-white'
                          : ev.status === 'scheduled'
                          ? 'bg-purple-600 text-white'
                          : ev.status === 'draft'
                          ? 'bg-amber-500 text-white'
                          : ev.status === 'completed'
                          ? 'bg-slate-700 text-white'
                          : 'bg-blue-600 text-white'
                      }`}
                    >
                      {ev.status === 'live' && (
                        <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                      )}
                      {ev.status === 'scheduled' && (
                        <span className="material-symbols-outlined text-[14px]">alarm_on</span>
                      )}
                      {ev.status === 'draft' && (
                        <span className="material-symbols-outlined text-[14px]">edit_document</span>
                      )}
                      <span className="uppercase tracking-wider">
                        {ev.status === 'draft'
                          ? 'Draft'
                          : ev.status === 'scheduled'
                          ? 'Scheduled'
                          : ev.status === 'live'
                          ? 'Live Now'
                          : ev.status}
                      </span>
                    </span>

                    <span className="text-[11px] font-semibold text-white/95 bg-black/50 px-2.5 py-0.5 rounded-full backdrop-blur-md">
                      {ev.category}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3.5 right-3.5 text-white">
                    <span className="text-[11px] text-white/80 font-bold block">
                      {ev.hashtags[0]}
                    </span>
                    <h3 className="text-base font-bold text-white tracking-tight leading-snug line-clamp-1">
                      {ev.title}
                    </h3>
                  </div>
                </div>

                {/* Event Info Details */}
                <div className="p-5 space-y-3">
                  <div className="space-y-1.5 text-xs text-[#464555]">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[16px] text-[#3525cd]">
                        calendar_month
                      </span>
                      <span className="font-semibold text-[#131b2e]">
                        {ev.date} • {ev.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[16px] text-[#777587]">
                        pin_drop
                      </span>
                      <span>
                        {ev.venue}, {ev.city}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[16px] text-[#777587]">
                        group
                      </span>
                      <span>{ev.attendeesCount}</span>
                    </div>
                  </div>

                  {/* Scheduled Date Notice for Drafts / Scheduled */}
                  {(ev.status === 'draft' || ev.status === 'scheduled') && (
                    <div
                      className={`p-2.5 rounded-xl text-[11px] flex items-center justify-between border ${
                        ev.status === 'scheduled'
                          ? 'bg-purple-50 border-purple-200 text-purple-900'
                          : 'bg-amber-50 border-amber-200 text-amber-900'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 truncate mr-2">
                        <span className="material-symbols-outlined text-[16px] text-purple-600">
                          alarm
                        </span>
                        <span className="truncate">
                          {ev.scheduledPublishDate ? (
                            <>
                              Scheduled:{' '}
                              <strong className="font-bold">{ev.scheduledPublishDate}</strong>
                            </>
                          ) : (
                            'Publication time not set'
                          )}
                        </span>
                      </div>
                      <button
                        onClick={() => onOpenScheduleModal(ev)}
                        className="text-[#3525cd] font-bold hover:underline cursor-pointer shrink-0"
                      >
                        {ev.scheduledPublishDate ? 'Reschedule' : 'Set Time'}
                      </button>
                    </div>
                  )}

                  {/* Channels */}
                  <div className="pt-2 border-t border-[#c7c4d8]/20 flex items-center gap-1.5 flex-wrap">
                    <span className="text-[11px] text-[#777587] font-semibold">Broadcasting:</span>
                    {ev.channels.map((ch) => (
                      <span
                        key={ch}
                        className="px-2 py-0.5 rounded-md bg-[#eaedff] text-[#3525cd] text-[10px] font-bold"
                      >
                        {ch}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="p-4 pt-0 border-t border-[#c7c4d8]/20 flex items-center justify-between mt-2">
                {ev.status === 'draft' || ev.status === 'scheduled' ? (
                  <div className="flex items-center justify-between w-full gap-2">
                    <button
                      onClick={() => onEditEvent(ev)}
                      className="px-3.5 py-1.5 rounded-full border border-[#c7c4d8]/60 text-xs font-bold hover:bg-[#eaedff] text-[#131b2e] cursor-pointer flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[14px]">edit</span>
                      <span>Edit Draft</span>
                    </button>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onOpenScheduleModal(ev)}
                        className="px-3 py-1.5 rounded-full bg-[#f2f3ff] text-[#3525cd] text-xs font-bold hover:bg-[#eaedff] cursor-pointer flex items-center gap-1"
                        title="Schedule Publication Time"
                      >
                        <span className="material-symbols-outlined text-[14px]">alarm</span>
                        <span>Schedule</span>
                      </button>
                      <button
                        onClick={() => onPublishDraft(ev.id)}
                        className="px-4 py-1.5 rounded-full bg-[#3525cd] text-white text-xs font-bold hover:bg-[#4f46e5] shadow-xs cursor-pointer flex items-center gap-1"
                      >
                        <span>Publish</span>
                        <span className="material-symbols-outlined text-[14px]">rocket_launch</span>
                      </button>
                      <button
                        onClick={() => onDeleteEvent(ev.id)}
                        title="Delete Draft"
                        className="w-7 h-7 rounded-full text-[#777587] hover:text-rose-600 hover:bg-rose-50 flex items-center justify-center cursor-pointer transition-colors"
                      >
                        <span className="material-symbols-outlined text-[16px]">delete</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between w-full">
                    <button
                      onClick={() => onEditEvent(ev)}
                      className="text-xs font-bold text-[#464555] hover:text-[#131b2e] cursor-pointer flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[14px]">edit</span>
                      <span>Edit Event</span>
                    </button>

                    <div className="flex items-center gap-2">
                      {ev.status === 'live' && (
                        <button
                          onClick={() => onOpenLiveConsole(ev)}
                          className="px-3.5 py-1.5 rounded-full bg-[#3525cd] text-white text-xs font-bold hover:bg-[#4f46e5] shadow-xs cursor-pointer flex items-center gap-1"
                        >
                          <span className="material-symbols-outlined text-[14px]">podium</span>
                          <span>Live Console</span>
                        </button>
                      )}
                      <button
                        onClick={() => onEditEvent(ev)}
                        className="px-3.5 py-1.5 rounded-full border border-[#c7c4d8]/60 text-xs font-bold hover:bg-[#f2f3ff] text-[#131b2e] cursor-pointer"
                      >
                        Manage
                      </button>
                      <button
                        onClick={() => onDeleteEvent(ev.id)}
                        title="Delete Event"
                        className="w-7 h-7 rounded-full text-[#777587] hover:text-rose-600 hover:bg-rose-50 flex items-center justify-center cursor-pointer transition-colors"
                      >
                        <span className="material-symbols-outlined text-[16px]">delete</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* TABLE VIEW */
        <div className="bg-white rounded-3xl border border-[#c7c4d8]/40 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#f2f3ff]/70 border-b border-[#c7c4d8]/30 text-[#464555] font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Event</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Date &amp; Venue</th>
                  <th className="py-3.5 px-4">Status &amp; Schedule</th>
                  <th className="py-3.5 px-4">Broadcasting</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#c7c4d8]/20">
                {filteredEvents.map((ev) => (
                  <tr key={ev.id} className="hover:bg-[#faf8ff] transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={ev.image}
                          alt={ev.title}
                          className="w-10 h-10 rounded-xl object-cover shrink-0"
                        />
                        <div>
                          <span className="font-bold text-[#131b2e] block text-sm">{ev.title}</span>
                          <span className="text-[11px] text-[#777587]">{ev.hashtags[0]}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-1 rounded-full bg-[#eaedff] text-[#3525cd] font-semibold text-[11px]">
                        {ev.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[#464555]">
                      <div className="font-semibold text-[#131b2e]">{ev.date}</div>
                      <div className="text-[11px] text-[#777587]">
                        {ev.venue}, {ev.city}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-col gap-1 items-start">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                            ev.status === 'live'
                              ? 'bg-emerald-100 text-emerald-800'
                              : ev.status === 'scheduled'
                              ? 'bg-purple-100 text-purple-800'
                              : ev.status === 'draft'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {ev.status}
                        </span>
                        {ev.scheduledPublishDate && (
                          <span className="text-[10px] text-purple-700 font-semibold flex items-center gap-1">
                            <span className="material-symbols-outlined text-[12px]">alarm</span>
                            {ev.scheduledPublishDate}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-1 flex-wrap">
                        {ev.channels.map((ch) => (
                          <span
                            key={ch}
                            className="px-1.5 py-0.5 rounded bg-[#f2f3ff] text-[#3525cd] text-[10px] font-bold"
                          >
                            {ch}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {ev.status === 'draft' || ev.status === 'scheduled' ? (
                          <>
                            <button
                              onClick={() => onPublishDraft(ev.id)}
                              className="px-3 py-1 rounded-full bg-[#3525cd] text-white font-bold text-[11px] hover:bg-[#4f46e5] cursor-pointer"
                            >
                              Publish Now
                            </button>
                            <button
                              onClick={() => onOpenScheduleModal(ev)}
                              className="px-2.5 py-1 rounded-full border border-[#c7c4d8]/60 hover:bg-[#eaedff] font-bold text-[11px] cursor-pointer"
                            >
                              Schedule
                            </button>
                          </>
                        ) : null}
                        <button
                          onClick={() => onEditEvent(ev)}
                          className="px-2.5 py-1 rounded-full border border-[#c7c4d8]/60 hover:bg-[#eaedff] font-bold text-[11px] cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => onDeleteEvent(ev.id)}
                          className="w-7 h-7 rounded-full text-[#777587] hover:text-rose-600 hover:bg-rose-50 flex items-center justify-center cursor-pointer"
                          title="Delete"
                        >
                          <span className="material-symbols-outlined text-[16px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredEvents.length === 0 && (
        <div className="p-12 text-center bg-white rounded-3xl border border-dashed border-[#c7c4d8]/60 space-y-3">
          <span className="material-symbols-outlined text-[40px] text-[#777587]">event_busy</span>
          <h3 className="text-base font-bold text-[#131b2e]">No events found in this view</h3>
          <p className="text-xs text-[#464555]">
            Create a draft, configure your channels, or publish an event to get started.
          </p>
          <button
            onClick={onCreateEvent}
            className="px-6 py-2 rounded-full bg-[#3525cd] text-white text-xs font-bold hover:bg-[#4f46e5] cursor-pointer"
          >
            + Create New Event
          </button>
        </div>
      )}
    </div>
  );
};
