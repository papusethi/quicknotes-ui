import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "./components/PrivateRoutes";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

const App: React.FC = () => {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/signin' element={<Signin />} />
			<Route path='/signup' element={<Signup />} />
			<Route element={<PrivateRoutes />}>
				<Route path='/profile' element={<Profile />} />
				<Route path='/dashboard' element={<Dashboard />} />
			</Route>
		</Routes>
	);
};

export default App;
