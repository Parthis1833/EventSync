import React from 'react';
import { PlannerTab } from '../types';

interface SidebarProps {
  activeTab: PlannerTab;
  setActiveTab: (tab: PlannerTab) => void;
  onBroadcastLive: () => void;
  onOpenHelp: () => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  onBroadcastLive,
  onOpenHelp,
  onLogout,
}) => {
  return (
    <aside className="h-screen w-64 flex flex-col fixed left-0 top-0 border-r border-[#c7c4d8]/30 bg-white shadow-sm z-50">
      <div className="p-5 flex flex-col justify-between h-full shrink-0">
        {/* Top Brand Section */}
        <div className="flex flex-col space-y-6">
          <div className="flex items-center gap-3 px-1">
            <div className="w-10 h-10 rounded-xl bg-[#3525cd] text-white flex items-center justify-center shadow-md shadow-[#3525cd]/25">
              <span className="material-symbols-outlined text-[24px]">hub</span>
            </div>
            <div>
              <span className="font-bold text-[22px] text-[#3525cd] tracking-tight block leading-tight">
                EventSync
              </span>
              <span className="text-[11px] font-semibold text-[#464555] block -mt-0.5">
                Automated Social Syndication
              </span>
            </div>
          </div>

          {/* Broadcast Live Button */}
          <button
            onClick={onBroadcastLive}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-[#4f46e5] hover:bg-[#3525cd] text-white font-semibold text-sm shadow-md shadow-[#4f46e5]/25 active:scale-[0.98] transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px] animate-pulse">cell_tower</span>
            <span>Broadcast Live</span>
          </button>

          {/* Navigation Links */}
          <nav className="flex flex-col space-y-1 mt-1">
            {/* Dashboard / My Events */}
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-[#3525cd] text-white shadow-sm'
                  : 'text-[#464555] hover:text-[#131b2e] hover:bg-[#eaedff]'
              }`}
            >
              <span
                className="material-symbols-outlined text-[20px]"
                style={
                  activeTab === 'dashboard'
                    ? { fontVariationSettings: "'FILL' 1" }
                    : undefined
                }
              >
                dashboard
              </span>
              <span>Dashboard</span>
            </button>

            {/* My Events */}
            <button
              onClick={() => setActiveTab('my-events')}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'my-events'
                  ? 'bg-[#3525cd] text-white shadow-sm'
                  : 'text-[#464555] hover:text-[#131b2e] hover:bg-[#eaedff]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">event</span>
              <span>My Events</span>
            </button>

            {/* Create Event */}
            <button
              onClick={() => setActiveTab('create-event')}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'create-event'
                  ? 'bg-[#3525cd] text-white shadow-sm'
                  : 'text-[#464555] hover:text-[#131b2e] hover:bg-[#eaedff]'
              }`}
            >
              <span
                className="material-symbols-outlined text-[20px]"
                style={activeTab === 'create-event' ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                add_circle
              </span>
              <span>Create Event</span>
            </button>

            {/* Social Accounts */}
            <button
              onClick={() => setActiveTab('social-accounts')}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'social-accounts'
                  ? 'bg-[#3525cd] text-white shadow-sm'
                  : 'text-[#464555] hover:text-[#131b2e] hover:bg-[#eaedff]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">share</span>
              <span>Social Accounts</span>
            </button>

            {/* Analytics */}
            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'analytics'
                  ? 'bg-[#3525cd] text-white shadow-sm'
                  : 'text-[#464555] hover:text-[#131b2e] hover:bg-[#eaedff]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">monitoring</span>
              <span>Analytics</span>
            </button>

            {/* Settings */}
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-[#3525cd] text-white shadow-sm'
                  : 'text-[#464555] hover:text-[#131b2e] hover:bg-[#eaedff]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">settings</span>
              <span>Settings</span>
            </button>
          </nav>
        </div>

        {/* Footer Tab Links */}
        <div className="border-t border-[#c7c4d8]/30 pt-4 flex flex-col space-y-1">
          <button
            onClick={onOpenHelp}
            className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-left text-sm font-medium text-[#464555] hover:text-[#131b2e] hover:bg-[#eaedff] transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">help</span>
            <span>Help & Support</span>
          </button>
          <button
            onClick={onLogout}
            className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-left text-sm font-medium text-[#ba1a1a] hover:bg-[#ffdad6]/40 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
