import { useState, useEffect } from "react";
import { API_URL } from "../App";
import axios from "axios";

export default function AuthComponent() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		axios
			.get(`${API_URL}/profile`, { withCredentials: true })
			.then(() => setIsAuthenticated(true))
			.catch(() => setIsAuthenticated(false));
	});

	return isAuthenticated && <div>{`DISPLAY COMPONENT`}</div>;
}
