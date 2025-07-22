import HomePage from "./pages/HomePage";
import Counter from "./pages/CounterPage";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import TodoPage from "./pages/TodoPage";

function App() {
	const name = "ketul";
	return (
		<BrowserRouter>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					padding: "16px",
					backgroundColor: "#f8f9fa",
					boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
					marginBottom: "20px",
				}}>
				<div style={{ display: "flex", gap: "16px" }}>
					<Link to="/">
						<div
							style={{
								textDecoration: "none",
								color: "#495057",
								padding: "8px 16px",
								borderRadius: "4px",
								backgroundColor: "#e9ecef",
								transition: "all 0.3s ease",
							}}>
							Home
						</div>
					</Link>
					<Link to="/counter">
						<div
							style={{
								textDecoration: "none",
								color: "#495057",
								padding: "8px 16px",
								borderRadius: "4px",
								backgroundColor: "#e9ecef",
								transition: "all 0.3s ease",
							}}>
							Counter
						</div>
					</Link>

					<Link to="/todos">
						<div
							style={{
								textDecoration: "none",
								color: "#495057",
								padding: "8px 16px",
								borderRadius: "4px",
								backgroundColor: "#e9ecef",
								transition: "all 0.3s ease",
							}}>
							Todo
						</div>
					</Link>
				</div>
			</div>
			<Routes>
				<Route path="/" element={<HomePage name={name} />}></Route>
				<Route path="/counter" element={<Counter />}></Route>
				<Route path="/todos" element={<TodoPage />}></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
