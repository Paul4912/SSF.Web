import * as url from '../constants/Urls'
import { get, post } from './Api'

// export const getUsers = () => {
//     return get(url.usersUrl, null)
// }

export async function getUsers() {
    const { data, status, statusText } = await get(url.usersUrl, null)
    return data
}

export const postUsers = () => {
    return post(url.usersUrl, { user: 'abc' }, null)
}