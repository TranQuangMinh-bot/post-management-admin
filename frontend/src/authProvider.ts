import { supabaseAuthProvider } from 'ra-supabase';
import type { AuthProvider } from 'react-admin';
import { supabaseClient } from './supabase';

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

const isAdmin = async (): Promise<boolean> => {
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();
  if (!user) return false;

  const { data } = await supabaseClient
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  return data?.role === 'admin';
};

// Only admins may stay logged in to this dashboard.
export const authProvider: AuthProvider = {
  ...baseAuthProvider,
  login: async (params) => {
    await baseAuthProvider.login(params);
    if (!(await isAdmin())) {
      await supabaseClient.auth.signOut();
      throw new Error('This account does not have admin access.');
    }
  },
};
