import { supabase } from '@/app/services/supabase';

export async function loginAsAthlete(password: string) {
	const { data, error } = await supabase.auth.signInWithPassword({
		email: 'athlete1000back@shine.it',
		password,
	});
	if (error) throw error;
	return data;
}

export async function loginAsAdmin(password: string) {
	const { data, error } = await supabase.auth.signInWithPassword({
		email: 'admin1000back@shine.it',
		password,
	});
	if (error) throw error;
	return data;
}

export async function logout() {
	const { error } = await supabase.auth.signOut();
	if (error) throw error;
}

export async function getSession() {
	const { data: { session }, error } = await supabase.auth.getSession();
	if (error) throw error;
	return session;
}
