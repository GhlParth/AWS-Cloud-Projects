import express from "express";
import cors from "cors";
import sql from "mssql";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const sqlConfig = {
	user: "kuldeep",
	password: "kuldeep",
	database: "testdb",
	server: "DESKTOP-8I2GN0L",
	pool: { max: 10, min: 0, idleTimeoutMillis: 30000 },
	options: { encrypt: false, trustServerCertificate: true },
};

const apiKey = "AIzaSyA5oUyBFy8GLvuklFx3QgAD1RUBJkYhIPg";
const modelName = "models/gemini-2.5-flash";
const genAI = new GoogleGenerativeAI(apiKey);
const llmModel = genAI.getGenerativeModel({ model: modelName });

app.get("/health", (req, res) => {
	res.json({
		success: true,
		status: 200,
		message: `Server is up on port ${port}`,
	});
});

app.post("/tasks", async (req, res) => {
	const { task, completed } = req.body;
	if (typeof task !== "string" || typeof completed !== "boolean") {
		return res
			.status(400)
			.json({ success: false, error: "Invalid task or completed" });
	}
	try {
		const result = await pool
			.request()
			.input("task", sql.NVarChar, task)
			.input("completed", sql.Bit, completed)
			.query(
				"INSERT INTO tasks (task, completed) OUTPUT inserted.* VALUES (@task, @completed)",
			);
		res.json({ success: true, data: result.recordset[0] });
	} catch (err) {
		res.status(500).json({ success: false, error: err.message });
	}
});

app.get("/tasks", async (req, res) => {
	try {
		const result = await pool.request().query("SELECT * FROM tasks");
		res.json({ success: true, data: result.recordset });
	} catch (err) {
		res.status(500).json({ success: false, error: err.message });
	}
});

app.put("/tasks/:id", async (req, res) => {
	const { id } = req.params;
	const { completed } = req.body;
	if (typeof completed !== "boolean") {
		return res
			.status(400)
			.json({ success: false, error: "Invalid completed value" });
	}
	try {
		const result = await pool
			.request()
			.input("id", sql.Int, id)
			.input("completed", sql.Bit, completed)
			.query(
				"UPDATE tasks SET completed = @completed OUTPUT inserted.* WHERE id = @id",
			);
		if (result.recordset.length === 0) {
			return res.status(404).json({ success: false, error: "Task not found" });
		}
		res.json({ success: true, data: result.recordset[0] });
	} catch (err) {
		res.status(500).json({ success: false, error: err.message });
	}
});

app.delete("/tasks/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const result = await pool
			.request()
			.input("id", sql.Int, id)
			.query("DELETE FROM tasks OUTPUT deleted.* WHERE id = @id");
		if (result.recordset.length === 0) {
			return res.status(404).json({ success: false, error: "Task not found" });
		}
		res.json({ success: true, data: result.recordset[0] });
	} catch (err) {
		res.status(500).json({ success: false, error: err.message });
	}
});

app.get("/getPriority", async (req, res) => {
	try {
		const result = await pool
			.request()
			.query("SELECT task FROM tasks WHERE completed = 0");
		let tasks = Array.isArray(result.recordset)
			? result.recordset
				.map((r) => r.task)
				.filter((t) => typeof t === "string")
				.map((t) => t.trim())
			: [];
		tasks = [...new Set(tasks)];
		if (tasks.length === 0) {
			return res.json({
				success: true,
				data: "No pending tasks to prioritize.",
			});
		}
		const maxTasks = 5;
		const limited = tasks.slice(0, maxTasks);
		const esc = (t) => t.replace(/"/g, '\\"');
		let prompt;
		if (limited.length === 1) {
			prompt = `The only pending task is "${esc(
				limited[0],
			)}". Please write a very polite paragraph advising the user to complete this task first and explaining why.`;
		} else if (limited.length === 2) {
			prompt = `The pending tasks are "${esc(limited[0])}" and "${esc(
				limited[1],
			)}". Please write a very polite paragraph telling the user to do "${esc(
				limited[0],
			)}" first and then "${esc(
				limited[1],
			)}", explaining why in relation to each other.`;
		} else {
			const instructions = limited
				.map((t, i) =>
					i === 0
						? `first you should do "${esc(t)}"`
						: `then you should do "${esc(t)}"`,
				)
				.join(", ");
			prompt = `The pending tasks are ${limited
				.map((t) => `"${esc(t)}"`)
				.join(
					", ",
				)}. Please write a very polite paragraph telling the user: ${instructions}. Also explain why each task should be done in that order in relation to the others.`;
		}
		if (tasks.length > maxTasks) {
			prompt += ` Only include advice for the first ${maxTasks} tasks.`;
		}
		const aiResult = await llmModel.generateContent(prompt);
		const message = aiResult.response.text();
		res.json({ success: true, data: message });
	} catch (err) {
		res.status(500).json({ success: false, error: err.message });
	}
});

let pool;
(async () => {
	pool = await sql.connect(sqlConfig);
	console.log("Database is connected!");
	app.listen(port, () => console.log(`Server listening on port ${port}`));
})();
