import { app } from "./app";
const PORT = 3000;

async function start() {
  try {
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit();
  }
}

start();
