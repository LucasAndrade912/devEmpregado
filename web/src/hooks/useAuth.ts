import { useContext } from 'react';

import { AuthContext } from '../context/auth';

export function useAuth() {
	const auth = useContext(AuthContext)
	return auth
}
