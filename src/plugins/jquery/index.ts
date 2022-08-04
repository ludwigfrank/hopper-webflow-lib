$.fn.closestBunRef = function (ref: string): JQuery {
  return this.closest(`[bun-ref=${ref}]`)
}

$.fn.closestBunElement = function (ref: string): JQuery {
  return this.closest(`[bun-element=${ref}]`)
}

$.fn.updateClasses = function (mutations: string[], type: string) {
  const classes = this.attr('class')?.split(/\s+/)
  if (!classes) return

  if (mutations.length < 1) return

  const nonPrefixClasses = classes.filter((v: string) => !v.includes(type))

  // E.g. "status--runnging" where "status" is the type and "running" the mutation
  const prefixedMutations = mutations.map((m) => type + '--' + m)
  const updatedClasses = [...nonPrefixClasses, ...prefixedMutations]

  // If nothing changed, return
  if (updatedClasses.toString() === classes.toString()) return
  if (updatedClasses === null) return

  this.removeClass()
  this.addClass(updatedClasses)

  return this
}
