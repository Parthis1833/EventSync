import React, { useState } from 'react';
import { EventItem, SocialChannel } from '../types';
import { SOCIAL_CHANNELS } from '../data/mockData';
import { OAuthModal } from './OAuthModal';

interface CreateEventWizardProps {
  initialStep?: number;
  initialEventData?: EventItem | null;
  onBack: () => void;
  onPublish: (eventData: Partial<EventItem>, isDraft?: boolean, scheduleDate?: string) => void;
  onSaveDraft: (eventData: Partial<EventItem>) => void;
}

export const CreateEventWizard: React.FC<CreateEventWizardProps> = ({
  initialStep = 1,
  initialEventData,
  onBack,
  onPublish,
  onSaveDraft,
}) => {
  // Wizard active step starts at 1 for new events!
  const [currentStep, setCurrentStep] = useState<number>(initialStep || 1);
  const [previewPlatform, setPreviewPlatform] = useState<'instagram' | 'x' | 'linkedin'>('instagram');

  // Step 1: Basic Event Info Form States
  const [eventTitle, setEventTitle] = useState(initialEventData?.title || '');
  const [category, setCategory] = useState(initialEventData?.category || 'Tech & Innovation');
  const [eventDate, setEventDate] = useState(initialEventData?.date || '18 October 2026');
  const [eventTime, setEventTime] = useState(initialEventData?.time || '09:00 AM – 06:00 PM');
  const [venue, setVenue] = useState(initialEventData?.venue || '');
  const [city, setCity] = useState(initialEventData?.city || '');
  const [expectedCapacity, setExpectedCapacity] = useState('4,500 Attendees');
  const [eventImage, setEventImage] = useState(
    initialEventData?.image ||
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB6moCMC7b0Ss7Xm_Q3uO3sfaTCSoeT2GdPN4YBelqyacvtMxUy8wHWqxFuN6L8L3U78WTuZfECUcOHMp-4RqQuQIj2AcgVj8HzIuAyJjyNA1aXn_4CvJG6piIXAP7xSL37EqnrxwxvTSdDGtrxCBjh3q2fO11Z4A0Yryz-S18eLkMGH1TCDJaqvXwOHYiuR7DJB8k7QbniHVuoa82HWdgihYiLj4xXzooBox034nGpauss09wQ7Mvb'
  );

  // Sync state whenever initialEventData or initialStep changes
  React.useEffect(() => {
    setCurrentStep(initialStep || 1);
    if (initialEventData) {
      setEventTitle(initialEventData.title || '');
      setCategory(initialEventData.category || 'Tech & Innovation');
      setEventDate(initialEventData.date || '18 October 2026');
      setEventTime(initialEventData.time || '09:00 AM – 06:00 PM');
      setVenue(initialEventData.venue || '');
      setCity(initialEventData.city || '');
      setHashtags(initialEventData.hashtags || ['#TechSummit2026']);
      setMentions(initialEventData.mentions || ['@TechSummitOfficial']);
      if (initialEventData.captionTemplate) {
        setCaptionTemplate(initialEventData.captionTemplate);
      }
      if (initialEventData.scheduledPublishDate) {
        setIsScheduling(true);
      }
    } else {
      setEventTitle('');
      setVenue('');
      setCity('');
      setHashtags(['#Event2026']);
      setMentions(['@EventSyncOfficial']);
    }
  }, [initialEventData, initialStep]);

  // Step 2: Connected Channels & OAuth
  const [socialChannels, setSocialChannels] = useState<SocialChannel[]>(SOCIAL_CHANNELS);
  const [authModalChannel, setAuthModalChannel] = useState<SocialChannel | null>(null);

  // Step 3: Event Social Auto-Mapping Rules State
  const [hashtags, setHashtags] = useState<string[]>(
    initialEventData?.hashtags || ['#TechSummit2026', '#TechInnovators']
  );
  const [newTagInput, setNewTagInput] = useState('');

  const [mentions, setMentions] = useState<string[]>(
    initialEventData?.mentions || ['@TechSummitOfficial', '@TechCommunity']
  );
  const [newMentionInput, setNewMentionInput] = useState('');

  const [captionTemplate, setCaptionTemplate] = useState(
    initialEventData?.captionTemplate ||
      '📸 Live from Tech Summit 2026! Join the conversation: {hashtag} {mentions}'
  );

  const [allowCustomCaptions, setAllowCustomCaptions] = useState(true);
  const [enforceGeotagging, setEnforceGeotagging] = useState(true);

  // Step 4: Scheduled launch state
  const [isScheduling, setIsScheduling] = useState(false);
  const [scheduledDate, setScheduledDate] = useState('2026-10-15');
  const [scheduledTime, setScheduledTime] = useState('10:00');

  // Hashtag handling
  const handleAddHashtag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const val = newTagInput.trim();
      if (val) {
        const formatted = val.startsWith('#') ? val : `#${val}`;
        if (!hashtags.includes(formatted)) {
          setHashtags([...hashtags, formatted]);
        }
        setNewTagInput('');
      }
    }
  };

  const removeHashtag = (tagToRemove: string) => {
    setHashtags(hashtags.filter((t) => t !== tagToRemove));
  };

  // Mention handling
  const handleAddMention = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const val = newMentionInput.trim();
      if (val) {
        const formatted = val.startsWith('@') ? val : `@${val}`;
        if (!mentions.includes(formatted)) {
          setMentions([...mentions, formatted]);
        }
        setNewMentionInput('');
      }
    }
  };

  const removeMention = (mentionToRemove: string) => {
    setMentions(mentions.filter((m) => m !== mentionToRemove));
  };

  const insertToken = (token: string) => {
    setCaptionTemplate((prev) => `${prev} ${token}`);
  };

  // Dynamic live caption preview
  const renderedCaption = captionTemplate
    .replace('{hashtag}', hashtags.join(' '))
    .replace('{mentions}', mentions.join(' '));

  const activeChannels = socialChannels
    .filter((c) => c.connected)
    .map((c) => c.name as 'Instagram' | 'Facebook' | 'X' | 'LinkedIn');

  const currentEventPayload: Partial<EventItem> = {
    title: eventTitle,
    category,
    date: eventDate,
    time: eventTime,
    venue,
    city,
    image: eventImage,
    hashtags,
    mentions,
    captionTemplate,
    channels: activeChannels.length > 0 ? activeChannels : ['Instagram', 'LinkedIn'],
    attendeesCount: '0 registered',
    startsIn: 'Starting soon',
  };

  const handleSaveDraftInternal = () => {
    onSaveDraft({
      ...currentEventPayload,
      status: 'draft',
      scheduledPublishDate: isScheduling ? `${scheduledDate} at ${scheduledTime}` : undefined,
    });
  };

  const handleFinalPublish = () => {
    onPublish(
      {
        ...currentEventPayload,
        status: 'upcoming',
      },
      false
    );
  };

  const handleFinalSchedule = () => {
    onPublish(
      {
        ...currentEventPayload,
        status: 'draft',
        scheduledPublishDate: `${scheduledDate} at ${scheduledTime}`,
      },
      true,
      `${scheduledDate} at ${scheduledTime}`
    );
  };

  const handleAuthSuccess = (channelId: string, updated: Partial<SocialChannel>) => {
    setSocialChannels((prev) =>
      prev.map((c) => (c.id === channelId ? { ...c, ...updated } : c))
    );
  };

  return (
    <div className="max-w-[1440px] w-full mx-auto p-6 md:p-8 flex flex-col gap-6">
      {/* Top Header with Back to Dashboard option */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-white border border-[#c7c4d8]/50 flex items-center justify-center text-[#464555] hover:text-[#131b2e] hover:bg-[#eaedff] transition-all cursor-pointer"
            title="Back to My Events"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold text-[#131b2e] tracking-tight">
              Create New Event Pipeline
            </h1>
            <p className="text-xs text-[#464555]">
              Configure automated syndication nodes, official tags, and real-time attendee broadcasts.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSaveDraftInternal}
            className="px-4 py-1.5 rounded-full border border-[#c7c4d8]/60 bg-white hover:bg-[#f2f3ff] text-xs font-bold text-[#131b2e] flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <span className="material-symbols-outlined text-[16px]">save</span>
            <span>Save Draft</span>
          </button>
          <button
            onClick={onBack}
            className="text-xs font-bold text-[#ba1a1a] hover:underline cursor-pointer ml-2"
          >
            Cancel &amp; Exit
          </button>
        </div>
      </div>

      {/* TOP WIZARD STEPPER */}
      <section className="bg-white rounded-2xl border border-[#c7c4d8]/40 p-5 shadow-xs">
        <div className="flex items-center justify-between max-w-4xl mx-auto relative">
          {/* Background Line Track */}
          <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-0.5 bg-[#e2e7ff] -z-0"></div>
          {/* Completed Progress Bar Fill */}
          <div
            className="absolute left-8 top-1/2 -translate-y-1/2 h-0.5 bg-[#3525cd] -z-0 transition-all duration-300"
            style={{
              width:
                currentStep === 1
                  ? '0%'
                  : currentStep === 2
                  ? '33%'
                  : currentStep === 3
                  ? '66%'
                  : '96%',
            }}
          ></div>

          {/* Step 1 */}
          <button
            onClick={() => setCurrentStep(1)}
            className="relative z-10 flex flex-col items-center gap-1.5 group cursor-pointer"
          >
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shadow-xs transition-all ${
                currentStep > 1
                  ? 'bg-[#3525cd] text-white'
                  : currentStep === 1
                  ? 'bg-[#3525cd] ring-4 ring-[#3525cd]/20 text-white animate-pulse'
                  : 'bg-[#eaedff] text-[#777587] border border-[#c7c4d8]/50'
              }`}
            >
              {currentStep > 1 ? (
                <span className="material-symbols-outlined text-[18px]">check</span>
              ) : (
                <span>1</span>
              )}
            </div>
            <div className="flex flex-col items-center">
              <span
                className={`text-xs font-bold ${
                  currentStep >= 1 ? 'text-[#3525cd]' : 'text-[#777587]'
                }`}
              >
                Step 1
              </span>
              <span
                className={`text-[11px] ${
                  currentStep === 1 ? 'text-[#3525cd] font-bold' : 'text-[#131b2e]'
                }`}
              >
                Basic Event Info
              </span>
            </div>
          </button>

          {/* Step 2 */}
          <button
            onClick={() => setCurrentStep(2)}
            className="relative z-10 flex flex-col items-center gap-1.5 group cursor-pointer"
          >
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shadow-xs transition-all ${
                currentStep > 2
                  ? 'bg-[#3525cd] text-white'
                  : currentStep === 2
                  ? 'bg-[#3525cd] ring-4 ring-[#3525cd]/20 text-white animate-pulse'
                  : 'bg-[#eaedff] text-[#777587] border border-[#c7c4d8]/50'
              }`}
            >
              {currentStep > 2 ? (
                <span className="material-symbols-outlined text-[18px]">check</span>
              ) : (
                <span>2</span>
              )}
            </div>
            <div className="flex flex-col items-center">
              <span
                className={`text-xs font-bold ${
                  currentStep >= 2 ? 'text-[#3525cd]' : 'text-[#777587]'
                }`}
              >
                Step 2
              </span>
              <span
                className={`text-[11px] ${
                  currentStep === 2 ? 'text-[#3525cd] font-bold' : 'text-[#131b2e]'
                }`}
              >
                Social Media Config
              </span>
            </div>
          </button>

          {/* Step 3 */}
          <button
            onClick={() => setCurrentStep(3)}
            className="relative z-10 flex flex-col items-center gap-1.5 cursor-pointer"
          >
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shadow-xs transition-all ${
                currentStep > 3
                  ? 'bg-[#3525cd] text-white'
                  : currentStep === 3
                  ? 'bg-[#3525cd] ring-4 ring-[#3525cd]/20 text-white animate-pulse'
                  : 'bg-[#eaedff] text-[#777587] border border-[#c7c4d8]/50'
              }`}
            >
              {currentStep > 3 ? (
                <span className="material-symbols-outlined text-[18px]">check</span>
              ) : (
                <span>3</span>
              )}
            </div>
            <div className="flex flex-col items-center">
              <span
                className={`text-xs font-bold ${
                  currentStep >= 3 ? 'text-[#3525cd]' : 'text-[#777587]'
                }`}
              >
                Step 3
              </span>
              <span
                className={`text-[11px] ${
                  currentStep === 3 ? 'text-[#3525cd] font-bold' : 'text-[#131b2e]'
                }`}
              >
                Event Social Rules
              </span>
            </div>
          </button>

          {/* Step 4 */}
          <button
            onClick={() => setCurrentStep(4)}
            className="relative z-10 flex flex-col items-center gap-1.5 cursor-pointer"
          >
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border transition-all ${
                currentStep === 4
                  ? 'bg-[#3525cd] ring-4 ring-[#3525cd]/20 text-white animate-pulse border-[#3525cd]'
                  : 'bg-[#eaedff] text-[#777587] border border-[#c7c4d8]/50'
              }`}
            >
              <span>4</span>
            </div>
            <div className="flex flex-col items-center">
              <span
                className={`text-xs font-bold ${
                  currentStep === 4 ? 'text-[#3525cd]' : 'text-[#777587]'
                }`}
              >
                Step 4
              </span>
              <span
                className={`text-[11px] ${
                  currentStep === 4 ? 'text-[#3525cd] font-bold' : 'text-[#464555]'
                }`}
              >
                Preview &amp; Publish
              </span>
            </div>
          </button>
        </div>
      </section>

      {/* STEP 1 WORKFORM: BASIC EVENT INFO */}
      {currentStep === 1 && (
        <div className="bg-white rounded-2xl border border-[#c7c4d8]/40 p-6 md:p-8 shadow-xs max-w-3xl mx-auto w-full space-y-6">
          <div className="pb-4 border-b border-[#c7c4d8]/30">
            <h2 className="text-xl font-bold text-[#131b2e]">Step 1: Basic Event Information</h2>
            <p className="text-xs text-[#464555] mt-0.5">
              Enter core logistics and schedule to establish the official event broadcast perimeter.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-[#131b2e] mb-1.5">Event Title</label>
              <input
                type="text"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#c7c4d8]/60 bg-[#faf8ff] text-sm font-semibold text-[#131b2e] focus:border-[#3525cd] focus:ring-2 focus:ring-[#3525cd]/20 outline-none"
                placeholder="e.g. Tech Summit 2026"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#131b2e] mb-1.5">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#c7c4d8]/60 bg-[#faf8ff] text-sm font-semibold text-[#131b2e] focus:border-[#3525cd] focus:ring-2 focus:ring-[#3525cd]/20 outline-none"
              >
                <option value="Tech & Innovation">Tech &amp; Innovation</option>
                <option value="Hybrid Conference">Hybrid Conference</option>
                <option value="Design & UX">Design &amp; UX</option>
                <option value="Cloud Engineering">Cloud Engineering</option>
                <option value="Networking">Networking</option>
                <option value="Finance & Web3">Finance &amp; Web3</option>
                <option value="Security & Privacy">Security &amp; Privacy</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#131b2e] mb-1.5">Expected Capacity</label>
              <input
                type="text"
                value={expectedCapacity}
                onChange={(e) => setExpectedCapacity(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#c7c4d8]/60 bg-[#faf8ff] text-sm font-semibold text-[#131b2e] focus:border-[#3525cd] focus:ring-2 focus:ring-[#3525cd]/20 outline-none"
                placeholder="e.g. 4,500 Attendees"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#131b2e] mb-1.5">Date</label>
              <input
                type="text"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#c7c4d8]/60 bg-[#faf8ff] text-sm font-semibold text-[#131b2e] focus:border-[#3525cd] focus:ring-2 focus:ring-[#3525cd]/20 outline-none"
                placeholder="e.g. 18 October 2026"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#131b2e] mb-1.5">Time &amp; Schedule</label>
              <input
                type="text"
                value={eventTime}
                onChange={(e) => setEventTime(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#c7c4d8]/60 bg-[#faf8ff] text-sm font-semibold text-[#131b2e] focus:border-[#3525cd] focus:ring-2 focus:ring-[#3525cd]/20 outline-none"
                placeholder="e.g. 09:00 AM – 06:00 PM"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#131b2e] mb-1.5">Venue</label>
              <input
                type="text"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#c7c4d8]/60 bg-[#faf8ff] text-sm font-semibold text-[#131b2e] focus:border-[#3525cd] focus:ring-2 focus:ring-[#3525cd]/20 outline-none"
                placeholder="e.g. Moscone Center"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#131b2e] mb-1.5">City &amp; Region</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#c7c4d8]/60 bg-[#faf8ff] text-sm font-semibold text-[#131b2e] focus:border-[#3525cd] focus:ring-2 focus:ring-[#3525cd]/20 outline-none"
                placeholder="e.g. Mumbai, Maharashtra"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-[#c7c4d8]/20 flex justify-between items-center">
            <button
              onClick={handleSaveDraftInternal}
              className="px-5 py-2.5 rounded-full border border-[#c7c4d8]/60 text-xs font-bold hover:bg-[#eaedff] cursor-pointer"
            >
              Save as Draft
            </button>
            <button
              onClick={() => setCurrentStep(2)}
              className="px-6 py-2.5 rounded-full bg-[#3525cd] text-white text-xs font-bold hover:bg-[#4f46e5] shadow-md shadow-[#3525cd]/25 flex items-center gap-2 cursor-pointer"
            >
              <span>Next: Social Media Config</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 2 WORKFORM: SOCIAL MEDIA CONFIG & OAUTH AUTHENTICATION */}
      {currentStep === 2 && (
        <div className="bg-white rounded-2xl border border-[#c7c4d8]/40 p-6 md:p-8 shadow-xs max-w-3xl mx-auto w-full space-y-6">
          <div className="pb-4 border-b border-[#c7c4d8]/30">
            <h2 className="text-xl font-bold text-[#131b2e]">
              Step 2: Social Media Feeds &amp; OAuth Authentication
            </h2>
            <p className="text-xs text-[#464555] mt-0.5">
              Authenticate authorized platforms to broadcast live attendee moments with official tags.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {socialChannels.map((channel) => (
              <div
                key={channel.id}
                className="p-4 rounded-2xl border border-[#c7c4d8]/40 bg-[#faf8ff] flex flex-col justify-between gap-3 shadow-2xs hover:border-[#3525cd]/40 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-xs"
                      style={{
                        backgroundColor: channel.color.startsWith('linear') ? undefined : channel.color,
                        background: channel.color.startsWith('linear') ? channel.color : undefined,
                      }}
                    >
                      <span className="material-symbols-outlined text-[20px]">{channel.icon}</span>
                    </div>
                    <div>
                      <span className="text-sm font-bold text-[#131b2e] block leading-tight">
                        {channel.name}
                      </span>
                      <span className="text-xs text-[#464555] font-semibold block mt-0.5">
                        {channel.handle}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                      channel.connected
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        channel.connected ? 'bg-emerald-500' : 'bg-slate-400'
                      }`}
                    ></span>
                    <span>{channel.connected ? 'Connected' : 'Unlinked'}</span>
                  </span>
                </div>

                <div className="pt-2 border-t border-[#c7c4d8]/20 flex items-center justify-between">
                  <span className="text-[11px] text-[#777587]">
                    {channel.connected ? 'OAuth 2.0 Token Valid' : 'Requires authentication'}
                  </span>
                  <button
                    onClick={() => setAuthModalChannel(channel)}
                    className="px-3.5 py-1 rounded-full text-xs font-bold bg-white border border-[#c7c4d8]/60 hover:border-[#3525cd] text-[#3525cd] hover:bg-[#eaedff] transition-all cursor-pointer flex items-center gap-1 shadow-2xs"
                  >
                    <span className="material-symbols-outlined text-[14px]">vpn_key</span>
                    <span>{channel.connected ? 'Manage Token' : 'Authenticate'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-xl bg-[#eaedff]/60 border border-[#3525cd]/20 flex items-start gap-2.5 text-xs text-[#464555]">
            <span className="material-symbols-outlined text-[#3525cd] text-[18px] shrink-0 mt-0.5">
              security
            </span>
            <span>
              Each platform receives real-time photo broadcasts via official OAuth 2.0 Webhook relays. Tokens are encrypted at rest with AES-256 GCM.
            </span>
          </div>

          <div className="pt-4 border-t border-[#c7c4d8]/20 flex justify-between items-center">
            <button
              onClick={() => setCurrentStep(1)}
              className="px-5 py-2.5 rounded-full border border-[#c7c4d8]/60 text-xs font-bold hover:bg-[#eaedff] cursor-pointer"
            >
              Back to Basic Info
            </button>
            <button
              onClick={() => setCurrentStep(3)}
              className="px-6 py-2.5 rounded-full bg-[#3525cd] text-white text-xs font-bold hover:bg-[#4f46e5] shadow-md shadow-[#3525cd]/25 flex items-center gap-2 cursor-pointer"
            >
              <span>Next: Event Social Rules</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 3 WORKFORM: EVENT SOCIAL RULES & LIVE PREVIEW (MATCHES SCREEN 3 EXACTLY) */}
      {currentStep === 3 && (
        <div className="grid grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Form Inputs & Summaries (7 Columns) */}
          <div className="col-span-12 xl:col-span-7 flex flex-col gap-6">
            {/* 1. Step 1 Summary Banner Card */}
            <div className="bg-white rounded-2xl border border-[#c7c4d8]/40 p-5 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-[#c7c4d8]/20 mb-4">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#3525cd] text-[20px]">
                    task_alt
                  </span>
                  <span className="text-base font-bold text-[#131b2e]">
                    Step 1 Summary: Event Overview
                  </span>
                </div>
                <button
                  onClick={() => setCurrentStep(1)}
                  className="text-xs text-[#3525cd] hover:text-[#4f46e5] flex items-center gap-1 font-bold transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">edit</span>
                  <span>Edit details</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="flex flex-col bg-[#f2f3ff]/70 p-3 rounded-xl border border-[#c7c4d8]/30">
                  <span className="text-[11px] font-semibold text-[#777587]">Event Title</span>
                  <span className="text-sm font-bold text-[#131b2e] mt-0.5">{eventTitle}</span>
                </div>
                <div className="flex flex-col bg-[#f2f3ff]/70 p-3 rounded-xl border border-[#c7c4d8]/30">
                  <span className="text-[11px] font-semibold text-[#777587]">Category</span>
                  <span className="text-sm font-bold text-[#131b2e] mt-0.5">{category}</span>
                </div>
                <div className="flex flex-col bg-[#f2f3ff]/70 p-3 rounded-xl border border-[#c7c4d8]/30">
                  <span className="text-[11px] font-semibold text-[#777587]">Date &amp; Schedule</span>
                  <div className="flex items-center gap-1.5 text-[#131b2e] mt-0.5">
                    <span className="material-symbols-outlined text-[#777587] text-[16px]">
                      schedule
                    </span>
                    <span className="text-xs font-semibold">
                      {eventDate}, {eventTime}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col bg-[#f2f3ff]/70 p-3 rounded-xl border border-[#c7c4d8]/30">
                  <span className="text-[11px] font-semibold text-[#777587]">Venue &amp; Location</span>
                  <div className="flex items-center gap-1.5 text-[#131b2e] mt-0.5">
                    <span className="material-symbols-outlined text-[#777587] text-[16px]">
                      location_on
                    </span>
                    <span className="text-xs font-semibold">
                      {venue}, {city}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Step 2 Summary: Connected Social Channels Grid */}
            <div className="bg-white rounded-2xl border border-[#c7c4d8]/40 p-5 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-[#c7c4d8]/20 mb-4">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#3525cd] text-[20px]">hub</span>
                  <span className="text-base font-bold text-[#131b2e]">
                    Step 2: Connected Social Channels
                  </span>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>{activeChannels.length}/4 Active Feeds</span>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {socialChannels.map((ch) => (
                  <div
                    key={ch.id}
                    className="flex items-center justify-between p-3 rounded-xl border border-[#c7c4d8]/30 bg-[#faf8ff] hover:border-[#3525cd]/40 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-xs"
                        style={{
                          backgroundColor: ch.color.startsWith('linear') ? undefined : ch.color,
                          background: ch.color.startsWith('linear') ? ch.color : undefined,
                        }}
                      >
                        <span className="material-symbols-outlined text-[18px]">{ch.icon}</span>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              ch.connected ? 'bg-emerald-500' : 'bg-slate-400'
                            }`}
                          ></span>
                          <span className="text-xs font-bold text-[#131b2e]">{ch.name}</span>
                        </div>
                        <span className="text-[11px] text-[#464555]">{ch.handle}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setAuthModalChannel(ch)}
                      className="text-xs text-[#3525cd] hover:underline font-bold cursor-pointer"
                    >
                      Manage
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Step 3: Event Social Auto-Mapping Rules (Active Workform) */}
            <div className="bg-white rounded-2xl border-2 border-[#3525cd]/30 p-6 shadow-md relative overflow-hidden">
              <div className="absolute top-0 left-0 h-1.5 w-full bg-[#3525cd]"></div>

              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-lg md:text-xl text-[#131b2e] font-bold">
                    Step 3: Event Social Auto-Mapping Rules
                  </h2>
                  <p className="text-xs md:text-sm text-[#464555] mt-0.5">
                    Define automated syndication tags and permissions for attendee broadcasts.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#e2dfff] text-[#0f0069] text-xs font-bold uppercase tracking-wider">
                  Active Step
                </span>
              </div>

              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                {/* Official Event Hashtags */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-[#131b2e] flex items-center justify-between">
                    <span>Official Event Hashtags</span>
                    <span className="text-xs text-[#777587]">Press Enter to add tag</span>
                  </label>
                  <div className="min-h-[46px] p-2 rounded-xl bg-white border border-[#c7c4d8]/60 focus-within:border-[#3525cd] focus-within:ring-2 focus-within:ring-[#3525cd]/20 flex flex-wrap items-center gap-2 transition-all">
                    {hashtags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e2dfff] text-[#0f0069] text-xs font-bold border border-[#3525cd]/20"
                      >
                        <span>{tag}</span>
                        <button
                          onClick={() => removeHashtag(tag)}
                          className="hover:text-[#ba1a1a] text-[#0f0069] flex items-center cursor-pointer"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[16px]">close</span>
                        </button>
                      </span>
                    ))}
                    <input
                      type="text"
                      value={newTagInput}
                      onChange={(e) => setNewTagInput(e.target.value)}
                      onKeyDown={handleAddHashtag}
                      className="flex-1 min-w-[140px] bg-transparent border-0 p-1 text-[#131b2e] text-xs font-medium focus:ring-0 focus:outline-none placeholder:text-[#777587]"
                      placeholder="Add more hashtags..."
                    />
                  </div>
                  <p className="text-xs text-[#464555] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-[#3525cd]">info</span>
                    <span>Will automatically be appended to all attender broadcasts.</span>
                  </p>
                </div>

                {/* Official Mentions */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-[#131b2e] flex items-center justify-between">
                    <span>Official Mentions</span>
                    <span className="text-xs text-[#777587]">Press Enter to add handle</span>
                  </label>
                  <div className="min-h-[46px] p-2 rounded-xl bg-white border border-[#c7c4d8]/60 focus-within:border-[#3525cd] focus-within:ring-2 focus-within:ring-[#3525cd]/20 flex flex-wrap items-center gap-2 transition-all">
                    {mentions.map((m) => (
                      <span
                        key={m}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e2e7ff] text-[#131b2e] text-xs font-bold border border-[#c7c4d8]/40"
                      >
                        <span>{m}</span>
                        <button
                          onClick={() => removeMention(m)}
                          className="hover:text-[#ba1a1a] text-[#777587] flex items-center cursor-pointer"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[16px]">close</span>
                        </button>
                      </span>
                    ))}
                    <input
                      type="text"
                      value={newMentionInput}
                      onChange={(e) => setNewMentionInput(e.target.value)}
                      onKeyDown={handleAddMention}
                      className="flex-1 min-w-[140px] bg-transparent border-0 p-1 text-[#131b2e] text-xs font-medium focus:ring-0 focus:outline-none placeholder:text-[#777587]"
                      placeholder="Add mention handle..."
                    />
                  </div>
                </div>

                {/* Reusable Caption Template */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-bold text-[#131b2e]">
                      Reusable Caption Template
                    </label>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-[#777587]">Insert token:</span>
                      <button
                        type="button"
                        onClick={() => insertToken('{hashtag}')}
                        className="px-2 py-0.5 rounded-md bg-[#eaedff] text-[#3525cd] text-xs font-bold hover:bg-[#e2e7ff] cursor-pointer"
                      >
                        {'{hashtag}'}
                      </button>
                      <button
                        type="button"
                        onClick={() => insertToken('{mentions}')}
                        className="px-2 py-0.5 rounded-md bg-[#eaedff] text-[#3525cd] text-xs font-bold hover:bg-[#e2e7ff] cursor-pointer"
                      >
                        {'{mentions}'}
                      </button>
                    </div>
                  </div>

                  <textarea
                    rows={3}
                    value={captionTemplate}
                    onChange={(e) => setCaptionTemplate(e.target.value)}
                    className="w-full p-3.5 rounded-xl bg-white border border-[#c7c4d8]/60 text-xs md:text-sm text-[#131b2e] focus:outline-none focus:border-[#3525cd] focus:ring-2 focus:ring-[#3525cd]/20 transition-all resize-none leading-relaxed"
                  />
                  <span className="text-xs text-[#777587]">
                    Dynamic tokens automatically substitute selected official event tags and social channels.
                  </span>
                </div>

                {/* Attender Broadcast Permissions */}
                <div className="pt-2 border-t border-[#c7c4d8]/20 flex flex-col gap-3.5">
                  <span className="text-sm font-bold text-[#131b2e]">
                    Attender Broadcast Permissions
                  </span>

                  {/* Toggle 1 */}
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#f2f3ff]/50 border border-[#c7c4d8]/30">
                    <div className="flex flex-col pr-4">
                      <span className="text-xs md:text-sm font-bold text-[#131b2e]">
                        Allow custom captions by attendees
                      </span>
                      <span className="text-xs text-[#464555] mt-0.5">
                        Attendees can prefix their own personal notes before the official campaign message.
                      </span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                      <input
                        type="checkbox"
                        checked={allowCustomCaptions}
                        onChange={(e) => setAllowCustomCaptions(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3525cd]"></div>
                    </label>
                  </div>

                  {/* Toggle 2 */}
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#f2f3ff]/50 border border-[#c7c4d8]/30">
                    <div className="flex flex-col pr-4">
                      <span className="text-xs md:text-sm font-bold text-[#131b2e]">
                        Enforce venue geotagging
                      </span>
                      <span className="text-xs text-[#464555] mt-0.5">
                        Locks GPS coordinates to "{venue}, {city}" for authentic attendance proof.
                      </span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                      <input
                        type="checkbox"
                        checked={enforceGeotagging}
                        onChange={(e) => setEnforceGeotagging(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3525cd]"></div>
                    </label>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* RIGHT COLUMN: Live Attender Broadcast Output Preview (5 Columns - Sticky) */}
          <div className="col-span-12 xl:col-span-5 sticky top-24 space-y-4">
            <div className="bg-white rounded-2xl border border-[#c7c4d8]/40 shadow-lg overflow-hidden">
              {/* Card Header */}
              <div className="px-5 py-4 bg-[#f2f3ff]/80 border-b border-[#c7c4d8]/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                  <span className="text-sm font-bold text-[#131b2e]">
                    Live Attender Broadcast Output Preview
                  </span>
                </div>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#3525cd]/10 text-[#3525cd] font-bold">
                  Simulated Output
                </span>
              </div>

              {/* Preview Card Body */}
              <div className="p-5 flex flex-col gap-4">
                {/* Channel Selector Tabs for Live Preview */}
                <div className="flex items-center gap-1.5 p-1 bg-[#f2f3ff] rounded-xl border border-[#c7c4d8]/30">
                  <button
                    type="button"
                    onClick={() => setPreviewPlatform('instagram')}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                      previewPlatform === 'instagram'
                        ? 'bg-white text-[#3525cd] shadow-2xs'
                        : 'text-[#464555] hover:text-[#131b2e]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">photo_camera</span>
                    <span>Instagram</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewPlatform('x')}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                      previewPlatform === 'x'
                        ? 'bg-white text-[#3525cd] shadow-2xs'
                        : 'text-[#464555] hover:text-[#131b2e]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">tag</span>
                    <span>X</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewPlatform('linkedin')}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                      previewPlatform === 'linkedin'
                        ? 'bg-white text-[#3525cd] shadow-2xs'
                        : 'text-[#464555] hover:text-[#131b2e]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">business</span>
                    <span>LinkedIn</span>
                  </button>
                </div>

                {/* Simulated Smartphone / Feed Post Mockup */}
                <div className="border border-[#c7c4d8]/40 rounded-2xl bg-white shadow-sm overflow-hidden">
                  {/* Mock Social User Header */}
                  <div className="p-3.5 flex items-center justify-between border-b border-[#c7c4d8]/20 bg-[#faf8ff]/60">
                    <div className="flex items-center gap-2.5">
                      <img
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-[#3525cd]/40"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsShedpUyi0LClVRFpnImcuLidahTRAOQIyIBfY5xdIDHOGZSDWzR4pm8-dO4TWm-Ne8Y6d8QWDXNTsmwgrm_ITbxu0W7tTHheNs4iIkcOuvEha1qQcLcbKtP6AFwuejYkwJ_LizcF9OcI1EI4yn0ICTlV1mDDwJw-5r9xgvtSKWGzY_UTNkfc7Ql58J3jEUYObtUjKswSZk4cVh9_Svlxd02MJRXre12rHW9sz8rE5kWkOkARWozk"
                        alt="Aarav Patel"
                      />
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-[#131b2e]">Aarav Patel</span>
                          <span
                            className="material-symbols-outlined text-[#3525cd] text-[14px]"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            verified
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-[#464555]">
                          <span className="material-symbols-outlined text-[12px] text-[#3525cd]">
                            location_on
                          </span>
                          <span className="text-[11px] font-medium">{venue}, {city}</span>
                        </div>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-[#777587] text-[20px]">
                      more_horiz
                    </span>
                  </div>

                  {/* Event Attendee Photo Media */}
                  <div className="relative w-full aspect-[4/3] bg-[#d2d9f4] overflow-hidden group">
                    <img
                      className="w-full h-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCaZjKvrVCFGxsTugipqf3cX09GAE3CmFS2zT-80QH7FWOrxISKWXCIhCA0-KmDV3KsjCAx6TUWufb8PwjgTNw60KA0-rxj_lD2IAAj7Q7hhaUpyInwAXMpnv5CWYl9EnY3cbyd0L-NxCD7P2ENakwaDa5eyvUdeqtF5lep8x86t3ciuJkYln64mqcYsjjgHXfYMp4qBpPSLdHZn_2zysH1E-StryjbR539SEiY6YgzOscASGy32SbJ"
                      alt="Keynote presentation"
                    />
                    {/* Broadcast Overlay Badge */}
                    <div className="absolute top-3 right-3 backdrop-blur-md bg-black/60 text-white px-2.5 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1.5 border border-white/20">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      <span>EventSync Verified</span>
                    </div>
                    <div className="absolute bottom-3 left-3 backdrop-blur-md bg-white/85 text-[#131b2e] px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1.5 shadow-xs border border-white/50">
                      <span className="material-symbols-outlined text-[14px] text-[#3525cd]">
                        schedule
                      </span>
                      <span>18 Oct 2026 • Live Sync</span>
                    </div>
                  </div>

                  {/* Live Auto-Applied Caption Content Area */}
                  <div className="p-4 space-y-2.5">
                    <div className="flex items-center gap-4 text-[#131b2e] pb-2 border-b border-[#c7c4d8]/20">
                      <span
                        className="material-symbols-outlined text-[20px] text-[#ba1a1a] cursor-pointer"
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
                      <div className="flex-1"></div>
                      <span className="material-symbols-outlined text-[20px] text-[#777587] cursor-pointer">
                        bookmark
                      </span>
                    </div>

                    {/* Dynamic Formatted Caption Text */}
                    <p className="text-xs md:text-sm text-[#131b2e] leading-relaxed">
                      <span className="font-bold text-[#131b2e] mr-1">Aarav Patel</span>
                      <span className="text-[#464555] italic">
                        "Incredible opening keynote on generative platforms! "
                      </span>
                      <br />
                      <span>{renderedCaption}</span>
                    </p>

                    {/* Delivery Telemetry Matrix */}
                    <div className="pt-3 flex items-center justify-between text-[#777587] border-t border-[#c7c4d8]/20 text-xs">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px] text-emerald-600">
                          sync_saved_locally
                        </span>
                        <span>Syndication Rule: Auto-Mapped</span>
                      </span>
                      <span className="text-[#3525cd] font-bold">
                        {activeChannels.length} Target Destinations
                      </span>
                    </div>
                  </div>
                </div>

                {/* Real-Time Syndication Health Badge */}
                <div className="p-3 rounded-xl bg-[#e2e7ff]/50 border border-[#c7c4d8]/30 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[18px]">verified_user</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#131b2e]">
                      Automation Verification Ready
                    </span>
                    <span className="text-[11px] text-[#464555]">
                      Hashtags and geotags are verified against Instagram and X platform character limits.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 4 WORKFORM: PREVIEW, PUBLISH OR SCHEDULE PUBLICATION */}
      {currentStep === 4 && (
        <div className="bg-white rounded-2xl border border-[#c7c4d8]/40 p-6 md:p-8 shadow-xs max-w-3xl mx-auto w-full space-y-6">
          <div className="pb-4 border-b border-[#c7c4d8]/30">
            <h2 className="text-xl font-bold text-[#131b2e]">Step 4: Final Review &amp; Activation</h2>
            <p className="text-xs text-[#464555] mt-0.5">
              Choose to publish and activate now, schedule an automated publication launch time, or save as draft.
            </p>
          </div>

          <div className="p-4.5 rounded-2xl bg-[#f2f3ff] border border-[#c7c4d8]/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#3525cd] uppercase tracking-wider">
                Event Overview
              </span>
              <button
                onClick={() => setCurrentStep(1)}
                className="text-xs font-bold text-[#3525cd] hover:underline cursor-pointer"
              >
                Edit
              </button>
            </div>
            <h3 className="text-xl font-bold text-[#131b2e]">{eventTitle}</h3>
            <div className="grid grid-cols-2 gap-2 text-xs text-[#464555]">
              <div>
                <strong>Schedule:</strong> {eventDate} · {eventTime}
              </div>
              <div>
                <strong>Venue:</strong> {venue}, {city}
              </div>
              <div>
                <strong>Category:</strong> {category}
              </div>
              <div>
                <strong>Target Channels:</strong> {activeChannels.join(', ') || 'None selected'}
              </div>
            </div>
          </div>

          <div className="p-4.5 rounded-2xl bg-[#f2f3ff] border border-[#c7c4d8]/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#3525cd] uppercase tracking-wider">
                Active Syndication Rules
              </span>
              <button
                onClick={() => setCurrentStep(3)}
                className="text-xs font-bold text-[#3525cd] hover:underline cursor-pointer"
              >
                Edit
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {hashtags.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-0.5 rounded-full bg-white text-xs font-bold text-[#3525cd] border border-[#c7c4d8]/50"
                >
                  {t}
                </span>
              ))}
              {mentions.map((m) => (
                <span
                  key={m}
                  className="px-2.5 py-0.5 rounded-full bg-white text-xs font-bold text-[#131b2e] border border-[#c7c4d8]/50"
                >
                  {m}
                </span>
              ))}
            </div>
            <p className="text-xs text-[#464555] italic bg-white p-2.5 rounded-xl border border-[#c7c4d8]/30 mt-2">
              "{renderedCaption}"
            </p>
          </div>

          {/* SCHEDULE PUBLICATION TOGGLE SECTION */}
          <div className="p-4.5 rounded-2xl border border-[#c7c4d8]/50 bg-white space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#3525cd] text-[20px]">
                  alarm
                </span>
                <span className="text-sm font-bold text-[#131b2e]">
                  Schedule Publication Time
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isScheduling}
                  onChange={(e) => setIsScheduling(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3525cd]"></div>
              </label>
            </div>

            {isScheduling ? (
              <div className="p-3.5 rounded-xl bg-[#faf8ff] border border-[#c7c4d8]/40 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-bold text-[#131b2e] mb-1">Launch Date:</label>
                  <input
                    type="date"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#c7c4d8]/60 bg-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#131b2e] mb-1">Launch Time (IST):</label>
                  <input
                    type="time"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#c7c4d8]/60 bg-white"
                  />
                </div>
                <div className="sm:col-span-2 text-[11px] text-[#464555]">
                  Auto-Scheduler armed: The event will remain in Drafts and automatically broadcast on{' '}
                  <strong className="text-[#3525cd]">{scheduledDate} at {scheduledTime}</strong>.
                </div>
              </div>
            ) : (
              <p className="text-xs text-[#777587]">
                Leave disabled to activate the event immediately upon publishing.
              </p>
            )}
          </div>

          <div className="pt-4 border-t border-[#c7c4d8]/20 flex flex-wrap justify-between items-center gap-3">
            <button
              onClick={() => setCurrentStep(3)}
              className="px-5 py-2.5 rounded-full border border-[#c7c4d8]/60 text-xs font-bold hover:bg-[#eaedff] cursor-pointer"
            >
              Back to Social Rules
            </button>

            <div className="flex items-center gap-2.5">
              <button
                onClick={handleSaveDraftInternal}
                className="px-5 py-2.5 rounded-full border border-[#c7c4d8]/60 text-xs font-bold hover:bg-[#eaedff] text-[#131b2e] cursor-pointer"
              >
                Save as Draft
              </button>

              {isScheduling ? (
                <button
                  onClick={handleFinalSchedule}
                  className="px-7 py-3 rounded-full bg-[#4f46e5] hover:bg-[#3525cd] text-white text-xs md:text-sm font-bold shadow-md shadow-[#4f46e5]/30 flex items-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">alarm_on</span>
                  <span>Schedule Launch ⏱️</span>
                </button>
              ) : (
                <button
                  onClick={handleFinalPublish}
                  className="px-7 py-3 rounded-full bg-[#3525cd] hover:bg-[#4f46e5] text-white text-xs md:text-sm font-bold shadow-lg shadow-[#3525cd]/30 flex items-center gap-2 cursor-pointer"
                >
                  <span>Publish &amp; Activate Event 🚀</span>
                  <span className="material-symbols-outlined text-[18px]">bolt</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* FOOTER ACTION BAR (Visible on Step 3 for exact match with Screen 3) */}
      {currentStep === 3 && (
        <footer className="mt-4 bg-white rounded-2xl border border-[#c7c4d8]/40 p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => setCurrentStep(2)}
              className="h-11 px-5 rounded-full border border-[#c7c4d8]/60 bg-white hover:bg-[#f2f3ff] text-[#131b2e] text-xs md:text-sm font-bold flex items-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              <span>Back to Social Config</span>
            </button>
            <button
              onClick={handleSaveDraftInternal}
              className="h-11 px-5 rounded-full border border-[#c7c4d8]/60 bg-white hover:bg-[#f2f3ff] text-[#131b2e] text-xs md:text-sm font-bold flex items-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">save</span>
              <span>Save as Draft</span>
            </button>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
            <button
              onClick={() => setCurrentStep(4)}
              className="h-11 px-5 rounded-full border border-[#c7c4d8]/60 bg-white hover:bg-[#f2f3ff] text-[#3525cd] text-xs md:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer"
            >
              <span>Step 4: Schedule / Publish</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>

            <button
              onClick={handleFinalPublish}
              className="h-12 px-8 rounded-full bg-[#3525cd] hover:bg-[#4f46e5] text-white text-xs md:text-sm font-bold shadow-md shadow-[#3525cd]/25 flex items-center gap-2.5 transition-all hover:shadow-lg active:scale-[0.98] cursor-pointer"
            >
              <span>Publish &amp; Activate Event 🚀</span>
              <span className="material-symbols-outlined text-[20px]">bolt</span>
            </button>
          </div>
        </footer>
      )}

      {/* OAuth Connection Modal */}
      <OAuthModal
        isOpen={!!authModalChannel}
        channel={authModalChannel}
        onClose={() => setAuthModalChannel(null)}
        onAuthenticateSuccess={handleAuthSuccess}
      />
    </div>
  );
};
