// Compute API base from current origin to avoid hardcoded host in frontend.
// If you need custom base for different environments, set `REACT_APP_API_BASE`.
const API_BASE = (process && process.env && process.env.REACT_APP_API_BASE)
	? process.env.REACT_APP_API_BASE
	: `${window.location.origin}/TeaWeb/backend/api`;

export default API_BASE;
