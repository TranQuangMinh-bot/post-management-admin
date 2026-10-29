import { createClient } from '@supabase/supabase-js';
import { supabaseDataProvider } from 'ra-supabase';

const instanceUrl = import.meta.env.VITE_SUPABASE_URL as string;
const apiKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabaseClient = createClient(instanceUrl, apiKey);

export const dataProvider = supabaseDataProvider({
  instanceUrl,
  apiKey,
  supabaseClient,
});

export const BUCKET = 'post-attachments';

export const publicUrl = (path: string): string =>
  supabaseClient.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
