
export type ScreenType = 'loading' | 'login' | 'feed' | 'details' | 'cameras' | 'live' | 'settings' | 'dashboard' | 'history';
export type HazardType = 'PPE Violation' | 'Fall Detected' | 'Proximity' | 'Posture' | 'Unauthorized';
export type Severity = 'Critical' | 'Medium' | 'Low';
export type AlertStatus = 'New' | 'Acknowledged' | 'Resolved';
export type ConnectionStatus = 'Online' | 'Offline';

export interface TimelineEvent {
  status: AlertStatus;
  timestamp: string;
  user?: string;
  note?: string;
}

export interface Alert {
  id: string;
  type: HazardType;
  severity: Severity;
  cameraName: string;
  location: string;
  timestamp: string;
  timeAgo: string;
  status: AlertStatus;
  snapshot: string;
  confidence: number;
  description?: string;
  actionTaken?: string;
  timeline: TimelineEvent[];
}

export interface UserProfile {
  name: string;
  role: string;
  email: string;
  avatar?: string;
  level: number;
}

export interface ImageState {
  file: File | null;
  previewUrl: string | null;
  base64: string | null;
  mimeType: string | null;
}

export interface GenerationResult {
  loading: boolean;
  error: string | null;
  imageUrl: string | null;
}
