'use client';

import React, { useState } from 'react';
import { Search, Download, Columns, Filter, X, ChevronDown, Check } from 'lucide-react';
import { useToast } from './Toast';
import { useAppStore } from '@/lib/store';
import { SensitiveActionDialog } from './SensitiveActionDialog';

export interface FilterOption {
  key: string;
  label: string;
  options: { label: string; value: string }[];
}

interface STTProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filters?: FilterOption[];
  activeFilters?: Record<string, string>;
  onFilterChange?: (key: string, value: string) => void;
  onClearFilters?: () => void;
  columns?: { id: string; label: string; visible: boolean }[];
  onColumnToggle?: (columnId: string) => void;
  pageName: string;
  hasPII?: boolean;
  totalRows?: number;
}

export function STT({
  searchQuery,
  onSearchChange,
  filters = [],
  activeFilters = {},
  onFilterChange,
  onClearFilters,
  columns = [],
  onColumnToggle,
  pageName,
  hasPII = false,
  totalRows = 0
}: STTProps) {
  const { toast } = useToast();
  const addAuditEvent = useAppStore((s) => s.addAuditEvent);

  const [showColumnsPopover, setShowColumnsPopover] = useState(false);
  const [activeFilterDropdown, setActiveFilterDropdown] = useState<string | null>(null);
  const [showExportSensitiveDialog, setShowExportSensitiveDialog] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);

  const handleExport = (format: 'CSV' | 'XLSX' | 'PDF') => {
    if (hasPII && totalRows > 50) {
      setShowExportSensitiveDialog(true);
    } else {
      // Simulate file download trigger
      const dummyContent = `Format,Data,Timestamp\n${format},Sample Export for ${pageName},${new Date().toISOString()}`;
      const blob = new Blob([dummyContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${pageName.toLowerCase().replace(/\s+/g, '_')}_export.${format.toLowerCase()}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      toast(`Export prepared (${format}) — logged in audit trail`, 'success');
      addAuditEvent({
        actor: 'Current User',
        actorRole: 'User',
        action: 'EXPORT',
        objectType: pageName,
        objectId: `EXPORT_${format}`,
        after: `Exported ${format} format for ${pageName} (${totalRows} rows)`,
        ipDevice: '192.168.1.45',
        sourceChannel: 'Web Application'
      });
    }
  };

  const handleSensitiveExportConfirm = (reason: string) => {
    setShowExportSensitiveDialog(false);
    toast(`Sensitive bulk export authorized and logged (${totalRows} rows)`, 'warning');
    addAuditEvent({
      actor: 'Current User',
      actorRole: 'User',
      action: 'EXPORT_PII_BULK',
      objectType: pageName,
      objectId: 'EXPORT_PII',
      reason,
      after: `Exported PII dataset (${totalRows} rows)`,
      ipDevice: '192.168.1.45',
      sourceChannel: 'Web Application'
    });
  };

  const hasActiveFilters = Object.values(activeFilters).some((val) => val && val !== 'ALL');

  return (
    <div className="space-y-3 mb-4">
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/60 p-3 rounded-xl border border-slate-800 backdrop-blur-sm">
        {/* Left: Search input */}
        <div className="relative flex-1 min-w-[240px] max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder={`Search ${pageName.toLowerCase()}...`}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-slate-950/80 border border-slate-700/80 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0E9F8E] focus:border-transparent transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Center/Right: Filters, Columns & Export */}
        <div className="flex items-center gap-2 flex-wrap">
          {filters.map((filter) => (
            <div key={filter.key} className="relative">
              <button
                onClick={() =>
                  setActiveFilterDropdown(activeFilterDropdown === filter.key ? null : filter.key)
                }
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
                  activeFilters[filter.key] && activeFilters[filter.key] !== 'ALL'
                    ? 'bg-[#0E9F8E]/20 border-[#0E9F8E] text-[#0E9F8E]'
                    : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700/80'
                }`}
              >
                <Filter className="w-3.5 h-3.5" />
                <span>
                  {filter.label}:{' '}
                  <strong className="text-slate-100">
                    {filter.options.find((o) => o.value === activeFilters[filter.key])?.label || 'All'}
                  </strong>
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {activeFilterDropdown === filter.key && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-slate-900 border border-slate-700 rounded-lg shadow-xl z-30 py-1 animate-in fade-in zoom-in-95">
                  <div
                    onClick={() => {
                      onFilterChange?.(filter.key, 'ALL');
                      setActiveFilterDropdown(null);
                    }}
                    className="px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-800 cursor-pointer flex items-center justify-between"
                  >
                    <span>All {filter.label}</span>
                    {(!activeFilters[filter.key] || activeFilters[filter.key] === 'ALL') && (
                      <Check className="w-3.5 h-3.5 text-[#0E9F8E]" />
                    )}
                  </div>
                  {filter.options.map((opt) => (
                    <div
                      key={opt.value}
                      onClick={() => {
                        onFilterChange?.(filter.key, opt.value);
                        setActiveFilterDropdown(null);
                      }}
                      className="px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-800 cursor-pointer flex items-center justify-between"
                    >
                      <span>{opt.label}</span>
                      {activeFilters[filter.key] === opt.value && (
                        <Check className="w-3.5 h-3.5 text-[#0E9F8E]" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Columns Popover Toggle */}
          {columns.length > 0 && (
            <div className="relative">
              <button
                onClick={() => setShowColumnsPopover(!showColumnsPopover)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/80 text-xs font-medium text-slate-300 hover:bg-slate-700/80 transition-colors"
              >
                <Columns className="w-3.5 h-3.5" />
                <span>Columns</span>
              </button>

              {showColumnsPopover && (
                <div className="absolute top-full right-0 mt-1 w-52 bg-slate-900 border border-slate-700 rounded-lg shadow-xl z-30 p-2 animate-in fade-in zoom-in-95">
                  <div className="text-xs font-semibold text-slate-400 px-2 py-1 mb-1 border-b border-slate-800">
                    Visible Columns
                  </div>
                  {columns.map((col) => (
                    <label
                      key={col.id}
                      className="flex items-center gap-2 px-2 py-1.5 text-xs text-slate-300 hover:bg-slate-800 rounded cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={col.visible}
                        onChange={() => onColumnToggle?.(col.id)}
                        className="rounded border-slate-700 bg-slate-950 text-[#0E9F8E] focus:ring-0"
                      />
                      <span>{col.label}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Export Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/80 text-xs font-medium text-slate-200 hover:bg-slate-700 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-[#0E9F8E]" />
              <span>Export</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>
            {showExportMenu && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setShowExportMenu(false)}
                />
                <div className="absolute top-full right-0 mt-1 w-40 bg-slate-900 border border-slate-700 rounded-lg shadow-xl z-30 py-1 animate-in fade-in zoom-in-95">
                  <button
                    onClick={() => {
                      handleExport('CSV');
                      setShowExportMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:bg-slate-800 transition-colors flex items-center justify-between"
                  >
                    <span>Export as CSV</span>
                  </button>
                  <button
                    onClick={() => {
                      handleExport('XLSX');
                      setShowExportMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:bg-slate-800 transition-colors flex items-center justify-between"
                  >
                    <span>Export as XLSX</span>
                  </button>
                  <button
                    onClick={() => {
                      handleExport('PDF');
                      setShowExportMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:bg-slate-800 transition-colors flex items-center justify-between"
                  >
                    <span>Export as PDF</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Active filters bar */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <span className="text-slate-400 font-medium">Active filters:</span>
          {Object.entries(activeFilters).map(([k, val]) => {
            if (!val || val === 'ALL') return null;
            const filterDef = filters.find((f) => f.key === k);
            const label = filterDef?.options.find((o) => o.value === val)?.label || val;
            return (
              <span
                key={k}
                className="inline-flex items-center gap-1 bg-[#0E9F8E]/20 border border-[#0E9F8E]/40 text-[#0E9F8E] px-2 py-0.5 rounded-full text-xs"
              >
                {filterDef?.label}: <strong>{label}</strong>
                <button
                  onClick={() => onFilterChange?.(k, 'ALL')}
                  className="hover:text-white ml-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            );
          })}
          <button
            onClick={onClearFilters}
            className="text-xs text-slate-400 hover:text-white underline ml-2"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Sensitive Action Dialog for Export if PII & > 50 rows */}
      {showExportSensitiveDialog && (
        <SensitiveActionDialog
          actionName="Bulk Personal Data Export"
          summary={`Exporting ${totalRows} debtor records containing masked personal identifying information (PII).`}
          userLimit="Standard report view: max 50 rows for unverified export"
          onConfirm={handleSensitiveExportConfirm}
          onCancel={() => setShowExportSensitiveDialog(false)}
        />
      )}
    </div>
  );
}
