import React, { useState } from 'react';
import { UserRole } from '../types';
import { USER_PLANNER, USER_ATTENDER } from '../data/mockData';

interface UserAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentRole: UserRole;
  onSwitchRole: (role: UserRole) => void;
  onOpenSocialAccounts: () => void;
}

export const UserAuthModal: React.FC<UserAuthModalProps> = ({
  isOpen,
  onClose,
  currentRole,
  onSwitchRole,
  onOpenSocialAccounts,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'tokens' | 'sso'>('profile');
  const [ssoRefreshing, setSsoRefreshing] = useState(false);
  const [ssoSuccess, setSsoSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const user = currentRole === 'planner' ? USER_PLANNER : USER_ATTENDER;

  const handleRefreshSSO = () => {
    setSsoRefreshing(true);
    setSsoSuccess(null);
    setTimeout(() => {
      setSsoRefreshing(false);
      setSsoSuccess('Google Enterprise SSO token refreshed. Valid for next 24 hours.');
      setTimeout(() => setSsoSuccess(null), 4000);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg rounded-3xl bg-white shadow-2xl border border-[#c7c4d8]/40 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-[#c7c4d8]/30 flex items-center justify-between bg-[#f2f3ff]/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#3525cd] text-white flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-[20px]">verified_user</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-[#131b2e]">User Authentication &amp; Identity</h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  SSO Active
                </span>
              </div>
              <p className="text-xs text-[#464555]">Enterprise single sign-on &amp; OAuth privileges</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-[#eaedff] flex items-center justify-center text-[#777587] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-[#c7c4d8]/30 px-6 pt-3 gap-6 bg-[#faf8ff]">
          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-3 text-xs font-bold transition-all border-b-2 cursor-pointer ${
              activeTab === 'profile'
                ? 'border-[#3525cd] text-[#3525cd]'
                : 'border-transparent text-[#777587] hover:text-[#131b2e]'
            }`}
          >
            User Profile
          </button>
          <button
            onClick={() => setActiveTab('sso')}
            className={`pb-3 text-xs font-bold transition-all border-b-2 cursor-pointer ${
              activeTab === 'sso'
                ? 'border-[#3525cd] text-[#3525cd]'
                : 'border-transparent text-[#777587] hover:text-[#131b2e]'
            }`}
          >
            Enterprise SSO &amp; Auth
          </button>
          <button
            onClick={() => setActiveTab('tokens')}
            className={`pb-3 text-xs font-bold transition-all border-b-2 cursor-pointer ${
              activeTab === 'tokens'
                ? 'border-[#3525cd] text-[#3525cd]'
                : 'border-transparent text-[#777587] hover:text-[#131b2e]'
            }`}
          >
            API Tokens &amp; Scopes
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto custom-scroll">
          {activeTab === 'profile' && (
            <div className="space-y-4">
              {/* Profile Card */}
              <div className="p-4 rounded-2xl bg-[#faf8ff] border border-[#c7c4d8]/40 flex items-center gap-4">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-16 h-16 rounded-full object-cover ring-4 ring-[#3525cd]/20 shadow-md"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-extrabold text-[#131b2e] truncate">{user.name}</h4>
                    <span className="material-symbols-outlined text-blue-600 text-[18px]">verified</span>
                  </div>
                  <p className="text-xs text-[#464555] font-medium">{user.title}</p>
                  <p className="text-[11px] text-[#777587] mt-0.5">parthisj03@gmail.com</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-[#eaedff] text-[#3525cd] text-[10px] font-bold">
                      {user.role}
                    </span>
                    <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      Active Session
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Role Switcher */}
              <div className="p-4 rounded-2xl bg-white border border-[#c7c4d8]/40 space-y-2">
                <span className="text-xs font-bold text-[#131b2e] block">Switch Active Perspective</span>
                <p className="text-xs text-[#464555]">
                  Toggle between the Organizer / Event Director command center and the Attendee Photo Discovery view.
                </p>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <button
                    onClick={() => {
                      onSwitchRole('planner');
                      onClose();
                    }}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      currentRole === 'planner'
                        ? 'border-[#3525cd] bg-[#eaedff]/60 text-[#3525cd] font-bold'
                        : 'border-[#c7c4d8]/40 hover:bg-[#faf8ff] text-[#464555]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px] block mb-1">dashboard</span>
                    <span className="text-xs font-bold block">Planner View</span>
                    <span className="text-[10px] block opacity-80">Full event orchestration</span>
                  </button>
                  <button
                    onClick={() => {
                      onSwitchRole('attender');
                      onClose();
                    }}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      currentRole === 'attender'
                        ? 'border-[#3525cd] bg-[#eaedff]/60 text-[#3525cd] font-bold'
                        : 'border-[#c7c4d8]/40 hover:bg-[#faf8ff] text-[#464555]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px] block mb-1">camera_outdoor</span>
                    <span className="text-xs font-bold block">Attender View</span>
                    <span className="text-[10px] block opacity-80">Upload photos &amp; blast UGC</span>
                  </button>
                </div>
              </div>

              {/* Social Channels Shortcut */}
              <div className="p-4 rounded-2xl bg-linear-to-r from-[#eaedff] to-[#f2f3ff] border border-[#3525cd]/20 flex items-center justify-between">
                <div>
                  <h5 className="text-xs font-bold text-[#131b2e]">Social Media Connections</h5>
                  <p className="text-[11px] text-[#464555]">Instagram, LinkedIn, X &amp; Facebook OAuth nodes</p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onOpenSocialAccounts();
                  }}
                  className="px-3.5 py-1.5 rounded-full bg-[#3525cd] hover:bg-[#4f46e5] text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  Manage OAuth
                </button>
              </div>
            </div>
          )}

          {activeTab === 'sso' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white border border-[#c7c4d8]/40 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 border border-red-200 flex items-center justify-center font-bold text-xs">
                      G
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#131b2e] block">Google Enterprise SSO</span>
                      <span className="text-[11px] text-[#464555] block">parthisj03@gmail.com</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                    Connected
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-[#faf8ff] border border-[#c7c4d8]/30 space-y-1.5 text-xs text-[#464555]">
                  <div className="flex justify-between">
                    <span>Identity Provider:</span>
                    <strong className="text-[#131b2e]">Google Cloud Identity / Workspace</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Session Status:</span>
                    <span className="text-emerald-700 font-bold">Authenticated (TLS 1.3)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Organization:</span>
                    <strong className="text-[#131b2e]">Enterprise Event Solutions</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Handshake:</span>
                    <span className="text-[#131b2e]">Today, 03:35 AM PDT</span>
                  </div>
                </div>

                {ssoSuccess && (
                  <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold flex items-center gap-2 border border-emerald-200">
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                    <span>{ssoSuccess}</span>
                  </div>
                )}

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={handleRefreshSSO}
                    disabled={ssoRefreshing}
                    className="px-4 py-2 rounded-full border border-[#c7c4d8]/60 text-xs font-bold hover:bg-[#eaedff] text-[#131b2e] flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <span className={`material-symbols-outlined text-[16px] ${ssoRefreshing ? 'animate-spin' : ''}`}>
                      refresh
                    </span>
                    <span>{ssoRefreshing ? 'Refreshing...' : 'Refresh Token'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tokens' && (
            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-[#faf8ff] border border-[#c7c4d8]/40 space-y-2">
                <span className="text-xs font-bold text-[#131b2e] block">Active API Scopes</span>
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2.5 py-1 rounded-md bg-white border border-[#c7c4d8]/40 text-[11px] font-mono font-semibold text-[#3525cd]">
                    events.read_write
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-white border border-[#c7c4d8]/40 text-[11px] font-mono font-semibold text-[#3525cd]">
                    syndication.broadcast
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-white border border-[#c7c4d8]/40 text-[11px] font-mono font-semibold text-[#3525cd]">
                    photos.moderation
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-white border border-[#c7c4d8]/40 text-[11px] font-mono font-semibold text-[#3525cd]">
                    webhooks.manage
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-[#c7c4d8]/40">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-[#131b2e]">Bearer Token Simulation</span>
                  <span className="text-[10px] text-emerald-700 font-bold">256-bit AES</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#131b2e] text-emerald-400 font-mono text-[11px] break-all select-all">
                  es_live_98a72f0bc4d8120e7a884cb9120ac9f712
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#c7c4d8]/30 bg-[#f2f3ff]/40 flex justify-between items-center">
          <span className="text-[11px] text-[#777587]">Signed in as Parthish Joshi</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-[#3525cd] hover:bg-[#4f46e5] text-white text-xs font-bold cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
