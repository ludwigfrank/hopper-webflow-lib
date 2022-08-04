import { updateClassesWithPrefix } from '../../util/misc'

export default class Element {
  constructor(public $ref: JQuery) {}

  hide() {
    this.$ref.addClass('hidden')
  }

  show() {
    this.$ref.removeClass('hidden')
  }

  getChildren(selector: string) {
    return this.$ref.find(selector)
  }

  getChildRef(reference: string): JQuery {
    return this.$ref.find(`[bun-ref="${reference}"]`)
  }

  getChildEl(elementId: string, parent?: boolean) {
    if (parent) return this.$ref.parent().find(`[bun-element="${elementId}"]`)
    return this.$ref.find(`[bun-element="${elementId}"]`)
  }

  updateClasses(mutations: string[], prefix: string) {
    window.util.updateClassesOfStyled([...mutations], prefix, this.$ref)
  }
}
