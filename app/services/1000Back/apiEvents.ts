import { supabase } from '@/app/services/supabase';

export interface Event {
	id: number;
	name: string;
	start_time: string | null;
	is_active: boolean;
}

export async function getActiveEvent () {
	const { data, error } = await supabase
		.from('events')
		.select('*')
		.eq('is_active', true)
		.maybeSingle();

	if (error) throw error;
	return data as Event | null;
}

export async function getEvents () {
	const { data, error } = await supabase
		.from('events')
		.select('*')
		.order('id', { ascending: false });

	if (error) throw error;
	return data as Event[];
}

export async function createEvent (name: string) {
	const { data, error } = await supabase
		.from('events')
		.insert([{ name, is_active: false }])
		.select()
		.single();

	if (error) throw error;
	return data as Event;
}

export async function setActiveEvent (eventId: number) {
	// First, set all other active events to inactive (usually there is only one)
	const { error: deactivateError } = await supabase
		.from('events')
		.update({ is_active: false })
		.eq('is_active', true);

	if (deactivateError) throw deactivateError;

	// Then, set the chosen event to active
	const { data, error } = await supabase
		.from('events')
		.update({ is_active: true })
		.eq('id', eventId)
		.select()
		.single();

	if (error) throw error;
	return data as Event;
}

export async function updateEventStartTime (eventId: number, startTime: string | null) {
	const { data, error } = await supabase
		.from('events')
		.update({ is_active: true, start_time: startTime })
		.eq('id', eventId)
		.select()
		.single();

	if (error) throw error;
	return data as Event;
}

export async function finishEvent (eventId: number) {
	const { data, error } = await supabase
		.from('events')
		.update({ is_active: false })
		.eq('id', eventId)
		.select()
		.single();

	if (error) throw error;
	return data as Event;
}

export async function deleteEvent (eventId: number) {
	const { error } = await supabase
		.from('events')
		.delete()
		.eq('id', eventId);

	if (error) throw error;
}
