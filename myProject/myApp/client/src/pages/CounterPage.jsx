import React, { useState } from "react";

const Counter = () => {
	const [count, setCount] = useState(0);

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				height: "60vh",
				textAlign: "center",
			}}>
			<h1 style={{ fontSize: "5rem", margin: "0 0 2rem 0" }}>{count}</h1>

			<div style={{ display: "flex", gap: "1rem" }}>
				<button onClick={() => setCount(count + 1)}>Increase</button>
				<button onClick={() => setCount(count - 1)}>Decrease</button>
				<button onClick={() => setCount(0)}>Reset</button>
			</div>
		</div>
	);
};

export default Counter;
