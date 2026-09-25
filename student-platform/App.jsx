import React, { useState, useEffect, useMemo, useCallback, createContext, useContext, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import {
  LayoutDashboard, Users, UserPlus, FileText, CreditCard, Building2, UserCog,
  Shield, BarChart3, Settings, Search, Bell, HelpCircle, ChevronDown, ChevronRight,
  Menu, X, LogOut, Moon, Sun, Plus, Filter, Download, Edit2, Trash2, Eye, EyeOff,
  Check, AlertTriangle, Info, Copy, MoreHorizontal, ArrowLeft, ArrowRight,
  Calendar, MapPin, Phone, Mail, GraduationCap, Briefcase, Clock, Activity,
  CheckCircle2, XCircle, AlertCircle, Loader2, ExternalLink, RefreshCw,
  Columns, List, Archive, Home, ChevronsLeft, ChevronsRight
} from 'lucide-react';

// ===================== CONSTANTS & MOCK DATA =====================
const STATUSES = [
  'Shortlisting Sent', 'Applications Started', 'Applications on Hold', 'Offered',
  'Waiting', 'Deferred', 'Dropped', 'Private Registered', 'Private Shifted',
  'Still Thinking', 'Got Visa'
];

const STATUS_COLORS = {
  'Shortlisting Sent': 'bg-slate-100 text-slate-700',
  'Applications Started': 'bg-blue-100 text-blue-700',
  'Applications on Hold': 'bg-amber-100 text-amber-700',
  'Offered': 'bg-emerald-100 text-emerald-700',
  'Waiting': 'bg-yellow-100 text-yellow-800',
  'Deferred': 'bg-orange-100 text-orange-700',
  'Dropped': 'bg-red-100 text-red-700',
  'Private Registered': 'bg-purple-100 text-purple-700',
  'Private Shifted': 'bg-indigo-100 text-indigo-700',
  'Still Thinking': 'bg-cyan-100 text-cyan-700',
  'Got Visa': 'bg-green-100 text-green-800',
};

const EMPLOYEES = [
  { id: 'e1', name: 'Nagaraju', role: 'Employee', status: 'Active', assigned: 12, applications: 28, offers: 8, visas: 3 },
  { id: 'e2', name: 'Bhavani', role: 'Employee', status: 'Active', assigned: 9, applications: 22, offers: 6, visas: 2 },
  { id: 'e3', name: 'Bharathi', role: 'Employee', status: 'Active', assigned: 11, applications: 25, offers: 7, visas: 4 },
  { id: 'e4', name: 'Sony', role: 'Employee', status: 'Active', assigned: 8, applications: 18, offers: 5, visas: 1 },
  { id: 'e5', name: 'Nagamani', role: 'Employee', status: 'Active', assigned: 10, applications: 20, offers: 4, visas: 2 },
  { id: 'e6', name: 'Chaitanya', role: 'Employee', status: 'Active', assigned: 7, applications: 15, offers: 3, visas: 1 },
  { id: 'e7', name: 'Swaroopa', role: 'Employee', status: 'Active', assigned: 6, applications: 14, offers: 2, visas: 0 },
  { id: 'e8', name: 'Anil', role: 'Employee', status: 'Active', assigned: 9, applications: 19, offers: 5, visas: 2 },
  { id: 'e9', name: 'Sravya', role: 'Employee', status: 'Active', assigned: 5, applications: 12, offers: 3, visas: 1 },
  { id: 'e10', name: 'Nikhila', role: 'Employee', status: 'Active', assigned: 8, applications: 16, offers: 4, visas: 2 },
  { id: 'e11', name: 'Admin User', role: 'Admin', status: 'Active', assigned: 0, applications: 0, offers: 0, visas: 0 },
];

const COUNTRIES = ['Germany', 'UK', 'USA', 'Canada', 'Australia', 'Netherlands', 'Ireland'];
const INTAKES = ['Winter 2026', 'Summer 2026', 'January 2026', 'Winter 2027', 'Summer 2027'];
const BRANCHES = ['Computer Science', 'Data Science', 'Mechanical Engineering', 'Business Administration', 'Electrical Engineering', 'Biotechnology', 'Civil Engineering', 'MBA'];

function seedStudents() {
  const names = ['Aarav Sharma', 'Priya Patel', 'Rohan Gupta', 'Ananya Singh', 'Vikram Reddy', 'Sneha Iyer', 'Karthik Nair', 'Meera Joshi', 'Aditya Kumar', 'Divya Rao',
    'Rahul Mehta', 'Pooja Desai', 'Siddharth Banerjee', 'Kavya Nambiar', 'Arjun Pillai', 'Ishita Chatterjee', 'Nikhil Verma', 'Shreya Malhotra', 'Varun Kapoor', 'Neha Agarwal'];
  const students = [];
  for (let i = 0; i < 55; i++) {
    const emp = EMPLOYEES[i % 10];
    const country = COUNTRIES[i % COUNTRIES.length];
    const status = STATUSES[i % STATUSES.length];
    const leadType = i % 3 === 0 ? 'B2B' : 'Direct';
    const payStatus = ['Paid', 'Partially Paid', 'Pending', 'Overdue'][i % 4];
    const total = 1500 + (i % 5) * 250;
    const initial = Math.floor(total * (0.3 + (i % 4) * 0.15));
    students.push({
      id: `W26_${String(i + 1).padStart(3, '0')}`,
      name: names[i % names.length] + (i >= 20 ? ` ${Math.floor(i / 20)}` : ''),
      country,
      intake: INTAKES[i % INTAKES.length],
      branch: BRANCHES[i % BRANCHES.length],
      cgpa: (7 + (i % 30) / 10).toFixed(1),
      ielts: (6 + (i % 15) / 10).toFixed(1),
      germanGrade: country === 'Germany' ? (1.5 + (i % 20) / 10).toFixed(1) : null,
      status,
      leadBy: emp.name,
      leadById: emp.id,
      leadType,
      b2bName: leadType === 'B2B' ? ['EduPath Partners', 'Global Study Hub', 'Campus Bridge'][i % 3] : '',
      university: ['TU Munich', 'RWTH Aachen', 'University of Manchester', 'Imperial College', 'ETH Zurich', 'University of Toronto'][i % 6],
      course: BRANCHES[i % BRANCHES.length],
      phone1: `+91 98${String(10000000 + i * 137).slice(0, 8)}`,
      phone2: '',
      gmail: `student${i + 1}@gmail.com`,
      gmailPassword: '••••••••',
      recoveryNo: `+91 99${String(20000000 + i * 89).slice(0, 8)}`,
      device: ['Chrome / Windows', 'Safari / Mac', 'Firefox / Linux'][i % 3],
      twoStep: i % 2 === 0,
      // Germany fields
      apsUsername: country === 'Germany' ? `aps_${i}` : '',
      apsPassword: country === 'Germany' ? '••••••••' : '',
      uniAssistId: country === 'Germany' ? `UA${10000 + i}` : '',
      uniAssistPassword: country === 'Germany' ? '••••••••' : '',
      uniAssistDocs: country === 'Germany' ? (i % 2 === 0) : false,
      blockedAccount: country === 'Germany' ? (i % 3 === 0 ? 'Applied' : 'Not Applied') : '',
      enrollment: country === 'Germany' ? (i % 4 === 0 ? 'Applied' : 'Not Applied') : '',
      studentDorm: country === 'Germany' ? (i % 5 === 0 ? 'Applied' : 'Not Applied') : '',
      // Payment
      totalFee: total,
      initialPayment: initial,
      remainingPayment: total - initial,
      discount: i % 5 === 0 ? 100 : 0,
      paymentStatus: payStatus,
      college: ['IIT Delhi', 'NIT Trichy', 'BITS Pilani', 'VIT Vellore', 'Anna University'][i % 5],
      germanLanguage: country === 'Germany' ? ['A1', 'A2', 'B1', 'B2'][i % 4] : '',
      gre: i % 3 === 0 ? String(310 + (i % 20)) : '',
      createdAt: new Date(2025, 8 + (i % 4), 1 + (i % 28)).toISOString(),
      timeline: [
        { id: `t${i}-1`, action: 'CREATE', label: 'Student registered', at: new Date(2025, 8 + (i % 4), 1 + (i % 28)).toISOString(), by: emp.name },
        { id: `t${i}-2`, action: 'STATUS_CHANGE', label: `Status → ${status}`, at: new Date(2025, 9, 1 + (i % 20)).toISOString(), by: emp.name },
      ],
    });
  }
  return students;
}

function seedUniversities() {
  const unis = [
    { name: 'Technical University of Munich', course: 'MSc Computer Science', branch: 'Computer Science', intake: 'Winter', ielts: 6.5, toefl: 88, germanGrade: 2.5, applicationVia: 'Uni-Assist', fee: 75, tuition: 0, deadline: '2026-05-31', moi: 'Yes', aptitude: 'No' },
    { name: 'RWTH Aachen', course: 'MSc Data Science', branch: 'Data Science', intake: 'Winter', ielts: 6.0, toefl: 80, germanGrade: 2.3, applicationVia: 'Uni-Assist', fee: 75, tuition: 0, deadline: '2026-07-15', moi: 'Yes', aptitude: 'No' },
    { name: 'University of Stuttgart', course: 'MSc Mechanical Engineering', branch: 'Mechanical Engineering', intake: 'Summer', ielts: 6.5, toefl: 90, germanGrade: 2.0, applicationVia: 'Direct', fee: 50, tuition: 1500, deadline: '2026-01-15', moi: 'No', aptitude: 'Yes' },
    { name: 'TU Berlin', course: 'MSc Electrical Engineering', branch: 'Electrical Engineering', intake: 'Winter', ielts: 6.5, toefl: 87, germanGrade: 2.5, applicationVia: 'Uni-Assist', fee: 75, tuition: 0, deadline: '2026-05-15', moi: 'Yes', aptitude: 'No' },
    { name: 'University of Manchester', course: 'MSc Advanced Computer Science', branch: 'Computer Science', intake: 'Both', ielts: 6.5, toefl: 90, germanGrade: null, applicationVia: 'Direct', fee: 60, tuition: 28000, deadline: '2026-06-30', moi: 'Yes', aptitude: 'No' },
    { name: 'Imperial College London', course: 'MSc Computing', branch: 'Computer Science', intake: 'Winter', ielts: 7.0, toefl: 100, germanGrade: null, applicationVia: 'Direct', fee: 80, tuition: 38000, deadline: '2026-03-31', moi: 'Yes', aptitude: 'No' },
    { name: 'University of Toronto', course: 'MEng Computer Engineering', branch: 'Computer Science', intake: 'Fall', ielts: 7.0, toefl: 93, germanGrade: null, applicationVia: 'Direct', fee: 120, tuition: 32000, deadline: '2026-01-15', moi: 'Yes', aptitude: 'No' },
    { name: 'ETH Zurich', course: 'MSc Computer Science', branch: 'Computer Science', intake: 'Fall', ielts: 7.0, toefl: 100, germanGrade: null, applicationVia: 'Direct', fee: 150, tuition: 1500, deadline: '2025-12-15', moi: 'Yes', aptitude: 'No' },
    { name: 'TU Delft', course: 'MSc Computer Science', branch: 'Computer Science', intake: 'Fall', ielts: 6.5, toefl: 90, germanGrade: null, applicationVia: 'Direct', fee: 100, tuition: 20000, deadline: '2026-04-01', moi: 'Yes', aptitude: 'No' },
    { name: 'University of Amsterdam', course: 'MSc Artificial Intelligence', branch: 'Data Science', intake: 'Fall', ielts: 6.5, toefl: 92, germanGrade: null, applicationVia: 'Direct', fee: 100, tuition: 18000, deadline: '2026-03-01', moi: 'Yes', aptitude: 'No' },
  ];
  const list = [];
  for (let i = 0; i < 35; i++) {
    const base = unis[i % unis.length];
    list.push({
      id: `U${String(i + 1).padStart(3, '0')}`,
      ...base,
      course: i >= 10 ? BRANCHES[i % BRANCHES.length] + (i > 15 ? ' (Advanced)' : '') : base.course,
      branch: BRANCHES[i % BRANCHES.length],
      otherRequirements: i % 3 === 0 ? 'Motivation letter, 2 LORs' : 'CV, Transcripts',
      courier: i % 2 === 0 ? 'Yes' : 'No',
      germanLanguage: base.germanGrade ? 'B1 recommended' : 'Not required',
      gre: i % 4 === 0 ? 'Optional 310+' : 'Not required',
      archived: false,
    });
  }
  return list;
}

function seedAudit(students) {
  const actions = ['CREATE', 'UPDATE', 'STATUS_CHANGE', 'PAYMENT_UPDATE', 'EMPLOYEE_ASSIGN', 'UNIVERSITY_UPDATE', 'EXPORT', 'LOGIN'];
  const modules = ['Students', 'Applications', 'Payments', 'Universities', 'Employees', 'Auth'];
  const events = [];
  for (let i = 0; i < 220; i++) {
    const emp = EMPLOYEES[i % 11];
    const action = actions[i % actions.length];
    const s = students[i % students.length];
    events.push({
      id: `AUD-${800000 + i}`,
      timestamp: new Date(2026, 8, 1 + (i % 25), 8 + (i % 12), i % 60).toISOString(),
      user: emp.name,
      role: emp.role,
      action,
      module: modules[i % modules.length],
      recordId: s?.id || `REC-${i}`,
      before: action.includes('STATUS') ? STATUSES[(i + 1) % STATUSES.length] : (action === 'PAYMENT_UPDATE' ? 'Pending' : null),
      after: action.includes('STATUS') ? STATUSES[i % STATUSES.length] : (action === 'PAYMENT_UPDATE' ? 'Partially Paid' : null),
      severity: i % 20 === 0 ? 'CRITICAL' : i % 7 === 0 ? 'WARNING' : i % 3 === 0 ? 'SUCCESS' : 'INFO',
    });
  }
  return events.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}

// ===================== STORAGE & STATE =====================
const STORAGE_KEY = 'samp_prototype_v1';

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  const students = seedStudents();
  return {
    students,
    universities: seedUniversities(),
    employees: EMPLOYEES,
    audit: seedAudit(students),
    theme: 'light',
    session: null,
  };
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      students: state.students,
      universities: state.universities,
      employees: state.employees,
      audit: state.audit,
      theme: state.theme,
      session: state.session,
    }));
  } catch (e) {}
}

