const fetch = require('isomorphic-unfetch')
const baseUrl = 'https://hotell.difi.no/api/json'


async function getList(type, name, page = 1, init = false) {

    let url;

    if (init) {
        url = `${baseUrl}/difi/geo/fylke`
    } else {
        url = `${baseUrl}/valg/valglokaler/2017?${type}${name}&page=${page}`
    }

    const result = await fetch(url)
    const data = await result.json()

    return {data}
}


const listData = {getList}
export default listData