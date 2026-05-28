import { supabase } from '@/app/services/supabase';

export interface Participant {
	id: number;
	name: string;
	backflips: number;
	pushups: number;
	pullups: number;
	event_id: number;
}

export async function getParticipants (eventId: number) {
	const { data, error } = await supabase
		.from('participants')
		.select('*')
		.eq('event_id', eventId)
		.order('name');

	if (error) throw error;
	return data as Participant[];
}

export async function getParticipantByName (name: string, eventId: number) {
	// Cerchiamo in modo case-insensitive usando il modificatore ilike
	const { data, error } = await supabase
		.from('participants')
		.select('*')
		.ilike('name', name)
		.eq('event_id', eventId)
		.maybeSingle();

	if (error) throw error;
	return data as Participant | null;
}

export async function addParticipant (name: string, eventId: number) {
	const { data, error } = await supabase
		.from('participants')
		.insert([{ name, event_id: eventId, backflips: 0, pushups: 0, pullups: 0 }])
		.select()
		.single();

	if (error) throw error;
	return data as Participant;
}

export async function updateParticipantScore (participantId: number, field: string, amount: number) {
	// We use a RPC for atomic update if possible, or manual update
	// Given the instructions, we can use the same logic as before but with participant ID
	const { data: current } = await supabase
		.from('participants')
		.select(field)
		.eq('id', participantId)
		.single();

	const newValue = current ? (current as unknown as Record<string, number>)[field] : 0;
	const updatedValue = Math.max(0, newValue + amount);

	const { data, error } = await supabase
		.from('participants')
		.update({ [field]: updatedValue })
		.eq('id', participantId)
		.select()
		.single();

	if (error) throw error;
	return data as Participant;
}
