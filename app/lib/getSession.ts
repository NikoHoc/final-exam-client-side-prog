import { supabase } from './supabaseClient';

export const getUserSession = async () => {
  const { data: { session }, error } = await supabase.auth.getSession();

  if (error || !session?.user) {
    return { session: null, error: error || new Error("No session") };
  }

  const userId = session.user.id;

  const { data: user, error: userError } = await supabase
    .from("users")
    .select("id, username, role")
    .eq("id", userId)
    .maybeSingle();

  if (userError || !user) {
    return { session, user: null, error: userError || new Error("User not found") };
  }

  return {
    session,
    user,
    error: null
  };
};
