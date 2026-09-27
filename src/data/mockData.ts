import { EventItem, StagedPhoto, SocialChannel, SyndicationQueueItem } from '../types';

export const USER_PLANNER = {
  name: 'Parthish Joshi',
  role: 'Event Director',
  title: 'Lead Event Strategist',
  workspace: 'Enterprise Admin Workspace',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtq1LByTRe5WOvam0b6I5FYV2WiOdYQP7GXIbnzYNRpCLFzhP2RvOI6bJeNzWNE2RESVthOXeGECYSUvIr-K-EYEaE6K1ojsZxlh0SJdOhxWnoTF2jI2hwLAzguaXZ2JAnFtrTiZAein8t-AGrq0yBPkXUL6c5G7ov7PgSIlPan8qR6MUInIcq9b9_tuf1JWTlGnK7-GFjW0F1QHSgTZuwoAPNMsCgSU5pR_bnXAZuCqawkrhMsemn',
  altAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHq8s0cn0_mvyCeIRhETRw_TxO__sy1CWc4WWn4lebQiirBHmHEu7nM8d3MNOdcMhnaD3IitrQyVV9arQwZBfDEL-uf25o4GAWfqCbteTEcd4SZaGiXQTFL38j1gUb-U7bxZ5NwFeoz8cxm6i3_p59MCyrHfjZMStK6xg6Y4DnkMoismCBNjBud7NGfyJTOSkjlIb07t2Vh5fOjM6bz92zrq-eZBP-zYL9NL4xpSMPojNuv7_lnsMu'
};

