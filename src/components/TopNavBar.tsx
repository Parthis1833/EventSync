import React from 'react';
import { UserRole } from '../types';
import { USER_PLANNER, USER_ATTENDER } from '../data/mockData';

interface TopNavBarProps {
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenNotifications: () => void;
  onOpenHelp: () => void;
  onOpenProfile: () => void;
  eventContextTitle?: string;
  unreadCount?: number;
}

export const TopNavBar: React.FC<TopNavBarProps> = ({
  currentRole,
  setCurrentRole,
  searchQuery,
  setSearchQuery,
  onOpenNotifications,
  onOpenHelp,
  onOpenProfile,
  eventContextTitle,
  unreadCount = 2,
}) => {
  const user = currentRole === 'planner' ? USER_PLANNER : USER_ATTENDER;

  return (
    <header className="h-16 w-full sticky top-0 z-40 border-b border-[#c7c4d8]/30 bg-[#faf8ff]/85 backdrop-blur-md px-6 md:px-8 flex justify-between items-center shadow-xs">
      {/* Brand Anchor (visible when sidebar is hidden in attender mode) */}
      <div className="flex items-center gap-4 md:gap-6 flex-1 max-w-2xl">
        {currentRole === 'attender' && (
          <div
            onClick={() => setCurrentRole('attender')}
            className="flex items-center gap-2.5 shrink-0 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-[#3525cd] flex items-center justify-center text-white shadow-sm shadow-[#3525cd]/20">
              <span className="material-symbols-outlined text-[20px]">hub</span>
            </div>
            <span className="font-bold text-xl text-[#131b2e] tracking-tight">EventSync</span>
          </div>
        )}

        {/* Search Bar */}
        <div className="relative w-full max-w-md">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#777587] text-[18px]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 md:h-10 bg-white border border-[#c7c4d8]/50 rounded-full pl-10 pr-4 text-sm text-[#131b2e] placeholder:text-[#777587] focus:outline-none focus:border-[#3525cd] focus:ring-2 focus:ring-[#3525cd]/20 transition-all shadow-2xs"
            placeholder={
              currentRole === 'planner'
                ? 'Search events, campaigns, syndication logs...'
                : 'Search events, locations, or organizers...'
            }
          />
        </div>

        {/* Optional event context tag */}
        {eventContextTitle && (
          <div className="hidden 2xl:flex items-center gap-2 px-3 py-1 rounded-full bg-[#eaedff] border border-[#c7c4d8]/40">
            <span className="w-2 h-2 rounded-full bg-[#3525cd] animate-pulse"></span>
            <span className="text-xs font-semibold text-[#131b2e]">{eventContextTitle}</span>
          </div>
        )}
      </div>

      {/* Right Header Cluster */}
      <div className="flex items-center gap-3 md:gap-4 shrink-0">
        {/* Welcome Message & Role Switcher */}
        <div className="flex items-center gap-3 border-r border-[#c7c4d8]/30 pr-3 md:pr-4">
          {currentRole === 'planner' && (
            <div className="text-right hidden xl:block">
              <span className="text-xs font-bold text-[#131b2e] block leading-tight">
                Welcome back, Parthish
              </span>
              <span className="text-[11px] text-[#464555] block leading-tight">
                Enterprise Admin Workspace
              </span>
            </div>
          )}

          {/* Interactive Role Switcher Pill */}
          <div className="bg-[#e2e7ff]/80 p-1 rounded-full flex items-center border border-[#c7c4d8]/30 shadow-inner">
            <button
              onClick={() => setCurrentRole('planner')}
              className={`px-3 md:px-3.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                currentRole === 'planner'
                  ? 'bg-[#3525cd] text-white shadow-xs'
                  : 'text-[#464555] hover:text-[#131b2e]'
              }`}
            >
              {currentRole === 'planner' && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              )}
              <span>Planner View</span>
            </button>
            <button
              onClick={() => setCurrentRole('attender')}
              className={`px-3 md:px-3.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                currentRole === 'attender'
                  ? 'bg-white text-[#3525cd] shadow-xs'
                  : 'text-[#464555] hover:text-[#131b2e]'
              }`}
            >
              {currentRole === 'attender' && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              )}
              <span>Attender View</span>
            </button>
          </div>
        </div>

        {/* Trailing Action Icons */}
        <div className="flex items-center gap-1">
          <button
            onClick={onOpenNotifications}
            aria-label="Notifications"
            className="relative p-2 rounded-full hover:bg-[#e2e7ff]/60 text-[#464555] hover:text-[#131b2e] transition-colors cursor-pointer"
            title="Notifications"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#ba1a1a] rounded-full ring-2 ring-white"></span>
            )}
          </button>
          <button
            onClick={onOpenHelp}
            aria-label="Help"
            className="p-2 rounded-full hover:bg-[#e2e7ff]/60 text-[#464555] hover:text-[#131b2e] transition-colors cursor-pointer"
            title="Help"
          >
            <span className="material-symbols-outlined text-[20px]">help</span>
          </button>
        </div>

        {/* Profile Avatar & Details */}
        <div
          onClick={onOpenProfile}
          className="flex items-center gap-2.5 pl-1 cursor-pointer group"
          title="Account Authentication & Profile"
        >
          <div className="relative">
            <img
              className="w-9 h-9 rounded-full object-cover ring-2 ring-[#3525cd]/20 group-hover:ring-[#3525cd] shadow-xs transition-all"
              src={user.avatar}
              alt={user.name}
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
          </div>
          <div className="hidden lg:flex flex-col text-left">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-[#131b2e] leading-tight group-hover:text-[#3525cd] transition-colors">
                {user.name}
              </span>
              <span className="px-1.5 py-0.2 rounded text-[9px] font-extrabold bg-emerald-100 text-emerald-800">
                SSO
              </span>
            </div>
            <span className="text-[11px] text-[#464555] leading-tight flex items-center gap-1">
              {user.role}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
