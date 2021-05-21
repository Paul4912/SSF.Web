import axios from 'axios'
import * as url from '../constants/Urls'

export const api = axios.create({
    baseURL: url.baseUrl,
    responseType: "json"
})

export const get = (url: string, options: any) => {
    return api.get(url, options)
}

export const post = (url: string, data: any, options: any) => {
    return api.post(url, data, options)
}