export const USER_ATTENDER = {
  name: 'Parthish Joshi',
  role: 'Attender',
  title: 'Lead Architect',
  handle: '@parthish',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUY4aVjrhwSTlw-M3faFlttUU91MgATKeQRq6o92fvSuKoQ6ZZ2bDgaYrPN01sKq7FVJww8LgBwrIGU1dFK20uyH7Yn8PBeORQlvjac0S6nR0GHfkUiwc4z7s5UQ82A7LHq8MZo99YC1qq1h0AP4A4C7meCmbEZv3FAOKPOfyNGkGwH1EUbczGmgxmwwOgFUAsHCWOCHEabPuy8tOacPmQyg6mQJ5UpB9I6jmxq374mIzYLcFZHaCd',
  altAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDD4DEaejC0pJSHYzv0vMq0OT3ZFyEYxuC1-bN74p_PbuYhtOoVrxHqPqnV7hhzWVNvtIaGt6GXFzpVz0tEX5CYq5tY2X_9qBBS3vBgVCbxcqvsdGrPLZ3uM1wT2lryPZaZq2eJcPfU916R1vtFhGp_1pw_k2QltW4ECFviL5BUcScV_t0zbXNAZvinl9YBPl3NPECZvNBfwgnk0HhFi9rjodMC8_he1_2MpWHLafVCYtBq0Ukg2DX1'
};

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: 'tech-summit-2026',
    title: 'Tech Summit 2026',
    category: 'Hybrid Conference',
    date: '18 October 2026',
    time: '09:00 AM - 06:00 PM',
    venue: 'Moscone Center',
    city: 'Mumbai, Maharashtra',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6moCMC7b0Ss7Xm_Q3uO3sfaTCSoeT2GdPN4YBelqyacvtMxUy8wHWqxFuN6L8L3U78WTuZfECUcOHMp-4RqQuQIj2AcgVj8HzIuAyJjyNA1aXn_4CvJG6piIXAP7xSL37EqnrxwxvTSdDGtrxCBjh3q2fO11Z4A0Yryz-S18eLkMGH1TCDJaqvXwOHYiuR7DJB8k7QbniHVuoa82HWdgihYiLj4xXzooBox034nGpauss09wQ7Mvb',
    status: 'live',
    viewsCount: '18.4k Live Views',
    attendeesCount: '4,280 Attenders checked-in',
    hashtags: ['#TechSummit2026', '#TechInnovators'],
    mentions: ['@TechSummitOfficial', '@TechCommunity'],
    channels: ['Instagram', 'X', 'LinkedIn', 'Facebook'],
    isAttending: true,
    badgeType: 'Keynote Main Stage Broadcast'
  },
  {
    id: 'design-systems-2026',
    title: 'Design Systems World 2026',
    category: 'Design & UX',
    date: '12 November 2026',
    time: '10:00 AM - 05:00 PM',
    venue: 'Tech Park Convention Center',
    city: 'Bangalore, India',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_Hx5ZFq1EA_ps0wCJ6SCkH7UinOBmipOjRH9N5kRK_-M_ZsUajE92Wz1gUGT3La6TMnHX4xA3ZZj62gsRJeBn4gBrk4ckvCLhW5O2wNl5JX_5ZEfdiJjoDIcrVpo5RneByTGUOG7rfn8QG6J5QrAYc1AOAP7ma2uR0xLbKg3p8woyB8QnCKtOHbPwwV6GHaVQRRlu-DSq-3IKE7AjG9eTDeEeG5kiNN-A_09EVECO_1vO_rMbSmGr',
    status: 'upcoming',
    attendeesCount: '1,850 registered',
    capacityPercentage: '85% capacity',
    startsIn: 'Starts in 25 days',
    hashtags: ['#DesignSystems26'],
    mentions: ['@DesignSystemsOrg'],
    channels: ['Instagram', 'LinkedIn'],
    isAttending: false
  },
  {
    id: 'global-ai-mixer',
    title: 'Global AI Innovators Mixer',
    category: 'Networking',
    date: '04 December 2026',
    time: '06:30 PM - 10:00 PM',
    venue: 'T-Hub Innovation Pavilion',
    city: 'Hyderabad, India',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUN5qsZRz-9-WZdC5xE0p1btPVriorGGvvyvMeDXElp49MvySjjkuYR-6T8B1pVk257KXjWQHwZ9oksdHjjcevOU6Di4axR2Ek5rkSJxJF3SZMF7ONc3Lensbd9HvdQXWkW1adhfeEVKkp78_B1XP_C9HANYHqQQ-52rkpCgfSCPEMOHL7zxfcCj0QhZ05kTYNGpMtm8UIa9uK332Vt5r80KDhpYFFwukszKKdacs5yGp3DTjIGiCt',
    status: 'upcoming',
    attendeesCount: '940 registered',
    capacityPercentage: 'Early bird active',
    startsIn: 'Starts in 47 days',
    hashtags: ['#GlobalAIMixer'],
    mentions: ['@AIGuild'],
    channels: ['X', 'LinkedIn', 'Instagram'],
    isAttending: false
  },
  {
    id: 'devops-cloud-nexus',
    title: 'DevOps & Cloud Nexus 2026',
    category: 'Cloud Engineering',
    date: '24 October 2026',
    time: '09:30 AM - 04:30 PM',
    venue: 'NESCO Center',
    city: 'Mumbai, India',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_Hx5ZFq1EA_ps0wCJ6SCkH7UinOBmipOjRH9N5kRK_-M_ZsUajE92Wz1gUGT3La6TMnHX4xA3ZZj62gsRJeBn4gBrk4ckvCLhW5O2wNl5JX_5ZEfdiJjoDIcrVpo5RneByTGUOG7rfn8QG6J5QrAYc1AOAP7ma2uR0xLbKg3p8woyB8QnCKtOHbPwwV6GHaVQRRlu-DSq-3IKE7AjG9eTDeEeG5kiNN-A_09EVECO_1vO_rMbSmGr',
    status: 'upcoming',
    attendeesCount: '850 Attending',
    startsIn: 'Starts in 6 days',
    hashtags: ['#DevOpsNexus'],
    mentions: ['@CloudArchForum'],
    channels: ['LinkedIn', 'X'],
    isAttending: false
  },
  {
    id: 'fintech-revolution-summit',
    title: 'Fintech Revolution Summit',
    category: 'Finance & Web3',
    date: '02 November 2026',
    time: '10:00 AM - 06:00 PM',
    venue: 'BKC Convention Hall',
    city: 'Mumbai, India',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkk8-gVGG5YzVYyM5TVCqSFx7KZ2vF2HUfPF_vHXZTJL9uNl01F7XeSEL6qXjgihHOI_k15-7jtGyML_3BuEPIBVTkrzHVkW4hYIQXZ2t6wcazd2ucjhFK6TT9MBK0ReKM3SYVTYgyHiuyaaK-vlhMYdZASkC1V5THzjo837RT86WpducG8vvg72DKATJHsxU5wK-jtRX7EqN90kfzXnQ61v7EaOPE5-GrPaCeDe2DLeQQIXZtvtJc',
    status: 'upcoming',
    attendeesCount: '2.4k Attending',
    startsIn: 'Starts in 15 days',
    hashtags: ['#FintechRev26'],
    mentions: ['@FintechCouncil'],
    channels: ['LinkedIn', 'Facebook'],
    isAttending: false
  },
  {
    id: 'genai-enterprise-workshop',
    title: 'Generative AI Enterprise Workshop 2026',
    category: 'Workshops & Labs',
    date: '15 November 2026',
    time: '10:00 AM - 04:00 PM',
    venue: 'JW Marriott Sahar',
    city: 'Mumbai, India',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUN5qsZRz-9-WZdC5xE0p1btPVriorGGvvyvMeDXElp49MvySjjkuYR-6T8B1pVk257KXjWQHwZ9oksdHjjcevOU6Di4axR2Ek5rkSJxJF3SZMF7ONc3Lensbd9HvdQXWkW1adhfeEVKkp78_B1XP_C9HANYHqQQ-52rkpCgfSCPEMOHL7zxfcCj0QhZ05kTYNGpMtm8UIa9uK332Vt5r80KDhpYFFwukszKKdacs5yGp3DTjIGiCt',
    status: 'draft',
    attendeesCount: 'Draft (Target: 350)',
    hashtags: ['#EnterpriseGenAI'],
    mentions: ['@AILabsGlobal'],
    channels: ['LinkedIn', 'X'],
    scheduledPublishDate: '15 October 2026, 10:00 AM',
    isAttending: false
  },
  {
    id: 'cybersecurity-conclave-2026',
    title: 'Cybersecurity Resiliency Conclave',
    category: 'Security & Privacy',
    date: '28 November 2026',
    time: '01:00 PM - 07:00 PM',
    venue: 'ITC Maratha',
    city: 'Mumbai, India',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_Hx5ZFq1EA_ps0wCJ6SCkH7UinOBmipOjRH9N5kRK_-M_ZsUajE92Wz1gUGT3La6TMnHX4xA3ZZj62gsRJeBn4gBrk4ckvCLhW5O2wNl5JX_5ZEfdiJjoDIcrVpo5RneByTGUOG7rfn8QG6J5QrAYc1AOAP7ma2uR0xLbKg3p8woyB8QnCKtOHbPwwV6GHaVQRRlu-DSq-3IKE7AjG9eTDeEeG5kiNN-A_09EVECO_1vO_rMbSmGr',
    status: 'draft',
    attendeesCount: 'Draft (Target: 600)',
    hashtags: ['#CyberResilience26'],
    mentions: ['@CyberSecForum'],
    channels: ['LinkedIn', 'Facebook'],
    isAttending: false
  },
  {
    id: 'cloud-summit-completed',
    title: 'Asia Cloud Developer Day 2026',
    category: 'Cloud Engineering',
    date: '10 September 2026',
    time: '09:00 AM - 05:00 PM',
    venue: 'Bandra Convention Hall',
    city: 'Mumbai, India',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkk8-gVGG5YzVYyM5TVCqSFx7KZ2vF2HUfPF_vHXZTJL9uNl01F7XeSEL6qXjgihHOI_k15-7jtGyML_3BuEPIBVTkrzHVkW4hYIQXZ2t6wcazd2ucjhFK6TT9MBK0ReKM3SYVTYgyHiuyaaK-vlhMYdZASkC1V5THzjo837RT86WpducG8vvg72DKATJHsxU5wK-jtRX7EqN90kfzXnQ61v7EaOPE5-GrPaCeDe2DLeQQIXZtvtJc',
    status: 'completed',
    attendeesCount: '3,120 Attended',
    hashtags: ['#CloudDevDay'],
    mentions: ['@CloudDevsAsia'],
    channels: ['LinkedIn', 'X', 'Facebook'],
    isAttending: false
  }
];

