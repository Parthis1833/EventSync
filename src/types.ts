export type UserRole = 'planner' | 'attender';

export type PlannerTab = 
  | 'dashboard' 
  | 'my-events' 
  | 'create-event' 
  | 'social-accounts' 
  | 'analytics' 
  | 'settings';

export type AttenderTab = 
  | 'discover' 
  | 'my-events' 
  | 'upload-photos' 
  | 'my-posts';

export interface SocialChannel {
  id: string;
  name: 'Instagram' | 'Facebook' | 'X' | 'LinkedIn';
  handle: string;
  badgeLabel?: string;
  connected: boolean;
  color: string;
  icon: string;
  statusText?: string;
  scopes?: string[];
  tokenExpires?: string;
  webhookUrl?: string;
  lastPingMs?: number;
  accountType?: string;
}

export interface EventItem {
  id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  image: string;
  status: 'live' | 'upcoming' | 'completed' | 'draft' | 'scheduled';
  viewsCount?: string;
  attendeesCount: string;
  capacityPercentage?: string;
  startsIn?: string;
  hashtags: string[];
  mentions: string[];
  channels: ('Instagram' | 'Facebook' | 'X' | 'LinkedIn')[];
  isAttending?: boolean;
  badgeType?: string;
  scheduledPublishDate?: string;
  captionTemplate?: string;
}

export interface StagedPhoto {
  id: string;
  url: string;
  name: string;
  resolution: string;
  size: string;
  isHero: boolean;
  filterApplied?: boolean;
}

export interface SyndicationQueueItem {
  id: string;
  eventName: string;
  scheduledTime: string;
  channels: string[];
  caption: string;
  status: 'scheduled' | 'broadcasting' | 'completed';
}
