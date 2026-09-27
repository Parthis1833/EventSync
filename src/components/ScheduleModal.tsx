import React, { useState } from 'react';
import { EventItem } from '../types';

interface ScheduleModalProps {
  isOpen: boolean;
  event: EventItem | null;
  onClose: () => void;
  onConfirmSchedule: (eventId: string, scheduledDate: string) => void;
}

export const ScheduleModal: React.FC<ScheduleModalProps> = ({
  isOpen,
  event,
  onClose,
  onConfirmSchedule,
}) => {
  const [scheduleDate, setScheduleDate] = useState('2026-10-15');
  const [scheduleTime, setScheduleTime] = useState('10:00');

  if (!isOpen || !event) return null;

  const handleConfirm = () => {
    const formatted = `${scheduleDate} at ${scheduleTime}`;
    onConfirmSchedule(event.id, formatted);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-md rounded-3xl bg-white shadow-2xl border border-[#c7c4d8]/40 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-[#c7c4d8]/30 flex items-center justify-between bg-[#f2f3ff]/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#3525cd] text-white flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[18px]">schedule_send</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-[#131b2e]">Schedule Publication</h3>
              <p className="text-xs text-[#464555]">Arm automatic event broadcast release</p>
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
        <div className="p-6 space-y-4">
          <div className="p-3.5 rounded-xl bg-[#faf8ff] border border-[#c7c4d8]/30">
            <span className="text-[11px] font-semibold text-[#777587] uppercase block">
              Target Event:
            </span>
            <span className="text-sm font-bold text-[#131b2e] block mt-0.5">{event.title}</span>
            <span className="text-xs text-[#464555] block">
              {event.venue}, {event.city}
            </span>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-[#131b2e] mb-1.5">
                Publication Date:
              </label>
              <input
                type="date"
                value={scheduleDate}
                onChange={(e) => setScheduleDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#c7c4d8]/60 text-xs md:text-sm font-semibold text-[#131b2e] focus:border-[#3525cd] focus:ring-2 focus:ring-[#3525cd]/20 outline-none bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#131b2e] mb-1.5">
                Publication Time (IST):
              </label>
              <input
                type="time"
                value={scheduleTime}
                onChange={(e) => setScheduleTime(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#c7c4d8]/60 text-xs md:text-sm font-semibold text-[#131b2e] focus:border-[#3525cd] focus:ring-2 focus:ring-[#3525cd]/20 outline-none bg-white"
              />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#eaedff] text-[#3525cd] text-xs flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">info</span>
            <span>
              The event will remain in Drafts until this time, when it will automatically activate and blast to configured social channels.
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#c7c4d8]/30 bg-[#f2f3ff]/40 flex justify-end gap-2.5">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-full border border-[#c7c4d8]/60 text-xs font-bold hover:bg-[#eaedff] cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-5 py-2 rounded-full bg-[#3525cd] hover:bg-[#4f46e5] text-white text-xs font-bold shadow-md shadow-[#3525cd]/25 flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">alarm_on</span>
            <span>Confirm Schedule</span>
          </button>
        </div>
      </div>
    </div>
  );
};
