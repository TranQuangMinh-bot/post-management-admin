import { createClient } from '@supabase/supabase-js';
import { supabaseDataProvider } from 'ra-supabase';

const instanceUrl = import.meta.env.VITE_SUPABASE_URL as string;
const apiKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// Two portals share one codebase and run on different ports:
//   npm run dev          -> user portal   (http://localhost:5173)
//   npm run dev:admin    -> admin portal  (http://localhost:5174)
// Different ports are different browser origins, so each portal keeps its own
// login session and an admin and a user can be signed in at the same time.
export type Portal = 'admin' | 'user';

export const portal: Portal = import.meta.env.MODE === 'admin' ? 'admin' : 'user';

export const supabaseClient = createClient(instanceUrl, apiKey, {
  auth: { storageKey: `sb-${portal}-auth` },
});

export const dataProvider = supabaseDataProvider({
  instanceUrl,
  apiKey,
  supabaseClient,
});

export const BUCKET = 'post-attachments';

export const publicUrl = (path: string): string =>
  supabaseClient.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