const AppContext = createContext(null);

function useApp() {
  return useContext(AppContext);
}

// ===================== UI PRIMITIVES =====================
function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

function Badge({ children, className = '', variant = 'default' }) {
  const variants = {
    default: 'bg-slate-100 text-slate-700',
    success: 'bg-emerald-100 text-emerald-700',
    warning: 'bg-amber-100 text-amber-700',
    danger: 'bg-red-100 text-red-700',
    info: 'bg-cyan-100 text-cyan-700',
    primary: 'bg-blue-100 text-blue-700',
  };
  return (
    <span className={cn('inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium', variants[variant] || variants.default, className)}>
      {children}
    </span>
  );
}

function StatusBadge({ status }) {
  return <Badge className={STATUS_COLORS[status] || 'bg-slate-100 text-slate-700'}>{status}</Badge>;
}

function Button({ children, variant = 'primary', size = 'md', className = '', disabled, onClick, type = 'button', ...props }) {
  const base = 'inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-50 disabled:cursor-not-allowed';
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-700 shadow-soft',
    secondary: 'bg-white text-text border border-border hover:bg-slate-50 shadow-soft',
    ghost: 'text-slate-600 hover:bg-slate-100 hover:text-text',
    danger: 'bg-danger text-white hover:bg-red-700',
    success: 'bg-success text-white hover:bg-green-700',
  };
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base',
    icon: 'p-2',
  };
  return (
    <button type={type} className={cn(base, variants[variant], sizes[size], className)} disabled={disabled} onClick={onClick} {...props}>
      {children}
    </button>
  );
}

function Input({ label, error, className = '', ...props }) {
  return (
    <div className="space-y-1.5">
      {label && <label className="block text-sm font-medium text-slate-700">{label}</label>}
      <input
        className={cn(
          'w-full px-3 py-2 rounded-xl border border-border bg-white text-sm text-text placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition',
          error && 'border-danger focus:ring-danger/30',
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  );
}

function Select({ label, error, children, className = '', ...props }) {
  return (
    <div className="space-y-1.5">
      {label && <label className="block text-sm font-medium text-slate-700">{label}</label>}
      <select
        className={cn(
          'w-full px-3 py-2 rounded-xl border border-border bg-white text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition',
          error && 'border-danger',
          className
        )}
        {...props}
      >
        {children}
      </select>
      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  );
}

function Card({ children, className = '' }) {
  return (
    <div className={cn('bg-white rounded-2xl border border-border shadow-card', className)}>
      {children}
    </div>
  );
}

function Modal({ open, onClose, title, children, size = 'md' }) {
  if (!open) return null;
  const sizes = { sm: 'max-w-md', md: 'max-w-lg', lg: 'max-w-2xl', xl: 'max-w-4xl' };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className={cn('relative bg-white rounded-2xl shadow-xl w-full border border-border', sizes[size])}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h3 className="text-lg font-semibold text-text">{title}</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500"><X size={18} /></button>
        </div>
        <div className="p-6 max-h-[70vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

function Drawer({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white h-full shadow-xl border-l border-border flex flex-col animate-[slideIn_0.2s_ease]">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h3 className="font-semibold text-text">{title}</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500"><X size={18} /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-5">{children}</div>
      </div>
    </div>
  );
}

function ToastContainer({ toasts, remove }) {
  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 max-w-sm">
      {toasts.map(t => (
        <div key={t.id} data-toast className={cn(
          'flex items-start gap-3 px-4 py-3 rounded-xl shadow-lg border bg-white text-sm',
          t.type === 'success' && 'border-emerald-200',
          t.type === 'error' && 'border-red-200',
          t.type === 'warning' && 'border-amber-200'
        )}>
          {t.type === 'success' && <CheckCircle2 size={18} className="text-success shrink-0 mt-0.5" />}
          {t.type === 'error' && <XCircle size={18} className="text-danger shrink-0 mt-0.5" />}
          {t.type === 'warning' && <AlertTriangle size={18} className="text-warning shrink-0 mt-0.5" />}
          {t.type === 'info' && <Info size={18} className="text-info shrink-0 mt-0.5" />}
          <div className="flex-1">
            <p className="font-medium text-text">{t.title}</p>
            {t.message && <p className="text-slate-500 mt-0.5">{t.message}</p>}
          </div>
          <button onClick={() => remove(t.id)} className="text-slate-400 hover:text-slate-600"><X size={14} /></button>
        </div>
      ))}
    </div>
  );
}

function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
        <Icon size={24} className="text-slate-400" />
      </div>
      <h3 className="text-base font-semibold text-text mb-1">{title}</h3>
      <p className="text-sm text-slate-500 max-w-sm mb-4">{description}</p>
      {action}
    </div>
  );
}

function Skeleton({ className = '' }) {
  return <div className={cn('skeleton rounded-lg', className)} />;
}

// ===================== LAYOUT =====================
const ADMIN_NAV = [
  { id: 'dashboard', label: 'Overview', icon: LayoutDashboard, path: 'dashboard' },
  { id: 'students', label: 'Students', icon: Users, path: 'students' },
  { id: 'leads', label: 'Leads', icon: Briefcase, path: 'leads' },
  { id: 'applications', label: 'Applications', icon: FileText, path: 'applications' },
  { id: 'payments', label: 'Payments', icon: CreditCard, path: 'payments' },
  { id: 'universities', label: 'Universities', icon: Building2, path: 'universities' },
  { id: 'employees', label: 'Employees', icon: UserCog, path: 'employees' },
  { id: 'audit', label: 'Audit Center', icon: Shield, path: 'audit' },
  { id: 'reports', label: 'Reports', icon: BarChart3, path: 'reports' },
  { id: 'settings', label: 'Settings', icon: Settings, path: 'settings' },
];

const EMPLOYEE_NAV = [
  { id: 'dashboard', label: 'Overview', icon: LayoutDashboard, path: 'dashboard' },
  { id: 'students', label: 'My Students', icon: Users, path: 'students' },
  { id: 'leads', label: 'Leads', icon: Briefcase, path: 'leads' },
  { id: 'applications', label: 'Applications', icon: FileText, path: 'applications' },
  { id: 'payments', label: 'Payments', icon: CreditCard, path: 'payments' },
  { id: 'universities', label: 'Universities', icon: Building2, path: 'universities' },
  { id: 'profile', label: 'Profile', icon: UserCog, path: 'profile' },
];

