import { PrismaClient } from "@prisma/client";
import { afterEach, beforeEach, describe, expect, it } from "bun:test";

const db = new PrismaClient();

const seedPosts = async () => {
    const posts = [
        { title: "Post 1", content: "Content 1" },
        { title: "Post 2", content: "Content 2" },
        { title: "Post 3", content: "Content 3" },
    ];

    await db.post.createMany({data: posts});
}

beforeEach(async () => {
    // remove all posts from the database
    await db.post.deleteMany({});
});

describe("GET /", () => {
    it("should return a list of posts", async () => {
        await seedPosts();
        const response = await fetch("http://localhost:5000/api/posts");
        const jsonResp = await response.json();
        expect(response.status).toBe(200);
        expect(jsonResp.data).toBeDefined();
        expect(jsonResp.data).toBeArray();
        expect(jsonResp.data.length).toBe(3);
    });
});

describe("GET /:id", () => {
    it('should return post by id', async () => {
        await seedPosts();
        const post = await db.post.findFirst()
        const response = await fetch("http://localhost:5000/api/posts/"+post?.id);
        const jsonResp = await response.json();
        expect(response.status).toBe(200);
        expect(jsonResp.data).toBeDefined();
        expect(jsonResp.data).toBeObject();
        expect(jsonResp.data).toHaveProperty("id", post?.id);
    });

    it('should return client error', async () => {
        await seedPosts();
        const response = await fetch("http://localhost:5000/api/posts/sde");
        const jsonResp = await response.json();
        expect(response.status).toBe(422);
        expect(jsonResp).toHaveProperty("errors");
        expect(jsonResp.summary).toBe("Property 'id' should be one of: 'numeric', 'number'")
    });

    // On Proccess
    // it('should return not found', async () => {
    //     await seedPosts();
    //     const post = await db.post.findFirst();
    //     const response = await fetch("http://localhost:5000/api/posts/"+0);
    //     const jsonResp = await response.json();
    //     console.log(response)
    //     expect(response.status).toBe(400);
    // });
});

describe("POST /", () => {
    it('should return success response', async () => {
        const data = { title: "My Post", content: "Test" };
        const response = await fetch("http://localhost:5000/api/posts", {method: "POST", body: JSON.stringify(data), headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }});
        const jsonResp = await response.json();
        expect(response.status).toBe(200);
        const newPost = await db.post.findFirst();
        expect(newPost?.title).toBe(data.title);
        expect(newPost?.content).toBe(data.content);
        expect(jsonResp.data.message).toBeDefined();
        expect(jsonResp.data.message).toBe("Post created successfully");
    });

    it('should return client error', async () => {
        const data = { title: "", content: "" };
        const response = await fetch("http://localhost:5000/api/posts", {method: "POST", body: JSON.stringify(data), headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }});
        const jsonResp = await response.json();
        expect(response.status).toBe(422);
        expect(jsonResp).toHaveProperty("errors");
    });
})

describe('PUT /:id', () => {
    it('should return success response', async () => {
        await seedPosts();
        const post = await db.post.findFirst();
        const data = { title: "My Post", content: "Test" };
        const response = await fetch("http://localhost:5000/api/posts/"+post?.id, {method: "PUT", body: JSON.stringify(data), headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }});
        const jsonResp = await response.json();
        expect(response.status).toBe(200);
        const updatedPost = await db.post.findFirst();
        expect(updatedPost?.title).toBe(data.title);
        expect(updatedPost?.content).toBe(data.content);
        expect(jsonResp.data.message).toBeDefined();
        expect(jsonResp.data.message).toBe("Post updated successfully");
    });

    it('should return client error', async () => {
        await seedPosts();
        const post = await db.post.findFirst();
        const data = { title: "", content: "" };
        const response = await fetch("http://localhost:5000/api/posts/"+post?.id, {method: "PUT", body: JSON.stringify(data), headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }});
        const jsonResp = await response.json();
        expect(response.status).toBe(422);
        expect(jsonResp).toHaveProperty("errors");
    });
})

describe('DELETE /:id', () => {
    it('should return success response', async () => {
        await seedPosts();
        const post = await db.post.findFirst();
        const response = await fetch("http://localhost:5000/api/posts/"+post?.id, {method: "DELETE"});
        const jsonResp = await response.json();
        expect(response.status).toBe(200);
        const posts = await db.post.findMany();
        expect(posts).toBeArrayOfSize(2);
        expect(jsonResp.data.message).toBeDefined();
        expect(jsonResp.data.message).toBe("Post deleted successfully");
    });

    it('should return client error', async () => {
        await seedPosts();
        const response = await fetch("http://localhost:5000/api/posts/sde", {method: "DELETE"});
        const jsonResp = await response.json();
        expect(response.status).toBe(422);
        expect(jsonResp).toHaveProperty("errors");
    });
}) 