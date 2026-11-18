import { createClient, SupabaseClient } from '@supabase/supabase-js';
let client: SupabaseClient | null = null;
export function supabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error('إعدادات Supabase غير مكتملة. أضف متغيرات البيئة في Render.');
  if (!client) client = createClient(url, key, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } });
  return client;
}
export function errorText(error: unknown) { return error instanceof Error ? error.message : 'حدث خطأ غير متوقع'; }