function Sidebar({ page, setPage, collapsed, setCollapsed, mobileOpen, setMobileOpen }) {
  const { session, logout } = useApp();
  const nav = session?.role === 'Admin' ? ADMIN_NAV : EMPLOYEE_NAV;

  return (
    <>
      {mobileOpen && <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />}
      <aside className={cn(
        'fixed top-0 left-0 h-full bg-white border-r border-border z-50 flex flex-col transition-all duration-200',
        collapsed ? 'w-[68px]' : 'w-60',
        mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      )}>
        <div className={cn('flex items-center h-14 px-4 border-b border-border', collapsed && 'justify-center')}>
          {!collapsed && (
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
                <GraduationCap size={18} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-text leading-tight">SAMP</p>
                <p className="text-[10px] text-slate-400 leading-tight">Prototype</p>
              </div>
            </div>
          )}
          {collapsed && <GraduationCap size={22} className="text-primary" />}
        </div>
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
          {nav.map(item => {
            const Icon = item.icon;
            const active = page === item.path;
            return (
              <button
                key={item.id}
                onClick={() => { setPage(item.path); setMobileOpen(false); }}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors',
                  active ? 'bg-primary/10 text-primary' : 'text-slate-600 hover:bg-slate-50 hover:text-text',
                  collapsed && 'justify-center px-2'
                )}
                title={collapsed ? item.label : undefined}
              >
                <Icon size={18} className="shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>
        <div className="p-2 border-t border-border">
          <button
            onClick={logout}
            className={cn(
              'w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-danger transition-colors',
              collapsed && 'justify-center px-2'
            )}
          >
            <LogOut size={18} />
            {!collapsed && <span>Sign out</span>}
          </button>
        </div>
      </aside>
    </>
  );
}

function TopBar({ page, setPage, setMobileOpen, collapsed }) {
  const { session, theme, setTheme, students, universities, employees, toast } = useApp();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const searchRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === 'Escape') setSearchOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus();
  }, [searchOpen]);

  const results = useMemo(() => {
    if (!query.trim()) return { students: [], universities: [], employees: [], applications: [] };
    const q = query.toLowerCase();
    return {
      students: students.filter(s => s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q)).slice(0, 5),
      universities: universities.filter(u => u.name.toLowerCase().includes(q) || u.course.toLowerCase().includes(q)).slice(0, 5),
      employees: employees.filter(e => e.name.toLowerCase().includes(q)).slice(0, 5),
      applications: students.filter(s => s.status.toLowerCase().includes(q)).slice(0, 5),
    };
  }, [query, students, universities, employees]);

  const breadcrumbs = {
    dashboard: 'Overview',
    students: session?.role === 'Admin' ? 'Students' : 'My Students',
    'student-detail': 'Student Detail',
    'student-form': 'Student Form',
    leads: 'Leads',
    applications: 'Applications',
    payments: 'Payments',
    universities: 'Universities',
    employees: 'Employees',
    audit: 'Audit Center',
    reports: 'Reports',
    settings: 'Settings',
    profile: 'Profile',
  };

  return (
    <>
      <header className="sticky top-0 z-30 h-14 bg-white/80 backdrop-blur border-b border-border flex items-center px-4 gap-3">
        <button className="lg:hidden p-2 rounded-lg hover:bg-slate-100" onClick={() => setMobileOpen(true)}>
          <Menu size={20} />
        </button>
        <button className="hidden lg:flex p-2 rounded-lg hover:bg-slate-100 text-slate-500" onClick={() => {}}>
          {/* collapse handled externally */}
        </button>
        <div className="flex items-center gap-1.5 text-sm text-slate-500">
          <Home size={14} />
          <ChevronRight size={14} />
          <span className="font-medium text-text">{breadcrumbs[page] || page}</span>
        </div>
        <div className="flex-1" />
        <button
          onClick={() => setSearchOpen(true)}
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-border bg-slate-50 text-sm text-slate-500 hover:bg-slate-100 transition w-56"
        >
          <Search size={14} />
          <span className="flex-1 text-left">Search...</span>
          <kbd className="text-[10px] font-medium bg-white border border-border rounded px-1.5 py-0.5">⌘K</kbd>
        </button>
        <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 relative">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-danger" />
        </button>
        <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500">
          <HelpCircle size={18} />
        </button>
        <div className="flex items-center gap-2 pl-2 border-l border-border">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-semibold">
            {session?.name?.[0] || 'U'}
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-text leading-tight">{session?.name}</p>
            <p className="text-[11px] text-slate-400 leading-tight">{session?.role}</p>
          </div>
        </div>
      </header>

      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSearchOpen(false)} />
          <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-xl border border-border overflow-hidden">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
              <Search size={18} className="text-slate-400" />
              <input
                ref={searchRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search students, universities, employees..."
                className="flex-1 text-sm outline-none bg-transparent"
              />
              <kbd className="text-[10px] font-medium bg-slate-100 border border-border rounded px-1.5 py-0.5 text-slate-500">ESC</kbd>
            </div>
            <div className="max-h-80 overflow-y-auto p-2">
              {!query.trim() && <p className="text-sm text-slate-400 p-3 text-center">Type to search across records</p>}
              {query.trim() && Object.entries(results).map(([group, items]) => items.length > 0 && (
                <div key={group} className="mb-2">
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 py-1">{group}</p>
                  {items.map(item => (
                    <button
                      key={item.id}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-50 text-left text-sm"
                      onClick={() => {
                        if (group === 'students' || group === 'applications') {
                          setPage('student-detail');
                          window.__selectedStudentId = item.id;
                        } else if (group === 'universities') setPage('universities');
                        else if (group === 'employees') setPage('employees');
                        setSearchOpen(false);
                      }}
                    >
                      <span className="font-medium text-text">{item.name || item.id}</span>
                      <span className="text-slate-400 text-xs">{item.status || item.course || item.role || ''}</span>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ===================== LOGIN =====================
function LoginPage() {
  const { login } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(true);

  const fillAdmin = () => { setEmail('admin@samp.demo'); setPassword('demo123'); };
  const fillEmployee = () => { setEmail('nagaraju@samp.demo'); setPassword('demo123'); };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.includes('admin')) {
      login({ id: 'e11', name: 'Admin User', role: 'Admin', email });
    } else {
      login({ id: 'e1', name: 'Nagaraju', role: 'Employee', email });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex w-12 h-12 rounded-2xl bg-primary items-center justify-center mb-4">
            <GraduationCap size={24} className="text-white" />
          </div>
          <h1 className="text-2xl font-semibold text-text">Welcome back</h1>
          <p className="text-sm text-slate-500 mt-1">Student & Application Management Platform</p>
        </div>
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Email" type="email" placeholder="you@company.com" value={email} onChange={e => setEmail(e.target.value)} required />
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-700">Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-3 py-2 pr-10 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  placeholder="••••••••"
                  required
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} className="rounded border-border text-primary focus:ring-primary" />
                <span className="text-slate-600">Remember me</span>
              </label>
              <button type="button" className="text-primary hover:underline">Forgot password?</button>
            </div>
            <Button type="submit" className="w-full" size="lg">Sign in</Button>
          </form>
          <div className="mt-5 pt-5 border-t border-border space-y-2">
            <p className="text-xs text-center text-slate-400 mb-3">Quick demo access</p>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="secondary" size="sm" onClick={fillAdmin}>Login as Admin</Button>
              <Button variant="secondary" size="sm" onClick={fillEmployee}>Login as Employee</Button>
            </div>
          </div>
        </Card>
        <p className="text-center text-xs text-slate-400 mt-6 flex items-center justify-center gap-1.5">
          <AlertCircle size={12} />
          Demo mode – frontend prototype only. No real authentication.
        </p>
      </div>
    </div>
  );
}

// ===================== DASHBOARDS =====================
function MetricCard({ label, value, sub, icon: Icon, color = 'primary' }) {
  const colors = {
    primary: 'bg-primary/10 text-primary',
    success: 'bg-emerald-50 text-success',
    warning: 'bg-amber-50 text-warning',
    danger: 'bg-red-50 text-danger',
    info: 'bg-cyan-50 text-info',
  };
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{label}</p>
          <p className="text-2xl font-semibold text-text mt-1">{value}</p>
          {sub && <p className="text-xs text-slate-400 mt-0.5">{sub}</p>}
        </div>
        <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center', colors[color])}>
          <Icon size={18} />
        </div>
      </div>
    </Card>
  );
}

function AdminDashboard() {
  const { students, employees } = useApp();
  const metrics = useMemo(() => {
    const total = students.length;
    const direct = students.filter(s => s.leadType === 'Direct').length;
    const b2b = students.filter(s => s.leadType === 'B2B').length;
    const offered = students.filter(s => s.status === 'Offered').length;
    const waiting = students.filter(s => s.status === 'Waiting').length;
    const deferred = students.filter(s => s.status === 'Deferred').length;
    const dropped = students.filter(s => s.status === 'Dropped').length;
    const privateShifted = students.filter(s => s.status === 'Private Shifted').length;
    const stillThinking = students.filter(s => s.status === 'Still Thinking').length;
    const privateUni = students.filter(s => s.status === 'Private Registered' || s.status === 'Private Shifted').length;
    const leadBy = {};
    students.forEach(s => { leadBy[s.leadBy] = (leadBy[s.leadBy] || 0) + 1; });
    return { total, direct, b2b, offered, waiting, deferred, dropped, privateShifted, stillThinking, privateUni, leadBy };
  }, [students]);

  const statusDist = useMemo(() => {
    const m = {};
    STATUSES.forEach(s => m[s] = 0);
    students.forEach(s => { m[s.status] = (m[s.status] || 0) + 1; });
    return m;
  }, [students]);

  const countryMix = useMemo(() => {
    const m = {};
    students.forEach(s => { m[s.country] = (m[s.country] || 0) + 1; });
    return m;
  }, [students]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-text">Admin Overview</h1>
          <p className="text-sm text-slate-500">Organization-wide operational metrics</p>
        </div>
        <div className="flex items-center gap-2">
          <Select className="w-40">
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>This year</option>
          </Select>
          <Button variant="secondary" size="sm"><Download size={14} /> Export</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        <MetricCard label="Total Students" value={metrics.total} icon={Users} color="primary" />
        <MetricCard label="Direct" value={metrics.direct} icon={UserPlus} color="info" />
        <MetricCard label="B2B" value={metrics.b2b} icon={Briefcase} color="info" />
        <MetricCard label="Private Uni" value={metrics.privateUni} icon={Building2} color="warning" />
        <MetricCard label="Offers" value={metrics.offered} icon={CheckCircle2} color="success" />
        <MetricCard label="Waiting" value={metrics.waiting} icon={Clock} color="warning" />
        <MetricCard label="Deferred" value={metrics.deferred} icon={Calendar} color="warning" />
        <MetricCard label="Dropped" value={metrics.dropped} icon={XCircle} color="danger" />
        <MetricCard label="Private Shifted" value={metrics.privateShifted} icon={RefreshCw} color="info" />
        <MetricCard label="Still Thinking" value={metrics.stillThinking} icon={AlertCircle} color="warning" />
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card className="p-5">
          <h3 className="text-sm font-semibold text-text mb-4">Application Status Distribution</h3>
          <div className="space-y-2">
            {Object.entries(statusDist).filter(([, v]) => v > 0).map(([status, count]) => (
              <div key={status} className="flex items-center gap-3">
                <div className="w-32 text-xs text-slate-600 truncate">{status}</div>
                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${(count / students.length) * 100}%` }} />
                </div>
                <div className="w-8 text-xs font-medium text-slate-700 text-right">{count}</div>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-5">
          <h3 className="text-sm font-semibold text-text mb-4">Country Mix</h3>
          <div className="space-y-2">
            {Object.entries(countryMix).sort((a, b) => b[1] - a[1]).map(([country, count]) => (
              <div key={country} className="flex items-center gap-3">
                <div className="w-24 text-xs text-slate-600">{country}</div>
                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-info rounded-full" style={{ width: `${(count / students.length) * 100}%` }} />
                </div>
                <div className="w-8 text-xs font-medium text-slate-700 text-right">{count}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card className="p-5">
          <h3 className="text-sm font-semibold text-text mb-4">Lead by Employee</h3>
          <div className="space-y-2">
            {Object.entries(metrics.leadBy).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([name, count]) => (
              <div key={name} className="flex items-center justify-between py-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-semibold flex items-center justify-center">{name[0]}</div>
                  <span className="text-sm text-text">{name}</span>
                </div>
                <span className="text-sm font-medium text-slate-600">{count}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-5">
          <h3 className="text-sm font-semibold text-text mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {students.slice(0, 6).map(s => (
              <div key={s.id} className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
                <div>
                  <p className="text-sm text-text"><span className="font-medium">{s.name}</span> — {s.status}</p>
                  <p className="text-xs text-slate-400">{s.leadBy} · {s.country}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function EmployeeDashboard() {
  const { students, session } = useApp();
  const mine = useMemo(() => students.filter(s => s.leadById === session?.id || s.leadBy === session?.name), [students, session]);
  const pendingPay = mine.filter(s => s.paymentStatus === 'Pending' || s.paymentStatus === 'Overdue');
  const offered = mine.filter(s => s.status === 'Offered' || s.status === 'Got Visa');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-text">My Workload</h1>
        <p className="text-sm text-slate-500">Assigned students and next actions</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <MetricCard label="My Students" value={mine.length} icon={Users} />
        <MetricCard label="Applications" value={mine.length} icon={FileText} color="info" />
        <MetricCard label="Offers / Visa" value={offered.length} icon={CheckCircle2} color="success" />
        <MetricCard label="Pending Payments" value={pendingPay.length} icon={CreditCard} color="warning" />
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        <Card className="p-5">
          <h3 className="text-sm font-semibold text-text mb-4">Work Queue</h3>
          <div className="space-y-2">
            {mine.filter(s => ['Waiting', 'Applications on Hold', 'Still Thinking', 'Shortlisting Sent'].includes(s.status)).slice(0, 8).map(s => (
              <div key={s.id} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-border transition">
                <div>
                  <p className="text-sm font-medium text-text">{s.name}</p>
                  <p className="text-xs text-slate-400">{s.id} · {s.country}</p>
                </div>
                <StatusBadge status={s.status} />
              </div>
            ))}
            {mine.length === 0 && <EmptyState icon={Users} title="No assigned students" description="Students assigned to you will appear here." />}
          </div>
        </Card>
        <Card className="p-5">
          <h3 className="text-sm font-semibold text-text mb-4">Pending Payments</h3>
          <div className="space-y-2">
            {pendingPay.slice(0, 8).map(s => (
              <div key={s.id} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50">
                <div>
                  <p className="text-sm font-medium text-text">{s.name}</p>
                  <p className="text-xs text-slate-400">Remaining: €{s.remainingPayment}</p>
                </div>
                <Badge variant={s.paymentStatus === 'Overdue' ? 'danger' : 'warning'}>{s.paymentStatus}</Badge>
              </div>
            ))}
            {pendingPay.length === 0 && <p className="text-sm text-slate-400 text-center py-8">No pending payments</p>}
          </div>
        </Card>
      </div>
    </div>
  );
}

// ===================== STUDENTS =====================
function StudentsPage({ setPage }) {
  const { students, session, toast } = useApp();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  const [pageNum, setPageNum] = useState(1);
  const perPage = 10;

  const filtered = useMemo(() => {
    let list = session?.role === 'Employee'
      ? students.filter(s => s.leadById === session.id || s.leadBy === session.name)
      : students;
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(s => s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q) || s.university?.toLowerCase().includes(q));
    }
    if (statusFilter) list = list.filter(s => s.status === statusFilter);
    if (countryFilter) list = list.filter(s => s.country === countryFilter);
    return list;
  }, [students, search, statusFilter, countryFilter, session]);

  const totalPages = Math.ceil(filtered.length / perPage) || 1;
  const pageData = filtered.slice((pageNum - 1) * perPage, pageNum * perPage);

  const exportCsv = () => {
    const headers = ['ID', 'Name', 'Country', 'Intake', 'Status', 'Lead By', 'University', 'Payment Status'];
    const rows = filtered.map(s => [s.id, s.name, s.country, s.intake, s.status, s.leadBy, s.university, s.paymentStatus]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'students.csv'; a.click();
    toast('success', 'Export ready', 'CSV downloaded (prototype)');
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-text">{session?.role === 'Admin' ? 'Students' : 'My Students'}</h1>
          <p className="text-sm text-slate-500">{filtered.length} records</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={exportCsv}><Download size={14} /> Export</Button>
          <Button size="sm" onClick={() => { window.__editStudentId = null; setPage('student-form'); }}>
            <Plus size={14} /> Add Student
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="p-4 border-b border-border flex flex-wrap gap-2">
          <div className="relative flex-1 min-w-[180px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={e => { setSearch(e.target.value); setPageNum(1); }}
              placeholder="Search by name, ID, university..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <Select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPageNum(1); }} className="w-44">
            <option value="">All statuses</option>
            {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </Select>
          <Select value={countryFilter} onChange={e => { setCountryFilter(e.target.value); setPageNum(1); }} className="w-36">
            <option value="">All countries</option>
            {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
          </Select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-slate-50/80">
                <th className="text-left px-4 py-3 font-medium text-slate-500 sticky top-0">Student ID</th>
                <th className="text-left px-4 py-3 font-medium text-slate-500">Name</th>
                <th className="text-left px-4 py-3 font-medium text-slate-500">Country</th>
                <th className="text-left px-4 py-3 font-medium text-slate-500">Intake</th>
                <th className="text-left px-4 py-3 font-medium text-slate-500">Status</th>
                <th className="text-left px-4 py-3 font-medium text-slate-500">Lead by</th>
                <th className="text-left px-4 py-3 font-medium text-slate-500">University</th>
                <th className="text-left px-4 py-3 font-medium text-slate-500">Payment</th>
                <th className="text-right px-4 py-3 font-medium text-slate-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pageData.map(s => (
                <tr key={s.id} className="border-b border-border last:border-0 hover:bg-slate-50/50 transition">
                  <td className="px-4 py-3 font-mono text-xs text-slate-600">{s.id}</td>
                  <td className="px-4 py-3 font-medium text-text">{s.name}</td>
                  <td className="px-4 py-3 text-slate-600">{s.country}</td>
                  <td className="px-4 py-3 text-slate-600">{s.intake}</td>
                  <td className="px-4 py-3"><StatusBadge status={s.status} /></td>
                  <td className="px-4 py-3 text-slate-600">{s.leadBy}</td>
                  <td className="px-4 py-3 text-slate-600 truncate max-w-[140px]">{s.university}</td>
                  <td className="px-4 py-3">
                    <Badge variant={s.paymentStatus === 'Paid' ? 'success' : s.paymentStatus === 'Overdue' ? 'danger' : 'warning'}>
                      {s.paymentStatus}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="ghost" size="icon" onClick={() => { window.__selectedStudentId = s.id; setPage('student-detail'); }}>
                      <Eye size={16} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {pageData.length === 0 && (
            <EmptyState icon={Users} title="No students found" description="Try adjusting filters or add a new student." action={
              <Button size="sm" onClick={() => { window.__editStudentId = null; setPage('student-form'); }}><Plus size={14} /> Add Student</Button>
            } />
          )}
        </div>
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-border">
            <p className="text-xs text-slate-500">Page {pageNum} of {totalPages}</p>
            <div className="flex gap-1">
              <Button variant="secondary" size="sm" disabled={pageNum === 1} onClick={() => setPageNum(p => p - 1)}><ChevronsLeft size={14} /></Button>
              <Button variant="secondary" size="sm" disabled={pageNum === totalPages} onClick={() => setPageNum(p => p + 1)}><ChevronsRight size={14} /></Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

// ===================== STUDENT FORM =====================
function StudentFormPage({ setPage }) {
  const { students, addStudent, updateStudent, toast, session, addAudit } = useApp();
  const editId = window.__editStudentId;
  const existing = editId ? students.find(s => s.id === editId) : null;
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(existing || {
    name: '', country: '', intake: INTAKES[0], branch: BRANCHES[0], cgpa: '', ielts: '', germanGrade: '',
    phone1: '', phone2: '', gmail: '', gmailPassword: '', recoveryNo: '', device: '', twoStep: false,
    apsUsername: '', apsPassword: '', uniAssistId: '', uniAssistPassword: '', uniAssistDocs: false,
    blockedAccount: 'Not Applied', enrollment: 'Not Applied', studentDorm: 'Not Applied',
    status: 'Shortlisting Sent', leadType: 'Direct', b2bName: '', university: '', course: '',
    college: '', germanLanguage: '', gre: '',
    totalFee: 1500, initialPayment: 500, remainingPayment: 1000, discount: 0, paymentStatus: 'Pending',
  });
  const [errors, setErrors] = useState({});
  const [showSensitive, setShowSensitive] = useState({});

  const steps = ['Personal', 'Academic', 'Account', 'Application', 'Payment', 'Review'];
  const isGermany = form.country === 'Germany';

  const update = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const validateStep = () => {
    const e = {};
    if (step === 0) {
      if (!form.name.trim()) e.name = 'Required';
      if (!form.country) e.country = 'Required';
      if (!form.phone1.trim()) e.phone1 = 'Required';
    }
    if (step === 1) {
      if (!form.branch) e.branch = 'Required';
    }
    if (step === 2) {
      if (!form.gmail.trim()) e.gmail = 'Required';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validateStep()) setStep(s => Math.min(s + 1, steps.length - 1)); };
  const prev = () => setStep(s => Math.max(s - 1, 0));

  const submit = () => {
    if (existing) {
      updateStudent(editId, form);
      addAudit({ action: 'UPDATE', module: 'Students', recordId: editId, severity: 'INFO' });
      toast('success', 'Student updated', form.name);
    } else {
      const id = `W26_${String(students.length + 1).padStart(3, '0')}`;
      const record = {
        ...form,
        id,
        leadBy: session?.name || 'Nagaraju',
        leadById: session?.id || 'e1',
        createdAt: new Date().toISOString(),
        timeline: [{ id: 't1', action: 'CREATE', label: 'Student registered', at: new Date().toISOString(), by: session?.name }],
      };
      addStudent(record);
      addAudit({ action: 'CREATE', module: 'Students', recordId: id, severity: 'SUCCESS' });
      toast('success', 'Student created', form.name);
    }
    window.__editStudentId = null;
    setPage('students');
  };

  const SensitiveField = ({ label, field, type = 'password' }) => (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-slate-700">{label}</label>
      <div className="relative">
        <input
          type={showSensitive[field] ? 'text' : type}
          value={form[field] || ''}
          onChange={e => update(field, e.target.value)}
          className="w-full px-3 py-2 pr-20 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          placeholder="••••••••"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
          <button type="button" onClick={() => setShowSensitive(s => ({ ...s, [field]: !s[field] }))} className="p-1 text-slate-400 hover:text-slate-600">
            {showSensitive[field] ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
          <button type="button" onClick={() => { navigator.clipboard?.writeText(form[field] || ''); toast('info', 'Copied'); }} className="p-1 text-slate-400 hover:text-slate-600">
            <Copy size={14} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => setPage('students')}><ArrowLeft size={18} /></Button>
        <div>
          <h1 className="text-xl font-semibold text-text">{existing ? 'Edit Student' : 'Add Student'}</h1>
          <p className="text-sm text-slate-500">Step {step + 1} of {steps.length}: {steps[step]}</p>
        </div>
      </div>

      {/* Progress */}
      <div className="flex gap-1">
        {steps.map((s, i) => (
          <div key={s} className={cn('h-1.5 flex-1 rounded-full transition', i <= step ? 'bg-primary' : 'bg-slate-200')} />
        ))}
      </div>

      {step === 2 && (
        <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-50 border border-amber-200 text-sm text-amber-800">
          <AlertTriangle size={16} className="shrink-0 mt-0.5" />
          <span>Sensitive credentials are masked by default. This is a frontend prototype — never store real passwords in production without encryption.</span>
        </div>
      )}

      <Card className="p-6">
        {step === 0 && (
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Full Name *" value={form.name} onChange={e => update('name', e.target.value)} error={errors.name} />
            <Select label="Country *" value={form.country} onChange={e => update('country', e.target.value)} error={errors.country}>
              <option value="">Select country</option>
              {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
            </Select>
            <Select label="Intake" value={form.intake} onChange={e => update('intake', e.target.value)}>
              {INTAKES.map(i => <option key={i} value={i}>{i}</option>)}
            </Select>
            <Input label="Phone No. 1 *" value={form.phone1} onChange={e => update('phone1', e.target.value)} error={errors.phone1} />
            <Input label="Phone No. 2" value={form.phone2} onChange={e => update('phone2', e.target.value)} />
          </div>
        )}
        {step === 1 && (
          <div className="grid sm:grid-cols-2 gap-4">
            <Select label="Branch *" value={form.branch} onChange={e => update('branch', e.target.value)}>
              {BRANCHES.map(b => <option key={b} value={b}>{b}</option>)}
            </Select>
            <Input label="CGPA" value={form.cgpa} onChange={e => update('cgpa', e.target.value)} type="number" step="0.1" />
            <Input label="IELTS / TOEFL / Duolingo" value={form.ielts} onChange={e => update('ielts', e.target.value)} />
            {isGermany && <Input label="German Grade" value={form.germanGrade} onChange={e => update('germanGrade', e.target.value)} />}
            <Input label="GRE (optional)" value={form.gre} onChange={e => update('gre', e.target.value)} />
            <Input label="College / University" value={form.college} onChange={e => update('college', e.target.value)} />
            {isGermany && (
              <Select label="German Language" value={form.germanLanguage} onChange={e => update('germanLanguage', e.target.value)}>
                <option value="">Select</option>
                {['A1', 'A2', 'B1', 'B2', 'C1'].map(l => <option key={l} value={l}>{l}</option>)}
              </Select>
            )}
          </div>
        )}
        {step === 2 && (
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Gmail ID *" type="email" value={form.gmail} onChange={e => update('gmail', e.target.value)} error={errors.gmail} />
            <SensitiveField label="Gmail Password" field="gmailPassword" />
            <Input label="Recovery No." value={form.recoveryNo} onChange={e => update('recoveryNo', e.target.value)} />
            <Input label="Device" value={form.device} onChange={e => update('device', e.target.value)} />
            <label className="flex items-center gap-2 text-sm col-span-full">
              <input type="checkbox" checked={form.twoStep} onChange={e => update('twoStep', e.target.checked)} className="rounded" />
              2-Step Verification enabled
            </label>
            {isGermany && (
              <>
                <div className="col-span-full border-t border-border pt-4 mt-2">
                  <p className="text-sm font-semibold text-text mb-3">Germany-specific fields</p>
                </div>
                <Input label="APS Username" value={form.apsUsername} onChange={e => update('apsUsername', e.target.value)} />
                <SensitiveField label="APS Password" field="apsPassword" />
                <Input label="Uni-Assist ID" value={form.uniAssistId} onChange={e => update('uniAssistId', e.target.value)} />
                <SensitiveField label="Uni-Assist Password" field="uniAssistPassword" />
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={form.uniAssistDocs} onChange={e => update('uniAssistDocs', e.target.checked)} className="rounded" />
                  Uni-Assist Docs Uploaded
                </label>
                <Select label="Blocked Account" value={form.blockedAccount} onChange={e => update('blockedAccount', e.target.value)}>
                  <option>Applied</option><option>Not Applied</option>
                </Select>
                <Select label="Enrollment" value={form.enrollment} onChange={e => update('enrollment', e.target.value)}>
                  <option>Applied</option><option>Not Applied</option>
                </Select>
                <Select label="Student Dorm" value={form.studentDorm} onChange={e => update('studentDorm', e.target.value)}>
                  <option>Applied</option><option>Not Applied</option>
                </Select>
              </>
            )}
          </div>
        )}
        {step === 3 && (
          <div className="grid sm:grid-cols-2 gap-4">
            <Select label="Application Status" value={form.status} onChange={e => update('status', e.target.value)}>
              {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </Select>
            <Select label="Lead Type" value={form.leadType} onChange={e => update('leadType', e.target.value)}>
              <option value="Direct">Direct</option>
              <option value="B2B">B2B</option>
            </Select>
            {form.leadType === 'B2B' && (
              <Input label="B2B Name" value={form.b2bName} onChange={e => update('b2bName', e.target.value)} />
            )}
            <Input label="Target University" value={form.university} onChange={e => update('university', e.target.value)} />
            <Input label="Course" value={form.course} onChange={e => update('course', e.target.value)} />
          </div>
        )}
        {step === 4 && (
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Total Processing Fee (€)" type="number" value={form.totalFee} onChange={e => update('totalFee', Number(e.target.value))} />
            <Input label="Initial Payment (€)" type="number" value={form.initialPayment} onChange={e => {
              const v = Number(e.target.value);
              update('initialPayment', v);
              update('remainingPayment', Math.max(0, form.totalFee - form.discount - v));
            }} />
            <Input label="Remaining Payment (€)" type="number" value={form.remainingPayment} onChange={e => update('remainingPayment', Number(e.target.value))} />
            <Input label="Discount (€)" type="number" value={form.discount} onChange={e => update('discount', Number(e.target.value))} />
            <Select label="Payment Status" value={form.paymentStatus} onChange={e => update('paymentStatus', e.target.value)}>
              {['Paid', 'Partially Paid', 'Pending', 'Overdue'].map(s => <option key={s} value={s}>{s}</option>)}
            </Select>
          </div>
        )}
        {step === 5 && (
          <div className="space-y-4 text-sm">
            <div className="grid sm:grid-cols-2 gap-3">
              <div><span className="text-slate-500">Name:</span> <span className="font-medium">{form.name}</span></div>
              <div><span className="text-slate-500">Country:</span> <span className="font-medium">{form.country}</span></div>
              <div><span className="text-slate-500">Intake:</span> <span className="font-medium">{form.intake}</span></div>
              <div><span className="text-slate-500">Branch:</span> <span className="font-medium">{form.branch}</span></div>
              <div><span className="text-slate-500">Status:</span> <StatusBadge status={form.status} /></div>
              <div><span className="text-slate-500">Lead Type:</span> <span className="font-medium">{form.leadType}</span></div>
              <div><span className="text-slate-500">University:</span> <span className="font-medium">{form.university || '—'}</span></div>
              <div><span className="text-slate-500">Payment:</span> <span className="font-medium">{form.paymentStatus} (€{form.remainingPayment} remaining)</span></div>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-8 pt-4 border-t border-border">
          <Button variant="secondary" onClick={prev} disabled={step === 0}><ArrowLeft size={14} /> Back</Button>
          {step < steps.length - 1 ? (
            <Button onClick={next}>Continue <ArrowRight size={14} /></Button>
          ) : (
            <Button onClick={submit}><Check size={14} /> {existing ? 'Save Changes' : 'Create Student'}</Button>
          )}
        </div>
      </Card>
    </div>
  );
}

// ===================== STUDENT DETAIL =====================
function StudentDetailPage({ setPage }) {
  const { students, updateStudent, addAudit, toast, session } = useApp();
  const id = window.__selectedStudentId;
  const student = students.find(s => s.id === id);
  const [statusModal, setStatusModal] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [drawer, setDrawer] = useState(false);

  if (!student) {
    return (
      <EmptyState icon={Users} title="Student not found" description="The selected student could not be loaded." action={
        <Button onClick={() => setPage('students')}>Back to list</Button>
      } />
    );
  }

  const changeStatus = () => {
    const before = student.status;
    updateStudent(id, {
      status: newStatus,
      timeline: [
        ...(student.timeline || []),
        { id: `t-${Date.now()}`, action: 'STATUS_CHANGE', label: `Status → ${newStatus}`, at: new Date().toISOString(), by: session?.name },
      ],
    });
    addAudit({ action: 'STATUS_CHANGE', module: 'Students', recordId: id, before, after: newStatus, severity: 'INFO' });
    toast('success', 'Status updated', `${before} → ${newStatus}`);
    setStatusModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <Button variant="ghost" size="icon" onClick={() => setPage('students')}><ArrowLeft size={18} /></Button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold text-text">{student.name}</h1>
              <StatusBadge status={student.status} />
            </div>
            <p className="text-sm text-slate-500 font-mono mt-0.5">{student.id} · {student.country} · {student.intake}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={() => setDrawer(true)}><Activity size={14} /> Timeline</Button>
          <Button variant="secondary" size="sm" onClick={() => { setNewStatus(student.status); setStatusModal(true); }}>Change Status</Button>
          <Button size="sm" onClick={() => { window.__editStudentId = id; setPage('student-form'); }}><Edit2 size={14} /> Edit</Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="p-5 lg:col-span-2 space-y-5">
          <section>
            <h3 className="text-sm font-semibold text-text mb-3 flex items-center gap-2"><Users size={16} /> Profile</h3>
            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              <div><span className="text-slate-500">Phone:</span> {student.phone1}</div>
              <div><span className="text-slate-500">Email:</span> {student.gmail}</div>
              <div><span className="text-slate-500">Lead by:</span> {student.leadBy}</div>
              <div><span className="text-slate-500">Lead type:</span> {student.leadType}{student.b2bName ? ` (${student.b2bName})` : ''}</div>
            </div>
          </section>
          <section className="border-t border-border pt-5">
            <h3 className="text-sm font-semibold text-text mb-3 flex items-center gap-2"><GraduationCap size={16} /> Academic</h3>
            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              <div><span className="text-slate-500">Branch:</span> {student.branch}</div>
              <div><span className="text-slate-500">CGPA:</span> {student.cgpa}</div>
              <div><span className="text-slate-500">IELTS:</span> {student.ielts}</div>
              <div><span className="text-slate-500">College:</span> {student.college}</div>
              {student.germanGrade && <div><span className="text-slate-500">German Grade:</span> {student.germanGrade}</div>}
              {student.germanLanguage && <div><span className="text-slate-500">German Language:</span> {student.germanLanguage}</div>}
            </div>
          </section>
          {student.country === 'Germany' && (
            <section className="border-t border-border pt-5">
              <h3 className="text-sm font-semibold text-text mb-3 flex items-center gap-2"><MapPin size={16} /> Germany Process</h3>
              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                <div><span className="text-slate-500">APS:</span> {student.apsUsername || '—'}</div>
                <div><span className="text-slate-500">Uni-Assist:</span> {student.uniAssistId || '—'}</div>
                <div><span className="text-slate-500">Blocked Account:</span> {student.blockedAccount}</div>
                <div><span className="text-slate-500">Enrollment:</span> {student.enrollment}</div>
                <div><span className="text-slate-500">Student Dorm:</span> {student.studentDorm}</div>
              </div>
            </section>
          )}
          <section className="border-t border-border pt-5">
            <h3 className="text-sm font-semibold text-text mb-3 flex items-center gap-2"><Building2 size={16} /> University & Application</h3>
            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              <div><span className="text-slate-500">University:</span> {student.university}</div>
              <div><span className="text-slate-500">Course:</span> {student.course || student.branch}</div>
              <div><span className="text-slate-500">Status:</span> <StatusBadge status={student.status} /></div>
            </div>
          </section>
        </Card>

        <div className="space-y-4">
          <Card className="p-5">
            <h3 className="text-sm font-semibold text-text mb-3 flex items-center gap-2"><CreditCard size={16} /> Payments</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-slate-500">Total Fee</span><span className="font-medium">€{student.totalFee}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Initial</span><span>€{student.initialPayment}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Remaining</span><span className="font-medium">€{student.remainingPayment}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Discount</span><span>€{student.discount}</span></div>
              <div className="pt-2"><Badge variant={student.paymentStatus === 'Paid' ? 'success' : student.paymentStatus === 'Overdue' ? 'danger' : 'warning'}>{student.paymentStatus}</Badge></div>
            </div>
          </Card>
          <Card className="p-5">
            <h3 className="text-sm font-semibold text-text mb-3 flex items-center gap-2"><Clock size={16} /> Recent Timeline</h3>
            <div className="space-y-3">
              {(student.timeline || []).slice(-5).reverse().map(t => (
                <div key={t.id} className="flex gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  <div>
                    <p className="text-text">{t.label}</p>
                    <p className="text-xs text-slate-400">{t.by} · {new Date(t.at).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <Modal open={statusModal} onClose={() => setStatusModal(false)} title="Change Application Status">
        <div className="space-y-4">
          <p className="text-sm text-slate-500">Current: <StatusBadge status={student.status} /></p>
          <Select label="New status" value={newStatus} onChange={e => setNewStatus(e.target.value)}>
            {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </Select>
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setStatusModal(false)}>Cancel</Button>
            <Button onClick={changeStatus} disabled={newStatus === student.status}>Confirm Change</Button>
          </div>
        </div>
      </Modal>

      <Drawer open={drawer} onClose={() => setDrawer(false)} title="Activity Timeline">
        <div className="space-y-4">
          {(student.timeline || []).slice().reverse().map(t => (
            <div key={t.id} className="flex gap-3 pb-4 border-b border-border last:border-0">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Activity size={14} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-text">{t.label}</p>
                <p className="text-xs text-slate-400 mt-0.5">{t.by} · {new Date(t.at).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </Drawer>
    </div>
  );
}

// ===================== LEADS & APPLICATIONS =====================
function LeadsApplicationsPage({ mode = 'leads' }) {
  const { students, session } = useApp();
  const [view, setView] = useState('table');
  const [statusFilter, setStatusFilter] = useState('');

  // Different status sets for leads vs applications
  const LEAD_STATUSES = ['Shortlisting Sent', 'Still Thinking', 'Dropped', 'Private Registered', 'Private Shifted'];
  const APP_STATUSES = ['Applications Started', 'Applications on Hold', 'Offered', 'Waiting', 'Deferred', 'Got Visa'];

  const relevantStatuses = mode === 'leads' ? LEAD_STATUSES : APP_STATUSES;

  const list = useMemo(() => {
    let data = session?.role === 'Employee'
      ? students.filter(s => s.leadById === session.id || s.leadBy === session.name)
      : students;
    // Filter by mode-relevant statuses
    data = data.filter(s => relevantStatuses.includes(s.status));
    if (statusFilter) data = data.filter(s => s.status === statusFilter);
    return data;
  }, [students, session, statusFilter, mode]);

  const pipelineStatuses = mode === 'leads' ? LEAD_STATUSES : APP_STATUSES;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-text">{mode === 'leads' ? 'Leads' : 'Applications'}</h1>
          <p className="text-sm text-slate-500">
            {mode === 'leads'
              ? `${list.length} leads in pipeline \u2014 track inquiries and potential students`
              : `${list.length} active applications \u2014 monitor university application progress`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="w-44">
            <option value="">All statuses</option>
            {relevantStatuses.map(s => <option key={s} value={s}>{s}</option>)}
          </Select>
          <div className="flex rounded-xl border border-border overflow-hidden">
            <button onClick={() => setView('table')} className={cn('px-3 py-1.5 text-sm', view === 'table' ? 'bg-primary text-white' : 'bg-white text-slate-600')}><List size={14} /></button>
            <button onClick={() => setView('pipeline')} className={cn('px-3 py-1.5 text-sm', view === 'pipeline' ? 'bg-primary text-white' : 'bg-white text-slate-600')}><Columns size={14} /></button>
          </div>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {relevantStatuses.map(status => {
          const count = list.filter(s => s.status === status).length;
          return (
            <div key={status} className="bg-white rounded-xl border border-border p-3 shadow-soft">
              <p className="text-xs text-slate-500 truncate">{status}</p>
              <p className="text-lg font-semibold text-text mt-0.5">{count}</p>
            </div>
          );
        })}
      </div>

      {view === 'table' ? (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-slate-50/80">
                  <th className="text-left px-4 py-3 font-medium text-slate-500">Student</th>
                  {mode === 'leads' ? (
                    <>
                      <th className="text-left px-4 py-3 font-medium text-slate-500">Country</th>
                      <th className="text-left px-4 py-3 font-medium text-slate-500">Branch</th>
                      <th className="text-left px-4 py-3 font-medium text-slate-500">Lead Type</th>
                      <th className="text-left px-4 py-3 font-medium text-slate-500">B2B Partner</th>
                      <th className="text-left px-4 py-3 font-medium text-slate-500">Phone</th>
                      <th className="text-left px-4 py-3 font-medium text-slate-500">Status</th>
                      <th className="text-left px-4 py-3 font-medium text-slate-500">Assigned To</th>
                    </>
                  ) : (
                    <>
                      <th className="text-left px-4 py-3 font-medium text-slate-500">University</th>
                      <th className="text-left px-4 py-3 font-medium text-slate-500">Course</th>
                      <th className="text-left px-4 py-3 font-medium text-slate-500">Country</th>
                      <th className="text-left px-4 py-3 font-medium text-slate-500">Intake</th>
                      <th className="text-left px-4 py-3 font-medium text-slate-500">Status</th>
                      <th className="text-left px-4 py-3 font-medium text-slate-500">Employee</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {list.slice(0, 20).map(s => (
                  <tr key={s.id} className="border-b border-border last:border-0 hover:bg-slate-50/50">
                    <td className="px-4 py-3">
                      <p className="font-medium">{s.name}</p>
                      <p className="text-xs text-slate-400 font-mono">{s.id}</p>
                    </td>
                    {mode === 'leads' ? (
                      <>
                        <td className="px-4 py-3 text-slate-600">{s.country}</td>
                        <td className="px-4 py-3 text-slate-600">{s.branch}</td>
                        <td className="px-4 py-3"><Badge variant={s.leadType === 'B2B' ? 'info' : 'default'}>{s.leadType}</Badge></td>
                        <td className="px-4 py-3 text-slate-600">{s.b2bName || '\u2014'}</td>
                        <td className="px-4 py-3 text-slate-500 text-xs">{s.phone1}</td>
                        <td className="px-4 py-3"><StatusBadge status={s.status} /></td>
                        <td className="px-4 py-3 text-slate-600">{s.leadBy}</td>
                      </>
                    ) : (
                      <>
                        <td className="px-4 py-3 text-slate-600">{s.university}</td>
                        <td className="px-4 py-3 text-slate-600">{s.course || s.branch}</td>
                        <td className="px-4 py-3 text-slate-600">{s.country}</td>
                        <td className="px-4 py-3"><Badge variant="primary">{s.intake}</Badge></td>
                        <td className="px-4 py-3"><StatusBadge status={s.status} /></td>
                        <td className="px-4 py-3 text-slate-600">{s.leadBy}</td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ) : (
        <div className="flex gap-3 overflow-x-auto pb-4">
          {pipelineStatuses.map(status => {
            const cards = list.filter(s => s.status === status);
            return (
              <div key={status} className="w-64 shrink-0 pipeline-col">
                <div className="flex items-center justify-between mb-2 px-1">
                  <span className="text-xs font-semibold text-slate-600">{status}</span>
                  <span className="text-xs text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">{cards.length}</span>
                </div>
                <div className="space-y-2 bg-slate-50 rounded-2xl p-2 min-h-[200px]">
                  {cards.slice(0, 8).map(s => (
                    <div key={s.id} className="bg-white rounded-xl p-3 border border-border shadow-soft">
                      <p className="text-sm font-medium text-text truncate">{s.name}</p>
                      {mode === 'leads' ? (
                        <>
                          <p className="text-xs text-slate-400 mt-0.5">{s.country} \u00B7 {s.branch}</p>
                          <div className="flex items-center gap-1 mt-2">
                            <Badge className="text-[10px]">{s.leadType}</Badge>
                            {s.b2bName && <span className="text-[10px] text-slate-400">{s.b2bName}</span>}
                          </div>
                        </>
                      ) : (
                        <>
                          <p className="text-xs text-slate-400 mt-0.5">{s.university}</p>
                          <p className="text-xs text-slate-400">{s.course || s.branch}</p>
                          <div className="flex items-center gap-1 mt-2">
                            <Badge variant="primary" className="text-[10px]">{s.intake}</Badge>
                            <span className="text-[10px] text-slate-400">{s.leadBy}</span>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ===================== PAYMENTS =====================
function PaymentsPage() {
  const { students, session } = useApp();
  const [statusFilter, setStatusFilter] = useState('');

  const list = useMemo(() => {
    let data = session?.role === 'Employee'
      ? students.filter(s => s.leadById === session.id || s.leadBy === session.name)
      : students;
    if (statusFilter) data = data.filter(s => s.paymentStatus === statusFilter);
    return data;
  }, [students, session, statusFilter]);

  const totals = useMemo(() => ({
    total: list.reduce((a, s) => a + (s.totalFee || 0), 0),
    collected: list.reduce((a, s) => a + (s.initialPayment || 0), 0),
    remaining: list.reduce((a, s) => a + (s.remainingPayment || 0), 0),
  }), [list]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-text">Payments</h1>
          <p className="text-sm text-slate-500">Processing fees and payment status</p>
        </div>
        <Select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="w-40">
          <option value="">All statuses</option>
          {['Paid', 'Partially Paid', 'Pending', 'Overdue'].map(s => <option key={s} value={s}>{s}</option>)}
        </Select>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <MetricCard label="Total Fees" value={`€${totals.total.toLocaleString()}`} icon={CreditCard} />
        <MetricCard label="Collected" value={`€${totals.collected.toLocaleString()}`} icon={CheckCircle2} color="success" />
        <MetricCard label="Outstanding" value={`€${totals.remaining.toLocaleString()}`} icon={Clock} color="warning" />
      </div>
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-slate-50/80">
                <th className="text-left px-4 py-3 font-medium text-slate-500">Student</th>
                <th className="text-right px-4 py-3 font-medium text-slate-500">Total Fee</th>
                <th className="text-right px-4 py-3 font-medium text-slate-500">Initial</th>
                <th className="text-right px-4 py-3 font-medium text-slate-500">Remaining</th>
                <th className="text-right px-4 py-3 font-medium text-slate-500">Discount</th>
                <th className="text-left px-4 py-3 font-medium text-slate-500">Status</th>
              </tr>
            </thead>
            <tbody>
              {list.slice(0, 25).map(s => (
                <tr key={s.id} className="border-b border-border last:border-0 hover:bg-slate-50/50">
                  <td className="px-4 py-3">
                    <p className="font-medium">{s.name}</p>
                    <p className="text-xs text-slate-400 font-mono">{s.id}</p>
                  </td>
                  <td className="px-4 py-3 text-right">€{s.totalFee}</td>
                  <td className="px-4 py-3 text-right">€{s.initialPayment}</td>
                  <td className="px-4 py-3 text-right font-medium">€{s.remainingPayment}</td>
                  <td className="px-4 py-3 text-right">€{s.discount}</td>
                  <td className="px-4 py-3">
                    <Badge variant={s.paymentStatus === 'Paid' ? 'success' : s.paymentStatus === 'Overdue' ? 'danger' : 'warning'}>
                      {s.paymentStatus}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

// ===================== UNIVERSITIES =====================
function UniversitiesPage() {
  const { universities, session, addUniversity, updateUniversity, addAudit, toast } = useApp();
  const [filters, setFilters] = useState({ branch: '', ielts: '', university: '', intake: '', course: '' });
  const [modal, setModal] = useState(null); // 'add' | 'edit'
  const [form, setForm] = useState({});
  const isAdmin = session?.role === 'Admin';

  const filtered = useMemo(() => {
    return universities.filter(u => {
      if (u.archived) return false;
      if (filters.branch && u.branch !== filters.branch) return false;
      if (filters.ielts && u.ielts < Number(filters.ielts)) return false;
      if (filters.university && !u.name.toLowerCase().includes(filters.university.toLowerCase())) return false;
      if (filters.intake && u.intake !== filters.intake) return false;
      if (filters.course && !u.course.toLowerCase().includes(filters.course.toLowerCase())) return false;
      return true;
    });
  }, [universities, filters]);

  const openAdd = () => {
    setForm({ name: '', course: '', branch: BRANCHES[0], intake: 'Winter', ielts: 6.5, toefl: 90, germanGrade: 2.5, applicationVia: 'Uni-Assist', fee: 75, tuition: 0, deadline: '', moi: 'Yes', aptitude: 'No', otherRequirements: '' });
    setModal('add');
  };

  const openEdit = (u) => {
    setForm({ ...u });
    setModal('edit');
  };

  const save = () => {
    if (modal === 'add') {
      const id = `U${String(universities.length + 1).padStart(3, '0')}`;
      addUniversity({ ...form, id, archived: false });
      addAudit({ action: 'UNIVERSITY_UPDATE', module: 'Universities', recordId: id, severity: 'SUCCESS' });
      toast('success', 'University added', form.name);
    } else {
      updateUniversity(form.id, form);
      addAudit({ action: 'UNIVERSITY_UPDATE', module: 'Universities', recordId: form.id, severity: 'INFO' });
      toast('success', 'University updated', form.name);
    }
    setModal(null);
  };

  const exportCsv = () => {
    const headers = ['ID', 'University', 'Course', 'Branch', 'Intake', 'IELTS', 'TOEFL', 'German Grade', 'Application Via', 'Fee', 'Tuition', 'Deadline'];
    const rows = filtered.map(u => [u.id, u.name, u.course, u.branch, u.intake, u.ielts, u.toefl, u.germanGrade || '', u.applicationVia, u.fee, u.tuition, u.deadline]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = 'universities.csv'; a.click();
    addAudit({ action: 'EXPORT', module: 'Universities', severity: 'INFO' });
    toast('success', 'Export ready', 'CSV downloaded');
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-text">University Database</h1>
          <p className="text-sm text-slate-500">{filtered.length} universities</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={exportCsv}><Download size={14} /> Export</Button>
          {isAdmin && <Button size="sm" onClick={openAdd}><Plus size={14} /> Add University</Button>}
        </div>
      </div>

      <Card className="p-4">
        <div className="flex flex-wrap gap-2">
          <Select value={filters.branch} onChange={e => setFilters(f => ({ ...f, branch: e.target.value }))} className="w-40">
            <option value="">All branches</option>
            {BRANCHES.map(b => <option key={b} value={b}>{b}</option>)}
          </Select>
          <Input placeholder="Min IELTS" type="number" step="0.5" value={filters.ielts} onChange={e => setFilters(f => ({ ...f, ielts: e.target.value }))} className="w-28" />
          <Input placeholder="University name" value={filters.university} onChange={e => setFilters(f => ({ ...f, university: e.target.value }))} className="w-44" />
          <Select value={filters.intake} onChange={e => setFilters(f => ({ ...f, intake: e.target.value }))} className="w-32">
            <option value="">All intakes</option>
            <option>Winter</option><option>Summer</option><option>Both</option><option>Fall</option>
          </Select>
          <Input placeholder="Course" value={filters.course} onChange={e => setFilters(f => ({ ...f, course: e.target.value }))} className="w-36" />
          <Button variant="ghost" size="sm" onClick={() => setFilters({ branch: '', ielts: '', university: '', intake: '', course: '' })}>Reset</Button>
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-slate-50/80">
                <th className="text-left px-4 py-3 font-medium text-slate-500">University</th>
                <th className="text-left px-4 py-3 font-medium text-slate-500">Course</th>
                <th className="text-left px-4 py-3 font-medium text-slate-500">Branch</th>
                <th className="text-left px-4 py-3 font-medium text-slate-500">Intake</th>
                <th className="text-left px-4 py-3 font-medium text-slate-500">IELTS</th>
                <th className="text-left px-4 py-3 font-medium text-slate-500">App Via</th>
                <th className="text-left px-4 py-3 font-medium text-slate-500">Fee</th>
                <th className="text-left px-4 py-3 font-medium text-slate-500">Deadline</th>
                {isAdmin && <th className="text-right px-4 py-3 font-medium text-slate-500">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filtered.slice(0, 30).map(u => (
                <tr key={u.id} className="border-b border-border last:border-0 hover:bg-slate-50/50">
                  <td className="px-4 py-3 font-medium">{u.name}</td>
                  <td className="px-4 py-3 text-slate-600 max-w-[160px] truncate">{u.course}</td>
                  <td className="px-4 py-3 text-slate-600">{u.branch}</td>
                  <td className="px-4 py-3 text-slate-600">{u.intake}</td>
                  <td className="px-4 py-3 text-slate-600">{u.ielts}</td>
                  <td className="px-4 py-3 text-slate-600">{u.applicationVia}</td>
                  <td className="px-4 py-3 text-slate-600">€{u.fee}</td>
                  <td className="px-4 py-3 text-slate-600 text-xs">{u.deadline}</td>
                  {isAdmin && (
                    <td className="px-4 py-3 text-right">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(u)}><Edit2 size={14} /></Button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal open={!!modal} onClose={() => setModal(null)} title={modal === 'add' ? 'Add University' : 'Edit University'} size="lg">
        <div className="grid sm:grid-cols-2 gap-4">
          <Input label="University Name" value={form.name || ''} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
          <Input label="Course" value={form.course || ''} onChange={e => setForm(f => ({ ...f, course: e.target.value }))} />
          <Select label="Branch" value={form.branch || ''} onChange={e => setForm(f => ({ ...f, branch: e.target.value }))}>
            {BRANCHES.map(b => <option key={b} value={b}>{b}</option>)}
          </Select>
          <Select label="Intake" value={form.intake || ''} onChange={e => setForm(f => ({ ...f, intake: e.target.value }))}>
            <option>Winter</option><option>Summer</option><option>Both</option><option>Fall</option>
          </Select>
          <Input label="IELTS" type="number" step="0.5" value={form.ielts || ''} onChange={e => setForm(f => ({ ...f, ielts: Number(e.target.value) }))} />
          <Input label="TOEFL" type="number" value={form.toefl || ''} onChange={e => setForm(f => ({ ...f, toefl: Number(e.target.value) }))} />
          <Input label="German Grade" type="number" step="0.1" value={form.germanGrade || ''} onChange={e => setForm(f => ({ ...f, germanGrade: Number(e.target.value) }))} />
          <Select label="Application Via" value={form.applicationVia || ''} onChange={e => setForm(f => ({ ...f, applicationVia: e.target.value }))}>
            <option>Uni-Assist</option><option>Direct</option>
          </Select>
          <Input label="Application Fee (€)" type="number" value={form.fee || ''} onChange={e => setForm(f => ({ ...f, fee: Number(e.target.value) }))} />
          <Input label="Tuition (€)" type="number" value={form.tuition || ''} onChange={e => setForm(f => ({ ...f, tuition: Number(e.target.value) }))} />
          <Input label="Deadline" type="date" value={form.deadline || ''} onChange={e => setForm(f => ({ ...f, deadline: e.target.value }))} />
          <Input label="Other Requirements" value={form.otherRequirements || ''} onChange={e => setForm(f => ({ ...f, otherRequirements: e.target.value }))} />
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <Button variant="secondary" onClick={() => setModal(null)}>Cancel</Button>
          <Button onClick={save}>{modal === 'add' ? 'Create' : 'Save'}</Button>
        </div>
      </Modal>
    </div>
  );
}

// ===================== EMPLOYEES =====================
function EmployeesPage() {
  const { employees, students } = useApp();
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold text-text">Employees</h1>
        <p className="text-sm text-slate-500">Team directory and assignments</p>
      </div>
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-slate-50/80">
                <th className="text-left px-4 py-3 font-medium text-slate-500">Name</th>
                <th className="text-left px-4 py-3 font-medium text-slate-500">Role</th>
                <th className="text-left px-4 py-3 font-medium text-slate-500">Assigned</th>
                <th className="text-left px-4 py-3 font-medium text-slate-500">Applications</th>
                <th className="text-left px-4 py-3 font-medium text-slate-500">Offers</th>
                <th className="text-left px-4 py-3 font-medium text-slate-500">Visas</th>
                <th className="text-left px-4 py-3 font-medium text-slate-500">Status</th>
              </tr>
            </thead>
            <tbody>
              {employees.filter(e => e.role === 'Employee').map(e => {
                const assigned = students.filter(s => s.leadById === e.id || s.leadBy === e.name).length;
                return (
                  <tr key={e.id} className="border-b border-border last:border-0 hover:bg-slate-50/50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary text-xs font-semibold flex items-center justify-center">{e.name[0]}</div>
                        <span className="font-medium">{e.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{e.role}</td>
                    <td className="px-4 py-3 font-medium">{assigned}</td>
                    <td className="px-4 py-3">{e.applications}</td>
                    <td className="px-4 py-3">{e.offers}</td>
                    <td className="px-4 py-3">{e.visas}</td>
                    <td className="px-4 py-3"><Badge variant="success">{e.status}</Badge></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

// ===================== AUDIT CENTER =====================
function AuditPage() {
  const { audit } = useApp();
  const [filters, setFilters] = useState({ user: '', action: '', module: '', severity: '' });
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    return audit.filter(a => {
      if (filters.user && a.user !== filters.user) return false;
      if (filters.action && a.action !== filters.action) return false;
      if (filters.module && a.module !== filters.module) return false;
      if (filters.severity && a.severity !== filters.severity) return false;
      return true;
    });
  }, [audit, filters]);

  const today = new Date().toDateString();
  const todayCount = audit.filter(a => new Date(a.timestamp).toDateString() === today).length;
  const critical = audit.filter(a => a.severity === 'CRITICAL').length;
  const adminActions = audit.filter(a => a.role === 'Admin').length;

  const severityVariant = { INFO: 'default', SUCCESS: 'success', WARNING: 'warning', CRITICAL: 'danger' };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold text-text">Audit Center</h1>
        <p className="text-sm text-slate-500">Immutable-style frontend event log (prototype)</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <MetricCard label="Today's Events" value={todayCount} icon={Activity} />
        <MetricCard label="Critical" value={critical} icon={AlertTriangle} color="danger" />
        <MetricCard label="Admin Actions" value={adminActions} icon={Shield} color="info" />
        <MetricCard label="Total Events" value={audit.length} icon={FileText} color="primary" />
      </div>
      <Card className="overflow-hidden">
        <div className="p-4 border-b border-border flex flex-wrap gap-2">
          <Select value={filters.user} onChange={e => setFilters(f => ({ ...f, user: e.target.value }))} className="w-36">
            <option value="">All users</option>
            {EMPLOYEES.map(e => <option key={e.id} value={e.name}>{e.name}</option>)}
          </Select>
          <Select value={filters.action} onChange={e => setFilters(f => ({ ...f, action: e.target.value }))} className="w-40">
            <option value="">All actions</option>
            {['CREATE', 'UPDATE', 'STATUS_CHANGE', 'PAYMENT_UPDATE', 'EMPLOYEE_ASSIGN', 'UNIVERSITY_UPDATE', 'EXPORT', 'LOGIN'].map(a => <option key={a} value={a}>{a}</option>)}
          </Select>
          <Select value={filters.module} onChange={e => setFilters(f => ({ ...f, module: e.target.value }))} className="w-36">
            <option value="">All modules</option>
            {['Students', 'Applications', 'Payments', 'Universities', 'Employees', 'Auth'].map(m => <option key={m} value={m}>{m}</option>)}
          </Select>
          <Select value={filters.severity} onChange={e => setFilters(f => ({ ...f, severity: e.target.value }))} className="w-32">
            <option value="">All severity</option>
            {['INFO', 'SUCCESS', 'WARNING', 'CRITICAL'].map(s => <option key={s} value={s}>{s}</option>)}
          </Select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-slate-50/80">
                <th className="text-left px-4 py-3 font-medium text-slate-500">Time</th>
                <th className="text-left px-4 py-3 font-medium text-slate-500">User</th>
                <th className="text-left px-4 py-3 font-medium text-slate-500">Action</th>
                <th className="text-left px-4 py-3 font-medium text-slate-500">Module</th>
                <th className="text-left px-4 py-3 font-medium text-slate-500">Record</th>
                <th className="text-left px-4 py-3 font-medium text-slate-500">Severity</th>
              </tr>
            </thead>
            <tbody>
              {filtered.slice(0, 50).map(a => (
                <tr key={a.id} className="border-b border-border last:border-0 hover:bg-slate-50/50 cursor-pointer" onClick={() => setSelected(a)}>
                  <td className="px-4 py-3 text-xs text-slate-500 whitespace-nowrap">{new Date(a.timestamp).toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span className="font-medium">{a.user}</span>
                    <span className="text-xs text-slate-400 ml-1">({a.role})</span>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">{a.action}</td>
                  <td className="px-4 py-3 text-slate-600">{a.module}</td>
                  <td className="px-4 py-3 font-mono text-xs text-slate-500">{a.recordId}</td>
                  <td className="px-4 py-3"><Badge variant={severityVariant[a.severity]}>{a.severity}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Drawer open={!!selected} onClose={() => setSelected(null)} title="Audit Event Detail">
        {selected && (
          <div className="space-y-4 text-sm">
            <div className="grid grid-cols-2 gap-3">
              <div><span className="text-slate-500">ID</span><p className="font-mono font-medium">{selected.id}</p></div>
              <div><span className="text-slate-500">Severity</span><p><Badge variant={severityVariant[selected.severity]}>{selected.severity}</Badge></p></div>
              <div><span className="text-slate-500">User</span><p className="font-medium">{selected.user} ({selected.role})</p></div>
              <div><span className="text-slate-500">Time</span><p>{new Date(selected.timestamp).toLocaleString()}</p></div>
              <div><span className="text-slate-500">Action</span><p className="font-mono">{selected.action}</p></div>
              <div><span className="text-slate-500">Module</span><p>{selected.module}</p></div>
              <div className="col-span-2"><span className="text-slate-500">Record ID</span><p className="font-mono">{selected.recordId}</p></div>
            </div>
            {(selected.before || selected.after) && (
              <div className="border-t border-border pt-4">
                <p className="text-slate-500 mb-2">Change</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 p-3 rounded-xl bg-red-50 border border-red-100">
                    <p className="text-[10px] uppercase text-red-500 font-semibold mb-1">Before</p>
                    <p className="font-medium text-text">{selected.before || '—'}</p>
                  </div>
                  <ArrowRight size={16} className="text-slate-400 shrink-0" />
                  <div className="flex-1 p-3 rounded-xl bg-emerald-50 border border-emerald-100">
                    <p className="text-[10px] uppercase text-emerald-600 font-semibold mb-1">After</p>
                    <p className="font-medium text-text">{selected.after || '—'}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </Drawer>
    </div>
  );
}

// ===================== REPORTS =====================
function ReportsPage() {
  const { toast, addAudit } = useApp();
  const reports = [
    { name: 'Student Registration', desc: 'Filtered summary of registered students', audience: 'Admin' },
    { name: 'Employee Performance', desc: 'Employee comparison by assignments and offers', audience: 'Admin' },
    { name: 'Application Funnel', desc: 'Status distribution and conversion', audience: 'Admin' },
    { name: 'Payment Report', desc: 'Payment summary and outstanding balances', audience: 'Admin' },
    { name: 'University Report', desc: 'Current university dataset export', audience: 'Admin / Employee' },
    { name: 'Visa Report', desc: 'Visa and Got Visa status summary', audience: 'Admin' },
    { name: 'Status Report', desc: 'Full status distribution breakdown', audience: 'Admin' },
  ];

  const exportReport = (name) => {
    addAudit({ action: 'EXPORT', module: 'Reports', severity: 'INFO' });
    toast('success', 'Export simulated', `${name} — prototype only`);
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold text-text">Reports</h1>
        <p className="text-sm text-slate-500">Operational reports (prototype exports)</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {reports.map(r => (
          <Card key={r.name} className="p-5 flex flex-col">
            <h3 className="text-sm font-semibold text-text">{r.name}</h3>
            <p className="text-xs text-slate-500 mt-1 flex-1">{r.desc}</p>
            <div className="flex items-center justify-between mt-4">
              <Badge variant="default">{r.audience}</Badge>
              <Button variant="secondary" size="sm" onClick={() => exportReport(r.name)}><Download size={14} /> Export</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ===================== SETTINGS / PROFILE =====================
function SettingsPage() {
  return (
    <div className="space-y-4 max-w-2xl">
      <div>
        <h1 className="text-xl font-semibold text-text">Settings</h1>
        <p className="text-sm text-slate-500">System configuration (prototype)</p>
      </div>
      <Card className="p-5 space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-text">Prototype notice</h3>
          <p className="text-sm text-slate-500 mt-1">This is a frontend-only prototype. Authentication, authorization, data persistence, and exports are simulated with localStorage. No real backend security controls are active.</p>
        </div>
        <div className="border-t border-border pt-4">
          <h3 className="text-sm font-semibold text-text">Design system</h3>
          <p className="text-sm text-slate-500 mt-1">Inter · #2563EB primary · Soft shadows · 12–14px radius · Lucide icons</p>
        </div>
      </Card>
    </div>
  );
}

function ProfilePage() {
  const { session } = useApp();
  return (
    <div className="space-y-4 max-w-lg">
      <div>
        <h1 className="text-xl font-semibold text-text">Profile</h1>
        <p className="text-sm text-slate-500">Your account preferences</p>
      </div>
      <Card className="p-5">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary text-xl font-semibold flex items-center justify-center">{session?.name?.[0]}</div>
          <div>
            <p className="font-semibold text-text">{session?.name}</p>
            <p className="text-sm text-slate-500">{session?.role} · {session?.email}</p>
          </div>
        </div>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between py-2 border-b border-border"><span className="text-slate-500">Role</span><span className="font-medium">{session?.role}</span></div>
          <div className="flex justify-between py-2 border-b border-border"><span className="text-slate-500">Email</span><span className="font-medium">{session?.email}</span></div>
          <div className="flex justify-between py-2"><span className="text-slate-500">Session</span><Badge variant="success">Demo active</Badge></div>
        </div>
      </Card>
    </div>
  );
}

// ===================== APP ROOT =====================
function App() {
  const [state, setState] = useState(() => loadState());
  const [page, setPage] = useState('dashboard');
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  useEffect(() => { saveState(state); }, [state]);

  const toast = useCallback((type, title, message) => {
    const id = Date.now();
    setToasts(t => [...t, { id, type, title, message }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 4000);
  }, []);

  const removeToast = (id) => setToasts(t => t.filter(x => x.id !== id));

  const login = (user) => {
    setState(s => ({ ...s, session: user }));
    setPage('dashboard');
    toast('success', `Signed in as ${user.role}`, user.name);
  };

  const logout = () => {
    setState(s => ({ ...s, session: null }));
    setPage('dashboard');
  };

  const addStudent = (record) => setState(s => ({ ...s, students: [record, ...s.students] }));
  const updateStudent = (id, patch) => setState(s => ({
    ...s,
    students: s.students.map(st => st.id === id ? { ...st, ...patch } : st),
  }));
  const addUniversity = (record) => setState(s => ({ ...s, universities: [record, ...s.universities] }));
  const updateUniversity = (id, patch) => setState(s => ({
    ...s,
    universities: s.universities.map(u => u.id === id ? { ...u, ...patch } : u),
  }));
  const addAudit = (partial) => {
    const event = {
      id: `AUD-${Date.now()}`,
      timestamp: new Date().toISOString(),
      user: state.session?.name || 'System',
      role: state.session?.role || 'Admin',
      recordId: partial.recordId || '—',
      before: partial.before || null,
      after: partial.after || null,
      severity: partial.severity || 'INFO',
      action: partial.action,
      module: partial.module,
    };
    setState(s => ({ ...s, audit: [event, ...s.audit] }));
  };
  const setTheme = (theme) => setState(s => ({ ...s, theme }));

  const ctx = {
    ...state,
    login, logout, toast, addStudent, updateStudent, addUniversity, updateUniversity, addAudit, setTheme,
  };

  if (!state.session) {
    return (
      <AppContext.Provider value={ctx}>
        <LoginPage />
        <ToastContainer toasts={toasts} remove={removeToast} />
      </AppContext.Provider>
    );
  }

  return (
    <AppContext.Provider value={ctx}>
      <div className="min-h-screen bg-background">
        <Sidebar page={page} setPage={setPage} collapsed={collapsed} setCollapsed={setCollapsed} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        <div className={cn('transition-all duration-200', collapsed ? 'lg:pl-[68px]' : 'lg:pl-60')}>
          <TopBar page={page} setPage={setPage} setMobileOpen={setMobileOpen} collapsed={collapsed} />
          <main className="p-4 md:p-6 max-w-[1400px]">
            {page === 'dashboard' && (state.session.role === 'Admin' ? <AdminDashboard /> : <EmployeeDashboard />)}
            {page === 'students' && <StudentsPage setPage={setPage} />}
            {page === 'student-form' && <StudentFormPage setPage={setPage} />}
            {page === 'student-detail' && <StudentDetailPage setPage={setPage} />}
            {page === 'leads' && <LeadsApplicationsPage mode="leads" />}
            {page === 'applications' && <LeadsApplicationsPage mode="applications" />}
            {page === 'payments' && <PaymentsPage />}
            {page === 'universities' && <UniversitiesPage />}
            {page === 'employees' && state.session.role === 'Admin' && <EmployeesPage />}
            {page === 'audit' && state.session.role === 'Admin' && <AuditPage />}
            {page === 'reports' && state.session.role === 'Admin' && <ReportsPage />}
            {page === 'settings' && state.session.role === 'Admin' && <SettingsPage />}
            {page === 'profile' && <ProfilePage />}
          </main>
        </div>
        <ToastContainer toasts={toasts} remove={removeToast} />
      </div>
    </AppContext.Provider>
  );
}

createRoot(document.getElementById('root')).render(<App />);
