import findUserById from './helpers/findUserById'

export default function toggleFavPost(userId: string, postId: string) {
    if (typeof userId !== 'string') throw new Error('userId is not a string')
    if (!userId) throw new Error('userId is empty')

    const user = findUserById(userId)

    if (!user) throw new Error(`user with id ${userId} does not exist`)

    // TODO validate post existence

    const index = user.favs.indexOf(postId)

    if (index !== -1) 
        user.favs.splice(index, 1)
    else 
        user.favs.push(postId)
}