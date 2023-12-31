const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/proxy', async (req, res) => {
  const keyword = req.query.keyword;
  const fetch = (await import('node-fetch')).default;
  const url = `https://services.nvd.nist.gov/json/cves/1.0?keyword=${keyword}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'An error occurred fetching data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
