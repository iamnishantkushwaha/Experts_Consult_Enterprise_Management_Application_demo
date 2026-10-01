'use client';

import React, { useState } from 'react';
import { MessageSquare, Send, X } from 'lucide-react';
import { useToast } from '../common/Toast';

export function ClientMessagesView({ onNavigate: _onNavigate }: { onNavigate?: (view: string) => void }) {
  const { toast } = useToast();
  const [selectedMsg, setSelectedMsg] = useState<{ id: string; title: string; sender: string } | null>(null);
  const [replyText, setReplyText] = useState('');

  const messages = [
    { id: 'MSG-1', sender: 'Priscilla Quaye (CFO)', title: 'September 2026 Payout Remittance Ready', date: '2026-09-30', status: 'Unread' },
    { id: 'MSG-2', sender: 'Efua Boateng (Recovery Mgr)', title: 'Settlement Request Approval Needed (ACC-100255)', date: '2026-09-28', status: 'Read' },
    { id: 'MSG-3', sender: 'System Portal', title: 'Q4 Debt Portfolio Intake Complete', date: '2026-09-25', status: 'Read' },
  ];

  const handleSendReply = () => {
    if (!replyText.trim()) return;
    toast(`Reply sent to ${selectedMsg?.sender}`, 'success');
    setSelectedMsg(null);
    setReplyText('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-[#2563EB]" />
          Messages &amp; Direct Enquiries
        </h1>
        <p className="text-xs text-slate-600">Secure communication channel with Experts Consult recovery operations and finance team.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xl p-6">
        <div className="space-y-3">
          {messages.map(m => (
            <div key={m.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between hover:border-slate-300 transition-colors">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-xs">{m.title}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${m.status === 'Unread' ? 'bg-[#2563EB]/20 text-[#2563EB] border-[#2563EB]/30' : 'bg-slate-100 text-slate-600 border-slate-300'}`}>{m.status}</span>
                </div>
                <div className="text-xs text-slate-600 mt-1">From: {m.sender} · Date: <span className="font-mono text-slate-700">{m.date}</span></div>
              </div>
              <button
                onClick={() => setSelectedMsg(m)}
                className="px-3.5 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-xl text-xs font-semibold transition-colors"
              >
                Reply
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Reply Dialog Modal */}
      {selectedMsg && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 p-6 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Send className="w-4 h-4 text-[#2563EB]" />
                Reply to {selectedMsg.sender}
              </h3>
              <button onClick={() => setSelectedMsg(null)} className="text-slate-600 hover:text-slate-900">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs text-slate-600">
              Subject: <strong className="text-slate-900">{selectedMsg.title}</strong>
            </div>

            <textarea
              rows={4}
              placeholder="Type your reply message here…"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:ring-2 focus:ring-[#2563EB] outline-none"
            />

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setSelectedMsg(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleSendReply}
                className="px-4 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold rounded-xl shadow-lg shadow-[#2563EB]/20"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
