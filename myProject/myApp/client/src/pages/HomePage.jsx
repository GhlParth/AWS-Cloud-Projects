import React from "react";

const HomePage = (props) => {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				height: "60vh",
				textAlign: "center",
				backgroundColor: "#f8f9fa",
				padding: "20px",
			}}>
			<h1
				style={{
					fontSize: "3rem",
					color: "#2c3e50",
					marginBottom: "20px",
					fontWeight: "bold",
				}}>
				Hello {props.name}
			</h1>
			<h2
				style={{
					fontSize: "2rem",
					color: "#3498db",
					marginBottom: "30px",
				}}>
				Welcome to the Full Stack Workshop
			</h2>
		</div>
	);
};
export default HomePage;
