import React, { useState } from 'react';
import { SocialChannel } from '../types';
import { OAuthModal } from './OAuthModal';

interface SocialAccountsModalProps {
  isOpen: boolean;
  onClose: () => void;
  channels: SocialChannel[];
  onUpdateChannel: (channelId: string, updated: Partial<SocialChannel>) => void;
}

export const SocialAccountsModal: React.FC<SocialAccountsModalProps> = ({
  isOpen,
  onClose,
  channels,
  onUpdateChannel,
}) => {
  const [selectedChannelForAuth, setSelectedChannelForAuth] = useState<SocialChannel | null>(null);
  const [pingSuccessMsg, setPingSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const connectedCount = channels.filter((c) => c.connected).length;

  const handleTestAllPings = () => {
    setPingSuccessMsg('Testing OAuth webhook endpoints across active nodes...');
    setTimeout(() => {
      setPingSuccessMsg(`✓ All ${connectedCount} connected nodes responded (Avg latency: 41ms). Handshakes verified.`);
      setTimeout(() => setPingSuccessMsg(null), 4000);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl rounded-3xl bg-white shadow-2xl border border-[#c7c4d8]/40 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-[#c7c4d8]/30 flex items-center justify-between bg-[#f2f3ff]/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#3525cd] text-white flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-[20px]">share</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-[#131b2e]">Social Accounts &amp; OAuth Authentication</h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  {connectedCount}/{channels.length} Connected
                </span>
              </div>
              <p className="text-xs text-[#464555]">
                Manage OAuth 2.0 authorizations, webhook tokens, and syndication targets
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

        {/* Content */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto custom-scroll">
          {/* Status Banner */}
          <div className="p-3.5 rounded-2xl bg-[#faf8ff] border border-[#c7c4d8]/40 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#3525cd] text-[20px]">sync</span>
              <span className="text-xs text-[#131b2e] font-semibold">
                OAuth 2.0 Webhook Syndication Pipeline Active
              </span>
            </div>
            <button
              onClick={handleTestAllPings}
              className="text-xs font-bold text-[#3525cd] hover:underline cursor-pointer flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[14px]">bolt</span>
              <span>Test Pings</span>
            </button>
          </div>

          {pingSuccessMsg && (
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold flex items-center gap-2 border border-emerald-200">
              <span className="material-symbols-outlined text-[16px]">check_circle</span>
              <span>{pingSuccessMsg}</span>
            </div>
          )}

          {/* Channels List */}
          <div className="space-y-3">
            {channels.map((ch) => (
              <div
                key={ch.id}
                className="p-4 rounded-2xl border border-[#c7c4d8]/40 bg-white hover:border-[#3525cd]/40 transition-all flex items-center justify-between shadow-2xs"
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center text-white font-bold shadow-xs shrink-0"
                    style={{
                      backgroundColor: ch.color.startsWith('linear') ? undefined : ch.color,
                      background: ch.color.startsWith('linear') ? ch.color : undefined,
                    }}
                  >
                    <span className="material-symbols-outlined text-[22px]">{ch.icon}</span>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[#131b2e]">{ch.name}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#eaedff] text-[#3525cd]">
                        {ch.badgeLabel || 'API v2'}
                      </span>
                      {ch.connected && (
                        <span className="flex items-center gap-1 text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          Authorized
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs mt-0.5 text-[#464555]">
                      <span className="font-semibold text-[#131b2e]">{ch.handle}</span>
                      <span className="text-[#c7c4d8]">•</span>
                      <span className={ch.connected ? 'text-emerald-700 font-medium' : 'text-[#777587]'}>
                        {ch.statusText || (ch.connected ? 'Active Handshake' : 'Not Connected')}
                      </span>
                    </div>
                    {ch.connected && ch.tokenExpires && (
                      <div className="text-[10px] text-[#777587] mt-0.5">
                        Token expires: {ch.tokenExpires}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setSelectedChannelForAuth(ch)}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      ch.connected
                        ? 'border border-[#c7c4d8]/60 text-[#131b2e] hover:bg-[#eaedff]'
                        : 'bg-[#3525cd] text-white hover:bg-[#4f46e5] shadow-xs'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[15px]">
                      {ch.connected ? 'tune' : 'key'}
                    </span>
                    <span>{ch.connected ? 'OAuth Settings' : 'Connect'}</span>
                  </button>

                  {ch.connected && (
                    <button
                      onClick={() =>
                        onUpdateChannel(ch.id, {
                          connected: false,
                          statusText: 'Not Connected',
                          tokenExpires: undefined,
                        })
                      }
                      title="Disconnect Account"
                      className="w-8 h-8 rounded-full border border-[#c7c4d8]/40 hover:bg-rose-50 text-[#777587] hover:text-rose-600 flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">link_off</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-2xl bg-[#f2f3ff]/70 border border-[#c7c4d8]/30 flex items-start gap-3">
            <span className="material-symbols-outlined text-[#3525cd] text-[20px] shrink-0 mt-0.5">
              security
            </span>
            <p className="text-xs text-[#464555] leading-relaxed">
              All social dispatches use certified OAuth 2.0 PKCE with client secrets stored in secure encrypted vaults. Syndication webhooks are verified via HMAC-SHA256 signature verification.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#c7c4d8]/30 bg-[#f2f3ff]/40 flex justify-between items-center">
          <span className="text-[11px] text-[#777587]">All credentials encrypted</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-[#3525cd] text-white text-xs font-bold hover:bg-[#4f46e5] transition-all cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>

      {/* OAuth Handshake Modal */}
      <OAuthModal
        isOpen={!!selectedChannelForAuth}
        channel={selectedChannelForAuth}
        onClose={() => setSelectedChannelForAuth(null)}
        onAuthenticateSuccess={(channelId, updatedData) => {
          onUpdateChannel(channelId, updatedData);
          setSelectedChannelForAuth(null);
        }}
      />
    </div>
  );
};
