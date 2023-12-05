import app from './app';
import config from './app/config';

// getting-started.js
import mongoose from 'mongoose';

main().catch((err) => console.log(err));

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    app.listen(config.port, () => {
      console.log(
        ` The server is running on port: http://localhost:${config.port}`,
      );
    });
  } catch (error) {
    console.log(`Something went wrong: ${error}`);
  }
}
