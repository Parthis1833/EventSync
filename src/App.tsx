/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { UserRole, PlannerTab, AttenderTab, EventItem, StagedPhoto, SocialChannel } from './types';
import { INITIAL_EVENTS, INITIAL_STAGED_PHOTOS, SOCIAL_CHANNELS } from './data/mockData';
import { Sidebar } from './components/Sidebar';
import { TopNavBar } from './components/TopNavBar';
import { AttenderSubNav } from './components/AttenderSubNav';
import { PlannerDashboard } from './components/PlannerDashboard';
import { PlannerEventsList } from './components/PlannerEventsList';
import { AttenderDiscovery } from './components/AttenderDiscovery';
import { CreateEventWizard } from './components/CreateEventWizard';
import { AttenderPhotoUpload } from './components/AttenderPhotoUpload';
import { AttenderSyndication } from './components/AttenderSyndication';
import { ReviewQueueModal } from './components/ReviewQueueModal';
import { LiveConsoleModal } from './components/LiveConsoleModal';
import { SocialAccountsModal } from './components/SocialAccountsModal';
import { ScheduleModal } from './components/ScheduleModal';
import { UserAuthModal } from './components/UserAuthModal';
import { NotificationModal } from './components/NotificationModal';
import { HelpModal } from './components/HelpModal';

