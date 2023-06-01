import mongoose from "mongoose";
import app from "./app";
import config from "./config/index";

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log("🔥__Database Connected");

    app.listen(config.port, () => {
      console.log(`APPLICATION RUNNING ON PORT ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

bootstrap();
