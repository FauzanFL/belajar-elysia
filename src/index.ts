import { Elysia } from "elysia";
import postRoutes from "./routes/posts";
import swagger from "@elysiajs/swagger";

const app = new Elysia();
const port = process.env.PORT || 5000;

app
.use(swagger({path: "/docs"}))
.get("/", () => "Welcome to the API")
.group("/api", (app) => app.use(postRoutes))
.listen(port);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