export const INITIAL_STAGED_PHOTOS: StagedPhoto[] = [
  {
    id: 'p1',
    name: 'Primary Hero Shot',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzaXsn7S1NThpZ0cn0c33B2PvtSkKEkU1EnJ9-36SBC45Tm_PUFeiFPYTz-sLvpYTO_aLg6zUlVfKor8ihBeX_kBXRXrK-k9JSjcSQQBP93R7ak_nfSaLnuRYpCCEAeMEQVys7Kvh5xj9XsSWTr5-gu2KRPGC8tjLw72oez-5kU-T-P_z70vWakT5iaMRXE3jMhrWXqlx-n5wswoGfKXt5Gt_thOTzclDk2mECijL30yKDtvmuWQbs',
    resolution: '4032 × 3024',
    size: '4.8MB',
    isHero: true,
    filterApplied: false
  },
  {
    id: 'p2',
    name: 'Networking Hub',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLjnBvx-FpoBUDfzhqOsI6e67mwVZwYNjKVHcQlm7-EUB6xX7G4oFgci2dECN81vY9vXbFUQALQeFnr4wYeqiiiQ6PnU1p-y1aQGBDUGq24kGNoOY4M8xNI7EZfE55GbFxTzteGvD4yOdnKjKF8BAFxPJ5sB_Jf0pRlabMq8KD2kyFISzdR7CRY25ZTCNs4IOhzttHjXZ_XrpqhI7NaNeMwfwWD63RX5UspBywGRp3eS47FTS2J7Ss',
    resolution: '3840 × 2160',
    size: '3.2MB',
    isHero: false,
    filterApplied: false
  },
  {
    id: 'p3',
    name: 'Grand Entrance',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCIoHezG3Vq-qvYCL3KrAPB-poQt-i3OtBKlp7obrfyif4GRyQ2_KQL9uuoJtATH7EsVkCv0r9IShjX3Q81pFO5LcfZqX6qrdg587NAboDSBSn39WHxNLgKiYErsaFP-4_j-tTnSw2LMfEfcwmOfXKa6nN0vHps224eDzlRJdJ8Tolcd3i1sDIWiPmM9yGUqokZaq8mBkijzSpTtgFj9q6LTHkuo0FaIpkeVsQ1FpqzeU8DF_2DoDqN',
    resolution: '4032 × 3024',
    size: '4.1MB',
    isHero: false,
    filterApplied: false
  }
];

