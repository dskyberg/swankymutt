import qs from 'qs'
import { ajaxOptions } from '../mobx-rest/mobx-fetch-adapter'

/**
 * Either returns the json value on the current resolved promise, or
 * returns a new rejected promise
 * @param {*} response
 */
function checkStatus(response) {
    return response.json().then(json => {
        return response.ok ? json : Promise.reject(json)
    })
}

/**
 * ajax wraps fetch in a promise, and rejects if the fetch response
 * is not within the 200 zone.

 * @param {*} url
 * @param {*} options
 */
export default function ajax(url, options) {
    let rejectPromise

    // If this is a GET, turn the data into URL params,
    // and remove the data from the options
    if (options.method === 'GET' && options.data) {
        url = `${url}?${qs.stringify(options.data)}`
        delete options.data
    }

    const fetchPromise = fetch(url, ajaxOptions(options))
        .catch(err => {
            console.log('fetch error:', err)
            throw err
        })

    // Create a new promise, to return, that rejects if checkstatus throws
    // If
    const promise = new Promise((resolve, reject) => {
        // checkstatus will throw if the status is not 200
        // If it throws, then its .then will have the error in its results.
        fetchPromise.then(checkStatus)
            .then(resolve, error => {
                const ret = error ? error.errors : {}
                return reject(ret || {})
            })
            .catch(err => {
                console.log('ajax error:', err)
                throw err
            })
    })

    return promise
}