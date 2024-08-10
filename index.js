const express = require('express');
const app = express();
app.use(express.json());

require('dotenv').config();
const PORT = process.env.PORT;

const presentationsRouter = require('./routers/presentationsRouter');
app.use("/presentations", presentationsRouter);

const slidesRouter = require('./routers/slidesRouter');
app.use("/slides", slidesRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
