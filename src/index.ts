import app from './app';
import log from './helpers/logger';

const port = process.env.PORT || 8000;
app.listen(port, () => {
  log(`Server is running on http://localhost:${port}`);
});