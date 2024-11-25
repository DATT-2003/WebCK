import axiosClient from "./axiosClient"

const handleAPI = async (url: string, data?: any, method?: 'post' | 'put' | 'get' | 'delete') => {
    return axiosClient(url, {
        method: method ?? 'post',
        data,
    })
}
export default handleAPI