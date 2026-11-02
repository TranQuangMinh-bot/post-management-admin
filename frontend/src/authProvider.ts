import { supabaseAuthProvider } from 'ra-supabase';
import type { AuthProvider } from 'react-admin';
import { portal, supabaseClient } from './supabase';

export type Role = 'admin' | 'user';

const baseAuthProvider = supabaseAuthProvider(supabaseClient, {
  getIdentity: async (user) => {
    const { data, error } = await supabaseClient
      .from('profiles')
      .select('id, email')
      .match({ id: user.id })
      .single();

    if (error || !data) {
      throw error ?? new Error('Profile not found');
    }
    return { id: data.id, fullName: data.email };
  },
});

const fetchRole = async (): Promise<Role | null> => {
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();
  if (!user) return null;

  const { data } = await supabaseClient
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  return data?.role === 'admin' ? 'admin' : 'user';
};

// Each portal only accepts its own kind of account. The role decides what the
// UI shows, and Row Level Security in the database decides what is allowed.
export const authProvider: AuthProvider = {
  ...baseAuthProvider,
  login: async (params) => {
    await baseAuthProvider.login(params);
    const role = await fetchRole();

    if (portal === 'admin' && role !== 'admin') {
      await supabaseClient.auth.signOut();
      throw new Error('This portal is for admins only. Please use the user portal.');
    }
    if (portal === 'user' && role === 'admin') {
      await supabaseClient.auth.signOut();
      throw new Error('Admins sign in at /admin.');
    }
  },
  getPermissions: async () => fetchRole(),
};
