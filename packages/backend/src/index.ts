import app from "./app";
import { expressPort } from "./config";
import logger from "./utils/logger";

const port = expressPort();
app.listen(port, () => {
  logger.info(`Server listening on port ${port}`);
});
