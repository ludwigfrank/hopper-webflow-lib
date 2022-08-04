export function updateClasses(
  el: JQuery,
  mutations: string[],
  type: string
): void {
  const classes = $(el).attr('class')?.split(/\s+/)
  if (!classes) return

  if (mutations.length < 1) return

  const nonPrefixClasses = classes.filter((value) => !value.includes(type))

  // E.g. "status--runnging" where "status" is the type and "running" the mutation
  const prefixedMutations = mutations.map((mutation) => type + '--' + mutation)

  const updatedClasses = [...nonPrefixClasses, ...prefixedMutations]

  if (updatedClasses.toString() === classes.toString()) return
  if (updatedClasses === null) return

  $(el).removeClass()
  $(el).addClass(updatedClasses)
}
