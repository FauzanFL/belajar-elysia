import {Elysia} from "elysia";
import { getPosts } from "./handlers";

const postRoutes = new Elysia({prefix: "/posts"})
.get("/", () => getPosts())
.get("/:id", ({params}) => `Get post with id ${params.id}`)
.post("/", () => "Create a new post")
.put("/:id", ({params}) => `Update post with id ${params.id}`)
.delete("/:id", ({params}) => `Delete post with id ${params.id}`);

export default postRoutes;