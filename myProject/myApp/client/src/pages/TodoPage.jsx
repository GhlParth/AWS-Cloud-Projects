// import { useState, useEffect } from "react";

// const TodoPage = () => {
// 	const [todos, setTodos] = useState([]);
// 	const [newTodo, setNewTodo] = useState("");
// 	const [priorityMessage, setPriorityMessage] = useState("");

// 	const fetchTasks = async () => {
// 		const res = await fetch("http://localhost:3000/tasks");
// 		const json = await res.json();
// 		if (json.success) {
// 			setTodos(json.data);
// 		}
// 	};

// 	const addTodo = async () => {
// 		if (newTodo.trim() === "") return;
// 		const res = await fetch("http://localhost:3000/tasks", {
// 			method: "POST",
// 			headers: { "Content-Type": "application/json" },
// 			body: JSON.stringify({ task: newTodo, completed: false }),
// 		});
// 		const json = await res.json();
// 		if (json.success) {
// 			setTodos([...todos, json.data]);
// 			setNewTodo("");
// 		}
// 	};

// 	const completeTodo = async (id) => {
// 		const res = await fetch(`http://localhost:3000/tasks/${id}`, {
// 			method: "PUT",
// 			headers: { "Content-Type": "application/json" },
// 			body: JSON.stringify({ completed: true }),
// 		});
// 		const json = await res.json();
// 		if (json.success) {
// 			setTodos(todos.map((t) => (t.id === id ? json.data : t)));
// 		}
// 	};

// 	const deleteTodo = async (id) => {
// 		const res = await fetch(`http://localhost:3000/tasks/${id}`, {
// 			method: "DELETE",
// 		});
// 		const json = await res.json();
// 		if (json.success) {
// 			setTodos(todos.filter((t) => t.id !== id));
// 		}
// 	};

// 	const getPriority = async () => {
// 		const res = await fetch("http://localhost:3000/getPriority");
// 		const json = await res.json();
// 		if (json.success) {
// 			setPriorityMessage(json.data);
// 		}
// 	};

// 	useEffect(() => {
// 		fetchTasks();
// 	}, []);

