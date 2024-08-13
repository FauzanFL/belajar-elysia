import { NotFoundError } from 'elysia';
import db from '../../db'

export async function getPosts() {
    try {
        const data = await db.post.findMany({orderBy: {createdAt: 'asc'}});
        return {data};
    } catch (error) {
        console.error(error);
    }
}

export async function getPostById(id: number) {
    try {
        const post = db.post.findUnique({where: {id}});
        if (!post) {
            throw new NotFoundError('Post not found');
        }
        return {data: post};
    } catch (error) {
        console.error(error);
    }
}

export async function createPost(data: {title: string, content: string}) {
    try {
        await db.post.create({data});
        return {data: {message: "Post created successfully"}};
    } catch (error) {
        console.error(`Error creating post: ${error}`);
    }
}

export async function updatePost(id: number, data: {title?: string, content?: string}) {
    try {
        await db.post.update({where: {id}, data});
        return {data: {message: "Post updated successfully"}};
    } catch (error) {
        console.error(`Error updating post: ${error}`);
    }
}

export async function deletePost(id: number) {
    try {
        await db.post.delete({where: {id}});
        return {data: {message: "Post deleted successfully"}};
    } catch (error) {
        console.error(`Error deleting post: ${error}`);
    }
}