import { redirect } from '@sveltejs/kit';

/** @satisfies {import('./$types').PageServerLoad} */
export const load = ({ cookies }) => {
	const hasHousehold = cookies.get('householdId');
  const landingPage = hasHousehold ? '/stock' : '/household'

	throw redirect(307, landingPage)
};