// 	return (
// 		<div
// 			style={{
// 				maxWidth: "1200px",
// 				margin: "0 auto",
// 				padding: "20px",
// 				fontFamily: "'Google Sans', Roboto, Arial, sans-serif",
// 			}}>
// 			<div
// 				style={{
// 					textAlign: "center",
// 					marginBottom: "30px",
// 					padding: "20px 0",
// 					color: "#202124",
// 					fontSize: "32px",
// 					fontWeight: "500",
// 				}}>
// 				Todo Application
// 			</div>
// 			<div style={{ display: "flex", gap: "20px" }}>
// 				<div
// 					style={{
// 						flex: 1,
// 						backgroundColor: "white",
// 						borderRadius: "8px",
// 						padding: "20px",
// 					}}>
// 					<h1
// 						style={{
// 							color: "#202124",
// 							fontSize: "20px",
// 							fontWeight: "500",
// 							marginBottom: "20px",
// 						}}>
// 						Your Todos
// 					</h1>
// 					{todos.map((todo) => (
// 						<div
// 							key={todo.id}
// 							style={{
// 								display: "flex",
// 								alignItems: "center",
// 								justifyContent: "space-between",
// 								padding: "12px 16px",
// 								margin: "8px 0",
// 								backgroundColor: todo.completed ? "#f0f7ff" : "#fff",
// 								borderLeft: todo.completed
// 									? "4px solid #34a853"
// 									: "4px solid #1a73e8",
// 							}}>
// 							<div
// 								style={{
// 									color: todo.completed ? "#5f6368" : "#202124",
// 									display: "flex",
// 									alignItems: "center",
// 									gap: "12px",
// 								}}>
// 								{todo.completed ? "✓" : "•"} {todo.task}
// 							</div>
// 							<div>
// 								{!todo.completed && (
// 									<button
// 										onClick={() => completeTodo(todo.id)}
// 										style={{
// 											backgroundColor: "#1a73e8",
// 											color: "white",
// 											border: "none",
// 											borderRadius: "4px",
// 											padding: "8px 12px",
// 											marginLeft: "8px",
// 											cursor: "pointer",
// 										}}>
// 										Complete
// 									</button>
// 								)}
// 								<button
// 									onClick={() => deleteTodo(todo.id)}
// 									style={{
// 										backgroundColor: "#fef3f2",
// 										color: "#d92c20",
// 										border: "none",
// 										borderRadius: "4px",
// 										padding: "8px 12px",
// 										marginLeft: "8px",
// 										cursor: "pointer",
// 									}}>
// 									Delete
// 								</button>
// 							</div>
// 						</div>
// 					))}
// 					<button
// 						onClick={getPriority}
// 						style={{
// 							marginTop: "16px",
// 							backgroundColor: "#1a73e8",
// 							color: "white",
// 							border: "none",
// 							borderRadius: "4px",
// 							padding: "8px 16px",
// 							cursor: "pointer",
// 						}}>
// 						Get Priority
// 					</button>
// 					{priorityMessage && (
// 						<div
// 							style={{
// 								marginTop: "12px",
// 								padding: "16px",
// 								backgroundColor: "#f9f9f9",
// 								borderLeft: "4px solid #1a73e8",
// 								borderRadius: "4px",
// 								lineHeight: "1.6",
// 								whiteSpace: "pre-wrap",
// 							}}>
// 							{priorityMessage}
// 						</div>
// 					)}
// 				</div>
// 				<div style={{ flex: 1 }}>
// 					<div
// 						style={{
// 							backgroundColor: "white",
// 							borderRadius: "8px",
// 							padding: "20px",
// 						}}>
// 						<h1
// 							style={{
// 								color: "#202124",
// 								fontSize: "20px",
// 								fontWeight: "500",
// 								marginBottom: "20px",
// 							}}>
// 							Add New Todo
// 						</h1>
// 						<div style={{ display: "flex", gap: "10px" }}>
// 							<input
// 								type="text"
// 								style={{
// 									flexGrow: 1,
// 									padding: "12px",
// 									border: "1px solid #dadce0",
// 									borderRadius: "4px",
// 								}}
// 								placeholder="Enter your todo..."
// 								value={newTodo}
// 								onChange={(e) => setNewTodo(e.target.value)}
// 							/>
// 							<button
// 								onClick={addTodo}
// 								style={{
// 									backgroundColor: "#1a73e8",
// 									color: "white",
// 									border: "none",
// 									borderRadius: "4px",
// 									padding: "0 24px",
// 									cursor: "pointer",
// 									height: "44px",
// 								}}>
// 								Add
// 							</button>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default TodoPage;



import { useState, useEffect } from "react";

