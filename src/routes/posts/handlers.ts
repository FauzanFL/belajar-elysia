import { NotFoundError } from 'elysia';
import db from '../../db'

export async function getPosts() {
    try {
        return await db.post.findMany({orderBy: {createdAt: 'asc'}});
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
        return post;
    } catch (error) {
        console.error(error);
    }
}

export async function createPost(data: {title: string, content: string}) {
    try {
        return await db.post.create({data});
    } catch (error) {
        console.error(`Error creating post: ${error}`);
    }
}

export async function updatePost(id: number, data: {title?: string, content?: string}) {
    try {
        return await db.post.update({where: {id}, data});
    } catch (error) {
        console.error(`Error updating post: ${error}`);
    }
}

export async function deletePost(id: number) {
    try {
        return await db.post.delete({where: {id}});
    } catch (error) {
        console.error(`Error deleting post: ${error}`);
    }
}