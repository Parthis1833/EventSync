import React, { useState, useRef, useEffect } from 'react';
import { StagedPhoto } from '../types';
import { INITIAL_STAGED_PHOTOS } from '../data/mockData';

interface AttenderPhotoUploadProps {
  onBackToEvent: () => void;
  onContinueToSyndication: (caption: string, stagedPhotos: StagedPhoto[]) => void;
  onSaveDraft: () => void;
}

interface AISuggestion {
  tone: 'funny' | 'professional' | 'policy' | 'hype';
  title: string;
  caption: string;
  pitch: string;
}

export const AttenderPhotoUpload: React.FC<AttenderPhotoUploadProps> = ({
  onBackToEvent,
  onContinueToSyndication,
  onSaveDraft,
}) => {
  const [photos, setPhotos] = useState<StagedPhoto[]>(INITIAL_STAGED_PHOTOS);
  const [enhancedColors, setEnhancedColors] = useState(false);
  const [uploadedBase64, setUploadedBase64] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Metadata states
  const [locationText, setLocationText] = useState('Mumbai, Maharashtra (Moscone Center)');
  const [isEditingLocation, setIsEditingLocation] = useState(false);

  const [hashtags, setHashtags] = useState<string[]>(['#TechSummit2026', '#TechSummitKeynote']);
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [newTag, setNewTag] = useState('');

  const [mentions, setMentions] = useState<string[]>([
    '@TechSummitOfficial',
    '@TechCommunity',
  ]);
  const [isAddingMention, setIsAddingMention] = useState(false);
  const [newMention, setNewMention] = useState('');

  const [caption, setCaption] = useState(
    '📸 Electrifying keynote live from #TechSummit2026! Inspiring insights on AI and future tech. @TechSummitOfficial'
  );

  // Gemini AI States
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [aiFilterTone, setAiFilterTone] = useState<'all' | 'funny' | 'professional' | 'policy' | 'hype'>('all');
  const [appliedTone, setAppliedTone] = useState<string | null>(null);
  const [aiSuggestions, setAiSuggestions] = useState<AISuggestion[]>([
    {
      tone: 'funny',
      title: 'Funny & Witty 😂',
      caption:
        'Came for the keynote, stayed for the existential debates on autonomous neural nets and the unlimited espresso. ☕🤖 #TechSummit2026 @TechSummitOfficial',
      pitch: 'Humorous take on the hallway conversations and conference atmosphere',
    },
    {
      tone: 'professional',
      title: 'Professional & Executive 💼',
      caption:
        'Privileged to attend the leadership keynote at #TechSummit2026 in Moscone Center Mumbai. Groundbreaking frameworks for enterprise scaling. @TechSummitOfficial',
      pitch: 'Executive framing optimized for career networking and LinkedIn',
    },
    {
      tone: 'policy',
      title: 'Formal & Policy 🏛️',
      caption:
        'Official Attendance Record: Keynote Session 02 convened at Moscone Center Mumbai on 18 Oct 2026. Advancing open AI compute standards. @TechSummitOfficial #TechSummit2026',
      pitch: 'Institutional, governance-compliant and press documentation tone',
    },
    {
      tone: 'hype',
      title: 'High Energy & Viral ⚡',
      caption:
        'UNREAL energy at #TechSummit2026! 🚀 The future of intelligence is happening right in this room. Absolute game-changer! @TechSummitOfficial @TechCommunity',
      pitch: 'High-voltage excitement and social media momentum',
    },
  ]);

  // Request Gemini API to generate or rewrite suggestions based on image & details
  const fetchGeminiSuggestions = async (base64Img?: string, requestedTone?: string) => {
    setIsGeneratingAI(true);
    try {
      const response = await fetch('/api/ai/caption-suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: base64Img || uploadedBase64,
          mimeType: 'image/jpeg',
          eventTitle: 'Tech Summit 2026',
          eventDetails: {
            venue: locationText,
            session: 'Keynote Session 02 - Autonomous Intelligence',
            hashtags,
            mentions,
          },
          currentCaption: caption,
          requestedTone: requestedTone || 'all',
        }),
      });

      const data = await response.json();
      if (data?.suggestions && Array.isArray(data.suggestions) && data.suggestions.length > 0) {
        setAiSuggestions(data.suggestions);
      }
    } catch (err) {
      console.error('Failed to query Gemini API:', err);
    } finally {
      setIsGeneratingAI(false);
    }
  };

  // Quick single-tone rewrite via Gemini
  const handleQuickRewrite = async (tone: 'funny' | 'professional' | 'policy' | 'hype') => {
    setIsGeneratingAI(true);
    setAppliedTone(tone);
    try {
      const response = await fetch('/api/ai/quick-rewrite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tone,
          caption,
          eventTitle: 'Tech Summit 2026',
          hashtags,
          mentions,
        }),
      });
      const data = await response.json();
      if (data?.rewrittenCaption) {
        setCaption(data.rewrittenCaption);
      }
    } catch (err) {
      console.error('Quick rewrite error:', err);
      // Fallback to matching suggestion from current list
      const matched = aiSuggestions.find((s) => s.tone === tone);
      if (matched) {
        setCaption(matched.caption);
      }
    } finally {
      setIsGeneratingAI(false);
    }
  };

  // Apply a specific AI suggestion
  const handleApplySuggestion = (suggestion: AISuggestion) => {
    setCaption(suggestion.caption);
    setAppliedTone(suggestion.tone);
    setTimeout(() => setAppliedTone(null), 3000);
  };

  // Handle file uploads with base64 conversion for Gemini multimodal
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setUploadedBase64(base64String);
        // Automatically invoke Gemini analysis on the newly uploaded image
        fetchGeminiSuggestions(base64String);
      };
      reader.readAsDataURL(file);

      const newItems: StagedPhoto[] = Array.from(files).map((f, idx) => ({
        id: `upload-${Date.now()}-${idx}`,
        name: f.name.replace(/\.[^/.]+$/, ''),
        url: URL.createObjectURL(f),
        resolution: '4032 × 3024',
        size: `${(f.size / (1024 * 1024)).toFixed(1)}MB`,
        isHero: photos.length === 0 && idx === 0,
        filterApplied: enhancedColors,
      }));
      setPhotos([...photos, ...newItems]);
    }
  };

  const removePhoto = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const remaining = photos.filter((p) => p.id !== id);
    if (remaining.length > 0 && !remaining.some((p) => p.isHero)) {
      remaining[0].isHero = true;
    }
    setPhotos(remaining);
  };

  const setHeroPhoto = (id: string) => {
    setPhotos(photos.map((p) => ({ ...p, isHero: p.id === id })));
  };

  const toggleEnhanceColors = () => {
    setEnhancedColors(!enhancedColors);
  };

  const addEmoji = () => {
    const emojis = ['⚡', '✨', '🔥', '🌐', '💡', '🤖', '🚀', '☕'];
    const chosen = emojis[Math.floor(Math.random() * emojis.length)];
    setCaption((prev) => `${prev} ${chosen}`);
  };

  const heroPhoto = photos.find((p) => p.isHero) || photos[0];
  const secondaryPhotos = photos.filter((p) => p.id !== heroPhoto?.id);

  const displayedSuggestions =
    aiFilterTone === 'all'
      ? aiSuggestions
      : aiSuggestions.filter((s) => s.tone === aiFilterTone);

  return (
    <div className="max-w-5xl w-full mx-auto px-6 py-8 flex flex-col gap-8">
      {/* Workspace Header & Context */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-[#c7c4d8]/20">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full bg-[#e2dfff] text-[#0f0069] text-xs font-bold uppercase tracking-wider">
              Fast-Track Syndication
            </span>
            <span className="text-[#464555] text-xs font-semibold">Step 1 of 3</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#131b2e] tracking-tight">
            Upload Event Photos
          </h1>
          <p className="text-xs md:text-sm text-[#464555] mt-1">
            Your photos are analyzed by Gemini AI to automatically craft witty, executive, or policy captions with official tags.
          </p>
        </div>

        {/* Quick Platform Sync Indicators */}
        <div className="flex items-center gap-2 bg-white border border-[#c7c4d8]/40 rounded-full px-3.5 py-1.5 shadow-2xs self-start md:self-auto">
          <span className="text-xs font-semibold text-[#464555]">Broadcasting to:</span>
          <div className="flex items-center -space-x-1">
            <span className="w-5 h-5 rounded-full bg-[#1877F2] text-white flex items-center justify-center text-[10px] font-bold shadow-2xs">
              f
            </span>
            <span className="w-5 h-5 rounded-full bg-[#0F1419] text-white flex items-center justify-center text-[10px] font-bold shadow-2xs">
              𝕏
            </span>
            <span className="w-5 h-5 rounded-full bg-linear-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white flex items-center justify-center text-[10px] font-bold shadow-2xs">
              IG
            </span>
            <span className="w-5 h-5 rounded-full bg-[#0A66C2] text-white flex items-center justify-center text-[10px] font-bold shadow-2xs">
              in
            </span>
          </div>
        </div>
      </section>

      {/* Hidden real file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={handleFileUpload}
      />

      {/* Upload Container: Drag & Drop Zone */}
      <section className="w-full">
        <div
          onClick={() => fileInputRef.current?.click()}
          className="custom-dashed-border bg-white/70 hover:bg-[#f2f3ff]/70 rounded-2xl p-8 md:p-10 transition-all duration-200 text-center flex flex-col items-center justify-center relative group cursor-pointer shadow-xs"
        >
          <div className="w-16 h-16 rounded-full bg-[#e2dfff]/70 flex items-center justify-center text-[#3525cd] group-hover:scale-105 group-hover:bg-[#e2dfff] transition-transform shadow-2xs mb-4">
            <span className="material-symbols-outlined text-[32px]">cloud_upload</span>
          </div>

          <h3 className="text-lg md:text-xl font-bold text-[#131b2e] mb-1">
            Drag high-resolution event photos here, or click to browse
          </h3>
          <p className="text-xs text-[#464555] max-w-md mx-auto mb-4">
            Directly from your camera roll or camera. Gemini AI automatically analyzes image context to write captions in multiple tones.
          </p>

          <button
            type="button"
            className="px-5 py-2.5 rounded-full bg-[#3525cd] text-white text-xs font-bold shadow-md shadow-[#3525cd]/25 group-hover:bg-[#4f46e5] transition-all flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add_a_photo</span>
            <span>Select from Device</span>
          </button>
        </div>
      </section>

      {/* Staged Photo Gallery */}
      {photos.length > 0 && (
        <section className="bg-white rounded-3xl border border-[#c7c4d8]/40 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#3525cd] text-[20px]">
                photo_library
              </span>
              <h3 className="text-sm font-bold text-[#131b2e]">
                Staged Photos ({photos.length})
              </h3>
            </div>
            <button
              onClick={toggleEnhanceColors}
              className={`text-xs font-bold px-3 py-1 rounded-full border transition-all cursor-pointer flex items-center gap-1.5 ${
                enhancedColors
                  ? 'bg-purple-100 text-purple-900 border-purple-300'
                  : 'bg-white text-[#464555] border-[#c7c4d8]/60 hover:bg-[#eaedff]'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">auto_fix_high</span>
              <span>{enhancedColors ? 'Auto-Enhanced' : 'Enhance Lighting'}</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {photos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setHeroPhoto(photo.id)}
                className={`relative rounded-2xl overflow-hidden aspect-4/3 group cursor-pointer border-2 transition-all ${
                  photo.isHero ? 'border-[#3525cd] ring-4 ring-[#3525cd]/20' : 'border-transparent'
                }`}
              >
                <img
                  src={photo.url}
                  alt={photo.name}
                  className={`w-full h-full object-cover transition-all ${
                    enhancedColors ? 'contrast-105 saturate-110' : ''
                  }`}
                />
                {photo.isHero && (
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#3525cd] text-white text-[10px] font-bold shadow-xs">
                    Primary Broadcast
                  </span>
                )}
                <button
                  onClick={(e) => removePhoto(photo.id, e)}
                  className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 hover:bg-rose-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  title="Remove photo"
                >
                  <span className="material-symbols-outlined text-[14px]">close</span>
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* GEMINI AI CAPTION SUGGESTIONS & REWRITE STUDIO */}
      <section className="bg-linear-to-br from-[#eaedff]/60 via-white to-[#f2f3ff]/70 rounded-3xl border border-[#3525cd]/25 p-6 md:p-8 shadow-xs space-y-6">
        {/* Studio Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#3525cd]/15">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-linear-to-tr from-[#3525cd] to-[#6366f1] text-white flex items-center justify-center shadow-md shadow-[#3525cd]/30">
              <span className="material-symbols-outlined text-[22px] animate-pulse">
                auto_awesome
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-[#131b2e]">
                  Gemini AI Multimodal Caption Studio
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-[#3525cd] text-white text-[10px] font-extrabold uppercase tracking-wider">
                  Gemini 3.8 Flash
                </span>
              </div>
              <p className="text-xs text-[#464555]">
                Analyzes image visuals &amp; event metadata to rewrite captions across funny, professional, policy, and viral styles.
              </p>
            </div>
          </div>

          <button
            onClick={() => fetchGeminiSuggestions()}
            disabled={isGeneratingAI}
            className="px-5 py-2.5 rounded-full bg-[#3525cd] hover:bg-[#4f46e5] text-white text-xs font-bold shadow-md shadow-[#3525cd]/25 flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50 self-start sm:self-auto"
          >
            <span className={`material-symbols-outlined text-[16px] ${isGeneratingAI ? 'animate-spin' : ''}`}>
              refresh
            </span>
            <span>{isGeneratingAI ? 'Generating with Gemini...' : 'Analyze & Regenerate'}</span>
          </button>
        </div>

        {/* Quick Tone Rewrite Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-bold text-[#131b2e] mr-1">Rewrite Tone:</span>
            <button
              onClick={() => handleQuickRewrite('funny')}
              disabled={isGeneratingAI}
              className="px-3 py-1.5 rounded-full bg-white hover:bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
            >
              <span>😂 Funny &amp; Witty</span>
            </button>
            <button
              onClick={() => handleQuickRewrite('professional')}
              disabled={isGeneratingAI}
              className="px-3 py-1.5 rounded-full bg-white hover:bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
            >
              <span>💼 Professional</span>
            </button>
            <button
              onClick={() => handleQuickRewrite('policy')}
              disabled={isGeneratingAI}
              className="px-3 py-1.5 rounded-full bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
            >
              <span>🏛️ Formal / Policy</span>
            </button>
            <button
              onClick={() => handleQuickRewrite('hype')}
              disabled={isGeneratingAI}
              className="px-3 py-1.5 rounded-full bg-white hover:bg-purple-50 border border-purple-200 text-purple-900 text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
            >
              <span>⚡ Viral Hype</span>
            </button>
          </div>

          {/* Filter Suggestions */}
          <div className="flex items-center gap-1 text-xs">
            <span className="text-[#777587] font-semibold">Filter:</span>
            <button
              onClick={() => setAiFilterTone('all')}
              className={`px-2.5 py-1 rounded-full font-bold cursor-pointer transition-colors ${
                aiFilterTone === 'all'
                  ? 'bg-[#3525cd] text-white'
                  : 'text-[#464555] hover:bg-[#eaedff]'
              }`}
            >
              All (4)
            </button>
            <button
              onClick={() => setAiFilterTone('funny')}
              className={`px-2.5 py-1 rounded-full font-bold cursor-pointer transition-colors ${
                aiFilterTone === 'funny'
                  ? 'bg-amber-500 text-white'
                  : 'text-[#464555] hover:bg-[#eaedff]'
              }`}
            >
              Funny
            </button>
            <button
              onClick={() => setAiFilterTone('professional')}
              className={`px-2.5 py-1 rounded-full font-bold cursor-pointer transition-colors ${
                aiFilterTone === 'professional'
                  ? 'bg-blue-600 text-white'
                  : 'text-[#464555] hover:bg-[#eaedff]'
              }`}
            >
              Professional
            </button>
            <button
              onClick={() => setAiFilterTone('policy')}
              className={`px-2.5 py-1 rounded-full font-bold cursor-pointer transition-colors ${
                aiFilterTone === 'policy'
                  ? 'bg-slate-700 text-white'
                  : 'text-[#464555] hover:bg-[#eaedff]'
              }`}
            >
              Policy
            </button>
          </div>
        </div>

        {/* Suggestion Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayedSuggestions.map((suggestion) => (
            <div
              key={suggestion.tone}
              className={`p-4 rounded-2xl border transition-all flex flex-col justify-between gap-3 bg-white ${
                suggestion.tone === 'funny'
                  ? 'hover:border-amber-400 hover:shadow-amber-100/50'
                  : suggestion.tone === 'professional'
                  ? 'hover:border-blue-400 hover:shadow-blue-100/50'
                  : suggestion.tone === 'policy'
                  ? 'hover:border-slate-500 hover:shadow-slate-100/50'
                  : 'hover:border-purple-400 hover:shadow-purple-100/50'
              } border-[#c7c4d8]/50 shadow-xs`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className={`text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                      suggestion.tone === 'funny'
                        ? 'bg-amber-100 text-amber-900'
                        : suggestion.tone === 'professional'
                        ? 'bg-blue-100 text-blue-900'
                        : suggestion.tone === 'policy'
                        ? 'bg-slate-100 text-slate-800'
                        : 'bg-purple-100 text-purple-900'
                    }`}
                  >
                    {suggestion.title}
                  </span>
                  <span className="text-[10px] text-[#777587] font-semibold">
                    {suggestion.caption.length} chars
                  </span>
                </div>
                <p className="text-[11px] text-[#777587] italic mb-2">
                  {suggestion.pitch}
                </p>
                <p className="text-xs text-[#131b2e] leading-relaxed font-medium bg-[#faf8ff] p-3 rounded-xl border border-[#c7c4d8]/30">
                  {suggestion.caption}
                </p>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-[#c7c4d8]/20">
                <span className="text-[10px] text-emerald-700 font-bold">
                  ✓ Verified Event Tags
                </span>
                <button
                  type="button"
                  onClick={() => handleApplySuggestion(suggestion)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    appliedTone === suggestion.tone
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#3525cd] hover:bg-[#4f46e5] text-white shadow-xs'
                  }`}
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {appliedTone === suggestion.tone ? 'check' : 'content_copy'}
                  </span>
                  <span>{appliedTone === suggestion.tone ? 'Applied!' : 'Use this Caption'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Metadata Configuration (Location, Hashtags, Mentions) */}
      <section className="bg-white rounded-3xl border border-[#c7c4d8]/40 p-6 shadow-xs space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Location Geotag */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#464555] mb-1.5 flex items-center justify-between">
                <span>📍 Verified Location Geotag</span>
                <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                  GPS Confirmed
                </span>
              </label>
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#f2f3ff] border border-[#c7c4d8]/40">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="material-symbols-outlined text-[20px] text-[#3525cd]">
                    location_on
                  </span>
                  {isEditingLocation ? (
                    <input
                      type="text"
                      value={locationText}
                      onChange={(e) => setLocationText(e.target.value)}
                      className="text-xs md:text-sm font-bold text-[#131b2e] bg-white border border-[#3525cd] rounded px-2 py-0.5 outline-none w-full"
                    />
                  ) : (
                    <span className="text-xs md:text-sm font-bold text-[#131b2e] truncate">
                      {locationText}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setIsEditingLocation(!isEditingLocation)}
                  className="text-xs font-bold text-[#3525cd] hover:underline cursor-pointer ml-2"
                >
                  {isEditingLocation ? 'Save' : 'Edit'}
                </button>
              </div>
            </div>

            {/* Timestamp */}
            <div>
              <label className="block text-xs font-semibold text-[#464555] mb-1.5">
                <span>📅 Capture Timestamp</span>
              </label>
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#f2f3ff] border border-[#c7c4d8]/40">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[20px] text-[#464555]">
                    schedule
                  </span>
                  <span className="text-xs md:text-sm font-bold text-[#131b2e]">
                    18 Oct 2026 • Live (Keynote Session 02)
                  </span>
                </div>
                <span className="text-xs font-bold px-2 py-0.5 bg-[#dae2fd] rounded text-[#464555]">
                  Real-Time
                </span>
              </div>
            </div>
          </div>

          {/* Hashtags & Mentions */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#464555] mb-1.5 flex items-center justify-between">
                <span>#️⃣ Official Event Hashtags</span>
                <span className="text-xs text-[#777587]">Syndicated across 4 networks</span>
              </label>
              <div className="flex flex-wrap items-center gap-2 p-2.5 rounded-xl bg-[#f2f3ff] border border-[#c7c4d8]/40 min-h-[50px]">
                {hashtags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white border border-[#c7c4d8]/60 text-xs font-bold text-[#3525cd] shadow-2xs"
                  >
                    <span>{tag}</span>
                    <button
                      onClick={() => setHashtags(hashtags.filter((t) => t !== tag))}
                      className="hover:text-[#ba1a1a] transition-colors flex items-center cursor-pointer"
                      title="Remove hashtag"
                    >
                      <span className="material-symbols-outlined text-[14px]">close</span>
                    </button>
                  </span>
                ))}

                {isAddingTag ? (
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        if (newTag.trim()) {
                          const formatted = newTag.startsWith('#') ? newTag : `#${newTag}`;
                          setHashtags([...hashtags, formatted]);
                          setNewTag('');
                          setIsAddingTag(false);
                        }
                      }
                    }}
                    onBlur={() => setIsAddingTag(false)}
                    autoFocus
                    placeholder="#tag"
                    className="px-2 py-0.5 text-xs border border-[#3525cd] rounded-full bg-white w-24"
                  />
                ) : (
                  <button
                    onClick={() => setIsAddingTag(true)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-dashed border-[#777587] text-[#464555] hover:text-[#3525cd] hover:border-[#3525cd] text-xs font-bold transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[14px]">add</span>
                    <span>Add Tag</span>
                  </button>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#464555] mb-1.5 flex items-center justify-between">
                <span>👤 Verified Organizers &amp; Partners</span>
                <span className="text-xs text-[#777587]">Host handles linked</span>
              </label>
              <div className="flex flex-wrap items-center gap-2 p-2.5 rounded-xl bg-[#f2f3ff] border border-[#c7c4d8]/40 min-h-[50px]">
                {mentions.map((mention) => (
                  <span
                    key={mention}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#c7c4d8]/60 text-xs text-[#131b2e] font-bold shadow-2xs"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#3525cd]"></span>
                    <span>{mention}</span>
                    <button
                      onClick={() => setMentions(mentions.filter((m) => m !== mention))}
                      className="hover:text-[#ba1a1a] transition-colors flex items-center cursor-pointer"
                      title="Remove mention"
                    >
                      <span className="material-symbols-outlined text-[14px]">close</span>
                    </button>
                  </span>
                ))}

                {isAddingMention ? (
                  <input
                    type="text"
                    value={newMention}
                    onChange={(e) => setNewMention(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        if (newMention.trim()) {
                          const formatted = newMention.startsWith('@') ? newMention : `@${newMention}`;
                          setMentions([...mentions, formatted]);
                          setNewMention('');
                          setIsAddingMention(false);
                        }
                      }
                    }}
                    onBlur={() => setIsAddingMention(false)}
                    autoFocus
                    placeholder="@handle"
                    className="px-2 py-0.5 text-xs border border-[#3525cd] rounded-full bg-white w-24"
                  />
                ) : (
                  <button
                    onClick={() => setIsAddingMention(true)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-dashed border-[#777587] text-[#464555] hover:text-[#3525cd] hover:border-[#3525cd] text-xs font-bold transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[14px]">add</span>
                    <span>Add Mention</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Final Caption Editor Box */}
        <div className="pt-4 border-t border-[#c7c4d8]/20">
          <div className="flex items-center justify-between mb-2">
            <label
              htmlFor="caption-input"
              className="text-xs md:text-sm font-bold text-[#131b2e] flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px] text-[#3525cd]">
                edit_note
              </span>
              <span>Active Broadcast Caption (Pre-formatted with Event Metadata)</span>
            </label>
            <span
              className={`text-xs font-semibold ${
                caption.length > 280 ? 'text-rose-600 font-bold' : 'text-[#464555]'
              }`}
            >
              {caption.length} / 280 characters
            </span>
          </div>

          <div className="relative rounded-2xl border border-[#c7c4d8]/60 bg-[#faf8ff] focus-within:border-[#3525cd] focus-within:ring-2 focus-within:ring-[#3525cd]/20 transition-all p-3.5">
            <textarea
              id="caption-input"
              rows={3}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full bg-transparent border-0 p-0 text-xs md:text-sm text-[#131b2e] focus:ring-0 resize-none outline-none leading-relaxed font-medium"
              placeholder="Write or use a Gemini AI suggestion above..."
            />

            <div className="flex flex-wrap items-center justify-between pt-2.5 border-t border-[#c7c4d8]/20 text-xs">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={addEmoji}
                  className="hover:text-[#3525cd] transition-colors flex items-center gap-1 font-bold text-[#464555] cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">mood</span>
                  <span>Add Emoji</span>
                </button>
                <button
                  type="button"
                  onClick={() => fetchGeminiSuggestions()}
                  disabled={isGeneratingAI}
                  className="hover:text-[#3525cd] text-[#4f46e5] transition-colors flex items-center gap-1 font-bold cursor-pointer"
                >
                  <span
                    className={`material-symbols-outlined text-[16px] ${
                      isGeneratingAI ? 'animate-spin' : ''
                    }`}
                  >
                    auto_awesome
                  </span>
                  <span>{isGeneratingAI ? 'Analyzing...' : 'Rephrase with Gemini AI'}</span>
                </button>
              </div>

              <span className="text-[11px] text-emerald-700 font-bold mt-1 sm:mt-0">
                ✓ Ready for cross-channel syndication
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Primary Flow CTA Section */}
      <section className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2 mb-8">
        <div className="flex items-center gap-3 text-[#464555]">
          <span className="material-symbols-outlined text-emerald-600 text-[22px]">shield</span>
          <div className="text-xs">
            <span className="font-bold text-[#131b2e]">Auto-moderation active: </span>
            <span>Content will be reviewed against Summit broadcast safety rules.</span>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={onSaveDraft}
            className="h-11 px-6 rounded-full border border-[#c7c4d8]/60 hover:bg-[#f2f3ff] text-[#131b2e] text-xs md:text-sm font-bold shadow-2xs transition-all w-full sm:w-auto text-center cursor-pointer"
          >
            Save Draft
          </button>
          <button
            type="button"
            onClick={() => onContinueToSyndication(caption, photos)}
            className="h-12 px-8 rounded-full bg-[#3525cd] hover:bg-[#4f46e5] text-white text-xs md:text-sm font-bold shadow-md shadow-[#3525cd]/25 hover:shadow-lg transition-all flex items-center justify-center gap-3 w-full sm:w-auto active:scale-98 group cursor-pointer"
          >
            <span>Continue to Social Selection</span>
            <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </button>
        </div>
      </section>
    </div>
  );
};