const TodoPage = () => {

	const [todos, setTodos] = useState([]);
	const [newTodo, setNewTodo] = useState("");
	const [priorityMessage, setPriorityMessage] = useState("");

	const fetchTasks = async () => {
		const res = await fetch("http://localhost:3000/tasks");
		const json = await res.json();
		if (json.success) {
			setTodos(json.data);
		}
	};

	const addTodo = async () => {
		if (newTodo.trim() === "") return;
		const res = await fetch("http://localhost:3000/tasks", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ task: newTodo, completed: false }),
		});
		const json = await res.json();
		if (json.success) {
			setTodos([...todos, json.data]);
			setNewTodo("");
		}
	}; 


	const completeTodo = async (id) => {
		const res = await fetch(`http://localhost:3000/tasks/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ completed: true }),
		});
		const json = await res.json();
		if (json.success) {
			setTodos(todos.map((t) => (t.id === id ? json.data : t)));
		}
	};

	const deleteTodo = async (id) => {
		const res = await fetch(`http://localhost:3000/tasks/${id}`, {
			method: "DELETE",
		});
		const json = await res.json();
		if (json.success) {
			setTodos(todos.filter((t) => t.id !== id));
		}
	};

	const getPriority = async () => {
		const res = await fetch("http://localhost:3000/getPriority");
		const json = await res.json();
		if (json.success) {
			setPriorityMessage(json.data);
		}
	};



	useEffect(() => {
		fetchTasks();
	}, []);


	return (
		<div
			style={{
				maxWidth: "1200px",
				margin: "0 auto",
				padding: "20px",
				fontFamily: "'Google Sans', Roboto, Arial, sans-serif",
			}}>
			<div
				style={{
					textAlign: "center",
					marginBottom: "30px",
					padding: "20px 0",
					color: "#202124",
					fontSize: "32px",
					fontWeight: "500",
				}}>
				Todo Application
			</div>
			<div style={{ display: "flex", gap: "20px" }}>
				<div
					style={{
						flex: 1,
						backgroundColor: "white",
						borderRadius: "8px",
						padding: "20px",
					}}>
					<h1
						style={{
							color: "#202124",
							fontSize: "20px",
							fontWeight: "500",
							marginBottom: "20px",
						}}>
						Your Todos
					</h1>
					{todos.map((todo) => (
						<div
							key={todo.id}
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
								padding: "12px 16px",
								margin: "8px 0",
								backgroundColor: todo.completed ? "#f0f7ff" : "#fff",
								borderLeft: todo.completed
									? "4px solid #34a853"
									: "4px solid #1a73e8",
							}}>
							<div
								style={{
									color: todo.completed ? "#5f6368" : "#202124",
									display: "flex",
									alignItems: "center",
									gap: "12px",
								}}>
								{todo.completed ? "✓" : "•"} {todo.task}
							</div>
							<div>
								{!todo.completed && (
									<button
										onClick={() => completeTodo(todo.id)}
										style={{
											backgroundColor: "#1a73e8",
											color: "white",
											border: "none",
											borderRadius: "4px",
											padding: "8px 12px",
											marginLeft: "8px",
											cursor: "pointer",
										}}>
										Complete
									</button>
								)}
								<button
									onClick={() => deleteTodo(todo.id)}
									style={{
										backgroundColor: "#fef3f2",
										color: "#d92c20",
										border: "none",
										borderRadius: "4px",
										padding: "8px 12px",
										marginLeft: "8px",
										cursor: "pointer",
									}}>
									Delete
								</button>
							</div>
						</div>
					))}
					<button
						onClick={getPriority}
						style={{
							marginTop: "16px",
							backgroundColor: "#1a73e8",
							color: "white",
							border: "none",
							borderRadius: "4px",
							padding: "8px 16px",
							cursor: "pointer",
						}}>
						Get Priority
					</button>
					{priorityMessage && (
						<div
							style={{
								marginTop: "12px",
								padding: "16px",
								backgroundColor: "#f9f9f9",
								borderLeft: "4px solid #1a73e8",
								borderRadius: "4px",
								lineHeight: "1.6",
								whiteSpace: "pre-wrap",
							}}>
							{priorityMessage}
						</div>
					)}
				</div>
				<div style={{ flex: 1 }}>
					<div
						style={{
							backgroundColor: "white",
							borderRadius: "8px",
							padding: "20px",
						}}>
						<h1
							style={{
								color: "#202124",
								fontSize: "20px",
								fontWeight: "500",
								marginBottom: "20px",
							}}>
							Add New Todo
						</h1>
						<div style={{ display: "flex", gap: "10px" }}>
							<input
								type="text"
								style={{
									flexGrow: 1,
									padding: "12px",
									border: "1px solid #dadce0",
									borderRadius: "4px",
								}}
								placeholder="Enter your todo..."
								value={newTodo}
								onChange={(e) => setNewTodo(e.target.value)}
							/>
							<button
								onClick={addTodo}
								style={{
									backgroundColor: "#1a73e8",
									color: "white",
									border: "none",
									borderRadius: "4px",
									padding: "0 24px",
									cursor: "pointer",
									height: "44px",
								}}>
								Add
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);


};

export default TodoPage;