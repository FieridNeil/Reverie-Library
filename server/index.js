const express = require('express');
const fs = require('fs');
const app = express();
const port = 4001;
const csv = require('fast-csv');
const cors = require('cors');

app.use(express.json());
app.use(cors());

const getDataset = async () => {
	const records = [];
	return new Promise((resolve, reject) => {
		fs.createReadStream('./books.csv')
			.pipe(csv.parse({ headers: true }))
			.on('error', (err) => reject(err))
			.on('data', (d) => records.push(d))
			.on('end', () => resolve(records));
	});
};

app.post('/bookSearch', async (req, res) => {
	console.log(req.body);
	let data;
	try {
		data = await getDataset();
	} catch (err) {
		console.log(err);
	}
});

app.get('/', (req, res) => {
	res.send('server is up and running');
});

app.listen(port, () => {
	console.log('Server is running at http://localhost:', port);
});
