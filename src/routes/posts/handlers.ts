import db from '../../db'

export async function getPosts() {
    try {
        return await db.post.findMany({orderBy: {createdAt: 'asc'}});
    } catch (error) {
        console.error(error);
    }
}