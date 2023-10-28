import { redirect } from '@sveltejs/kit';

/** @satisfies {import('./$types').PageServerLoad} */
export const load = ({ cookies }) => {
	const hasHousehold = cookies.get('householdId');

	if (!hasHousehold) {
    redirect(307, '/household')
  }
};
