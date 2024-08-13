import { beforeEach, describe, expect, it } from "bun:test";
import db from "../src/db";

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
        seedPosts();
        const response = await fetch("http://localhost:5000/api/posts");
        const jsonResp = await response.json();
        console.log(jsonResp);
        expect(response.status).toBe(200);
        expect(jsonResp.length).toBe(3);
    })
});