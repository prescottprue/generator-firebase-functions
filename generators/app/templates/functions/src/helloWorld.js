/**
 * @name helloWorld
 * Convert a JSON file from storage bucket into a data on RTDB
 * @type {functions.CloudFunction}
 */
export default functions.database
  .ref(`/helloWorld`)
  .onWrite(sayHello)

/**
 * Say hello to the world to show Firebase functions are working
 * @param  {functions.Event} event - function event object
 * @param  {object|undefined} event.params - Parameters from event ref URL
 * @return {Promise}
 */
async function sayHello(event) {

}