export default function App() {
  // Navigation states
  const [role, setRole] = useState<UserRole>('planner');
  const [plannerTab, setPlannerTab] = useState<PlannerTab>('dashboard');
  const [attenderTab, setAttenderTab] = useState<AttenderTab>('discover');

  // Shared Data States
  const [events, setEvents] = useState<EventItem[]>(INITIAL_EVENTS);
  const [stagedPhotos, setStagedPhotos] = useState<StagedPhoto[]>(INITIAL_STAGED_PHOTOS);
  const [socialChannels, setSocialChannels] = useState<SocialChannel[]>(SOCIAL_CHANNELS);
  const [activeCaption, setActiveCaption] = useState<string>(
    '📸 Electrifying keynote live from #TechSummit2026! Inspiring insights on AI and future tech. @TechSummitOfficial'
  );
  const [searchQuery, setSearchQuery] = useState('');

  // Editing event & wizard key for clean step 1 initialization
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);
  const [wizardKey, setWizardKey] = useState<number>(0);

  // Modals
  const [reviewQueueOpen, setReviewQueueOpen] = useState(false);
  const [liveConsoleEvent, setLiveConsoleEvent] = useState<EventItem | null>(null);
  const [socialAccountsOpen, setSocialAccountsOpen] = useState(false);
  const [scheduleModalEvent, setScheduleModalEvent] = useState<EventItem | null>(null);
  const [userAuthOpen, setUserAuthOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  // Toast / Flash Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3800);
  };

  // Start new event creation (always starts cleanly on Step 1)
  const handleStartCreateEvent = () => {
    setEditingEvent(null);
    setWizardKey((prev) => prev + 1);
    setPlannerTab('create-event');
    showToast('📝 Starting new event creation at Step 1');
  };

  // Edit existing event or draft (starts on Step 1 with prefilled data)
  const handleEditEvent = (event: EventItem) => {
    setEditingEvent(event);
    setWizardKey((prev) => prev + 1);
    setPlannerTab('create-event');
    showToast(`✏️ Editing "${event.title}"`);
  };

  // Save event as draft (can be published or scheduled anytime)
  const handleSaveDraft = (draftPayload: Partial<EventItem>) => {
    if (editingEvent) {
      setEvents((prev) =>
        prev.map((ev) =>
          ev.id === editingEvent.id
            ? {
                ...ev,
                ...draftPayload,
                status: 'draft',
              }
            : ev
        )
      );
      showToast(`💾 Draft "${draftPayload.title || editingEvent.title}" updated!`);
    } else {
      const newDraft: EventItem = {
        id: `draft-${Date.now()}`,
        title: draftPayload.title || 'Untitled Draft Event',
        category: draftPayload.category || 'Tech & Innovation',
        date: draftPayload.date || '18 October 2026',
        time: draftPayload.time || '10:00 AM – 05:00 PM',
        venue: draftPayload.venue || 'Venue TBD',
        city: draftPayload.city || 'Mumbai, Maharashtra',
        image:
          draftPayload.image ||
          'https://lh3.googleusercontent.com/aida-public/AB6AXuB6moCMC7b0Ss7Xm_Q3uO3sfaTCSoeT2GdPN4YBelqyacvtMxUy8wHWqxFuN6L8L3U78WTuZfECUcOHMp-4RqQuQIj2AcgVj8HzIuAyJjyNA1aXn_4CvJG6piIXAP7xSL37EqnrxwxvTSdDGtrxCBjh3q2fO11Z4A0Yryz-S18eLkMGH1TCDJaqvXwOHYiuR7DJB8k7QbniHVuoa82HWdgihYiLj4xXzooBox034nGpauss09wQ7Mvb',
        status: 'draft',
        attendeesCount: '0 registered',
        hashtags: draftPayload.hashtags || ['#EventDraft'],
        mentions: draftPayload.mentions || ['@EventSyncOfficial'],
        channels: draftPayload.channels || ['Instagram', 'LinkedIn'],
        captionTemplate: draftPayload.captionTemplate,
        scheduledPublishDate: draftPayload.scheduledPublishDate,
        isAttending: false,
      };
      setEvents((prev) => [newDraft, ...prev]);
      showToast(`💾 Draft "${newDraft.title}" created! Saved in My Events.`);
    }
    setEditingEvent(null);
    setPlannerTab('my-events');
  };

  // Publish event immediately or with scheduled launch time
  const handlePublishEvent = (
    eventPayload: Partial<EventItem>,
    isDraft?: boolean,
    scheduleDate?: string
  ) => {
    const finalStatus: EventItem['status'] = isDraft
      ? 'draft'
      : scheduleDate || eventPayload.status === 'scheduled'
      ? 'scheduled'
      : 'upcoming';

    if (editingEvent) {
      setEvents((prev) =>
        prev.map((e) =>
          e.id === editingEvent.id
            ? {
                ...e,
                ...eventPayload,
                status: finalStatus,
                scheduledPublishDate: scheduleDate || eventPayload.scheduledPublishDate,
              }
            : e
        )
      );
      if (finalStatus === 'scheduled') {
        showToast(
          `⏱️ "${eventPayload.title || editingEvent.title}" scheduled for publication on ${
            scheduleDate || eventPayload.scheduledPublishDate
          }!`
        );
      } else if (finalStatus === 'draft') {
        showToast(`💾 Draft "${eventPayload.title || editingEvent.title}" saved.`);
      } else {
        showToast(
          `🚀 "${eventPayload.title || editingEvent.title}" published & syndication pipeline armed!`
        );
      }
    } else {
      const newEv: EventItem = {
        id: `event-${Date.now()}`,
        title: eventPayload.title || 'New Event',
        category: eventPayload.category || 'Hybrid Conference',
        date: eventPayload.date || '18 October 2026',
        time: eventPayload.time || '09:00 AM – 06:00 PM',
        venue: eventPayload.venue || 'Moscone Center',
        city: eventPayload.city || 'Mumbai, Maharashtra',
        image:
          eventPayload.image ||
          'https://lh3.googleusercontent.com/aida-public/AB6AXuB6moCMC7b0Ss7Xm_Q3uO3sfaTCSoeT2GdPN4YBelqyacvtMxUy8wHWqxFuN6L8L3U78WTuZfECUcOHMp-4RqQuQIj2AcgVj8HzIuAyJjyNA1aXn_4CvJG6piIXAP7xSL37EqnrxwxvTSdDGtrxCBjh3q2fO11Z4A0Yryz-S18eLkMGH1TCDJaqvXwOHYiuR7DJB8k7QbniHVuoa82HWdgihYiLj4xXzooBox034nGpauss09wQ7Mvb',
        status: finalStatus,
        attendeesCount: '1 registered',
        startsIn: 'Starting soon',
        hashtags: eventPayload.hashtags || ['#NewEvent2026'],
        mentions: eventPayload.mentions || ['@EventSyncOfficial'],
        channels: eventPayload.channels || ['Instagram', 'X', 'LinkedIn', 'Facebook'],
        isAttending: false,
        scheduledPublishDate: scheduleDate || eventPayload.scheduledPublishDate,
        captionTemplate: eventPayload.captionTemplate,
      };
      setEvents((prev) => [newEv, ...prev]);
      if (finalStatus === 'scheduled') {
        showToast(`⏱️ "${newEv.title}" scheduled for publication!`);
      } else if (finalStatus === 'draft') {
        showToast(`💾 "${newEv.title}" saved as draft in My Events.`);
      } else {
        showToast(`🎉 "${newEv.title}" published & syndication pipeline armed!`);
      }
    }
    setEditingEvent(null);
    setPlannerTab('my-events');
  };

  // 1-Click publish draft directly from list/dashboard
  const handlePublishDraft = (eventId: string) => {
    setEvents((prev) =>
      prev.map((e) => {
        if (e.id === eventId) {
          showToast(`🚀 "${e.title}" is now published and active!`);
          return { ...e, status: 'upcoming', scheduledPublishDate: undefined };
        }
        return e;
      })
    );
  };

  // Schedule or reschedule publication time
  const handleScheduleConfirm = (eventId: string, scheduledDate: string) => {
    setEvents((prev) =>
      prev.map((e) => {
        if (e.id === eventId) {
          showToast(`⏱️ "${e.title}" scheduled for ${scheduledDate}!`);
          return { ...e, status: 'scheduled', scheduledPublishDate: scheduledDate };
        }
        return e;
      })
    );
    setScheduleModalEvent(null);
  };

  // Delete event or draft
  const handleDeleteEvent = (eventId: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== eventId));
    showToast('🗑️ Event removed from catalog.');
  };

  // Update social channel connection / OAuth status
  const handleUpdateSocialChannel = (channelId: string, updated: Partial<SocialChannel>) => {
    setSocialChannels((prev) =>
      prev.map((c) => (c.id === channelId ? { ...c, ...updated } : c))
    );
    const target = socialChannels.find((c) => c.id === channelId);
    if (updated.connected !== undefined) {
      showToast(
        updated.connected
          ? `✓ ${target?.name || 'Channel'} OAuth 2.0 connected and authorized!`
          : `${target?.name || 'Channel'} disconnected.`
      );
    }
  };

  const handleToggleAttend = (eventId: string) => {
    setEvents((prev) =>
      prev.map((e) => {
        if (e.id === eventId) {
          const updated = !e.isAttending;
          showToast(updated ? `✓ You're registered for ${e.title}!` : `RSVP removed for ${e.title}`);
          return { ...e, isAttending: updated };
        }
        return e;
      })
    );
  };

  const handleExportReport = () => {
    showToast('📊 Report exported! Downloading "EventSync-Performance-Summary-Q4-2026.pdf"...');
  };

  const handleSyndicateNow = () => {
    showToast('🚀 Immediate social blast triggered across all 4 channels for #TechSummit2026!');
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] flex flex-col font-sans selection:bg-[#3525cd] selection:text-white">
      {/* Toast Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#131b2e] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-white/20 animate-bounce">
          <span className="material-symbols-outlined text-emerald-400 text-[20px]">
            check_circle
          </span>
          <span className="text-xs md:text-sm font-semibold">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-white/60 hover:text-white text-xs font-bold ml-2 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* PLANNER VIEW */}
      {role === 'planner' && (
        <div className="flex min-h-screen">
          {/* Left Sidebar */}
          <Sidebar
            activeTab={plannerTab}
            setActiveTab={(tab) => {
              if (tab === 'social-accounts') {
                setSocialAccountsOpen(true);
              } else if (tab === 'create-event') {
                handleStartCreateEvent();
              } else {
                setPlannerTab(tab);
              }
            }}
            onBroadcastLive={() => {
              const live = events.find((e) => e.status === 'live') || events[0];
              setLiveConsoleEvent(live);
            }}
            onOpenHelp={() => setHelpOpen(true)}
            onLogout={() => {
              setUserAuthOpen(true);
            }}
          />

          {/* Main Content Area */}
          <div className="flex-1 ml-64 flex flex-col min-w-0">
            <TopNavBar
              currentRole={role}
              setCurrentRole={setRole}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onOpenNotifications={() => setNotificationsOpen(true)}
              onOpenHelp={() => setHelpOpen(true)}
              onOpenProfile={() => setUserAuthOpen(true)}
              eventContextTitle="Tech Summit 2026 • Live Stage Main Hall"
            />

            <main className="flex-1 pb-16">
              {/* Distinct Operations Dashboard */}
              {plannerTab === 'dashboard' && (
                <PlannerDashboard
                  events={events}
                  onCreateEvent={handleStartCreateEvent}
                  onOpenLiveConsole={(ev) => setLiveConsoleEvent(ev)}
                  onOpenReviewQueue={() => setReviewQueueOpen(true)}
                  onOpenConfigureChannels={() => setSocialAccountsOpen(true)}
                  onSyndicateNow={handleSyndicateNow}
                  onExportReport={handleExportReport}
                  onNavigateToEvents={() => setPlannerTab('my-events')}
                  onPublishDraft={handlePublishDraft}
                  onOpenScheduleModal={(ev) => setScheduleModalEvent(ev)}
                  onEditEvent={handleEditEvent}
                />
              )}

              {/* Distinct My Events Management Catalog */}
              {plannerTab === 'my-events' && (
                <PlannerEventsList
                  events={events}
                  onCreateEvent={handleStartCreateEvent}
                  onOpenLiveConsole={(ev) => setLiveConsoleEvent(ev)}
                  onPublishDraft={handlePublishDraft}
                  onOpenScheduleModal={(ev) => setScheduleModalEvent(ev)}
                  onEditEvent={handleEditEvent}
                  onDeleteEvent={handleDeleteEvent}
                  onExportReport={handleExportReport}
                />
              )}

              {/* Step-by-Step Create Event Wizard (guaranteed Step 1 start) */}
              {plannerTab === 'create-event' && (
                <CreateEventWizard
                  key={wizardKey}
                  initialStep={1}
                  initialEventData={editingEvent}
                  onBack={() => setPlannerTab(editingEvent ? 'my-events' : 'dashboard')}
                  onPublish={handlePublishEvent}
                  onSaveDraft={handleSaveDraft}
                />
              )}

              {plannerTab === 'analytics' && (
                <div className="max-w-[1440px] w-full mx-auto p-6 md:p-8 space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-[#c7c4d8]/30">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-extrabold text-[#131b2e]">
                        Syndication &amp; Reach Analytics
                      </h2>
                      <p className="text-xs md:text-sm text-[#464555] mt-0.5">
                        Performance telemetry across connected OAuth nodes and attendee posts
                      </p>
                    </div>
                    <button
                      onClick={handleExportReport}
                      className="px-4 py-2 rounded-full border border-[#c7c4d8]/60 bg-white text-xs font-bold hover:bg-[#eaedff] flex items-center gap-2 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">download</span>
                      <span>Export Metrics</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-2xl border border-[#c7c4d8]/40 shadow-xs">
                      <span className="text-xs font-bold text-[#464555] uppercase">
                        Total Impressions
                      </span>
                      <div className="text-3xl font-extrabold text-[#131b2e] mt-2">1.84M</div>
                      <span className="text-xs text-emerald-600 font-bold mt-1 inline-block">
                        +24.8% vs last conference
                      </span>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-[#c7c4d8]/40 shadow-xs">
                      <span className="text-xs font-bold text-[#464555] uppercase">
                        Attendee UGC Blasts
                      </span>
                      <div className="text-3xl font-extrabold text-[#3525cd] mt-2">1,420</div>
                      <span className="text-xs text-[#4648d4] font-bold mt-1 inline-block">
                        98.4% verified via Moscone GPS
                      </span>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-[#c7c4d8]/40 shadow-xs">
                      <span className="text-xs font-bold text-[#464555] uppercase">
                        Channel Engagement
                      </span>
                      <div className="text-3xl font-extrabold text-[#006a7c] mt-2">142.6k</div>
                      <span className="text-xs text-emerald-600 font-bold mt-1 inline-block">
                        Instagram (54%), LinkedIn (28%), X (18%)
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {plannerTab === 'settings' && (
                <div className="max-w-[1440px] w-full mx-auto p-6 md:p-8 space-y-6">
                  <div className="pb-4 border-b border-[#c7c4d8]/30">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-[#131b2e]">
                      Workspace &amp; Syndication Policies
                    </h2>
                    <p className="text-xs md:text-sm text-[#464555] mt-0.5">
                      Configure default tags, auto-moderation threshold, and API webhooks
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-[#c7c4d8]/40 shadow-xs space-y-4 max-w-2xl">
                    <h3 className="text-sm font-bold text-[#131b2e]">Default Broadcast Policies</h3>
                    <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#f2f3ff]/60 border border-[#c7c4d8]/30">
                      <div>
                        <div className="text-xs font-bold text-[#131b2e]">
                          Auto-Tag Organizer Handles
                        </div>
                        <div className="text-[11px] text-[#464555]">
                          Always inject @TechSummitOfficial into attendee photos
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-5 h-5 text-[#3525cd] rounded"
                      />
                    </div>

                    <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#f2f3ff]/60 border border-[#c7c4d8]/30">
                      <div>
                        <div className="text-xs font-bold text-[#131b2e]">
                          Enforce Strict Geofence
                        </div>
                        <div className="text-[11px] text-[#464555]">
                          Reject posts taken outside 500m venue perimeter
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-5 h-5 text-[#3525cd] rounded"
                      />
                    </div>

                    <button
                      onClick={() => showToast('⚙️ Settings saved.')}
                      className="px-5 py-2 rounded-full bg-[#3525cd] text-white text-xs font-bold hover:bg-[#4f46e5] cursor-pointer"
                    >
                      Save Configuration
                    </button>
                  </div>
                </div>
              )}
            </main>
          </div>
        </div>
      )}

      {/* ATTENDER VIEW */}
      {role === 'attender' && (
        <div className="flex flex-col min-h-screen">
          <TopNavBar
            currentRole={role}
            setCurrentRole={setRole}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onOpenNotifications={() => setNotificationsOpen(true)}
            onOpenHelp={() => setHelpOpen(true)}
            onOpenProfile={() => setUserAuthOpen(true)}
            eventContextTitle="Tech Summit 2026 • Live Stage"
          />

          <AttenderSubNav
            activeTab={attenderTab}
            setActiveTab={setAttenderTab}
            myEventsCount={events.filter((e) => e.isAttending).length}
          />

          <main className="flex-1 pb-16">
            {attenderTab === 'discover' && (
              <AttenderDiscovery
                events={events}
                onUploadPhotos={() => setAttenderTab('upload-photos')}
                onOpenLiveConsole={(ev) => setLiveConsoleEvent(ev)}
                onToggleAttend={handleToggleAttend}
                onOpenSyndicationGuide={() => setHelpOpen(true)}
              />
            )}

            {attenderTab === 'my-events' && (
              <AttenderDiscovery
                events={events.filter((e) => e.isAttending)}
                onUploadPhotos={() => setAttenderTab('upload-photos')}
                onOpenLiveConsole={(ev) => setLiveConsoleEvent(ev)}
                onToggleAttend={handleToggleAttend}
                onOpenSyndicationGuide={() => setHelpOpen(true)}
              />
            )}

            {attenderTab === 'upload-photos' && (
              <AttenderPhotoUpload
                onBackToEvent={() => setAttenderTab('discover')}
                onContinueToSyndication={(caption, photos) => {
                  setActiveCaption(caption);
                  setStagedPhotos(photos);
                  setAttenderTab('my-posts');
                }}
                onSaveDraft={() => showToast('💾 Photo staging draft saved.')}
              />
            )}

            {attenderTab === 'my-posts' && (
              <AttenderSyndication
                initialCaption={activeCaption}
                stagedPhotos={stagedPhotos}
                onUploadAnother={() => setAttenderTab('upload-photos')}
                onViewLiveFeed={() => setAttenderTab('discover')}
              />
            )}
          </main>
        </div>
      )}

      {/* MODALS */}
      <ReviewQueueModal
        isOpen={reviewQueueOpen}
        onClose={() => setReviewQueueOpen(false)}
        onDispatchImmediate={(item) => {
          showToast(`🚀 Dispatched: "${item.caption.slice(0, 40)}..."`);
        }}
      />

      <LiveConsoleModal
        isOpen={!!liveConsoleEvent}
        event={liveConsoleEvent}
        onClose={() => setLiveConsoleEvent(null)}
        onCaptureAndBlast={() => {
          setRole('attender');
          setAttenderTab('upload-photos');
        }}
      />

      {/* Social Accounts & OAuth Management Modal */}
      <SocialAccountsModal
        isOpen={socialAccountsOpen}
        onClose={() => setSocialAccountsOpen(false)}
        channels={socialChannels}
        onUpdateChannel={handleUpdateSocialChannel}
      />

      {/* Schedule Publication Date & Time Modal */}
      <ScheduleModal
        isOpen={!!scheduleModalEvent}
        event={scheduleModalEvent}
        onClose={() => setScheduleModalEvent(null)}
        onConfirmSchedule={handleScheduleConfirm}
      />

      {/* User Identity, SSO & Account Authentication Modal */}
      <UserAuthModal
        isOpen={userAuthOpen}
        onClose={() => setUserAuthOpen(false)}
        currentRole={role}
        onSwitchRole={setRole}
        onOpenSocialAccounts={() => setSocialAccountsOpen(true)}
      />

      <NotificationModal
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
      />

      <HelpModal isOpen={helpOpen} onClose={() => setHelpOpen(false)} />
    </div>
  );
}
