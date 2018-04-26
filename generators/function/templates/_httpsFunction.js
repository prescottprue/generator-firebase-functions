import * as functions from 'firebase-functions'

/**
 * @name <%= name %>
 * Cloud Function triggered by HTTP request
 * @type {functions.CloudFunction}
 */
export default functions.https.<%= eventType %>(<%= name %>Request)

/**
 * @param request - Express wrapped HTTP request object
 * @param response - Express wrapped HTTP response object
 */
function <%= name %>Request(request, response) {
  response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
  response.send('Hello from <%= name %>')
}
