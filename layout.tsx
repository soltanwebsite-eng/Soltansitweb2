import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'السلطان | صيانة الهواتف والإكسسوارات', description: 'متجر السلطان لصيانة الهواتف وبيع جميع الإكسسوارات' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="ar" dir="rtl"><body>{children}</body></html>; }
