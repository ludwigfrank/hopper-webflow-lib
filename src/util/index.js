/**
 * Return elements that match the selector given. This is used to better utalize
 * a selector pattern in which "data-refs" are used.
 *
 * How to use?
 * In Webflow, add a custom <div> attribute. Set the name to "data-ref" and the value
 * to a string that represents the element.
 *
 * @param {string} selector Picked "data-ref" selector of the element
 * @returns {JQuery} jQuery elements that match the selector
 */
export const el = (selector) => {
  return $(`[data-ref='${selector}']`)
}

export const e = (selector) => {
  return $(`[hp-ref='${selector}']`)
}

const urlParams = new URLSearchParams(window.location.search)

export const getURLParam = (string) =>
  urlParams.has(string) ? urlParams.get(string) : false
