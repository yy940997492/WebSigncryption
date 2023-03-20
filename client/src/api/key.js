import {request} from 'umi'
export const keyGet = ()=>{
    return request('http://localhost:3000/getPairKey',{
        method:'GET',
    })
}