export const SOCIAL_CHANNELS: SocialChannel[] = [
  {
    id: 'ig',
    name: 'Instagram',
    handle: '@eventsync_live',
    badgeLabel: 'Story & Feed',
    connected: true,
    color: '#DD2A7B',
    icon: 'photo_camera',
    statusText: 'OAuth 2.0 Webhook Active'
  },
  {
    id: 'fb',
    name: 'Facebook',
    handle: 'EventSync Official',
    badgeLabel: 'Page Sync',
    connected: true,
    color: '#1877F2',
    icon: 'thumb_up',
    statusText: 'OAuth 2.0 Webhook Active'
  },
  {
    id: 'li',
    name: 'LinkedIn',
    handle: 'EventSync Enterprise',
    badgeLabel: 'Article Feed',
    connected: true,
    color: '#0A66C2',
    icon: 'business',
    statusText: 'OAuth 2.0 Webhook Active'
  },
  {
    id: 'x',
    name: 'X',
    handle: '@EventSyncHQ',
    badgeLabel: 'Microblog',
    connected: false,
    color: '#0F1419',
    icon: 'tag',
    statusText: 'Not Connected'
  }
];

export const QUEUED_BLASTS: SyndicationQueueItem[] = [
  {
    id: 'q-1',
    eventName: 'Tech Summit 2026',
    scheduledTime: 'In 14 minutes',
    channels: ['Instagram', 'X', 'LinkedIn', 'Facebook'],
    caption: 'Keynote Session 2 is kicking off with breakthrough LLM insights! #TechSummit2026',
    status: 'scheduled'
  },
  {
    id: 'q-2',
    eventName: 'Tech Summit 2026',
    scheduledTime: 'In 45 minutes',
    channels: ['Instagram', 'LinkedIn'],
    caption: 'Live from the AI Exhibition Hall: 40+ enterprise robotics demos. @TechSummitOfficial',
    status: 'scheduled'
  },
  {
    id: 'q-3',
    eventName: 'Tech Summit 2026',
    scheduledTime: 'In 1 hr 30 mins',
    channels: ['X', 'LinkedIn', 'Facebook'],
    caption: 'Fireside chat with global founders on edge acceleration. #TechInnovators',
    status: 'scheduled'
  },
  {
    id: 'q-4',
    eventName: 'Tech Summit 2026',
    scheduledTime: 'In 2 hrs 15 mins',
    channels: ['Instagram', 'X'],
    caption: 'Afternoon coffee break and lightning talks on developer productivity.',
    status: 'scheduled'
  },
  {
    id: 'q-5',
    eventName: 'Tech Summit 2026',
    scheduledTime: 'In 3 hrs 30 mins',
    channels: ['LinkedIn', 'Facebook'],
    caption: 'Executive roundtable on cross-cloud governance and resilience.',
    status: 'scheduled'
  },
  {
    id: 'q-6',
    eventName: 'Tech Summit 2026',
    scheduledTime: 'In 4 hrs 45 mins',
    channels: ['Instagram', 'X', 'LinkedIn', 'Facebook'],
    caption: 'Closing Keynote: What 2027 holds for autonomous multi-agent systems.',
    status: 'scheduled'
  },
  {
    id: 'q-7',
    eventName: 'Tech Summit 2026',
    scheduledTime: 'In 6 hrs',
    channels: ['Instagram', 'LinkedIn', 'Facebook'],
    caption: 'Summit wrap-up reel & official awards ceremony live stream link!',
    status: 'scheduled'
  }
];
