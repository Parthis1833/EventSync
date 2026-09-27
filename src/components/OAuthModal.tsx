import React, { useState } from 'react';
import { SocialChannel } from '../types';

interface OAuthModalProps {
  isOpen: boolean;
  channel: SocialChannel | null;
  onClose: () => void;
  onAuthenticateSuccess: (channelId: string, updatedData: Partial<SocialChannel>) => void;
}

export const OAuthModal: React.FC<OAuthModalProps> = ({
  isOpen,
  channel,
  onClose,
  onAuthenticateSuccess,
}) => {
  const [step, setStep] = useState<'consent' | 'authorizing' | 'success'>('consent');
  const [selectedHandle, setSelectedHandle] = useState('');
  const [pingStatus, setPingStatus] = useState<string | null>(null);

  React.useEffect(() => {
    if (channel) {
      setSelectedHandle(channel.handle);
      setStep(channel.connected ? 'success' : 'consent');
      setPingStatus(null);
    }
  }, [channel, isOpen]);

  if (!isOpen || !channel) return null;

  const scopesMap: Record<string, string[]> = {
    ig: ['instagram_basic', 'instagram_content_publish', 'pages_read_engagement'],
    fb: ['pages_manage_posts', 'pages_read_user_content', 'publish_to_groups'],
    x: ['tweet.read', 'tweet.write', 'users.read', 'offline.access'],
    li: ['w_member_social', 'openid', 'profile', 'email'],
  };

  const currentScopes = scopesMap[channel.id] || ['read', 'write'];

  const handleStartAuth = () => {
    setStep('authorizing');
    setTimeout(() => {
      setStep('success');
      onAuthenticateSuccess(channel.id, {
        connected: true,
        handle: selectedHandle || channel.handle,
        statusText: 'OAuth 2.0 Webhook Active',
        tokenExpires: '27 Nov 2026 (60 days)',
        webhookUrl: `https://api.eventsync.io/v1/webhooks/${channel.id}`,
        lastPingMs: 42,
      });
    }, 1200);
  };

  const handleTestPing = () => {
    setPingStatus('Pinging endpoint...');
    setTimeout(() => {
      setPingStatus('200 OK — Webhook handshake verified (38ms latency)');
    }, 500);
  };

  const handleDisconnect = () => {
    onAuthenticateSuccess(channel.id, {
      connected: false,
      statusText: 'Not Connected',
      tokenExpires: undefined,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg rounded-3xl bg-white shadow-2xl border border-[#c7c4d8]/40 overflow-hidden flex flex-col">
        {/* Modal Top Bar */}
        <div className="p-5 border-b border-[#c7c4d8]/30 flex items-center justify-between bg-[#f2f3ff]/60">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm"
              style={{
                backgroundColor: channel.color.startsWith('linear') ? undefined : channel.color,
                background: channel.color.startsWith('linear') ? channel.color : undefined,
              }}
            >
              <span className="material-symbols-outlined text-[20px]">{channel.icon}</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-[#131b2e]">
                {channel.name} OAuth 2.0 Authentication
              </h3>
              <p className="text-xs text-[#464555]">Secure API handshake &amp; broadcast permissions</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-[#eaedff] flex items-center justify-center text-[#777587] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          {step === 'consent' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#faf8ff] border border-[#c7c4d8]/40 space-y-3">
                <div className="flex items-center justify-between text-xs text-[#464555]">
                  <span>Requesting Application:</span>
                  <strong className="text-[#131b2e]">EventSync Broadcast Node v4.12</strong>
                </div>
                <div className="flex items-center justify-between text-xs text-[#464555]">
                  <span>OAuth Provider:</span>
                  <strong className="text-[#131b2e]">{channel.name} Developer Platform</strong>
                </div>

                <div className="pt-2 border-t border-[#c7c4d8]/20">
                  <span className="text-xs font-bold text-[#131b2e] block mb-1.5">
                    Authorized Permissions (Scopes):
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentScopes.map((scope) => (
                      <span
                        key={scope}
                        className="px-2.5 py-1 rounded-md bg-[#eaedff] text-[#3525cd] text-[11px] font-mono font-bold"
                      >
                        {scope}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#131b2e] mb-1.5">
                  Account Handle / Page ID:
                </label>
                <input
                  type="text"
                  value={selectedHandle}
                  onChange={(e) => setSelectedHandle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#c7c4d8]/60 text-sm font-semibold text-[#131b2e] focus:border-[#3525cd] focus:ring-2 focus:ring-[#3525cd]/20 outline-none bg-[#faf8ff]"
                  placeholder={`e.g. @eventsync_${channel.name.toLowerCase()}`}
                />
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[18px] text-amber-600 shrink-0 mt-0.5">
                  lock
                </span>
                <span>
                  Granting authorization allows EventSync to publish approved photos and syndicated live streams with verified event tags directly to your {channel.name} account.
                </span>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-full border border-[#c7c4d8]/60 text-xs font-bold hover:bg-[#eaedff] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleStartAuth}
                  className="px-6 py-2.5 rounded-full bg-[#3525cd] hover:bg-[#4f46e5] text-white text-xs font-bold shadow-md shadow-[#3525cd]/25 flex items-center gap-2 cursor-pointer active:scale-98"
                >
                  <span className="material-symbols-outlined text-[16px]">verified</span>
                  <span>Authorize &amp; Connect</span>
                </button>
              </div>
            </div>
          )}

          {step === 'authorizing' && (
            <div className="py-12 flex flex-col items-center justify-center gap-4 text-center">
              <div className="w-14 h-14 rounded-full border-4 border-[#3525cd]/20 border-t-[#3525cd] animate-spin"></div>
              <div>
                <h4 className="text-base font-bold text-[#131b2e]">
                  Authenticating with {channel.name}...
                </h4>
                <p className="text-xs text-[#464555] mt-1">
                  Exchanging OAuth authorization code with secure token vault
                </p>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="space-y-4">
              <div className="p-4.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[22px]">check</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-emerald-950">
                    Connection Active &amp; Verified
                  </h4>
                  <p className="text-xs text-emerald-800">
                    Authenticated as <strong>{selectedHandle || channel.handle}</strong>
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#faf8ff] border border-[#c7c4d8]/30 space-y-2.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#777587]">OAuth Token Status:</span>
                  <span className="font-bold text-emerald-700 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Valid (Auto-refresh enabled)
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#777587]">Expires On:</span>
                  <span className="font-semibold text-[#131b2e]">27 Nov 2026 (60 days)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#777587]">Webhook Node:</span>
                  <span className="font-mono text-[11px] text-[#3525cd]">
                    https://api.eventsync.io/v1/webhooks/{channel.id}
                  </span>
                </div>
              </div>

              {pingStatus && (
                <div className="p-3 rounded-xl bg-[#eaedff] border border-[#3525cd]/20 text-xs font-mono text-[#3525cd]">
                  {pingStatus}
                </div>
              )}

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleDisconnect}
                  className="px-4 py-2 rounded-full border border-[#ba1a1a]/40 text-[#ba1a1a] hover:bg-[#ffdad6]/40 text-xs font-bold cursor-pointer"
                >
                  Disconnect Node
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleTestPing}
                    className="px-4 py-2 rounded-full border border-[#c7c4d8]/60 hover:bg-[#eaedff] text-xs font-bold text-[#131b2e] cursor-pointer"
                  >
                    Test Ping
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2 rounded-full bg-[#3525cd] hover:bg-[#4f46e5] text-white text-xs font-bold cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
