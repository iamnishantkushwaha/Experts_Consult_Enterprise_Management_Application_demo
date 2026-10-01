'use client';

import React, { useState } from 'react';
import { Settings, Plus, Key, X } from 'lucide-react';
import { useToast } from '../common/Toast';

export function ClientUsersApiView() {
  const { toast } = useToast();
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);

  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState('Viewer');

  const [users, setUsers] = useState([
    { id: '1', name: 'Esther Tetteh', role: 'Head of Collections', email: 'e.tetteh@voltatelecom.gh', level: 'Admin' }
  ]);

  const [apiKeys, setApiKeys] = useState([
    { id: '1', name: 'Production API Key', key: 'ec_live_98a76f24192b0c41', created: '2026-09-01' }
  ]);

  const handleAddUser = () => {
    if (!newUserName.trim() || !newUserEmail.trim()) return;
    setUsers([...users, { id: Date.now().toString(), name: newUserName, role: 'Portal User', email: newUserEmail, level: newUserRole }]);
    toast(`User ${newUserName} added to Volta Telecom organization`, 'success');
    setShowAddUserModal(false);
    setNewUserName('');
    setNewUserEmail('');
  };

  const handleGenerateKey = () => {
    const newKey = `ec_live_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 10)}`;
    setApiKeys([...apiKeys, { id: Date.now().toString(), name: 'New Integration Key', key: newKey, created: '2026-10-01' }]);
    toast('New API Key generated successfully', 'success');
    setShowApiKeyModal(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <Settings className="w-6 h-6 text-[#0E9F8E]" />
          Users &amp; API Integration Credentials
        </h1>
        <p className="text-xs text-slate-400">Manage client portal users, access roles, webhook notifications, and API keys.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Management Section */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-white">Authorized Client Users</h3>
            <button
              onClick={() => setShowAddUserModal(true)}
              className="flex items-center gap-1 px-3 py-1.5 bg-[#0E9F8E] hover:bg-[#0c8879] text-white rounded-xl text-xs font-semibold transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Add User
            </button>
          </div>
          <div className="space-y-2 text-xs">
            {users.map(u => (
              <div key={u.id} className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex justify-between items-center">
                <div>
                  <div className="font-bold text-white">{u.name}</div>
                  <div className="text-slate-400">{u.role} · {u.email}</div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">{u.level}</span>
              </div>
            ))}
          </div>
        </div>

        {/* API Keys Section */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-white">API Keys &amp; Webhooks</h3>
            <button
              onClick={() => setShowApiKeyModal(true)}
              className="flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold transition-colors"
            >
              <Key className="w-3.5 h-3.5 text-[#0E9F8E]" />
              Generate Key
            </button>
          </div>
          <div className="space-y-2 text-xs font-mono">
            {apiKeys.map(k => (
              <div key={k.id} className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex justify-between items-center">
                <div>
                  <div className="text-slate-400 text-[10px] uppercase font-sans font-semibold">{k.name}</div>
                  <div className="text-white font-bold mt-0.5">{k.key}</div>
                </div>
                <span className="text-[10px] text-slate-500 font-sans">Created {k.created}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 p-6 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white">Add Authorized Client User</h3>
              <button onClick={() => setShowAddUserModal(false)} className="text-slate-400 hover:text-white"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Samuel Ofori"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white outline-none focus:ring-2 focus:ring-[#0E9F8E]"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Corporate Email</label>
                <input
                  type="email"
                  placeholder="e.g. s.ofori@voltatelecom.gh"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white outline-none focus:ring-2 focus:ring-[#0E9F8E]"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Access Level</label>
                <select
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white outline-none"
                >
                  <option value="Admin">Admin (Full Access &amp; Approvals)</option>
                  <option value="Manager">Manager (Reports &amp; Cases)</option>
                  <option value="Viewer">Viewer (Read-Only)</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button onClick={() => setShowAddUserModal(false)} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl">Cancel</button>
              <button onClick={handleAddUser} className="px-4 py-2 bg-[#0E9F8E] hover:bg-[#0c8879] text-white text-xs font-semibold rounded-xl shadow-lg">Save User</button>
            </div>
          </div>
        </div>
      )}

      {/* Generate API Key Modal */}
      {showApiKeyModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 p-6 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white">Generate Integration API Key</h3>
              <button onClick={() => setShowApiKeyModal(false)} className="text-slate-400 hover:text-white"><X className="w-4 h-4" /></button>
            </div>
            <p className="text-xs text-slate-300">Generating a new API key will allow your ERP system to pull real-time liquidation reports and push new debt placement files via REST webhooks.</p>
            <div className="flex justify-end gap-3 pt-2">
              <button onClick={() => setShowApiKeyModal(false)} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl">Cancel</button>
              <button onClick={handleGenerateKey} className="px-4 py-2 bg-[#0E9F8E] hover:bg-[#0c8879] text-white text-xs font-semibold rounded-xl shadow-lg">Generate Live Key</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
