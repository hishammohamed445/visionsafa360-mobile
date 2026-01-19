
import React, { useState, useEffect } from 'react';
import VisionSafeLogo from './components/VisionSafeLogo';
import { 
  Bell, 
  Home as HomeIcon, 
  Settings as SettingsIcon, 
  User, 
  CheckCircle, 
  Clock, 
  MapPin, 
  Shield, 
  Zap, 
  AlertTriangle, 
  History, 
  X,
  ChevronRight,
  ArrowLeft,
  Phone,
  Activity,
  Check,
  Languages,
  LogOut as LogOutIcon,
  ChevronLeft,
  Sun,
  Moon,
  ClipboardList,
  Loader2
} from 'lucide-react';
import { 
  ScreenType, 
  Alert, 
  Severity, 
  AlertStatus, 
  UserProfile 
} from './types';

// --- Translations ---

const translations = {
  en: {
    initializing: "Initializing Secure Protocol...",
    booting: "Booting AI Core v4.2...",
    ready: "System Ready",
    home: "Home",
    history: "History",
    settings: "Settings",
    login: "Authorize Access",
    username: "Username",
    password: "Password",
    authAs: "Authenticated as",
    safeScore: "Safe",
    ergonomics: "Ergonomics Insight",
    weekly: "Weekly",
    activeIncidents: "Active Incidents",
    noLogs: "No logs found",
    logHistory: "Log History",
    language: "Language",
    logout: "Log Out",
    account: "Account Settings",
    appVer: "App Version 4.2.0",
    changeLang: "Switch to Arabic",
    acknowledge: "Acknowledge Alert",
    resolve: "Resolve Incident",
    caseClosed: "Case Closed",
    recordAction: "Record Action",
    criticalAlert: "Critical Alert",
    incidentReport: "Safety Report",
    auditTimeline: "Audit Timeline",
    description: "Description",
    theme: "Appearance",
    lightMode: "White Mode",
    darkMode: "Dark Mode",
    switchTheme: "Switch Theme"
  },
  ar: {
    initializing: "تهيئة البروتوكول الآمن...",
    booting: "تشغيل نواة الذكاء الاصطناعي v4.2...",
    ready: "النظام جاهز",
    home: "الرئيسية",
    history: "السجل",
    settings: "الإعدادات",
    login: "تصريح الدخول",
    username: "اسم المستخدم",
    password: "كلمة المرور",
    authAs: "تم الدخول بواسطة",
    safeScore: "آمن",
    ergonomics: "رؤى بيئة العمل",
    weekly: "أسبوعي",
    activeIncidents: "الحوادث النشطة",
    noLogs: "لا يوجد سجلات",
    logHistory: "سجل العمليات",
    language: "اللغة",
    logout: "تسجيل الخروج",
    account: "إعدادات الحساب",
    appVer: "إصدار التطبيق 4.2.0",
    changeLang: "التحويل للإنجليزية",
    acknowledge: "إقرار التنبيه",
    resolve: "إغلاق الحادث",
    caseClosed: "تم الإغلاق",
    recordAction: "تسجيل الإجراء",
    criticalAlert: "تنبيه حرج",
    incidentReport: "تقرير السلامة",
    auditTimeline: "سجل التدقيق",
    description: "الوصف",
    theme: "المظهر",
    lightMode: "الوضع الفاتح",
    darkMode: "الوضع الليلي",
    switchTheme: "تبديل المظهر"
  }
};

// --- Mock Data ---

const MOCK_USER: UserProfile = {
  name: "Eng. Ahmed",
  role: "HSE Site Supervisor",
  email: "ahmed@visionsafe.co",
  level: 4
};

