
import React from 'react';
import { Platform, SubscriptionPlan } from './types';

export const APP_NAME = "Lumi All Chat";

export const PLATFORM_ICON_MAP: Record<Platform, React.ReactNode> = {
  [Platform.Facebook]: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>,
  [Platform.Instagram]: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919C8.416 2.175 8.796 2.163 12 2.163zm0 1.623c-3.111 0-3.469.011-4.691.068-2.61.118-3.843 1.353-3.961 3.961-.057 1.221-.067 1.571-.067 4.691s.01 3.469.067 4.691c.118 2.608 1.352 3.843 3.961 3.961 1.222.056 1.579.068 4.691.068s3.469-.012 4.691-.068c2.609-.118 3.843-1.353 3.961-3.961.057-1.222.067-1.571.067-4.691s-.01-3.47-.067-4.691c-.118-2.608-1.352-3.843-3.961-3.961C15.469 3.797 15.111 3.786 12 3.786zm0 2.951c-2.384 0-4.322 1.938-4.322 4.322s1.938 4.322 4.322 4.322 4.322-1.938 4.322-4.322S14.384 6.737 12 6.737zm0 6.994c-1.473 0-2.671-1.198-2.671-2.671s1.198-2.671 2.671-2.671 2.671 1.198 2.671 2.671-1.198 2.671-2.671 2.671zm4.771-6.848c-.534 0-.967.433-.967.967s.433.967.967.967.967-.433.967-.967-.433-.967-.967-.967z" /></svg>,
  [Platform.LINE]: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.33 13.94c-.2.2-.48.31-.78.31-.22 0-.43-.06-.62-.19l-2.43-1.6V16.5c0 .55-.45 1-1 1s-1-.45-1-1v-2.06l-2.43 1.6c-.19.12-.4.19-.62.19-.3 0-.58-.11-.78-.31-.38-.38-.45-.96-.17-1.42L9.5 12 7.17 9.48c-.28-.45-.21-1.04.17-1.42.38-.38.96-.45 1.42-.17L11 9.94V7.5c0-.55.45-1 1-1s1 .45 1 1v2.44l2.22-1.48c.45-.28 1.04-.21 1.42.17.38.38.45.96.17 1.42L14.5 12l2.33 2.52c.28.46.21 1.04-.17 1.42z" /></svg>,
  [Platform.TikTok]: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91.02.08 0 .17.02.24.04.52.12.98.36 1.4.66.5.38.9.86 1.24 1.38.31.48.54.99.71 1.53.15.47.25.96.31 1.45.07.57.08 1.15.08 1.72s-.01 1.14-.08 1.72c-.06.49-.16.98-.31 1.45-.17.54-.4 1.05-.71 1.53-.34.52-.75 1-1.24 1.38-.42.3-.88.54-1.4.66-.08.02-.17.03-.25.04-1.3.03-2.6.04-3.9.02s-2.6-.01-3.9-.02c-.08 0-.17-.02-.25-.04-.52-.12-.98-.36-1.4-.66-.5-.38-.9-.86-1.24-1.38-.31-.48-.54-.99-.71-1.53-.15-.47-.25-.96-.31-1.45-.07-.57-.08-1.15-.08-1.72s.01-1.14.08-1.72c.06-.49.16-.98.31-1.45.17-.54.4-1.05.71-1.53.34-.52.75-1-1.24-1.38.42-.3.88-.54 1.4-.66.08-.02.17-.03.25-.04 1.3-.03 2.6-.04 3.9-.02zm1.68 6.04H11.53v8.52h2.89v-2.73c.01-.43.02-.85.06-1.28.08-.82.35-1.6.86-2.28.25-.34.55-.64.9-.89v-1.3zm-4.78.01c-.13.34-.22.7-.28 1.05-.13.68-.16 1.37-.16 2.06 0 .68.03 1.36.16 2.04.07.35.16.7.28 1.03.25.68.65 1.28 1.16 1.79.4.4.87.72 1.38.94.3.13.62.23.94.31v-2.2c-.36-.12-.7-.3-1-.55-.37-.3-.66-.67-.88-1.08-.16-.3-.28-.62-.36-.95-.07-.28-.1-.57-.12-.86h3.2v-2.72H9.425z"/></svg>,
  [Platform.Shopee]: <span className="h-5 w-5 flex items-center justify-center bg-orange-500 text-white text-xs rounded-sm">SP</span>,
  [Platform.Lazada]: <span className="h-5 w-5 flex items-center justify-center bg-blue-700 text-white text-xs rounded-sm">LZ</span>,
  [Platform.Unknown]: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
  </svg>,
};

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    name: "Free Plan",
    price: "฿0",
    priceDetails: "ต่อเดือน",
    features: [
      "เชื่อมต่อ 1 ช่องทาง",
      "จำกัด 100 แชทต่อเดือน",
      "AI Mode (Manual & Limited Semi-auto)",
      "Quick Reply",
    ],
    ctaText: "เริ่มต้นใช้งานฟรี",
  },
  {
    name: "Pro Plan",
    price: "฿990",
    priceDetails: "ต่อเดือน",
    features: [
      "เชื่อมต่อทุกช่องทาง",
      "ไม่จำกัดจำนวนแชท",
      "AI ทุกโหมด (Auto, Semi-auto, Manual)",
      "Training AI ส่วนตัว",
      "แดชบอร์ดวิเคราะห์ข้อมูล",
      "ระบบบรอดแคสต์",
    ],
    ctaText: "เลือก Pro Plan",
    isPopular: true,
  },
  {
    name: "Business Plan",
    price: "฿2,990",
    priceDetails: "ต่อเดือน",
    features: [
      "ทุกอย่างใน Pro Plan",
      "เพิ่มผู้ใช้งาน/แอดมิน (3 คน)",
      "ระบบจัดการและกำหนดสิทธิ์ทีม",
      "เชื่อมต่อออเดอร์ E-Commerce",
      "การซัพพอร์ตแบบพรีเมียม",
    ],
    ctaText: "เลือก Business Plan",
  },
];

