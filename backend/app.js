const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());

const highwayCoords_trash = [
  [12.9716, 77.5946],
  [12.8716, 77.4946],
  [12.7716, 77.3946],
  [12.6716, 77.2946],
  [12.5716, 77.1946],
  [12.4716, 77.0946],
  [12.3716, 76.9946],
  [12.2716, 76.8946],
  [12.1716, 76.7946],
  [12.0716, 76.6946],
  [11.9716, 76.5946],
  [11.8716, 76.4946],
  [11.7716, 76.3946],
  [11.6716, 76.2946],
  [11.5716, 76.1946],
  [11.4716, 76.0946],
  [11.3716, 75.9946],
  [11.2716, 75.8946],

];

const highwayCoords = [
  [12.907767357865847, 77.57297653444661],
  [12.914661278899043, 77.57334419576841],
  [12.917360924974972, 77.57391073014078],
  [12.917729056270591, 77.57686929852983],
  [12.917360924974972, 77.57831710859254],
  [12.917176859123735, 77.58007965997324],
  [12.917115503821288, 77.58583942596688],
  [12.916870082415068, 77.59364501065286],
  [12.916814538702067, 77.5999576091265],
  [12.912404510603347, 77.59905271344493]
];

app.get('/stream', (req, res) => {
  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });

  let i = 0;
  setInterval(() => {
    const [latitude, longitude] = highwayCoords[i % highwayCoords.length];
    res.write(`data: ${JSON.stringify({ latitude, longitude })}\n\n`);
    i++;
  }, 3000);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