const INITIAL_ALERTS: Alert[] = [
  {
    id: 'ALT-1004',
    type: 'Fall Detected',
    severity: 'Critical',
    cameraName: 'Cam 02 - Scaffold',
    location: 'Sector B - Floor 4',
    timestamp: '11:45:00 AM',
    timeAgo: 'Just now',
    status: 'New',
    snapshot: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80',
    confidence: 96.2,
    description: 'Sudden vertical displacement detected. Worker may have slipped on loose flooring.',
    timeline: [{ status: 'New', timestamp: '11:45:00 AM' }]
  },
  {
    id: 'ALT-1003',
    type: 'PPE Violation',
    severity: 'Medium',
    cameraName: 'Cam 01 - Entrance',
    location: 'Main Gate',
    timestamp: '11:30:12 AM',
    timeAgo: '15m ago',
    status: 'Acknowledged',
    snapshot: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=800&q=80',
    confidence: 98.4,
    description: 'Worker detected entering without industrial-grade hard hat.',
    timeline: [
        { status: 'New', timestamp: '11:30:12 AM' },
        { status: 'Acknowledged', timestamp: '11:35:00 AM', user: 'Eng. Ahmed' }
    ]
  },
  {
    id: 'ALT-1002',
    type: 'Proximity',
    severity: 'Critical',
    cameraName: 'Cam 05 - Heavy Mach',
    location: 'Loading Bay',
    timestamp: '10:15:45 AM',
    timeAgo: '1h ago',
    status: 'Resolved',
    snapshot: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    confidence: 91.5,
    description: 'Unauthorised personnel detected within the 2m exclusion zone.',
    actionTaken: 'Stopped work & cleared zone',
    timeline: [
        { status: 'New', timestamp: '10:15:45 AM' },
        { status: 'Acknowledged', timestamp: '10:20:00 AM', user: 'Eng. Ahmed' },
        { status: 'Resolved', timestamp: '10:45:00 AM', user: 'Eng. Ahmed', note: 'Stopped work & cleared zone' }
    ]
  }
];

const QUICK_ACTIONS = [
  "Stopped Work",
  "Provided PPE",
  "Cleared Zone",
  "First Aid",
  "Escalated"
];

// --- Utility Components ---

const SeverityBadge: React.FC<{ severity: Severity }> = ({ severity }) => {
  const styles = {
    Critical: 'bg-vs-danger/20 text-vs-danger border-vs-danger/30',
    Medium: 'bg-vs-warning/20 text-vs-warning border-vs-warning/30',
    Low: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  };
  return (
    <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider border ${styles[severity]}`}>
      {severity}
    </span>
  );
};

const StatusBadge: React.FC<{ status: AlertStatus }> = ({ status }) => {
  const styles = {
    New: 'bg-vs-orange text-black font-black',
    Acknowledged: 'bg-vs-surfaceHighlight text-white font-bold',
    Resolved: 'bg-vs-success/20 text-vs-success font-bold border border-vs-success/30',
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[9px] uppercase tracking-widest ${styles[status]}`}>
      {status}
    </span>
  );
};

