const express = require("express");
const fs = require("fs");
const app = express();
const port = process.env.PORT || 4001;
const csv = require("fast-csv");
const cors = require("cors");
const path = require("path");

app.use(express.json());
app.use(cors());
app.use(express.static(path.resolve(__dirname, "./client/build")));

const getDataset = async () => {
	const records = [];
	return new Promise((resolve, reject) => {
		fs.createReadStream("./books.csv")
			.pipe(csv.parse({ headers: true }))
			.on("error", (err) => reject(err))
			.on("data", (d) => records.push(d))
			.on("end", () => resolve(records));
	});
};

// Param:
// - q: search query, coming from the front end
app.post("/bookSearch", async (req, res) => {
	console.log(req.body.q);
	let dataset;
	let found = [];
	try {
		dataset = await getDataset();
		for (let i = 0; i < dataset.length; i++) {
			if (
				dataset[i].title
					.toLowerCase()
					.includes(req.body.q.toLowerCase())
			) {
				found.push(dataset[i]);
			}
		}
	} catch (err) {
		console.log(err);
	}
	res.json({ searchTitle: req.body.q, data: found });
});

app.get("/", (req, res) => {
	res.send("server is up and running");
});

app.listen(port, () => {
	console.log("Server is running at http://localhost:", port);
});
