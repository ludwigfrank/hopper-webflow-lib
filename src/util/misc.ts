export function getURLParam(param): string | null {
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get(param)
}

export function getBunElement(selector: string): JQuery {
  return $(`[bun-element="${selector}"]`)
}

export function getBunText(selector: string): JQuery {
  return $(`[bun-text="${selector}"]`)
}

export function getBunRef(selector: string): JQuery {
  return $(`[bun-ref=${selector}]`)
}

export const getBun = {
  element: getBunElement,
  text: getBunText,
  ref: getBunRef,
}

export function updateClassesWithPrefix(
  classes: string[],
  mutations: string[],
  prefix: string
) {
  if (mutations.length < 1) return classes
  const nonPrefixClasses = classes.filter((value) => !value.includes(prefix))
  const prefixedMutations = mutations.map(
    (mutation) => prefix + '--' + mutation
  )

  return [...nonPrefixClasses, ...prefixedMutations]
}

export const getElementReferences = (selector: string): JQuery =>
  $(`[bun-element="${selector}"]`)

export const getElementReferencesByAttr = (
  attribute: string,
  selector: string
): JQuery => $(`[${attribute}="${selector}"]`)

export function bindURLPramTexts() {
  $('[data-param-text]').each(function () {
    const { paramText } = $(this).data()

    const paramValue = getURLParam(paramText)
    if (paramValue === null) {
      throw Error(
        `Parameter "${paramText}" not set. Make sure to add it to the URL.`
      )
    }

    $(this).text(paramValue)
  })
}
