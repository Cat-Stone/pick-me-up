import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loadUser } from "../store/users";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

const Login = () => {
	// state
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	// Redux
	const dispatch = useDispatch();


	// history 
	const history = useHistory();
	// console.log(history)
	// console.log(props)

	// form submit
	const login = async () => {
		


		if (!email || !password) {
			setError("Error: Please fill out both email and password fields");
		} else {
			console.log("button pressed");
			try {
				const request = { email, password };
				console.log(request);
				const response = await axios.post("/api/login", request);
				localStorage.setItem("pickmeup-token", response.data.token);
				dispatch(loadUser(response.data.id));
				setError("Success");
				history.push('/');

			} catch (er) {
				console.log(er);
				setError("Error: Invalid email or password. Please try again.");
			}
		}
	};

	return (
		<div>
			<form>
				<label htmlFor="email">Email Address</label>
				<input
					type="text"
					id="email"
					value={email}
					onChange={(ev) => {
						setEmail(ev.target.value);
					}}
				/>
				<label htmlFor="password">Password</label>
				<input
					type="text"
					id="password"
					value={password}
					onChange={(ev) => {
						setPassword(ev.target.value);
					}}
				/>
			</form>
			<button onClick={login}>Log In</button>
			{error && <p>{error}</p>}
			<p>
				Not a user yet? <Link to="/signup">Sign up for a new account.</Link>
			</p>
		</div>
	);
};

export default Login;
