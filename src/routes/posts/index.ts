import {Elysia, t} from "elysia";
import { createPost, deletePost, getPostById, getPosts, updatePost } from "./handlers";

const postRoutes = new Elysia({prefix: "/posts"})
.get("/", () => getPosts())
.get("/:id", ({params: {id}}) => getPostById(id), {
    params: t.Object({id: t.Number()})
})
.post("/", ({body}) => createPost(body), {
    body: t.Object({
        title: t.String({
            minLength: 5,
            maxLength: 100
        }),
        content: t.String({
            minLength: 10
        })
    })
})
.put("/:id", ({params: {id}, body}) => updatePost(id, body), {
    params: t.Object({id: t.Number()}),
    body: t.Object({
        title: t.Optional(t.String({
            minLength: 5,
            maxLength: 100
        })),
        content: t.Optional(t.String({
            minLength: 10
        }))
    }, {
        minProperties: 1
    })
})    
.delete("/:id", ({params: {id}}) => deletePost(id), {
    params: t.Object({id: t.Number()})
});

export default postRoutes;