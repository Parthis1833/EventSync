import React from 'react';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: '1',
      title: 'Automated Blast Completed',
      desc: 'Tech Summit 2026 Keynote Session 01 moment was syndicated to 3 platforms.',
      time: '3m ago',
      unread: true,
      icon: 'send_time_extension',
      color: 'text-[#3525cd]',
    },
    {
      id: '2',
      title: 'Attendee Geotag Match',
      desc: '4,280 attendees verified inside Moscone Center perimeter.',
      time: '28m ago',
      unread: true,
      icon: 'pin_drop',
      color: 'text-emerald-600',
    },
    {
      id: '3',
      title: 'OAuth Node Refreshed',
      desc: 'Instagram Graph API access token renewed with 60-day longevity.',
      time: '2h ago',
      unread: false,
      icon: 'sync',
      color: 'text-[#4648d4]',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl border border-[#c7c4d8]/40 overflow-hidden flex flex-col">
        <div className="p-4 px-5 border-b border-[#c7c4d8]/30 flex items-center justify-between bg-[#f2f3ff]/60">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#3525cd] text-[20px]">notifications</span>
            <h3 className="text-sm font-bold text-[#131b2e]">Notifications</h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full hover:bg-[#eaedff] flex items-center justify-center text-[#777587] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="p-4 space-y-3 max-h-96 overflow-y-auto custom-scroll">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-3 rounded-xl border transition-all flex items-start gap-3 ${
                n.unread
                  ? 'bg-[#faf8ff] border-[#3525cd]/30 shadow-2xs'
                  : 'bg-white border-[#c7c4d8]/30 opacity-75'
              }`}
            >
              <span className={`material-symbols-outlined text-[20px] ${n.color} mt-0.5`}>
                {n.icon}
              </span>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-[#131b2e]">{n.title}</h4>
                  <span className="text-[10px] text-[#777587]">{n.time}</span>
                </div>
                <p className="text-xs text-[#464555] mt-0.5 leading-relaxed">{n.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 border-t border-[#c7c4d8]/30 bg-[#f2f3ff]/40 flex justify-between items-center text-xs">
          <button className="text-[#3525cd] font-bold hover:underline cursor-pointer">
            Mark all read
          </button>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-full bg-[#3525cd] text-white font-bold hover:bg-[#4f46e5] cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