// --- App Root ---

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('loading');
  const [activeTab, setActiveTab] = useState<'home' | 'history' | 'settings'>('home');
  const [alerts, setAlerts] = useState<Alert[]>(INITIAL_ALERTS);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [historyFilter, setHistoryFilter] = useState<Severity | 'All'>('All');
  const [showResolveModal, setShowResolveModal] = useState(false);
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [loadingProgress, setLoadingProgress] = useState(0);

  const t = translations[lang];
  const isRTL = lang === 'ar';
  const isDark = theme === 'dark';

  // Dynamic color classes based on theme
  const themeClasses = {
    bg: isDark ? 'bg-vs-bg' : 'bg-slate-50',
    text: isDark ? 'text-vs-text' : 'text-slate-900',
    surface: isDark ? 'bg-vs-surface' : 'bg-white',
    border: isDark ? 'border-white/10' : 'border-slate-200',
    card: isDark ? 'bg-vs-surface border-white/5' : 'bg-white border-slate-200 shadow-sm',
    muted: isDark ? 'text-vs-muted' : 'text-slate-500',
    header: isDark ? 'bg-vs-bg/80' : 'bg-white/80',
    input: isDark ? 'bg-vs-surface border-white/10' : 'bg-white border-slate-300',
    nav: isDark ? 'bg-vs-surface/80 border-white/5' : 'bg-white/90 border-slate-200'
  };

  useEffect(() => {
    if (currentScreen === 'loading') {
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setCurrentScreen('login'), 500);
            return 100;
          }
          return prev + 2;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [currentScreen]);

  useEffect(() => {
    if (currentScreen === 'dashboard') {
      const timer = setTimeout(() => {
        setShowNotification(true);
        if ('vibrate' in navigator) navigator.vibrate([200, 100, 200]);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  const handleLogin = () => {
    if (loginEmail && loginPass) {
      setCurrentScreen('dashboard');
      setActiveTab('home');
    }
  };

  const handleLogout = () => {
    setCurrentScreen('login');
    setActiveTab('home');
    setLoginEmail('');
    setLoginPass('');
    setSelectedAlert(null);
  };

  const handleAcknowledge = (id: string) => {
    const now = new Date().toLocaleTimeString();
    setAlerts(prev => prev.map(a => a.id === id ? { 
        ...a, 
        status: 'Acknowledged', 
        timeline: [...a.timeline, { status: 'Acknowledged', timestamp: now, user: MOCK_USER.name }] 
    } : a));
    if (selectedAlert?.id === id) {
      setSelectedAlert(prev => prev ? { 
          ...prev, 
          status: 'Acknowledged',
          timeline: [...prev.timeline, { status: 'Acknowledged', timestamp: now, user: MOCK_USER.name }]
      } : null);
    }
  };

  const handleResolve = (id: string, action: string) => {
    const now = new Date().toLocaleTimeString();
    setAlerts(prev => prev.map(a => a.id === id ? { 
        ...a, 
        status: 'Resolved', 
        actionTaken: action,
        timeline: [...a.timeline, { status: 'Resolved', timestamp: now, user: MOCK_USER.name, note: action }] 
    } : a));
    if (selectedAlert?.id === id) {
        setSelectedAlert(prev => prev ? { 
            ...prev, 
            status: 'Resolved',
            actionTaken: action,
            timeline: [...prev.timeline, { status: 'Resolved', timestamp: now, user: MOCK_USER.name, note: action }]
        } : null);
    }
    setShowResolveModal(false);
  };

  const renderLoading = () => (
    <div className={`h-screen ${isDark ? 'bg-vs-bg' : 'bg-slate-50'} flex flex-col items-center justify-center p-12 transition-colors duration-500`}>
      <div className="relative mb-12 animate-pulse">
        <VisionSafeLogo className="w-48 h-48 drop-shadow-[0_0_30px_rgba(255,106,0,0.4)]" showText={false} />
        <div className="absolute inset-0 border-4 border-vs-orange/20 rounded-full animate-[ping_3s_linear_infinite]"></div>
      </div>
      
      <div className="w-full max-w-[240px] space-y-4">
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <h2 className={`text-[10px] font-black uppercase tracking-[0.3em] ${isDark ? 'text-vs-orange' : 'text-vs-orange'}`}>
              {loadingProgress < 60 ? t.initializing : t.booting}
            </h2>
            <div className={`text-[8px] font-mono uppercase ${themeClasses.muted}`}>
              SECURE_HANDSHAKE_V4.2... OK
            </div>
          </div>
          <span className="text-xs font-black text-vs-orange tabular-nums">{loadingProgress}%</span>
        </div>
        
        <div className={`h-1 w-full ${isDark ? 'bg-white/5' : 'bg-slate-200'} rounded-full overflow-hidden`}>
          <div 
            className="h-full bg-vs-orange shadow-[0_0_10px_rgba(255,106,0,0.5)] transition-all duration-100"
            style={{ width: `${loadingProgress}%` }}
          ></div>
        </div>
      </div>

      <div className="absolute bottom-12 text-center">
        <p className={`text-[9px] font-black uppercase tracking-[0.4em] ${themeClasses.muted}`}>VisionSafe Enterprise</p>
      </div>
    </div>
  );

  const renderLogin = () => (
    <div className={`h-screen ${themeClasses.bg} flex flex-col p-8 justify-center animate-slide-up ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="w-full max-sm mx-auto space-y-12">
        <div className="flex flex-col items-center">
          <VisionSafeLogo className="w-40 h-40 mb-4" showText={false} />
          <h1 className={`text-3xl font-black ${isDark ? 'text-white' : 'text-slate-900'} tracking-tighter uppercase`}>
            VisionSafe <span className="text-vs-orange">360</span>
          </h1>
          <p className={`text-xs ${themeClasses.muted} font-bold tracking-[0.3em] uppercase mt-2`}>Mobile Response Unit</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2 text-start">
            <label className={`text-[10px] font-black ${themeClasses.muted} uppercase tracking-widest px-1`}>{t.username}</label>
            <div className={`h-14 ${themeClasses.input} border rounded-2xl flex items-center px-4 focus-within:border-vs-orange transition-all`}>
              <User className={`w-5 h-5 ${themeClasses.muted}`} />
              <input type="text" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} placeholder="safety_officer_7" className={`bg-transparent w-full ${isRTL ? 'mr-3' : 'ml-3'} text-sm ${isDark ? 'text-white' : 'text-slate-900'} focus:outline-none`} />
            </div>
          </div>
          <div className="space-y-2 text-start">
            <label className={`text-[10px] font-black ${themeClasses.muted} uppercase tracking-widest px-1`}>{t.password}</label>
            <div className={`h-14 ${themeClasses.input} border rounded-2xl flex items-center px-4 focus-within:border-vs-orange transition-all`}>
              <Shield className={`w-5 h-5 ${themeClasses.muted}`} />
              <input type="password" value={loginPass} onChange={(e) => setLoginPass(e.target.value)} placeholder="••••••••" className={`bg-transparent w-full ${isRTL ? 'mr-3' : 'ml-3'} text-sm ${isDark ? 'text-white' : 'text-slate-900'} focus:outline-none`} />
            </div>
          </div>
          <button onClick={handleLogin} className="w-full h-14 bg-vs-orange text-black font-black rounded-2xl text-xs tracking-[0.2em] uppercase shadow-glow active:scale-95 transition-transform">{t.login}</button>
        </div>
        <p className={`text-center text-[10px] ${themeClasses.muted} font-mono uppercase`}>Secure Industrial Protocol v4.2</p>
      </div>
    </div>
  );

  const renderDashboard = () => {
    const activeCount = alerts.filter(a => a.status !== 'Resolved').length;
    return (
      <div className={`p-6 pb-32 animate-slide-up space-y-8 h-full overflow-y-auto no-scrollbar text-start`} dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="flex justify-between items-start">
          <div className="text-start">
            <p className={`text-[10px] ${themeClasses.muted} font-black uppercase tracking-widest mb-1`}>{t.authAs}</p>
            <h2 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{MOCK_USER.name}</h2>
          </div>
          <div className={`p-3 ${themeClasses.surface} rounded-2xl border ${themeClasses.border} relative`}>
            <Bell className={`w-6 h-6 ${isDark ? 'text-white' : 'text-slate-900'}`} />
            {activeCount > 0 && <span className="absolute top-2 right-2 w-3 h-3 bg-vs-danger rounded-full border-2 border-vs-surface animate-pulse"></span>}
          </div>
        </div>

        {/* Ergonomics Insight Card */}
        <div className={`bg-gradient-to-br ${isDark ? 'from-vs-surfaceHighlight to-vs-bg' : 'from-white to-slate-100'} p-5 rounded-3xl border ${isDark ? 'border-vs-orange/20' : 'border-slate-200'} shadow-lg`}>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-vs-orange" />
              <h3 className={`text-[11px] font-black ${isDark ? 'text-white' : 'text-slate-900'} uppercase tracking-widest`}>{t.ergonomics}</h3>
            </div>
            <span className="text-[9px] font-black text-vs-orange uppercase">{t.weekly}</span>
          </div>
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-600'} mb-3 leading-relaxed`}>
            {isRTL ? 'زادت وتيرة الوضعيات الحركية الخطرة بنسبة ' : 'High-risk posture frequency increased by '}
            <span className="text-vs-orange font-bold">12%</span>
            {isRTL ? ' في المنطقة ب هذا الأسبوع.' : ' in Zone B this week.'}
          </p>
          <div className={`h-1.5 ${isDark ? 'bg-white/5' : 'bg-slate-200'} rounded-full overflow-hidden`}>
            <div className="h-full bg-vs-orange" style={{ width: '65%' }}></div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className={`text-[11px] font-black ${themeClasses.muted} uppercase tracking-[0.2em]`}>{t.activeIncidents} ({activeCount})</h4>
          <div className="space-y-3">
            {alerts.filter(a => a.status !== 'Resolved').map(alert => (
              <div key={alert.id} onClick={() => { setSelectedAlert(alert); setCurrentScreen('details'); }} className={`${themeClasses.card} border p-4 rounded-3xl flex items-center gap-4 active:scale-95 transition-all text-start`}>
                <div className={`w-16 h-16 ${isDark ? 'bg-black' : 'bg-slate-200'} rounded-2xl overflow-hidden shrink-0 border ${themeClasses.border}`}>
                  <img src={alert.snapshot} className="w-full h-full object-cover opacity-70" alt="Incident" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h5 className={`text-sm font-black ${isDark ? 'text-white' : 'text-slate-900'} truncate uppercase tracking-tight`}>{alert.type}</h5>
                    <SeverityBadge severity={alert.severity} />
                  </div>
                  <p className={`text-[10px] ${themeClasses.muted} font-bold uppercase tracking-widest mt-1`}>{alert.location}</p>
                </div>
                {isRTL ? <ChevronLeft className={`w-5 h-5 ${themeClasses.muted}`} /> : <ChevronRight className={`w-5 h-5 ${themeClasses.muted}`} />}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderDetails = () => {
    if (!selectedAlert) return null;
    return (
      <div className={`h-full ${themeClasses.bg} flex flex-col animate-slide-up pb-32 overflow-y-auto no-scrollbar`} dir={isRTL ? 'rtl' : 'ltr'}>
        <div className={`p-4 flex items-center justify-between sticky top-0 ${themeClasses.header} backdrop-blur-lg z-20 border-b ${themeClasses.border}`}>
          <button onClick={() => setCurrentScreen(activeTab === 'home' ? 'dashboard' : 'history')} className={`p-2 ${themeClasses.surface} rounded-xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {isRTL ? <ChevronRight className="w-6 h-6" /> : <ArrowLeft className="w-6 h-6" />}
          </button>
          <span className={`text-[10px] font-black ${themeClasses.muted} uppercase tracking-widest`}>Incident # {selectedAlert.id}</span>
          <button className={`p-2 ${themeClasses.surface} rounded-xl text-vs-orange`}>
            <Phone className="w-5 h-5" />
          </button>
        </div>

        <div className="w-full aspect-video bg-black relative">
          <img src={selectedAlert.snapshot} className="w-full h-full object-contain" alt="Evidence" />
          <div className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'}`}><SeverityBadge severity={selectedAlert.severity} /></div>
        </div>

        <div className="p-6 space-y-6 text-start">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h1 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'} uppercase tracking-tight`}>{selectedAlert.type}</h1>
              <StatusBadge status={selectedAlert.status} />
            </div>
            <div className="flex flex-wrap gap-4">
              <span className={`flex items-center gap-1.5 text-[10px] font-bold ${themeClasses.muted} uppercase tracking-widest`}><MapPin className="w-4 h-4 text-vs-orange" /> {selectedAlert.location}</span>
              <span className={`flex items-center gap-1.5 text-[10px] font-bold ${themeClasses.muted} uppercase tracking-widest`}><Clock className="w-4 h-4 text-vs-orange" /> {selectedAlert.timestamp}</span>
            </div>
          </div>

          {/* Timeline View */}
          <div className={`${themeClasses.card} border p-5 rounded-3xl space-y-4`}>
            <h3 className={`text-[10px] font-black ${themeClasses.muted} uppercase tracking-widest`}>{t.auditTimeline}</h3>
            <div className={`space-y-4 relative before:absolute ${isRTL ? 'before:right-[7px]' : 'before:left-[7px]'} before:top-2 before:bottom-2 before:w-[2px] ${isDark ? 'before:bg-white/5' : 'before:bg-slate-200'}`}>
                {selectedAlert.timeline.map((event, idx) => (
                    <div key={idx} className="flex gap-4 relative">
                        <div className={`w-4 h-4 rounded-full border-2 ${isDark ? 'border-vs-bg' : 'border-white'} shrink-0 z-10 ${event.status === 'Resolved' ? 'bg-vs-success' : event.status === 'Acknowledged' ? 'bg-vs-orange' : 'bg-vs-danger'}`}></div>
                        <div className="flex-1">
                            <div className="flex justify-between items-center">
                                <span className={`text-[10px] font-black ${isDark ? 'text-white' : 'text-slate-900'} uppercase`}>{event.status}</span>
                                <span className={`text-[9px] ${themeClasses.muted}`}>{event.timestamp}</span>
                            </div>
                            {event.user && <p className="text-[9px] text-vs-orange font-bold uppercase mt-0.5">By {event.user}</p>}
                            {event.note && <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-600'} mt-1 italic`}>"{event.note}"</p>}
                        </div>
                    </div>
                ))}
            </div>
          </div>

          <div className={`${themeClasses.card} border p-5 rounded-3xl space-y-4`}>
            <h3 className={`text-[11px] font-black ${themeClasses.muted} uppercase tracking-widest flex items-center gap-2`}><ClipboardList className="w-5 h-5 text-vs-orange" /> {t.incidentReport}</h3>
            <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-slate-700'} leading-relaxed font-medium`}>{selectedAlert.description}</p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {selectedAlert.status === 'New' && (
                <button onClick={() => handleAcknowledge(selectedAlert.id)} className="h-16 rounded-[24px] bg-vs-orange text-black font-black text-xs uppercase tracking-[0.2em] shadow-glow flex items-center justify-center gap-3 active:scale-95 transition-transform">
                    <Shield className="w-6 h-6" /> {t.acknowledge}
                </button>
            )}
            {selectedAlert.status === 'Acknowledged' && (
                <button onClick={() => setShowResolveModal(true)} className="h-16 rounded-[24px] bg-vs-success text-white font-black text-xs uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(22,163,74,0.3)] flex items-center justify-center gap-3 active:scale-95 transition-transform">
                    <CheckCircle className="w-6 h-6" /> {t.resolve}
                </button>
            )}
            {selectedAlert.status === 'Resolved' && (
                 <div className="h-16 rounded-[24px] bg-vs-success/10 border border-vs-success/30 text-vs-success flex items-center justify-center gap-3 font-black text-xs uppercase tracking-widest">
                    <Check className="w-6 h-6" /> {t.caseClosed}
                 </div>
            )}
          </div>
        </div>

        {/* Resolve Modal (Quick Actions) */}
        {showResolveModal && (
            <div className="fixed inset-0 z-[200] flex items-end justify-center p-4 bg-black/80 backdrop-blur-sm">
                <div className={`w-full max-w-sm ${themeClasses.surface} rounded-[40px] p-8 border ${themeClasses.border} animate-slide-up space-y-6`}>
                    <div className="flex justify-between items-center">
                        <h4 className={`text-lg font-black ${isDark ? 'text-white' : 'text-slate-900'} uppercase tracking-tight`}>{t.recordAction}</h4>
                        <button onClick={() => setShowResolveModal(false)} className={`p-2 ${themeClasses.muted}`}><X className="w-6 h-6" /></button>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                        {QUICK_ACTIONS.map(action => (
                            <button key={action} onClick={() => handleResolve(selectedAlert.id, action)} className={`w-full py-4 ${isDark ? 'bg-vs-surfaceHighlight hover:bg-vs-orange/10' : 'bg-slate-50 hover:bg-vs-orange/5'} border ${themeClasses.border} rounded-2xl text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'} uppercase tracking-widest flex justify-between items-center px-6 transition-all`}>
                                {action}
                                {isRTL ? <ChevronLeft className="w-4 h-4 text-vs-orange" /> : <ChevronRight className="w-4 h-4 text-vs-orange" />}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        )}
      </div>
    );
  };

  const renderHistory = () => {
    const filteredAlerts = historyFilter === 'All' ? alerts : alerts.filter(a => a.severity === historyFilter);
    return (
      <div className={`h-full flex flex-col animate-slide-up pb-32 text-start`} dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="p-6 space-y-4">
          <h2 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'} uppercase tracking-tight`}>{t.logHistory}</h2>
          <div className="flex gap-2 overflow-x-auto no-scrollbar py-2">
            {(['All', 'Critical', 'Medium', 'Low'] as const).map(f => (
              <button key={f} onClick={() => setHistoryFilter(f)} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap border ${historyFilter === f ? 'bg-vs-orange text-black border-vs-orange shadow-glow scale-105' : `${themeClasses.surface} ${themeClasses.border} ${themeClasses.muted}`} transition-all`}>{f}</button>
            ))}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-6 space-y-3 no-scrollbar">
          {filteredAlerts.map(alert => (
            <div key={alert.id} onClick={() => { setSelectedAlert(alert); setCurrentScreen('details'); }} className={`${themeClasses.card} border p-4 rounded-3xl flex items-center gap-4 active:scale-95 transition-all text-start`}>
              <div className={`w-14 h-14 ${isDark ? 'bg-black' : 'bg-slate-200'} rounded-xl overflow-hidden shrink-0 border ${themeClasses.border}`}>
                <img src={alert.snapshot} className="w-full h-full object-cover" alt="Incident" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h5 className={`text-xs font-black ${isDark ? 'text-white' : 'text-slate-900'} uppercase tracking-tight truncate`}>{alert.type}</h5>
                  <StatusBadge status={alert.status} />
                </div>
                <div className={`flex items-center gap-2 text-[9px] font-bold ${themeClasses.muted} uppercase tracking-widest`}><MapPin className="w-3 h-3 text-vs-orange" /> {alert.location}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderSettings = () => (
    <div className={`h-full flex flex-col animate-slide-up pb-32 overflow-y-auto no-scrollbar text-start`} dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="p-8 text-start space-y-8">
            <h2 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'} uppercase tracking-tight`}>{t.settings}</h2>
            
            {/* Profile Section */}
            <div className={`flex items-center gap-6 p-6 ${themeClasses.surface} rounded-3xl border ${themeClasses.border} shadow-sm`}>
                <div className={`w-16 h-16 rounded-full ${isDark ? 'bg-vs-orange/10 border-vs-orange/20' : 'bg-vs-orange/5 border-vs-orange/10'} flex items-center justify-center border`}>
                    <User className="w-8 h-8 text-vs-orange" />
                </div>
                <div className="flex-1">
                    <h3 className={`text-lg font-black ${isDark ? 'text-white' : 'text-slate-900'} uppercase tracking-tight`}>{MOCK_USER.name}</h3>
                    <p className="text-[10px] font-black text-vs-orange uppercase tracking-[0.2em]">{MOCK_USER.role}</p>
                </div>
            </div>

            {/* Account Settings Group */}
            <div className="space-y-4">
                <h4 className={`text-[10px] font-black ${themeClasses.muted} uppercase tracking-[0.3em] px-1`}>{t.account}</h4>
                <div className={`${themeClasses.surface} rounded-3xl border ${themeClasses.border} overflow-hidden shadow-sm`}>
                    {/* Language Toggle */}
                    <button 
                        onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
                        className={`w-full px-6 py-5 flex items-center justify-between border-b ${themeClasses.border} hover:bg-vs-orange/5 transition-colors`}
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-blue-500/10 rounded-xl text-blue-500"><Languages className="w-5 h-5" /></div>
                            <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'} uppercase tracking-widest`}>{t.language}</span>
                        </div>
                        <span className="text-[10px] font-black text-vs-orange uppercase tracking-widest">{t.changeLang}</span>
                    </button>

                    {/* Theme Toggle (White Mode) */}
                    <button 
                        onClick={() => setTheme(isDark ? 'light' : 'dark')}
                        className={`w-full px-6 py-5 flex items-center justify-between border-b ${themeClasses.border} hover:bg-vs-orange/5 transition-colors`}
                    >
                        <div className="flex items-center gap-4">
                            <div className={`p-2 ${isDark ? 'bg-vs-orange/10 text-vs-orange' : 'bg-slate-200 text-slate-700'} rounded-xl transition-colors`}>
                                {isDark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                            </div>
                            <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'} uppercase tracking-widest`}>{t.theme}</span>
                        </div>
                        <span className="text-[10px] font-black text-vs-orange uppercase tracking-widest">
                            {isDark ? t.lightMode : t.darkMode}
                        </span>
                    </button>

                    {/* Log Out */}
                    <button 
                        onClick={handleLogout}
                        className={`w-full px-6 py-5 flex items-center justify-between hover:bg-vs-danger/10 group transition-colors`}
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-vs-danger/10 rounded-xl text-vs-danger group-hover:bg-vs-danger group-hover:text-white transition-all"><LogOutIcon className="w-5 h-5" /></div>
                            <span className="text-sm font-black text-vs-danger uppercase tracking-widest">{t.logout}</span>
                        </div>
                        {isRTL ? <ChevronLeft className="w-5 h-5 text-vs-danger/50" /> : <ChevronRight className="w-5 h-5 text-vs-danger/50" />}
                    </button>
                </div>
            </div>

            <div className="text-center pt-8">
                <p className={`text-[10px] font-black ${themeClasses.muted} uppercase tracking-[0.2em]`}>{t.appVer}</p>
            </div>
        </div>
    </div>
  );

  const NavBtn = ({ icon: Icon, label, active, onClick }: any) => (
    <button onClick={onClick} className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${active ? 'text-vs-orange scale-110' : themeClasses.muted}`}>
      <div className={`p-2 rounded-2xl transition-colors ${active ? 'bg-vs-orange/10' : ''}`}><Icon className="w-6 h-6" strokeWidth={active ? 2.5 : 2} /></div>
      <span className="text-[9px] font-black uppercase tracking-[0.2em]">{label}</span>
    </button>
  );

  return (
    <div className={`min-h-screen max-w-md mx-auto ${themeClasses.bg} relative overflow-hidden font-sans ${themeClasses.text} shadow-2xl transition-colors duration-500`}>
      {/* Push Notification */}
      <div className={`fixed top-12 left-4 right-4 z-[100] transition-all duration-700 ease-spring ${showNotification ? 'translate-y-0 opacity-100' : '-translate-y-32 opacity-0 pointer-events-none'}`}>
        <div onClick={() => { setShowNotification(false); setSelectedAlert(alerts[0]); setCurrentScreen('details'); }} className={`${themeClasses.surface} border-2 border-vs-danger rounded-[28px] p-5 shadow-[0_20px_50px_rgba(239,68,68,0.4)] flex items-center gap-4 active:scale-95 transition-all`} dir={isRTL ? 'rtl' : 'ltr'}>
          <div className="w-14 h-14 bg-vs-danger/20 rounded-2xl flex items-center justify-center text-vs-danger animate-pulse"><AlertTriangle className="w-8 h-8" /></div>
          <div className="flex-1 min-w-0 text-start">
            <p className="text-[10px] font-black text-vs-danger uppercase tracking-widest mb-1">{t.criticalAlert}</p>
            <p className={`text-sm font-black ${isDark ? 'text-white' : 'text-slate-900'} uppercase tracking-tight truncate`}>{isRTL ? 'تم رصد سقوط: المنطقة ب' : 'Fall Detected: Sector B'}</p>
          </div>
          <button onClick={(e) => { e.stopPropagation(); setShowNotification(false); }} className={`${themeClasses.muted} p-2`}><X className="w-5 h-5" /></button>
        </div>
      </div>

      <main className="h-screen relative">
        {currentScreen === 'loading' && renderLoading()}
        {currentScreen === 'login' && renderLogin()}
        {currentScreen === 'dashboard' && renderDashboard()}
        {currentScreen === 'history' && renderHistory()}
        {currentScreen === 'details' && renderDetails()}
        {currentScreen === 'settings' && renderSettings()}
      </main>

      {currentScreen !== 'login' && currentScreen !== 'loading' && (
        <div className={`fixed bottom-0 left-0 right-0 ${themeClasses.nav} backdrop-blur-2xl border-t h-24 pb-8 flex justify-around items-center z-50 transition-colors`}>
          <NavBtn icon={HomeIcon} label={t.home} active={activeTab === 'home'} onClick={() => { setActiveTab('home'); setCurrentScreen('dashboard'); }} />
          <NavBtn icon={History} label={t.history} active={activeTab === 'history'} onClick={() => { setActiveTab('history'); setCurrentScreen('history'); }} />
          <NavBtn icon={SettingsIcon} label={t.settings} active={activeTab === 'settings'} onClick={() => { setActiveTab('settings'); setCurrentScreen('settings'); }} />
        </div>
      )}
      <style>{`.no-scrollbar::-webkit-scrollbar { display: none; } .ease-spring { transition-timing-function: cubic-bezier(0.68, -0.6, 0.32, 1.6); } .rtl { direction: rtl; } .ltr { direction: ltr; }`}</style>
    </div>
  );
};

export default App;