export const CheckIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-5 h-5 text-brand-accent"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
  </svg>
);

export const ChevronDownIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-4 h-4"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
  </svg>
);

export const SparklesIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L1.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L21 5.25l-.813 2.846a4.5 4.5 0 0 0-3.09 3.09L12.25 12l2.846.813a4.5 4.5 0 0 0 3.09 3.09L21 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09Z" />
  </svg>
);

export const PaperAirplaneIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-5 h-5"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
  </svg>
);

export const TagIconSolid: React.FC<{className?: string}> = ({className}) => (
 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className || "w-5 h-5"}>
    <path d="M3.505 2.365A4.5 4.5 0 0 0 8 4.583c.836.934 2.097.934 2.933 0A4.501 4.501 0 0 0 15.556 2H17a1 1 0 0 1 1 1v1.516A4.501 4.501 0 0 0 15.417 8c-.934.836-.934 2.097 0 2.933A4.501 4.501 0 0 0 18 13.484V15a1 1 0 0 1-1 1h-1.444a4.501 4.501 0 0 0-4.053 2.217 4.5 4.5 0 0 0-2.932 0A4.501 4.501 0 0 0 4.583 16H3a1 1 0 0 1-1-1v-1.516A4.501 4.501 0 0 0 4.583 11c.934-.836.934-2.097 0-2.933A4.501 4.501 0 0 0 2 4.516V3a1 1 0 0 1 1-1h.505Z" />
  </svg>
);

export const CogIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m18 0h-1.5m-15.036-7.026A7.5 7.5 0 0 0 4.5 12H3m18 0h-1.5m-15.036 7.026A7.5 7.5 0 0 1 4.5 12H3m18 0h-1.5m0-15v1.5m0 15v-1.5m-15 .036A7.5 7.5 0 0 0 12 4.5v-1.5m0 15v-1.5m-7.026-15.036A7.5 7.5 0 0 1 12 4.5v-1.5m0 15v-1.5" />
  </svg>
);

export const UserCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
);

export const InformationCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-5 h-5"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
  </svg>
);

export const Bars3Icon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

export const XMarkIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
  </svg>
);

export const InboxStackIcon: React.FC<{ className?: string }> = ({ className }) => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10.5 11.25h3M12 17.25h.008v.008H12v-.008Zm0 0H12m0-3.75h.008v.008H12v-.008Zm0 0H12m2.25-4.5H9.75M12 17.25h.008v.008H12v-.008Zm0 0H12m2.25-4.5H9.75m1.5-3V4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V7.5m-7.5 0V4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V7.5m0 0h-9" />
  </svg>
);

export const ChartBarIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25A1.125 1.125 0 0 1 9.75 19.875V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
  </svg>
);

export const BoltIcon: React.FC<{ className?: string }> = ({ className }) => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
  </svg>
);

export const LightBulbIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.355a7.5 7.5 0 0 1-3 0m3-10.638a6.002 6.002 0 0 0-2.032.41 6.002 6.002 0 0 0-.693 4.095m5.44-4.505a5.972 5.972 0 0 0-1.772 3.829 5.972 5.972 0 0 0-.583 3.829M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
);

export const PencilSquareIcon: React.FC<{ className?: string }> = ({ className }) => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
  </svg>
);


