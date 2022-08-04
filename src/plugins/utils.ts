import { writable, get } from 'svelte/store'
import timeDateUtils, { TimeDateUtils } from './utils/timeDate'

import './utils/trackClick'

export type GlobalUtils = {
  getUrlParam: (param: string) => string | null
  addUrlParam: ({
    url,
    param,
    value,
  }: {
    url: string
    param: string
    value: string
  }) => string
  writable: Function
  get: Function
  updateClassesOfStyled: (
    mutation: string[],
    type: string,
    parent?: JQuery
  ) => void
}

function getUrlParam(param: string): string | null {
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get(param)
}

function updateClasses(el: JQuery, mutations: string[], type: string): void {
  const classes = $(el).attr('class')?.split(/\s+/)
  if (!classes) return

  if (mutations.length < 1) return

  const nonPrefixClasses = classes.filter((value) => !value.startsWith(type))

  // E.g. "status--runnging" where "status" is the type and "running" the mutation
  const prefixedMutations = mutations.map((mutation) => type + '--' + mutation)
  const updatedClasses = [...nonPrefixClasses, ...prefixedMutations]

  if (updatedClasses.toString() === classes.toString()) return
  if (updatedClasses === null) return

  $(el).removeClass()
  $(el).addClass(updatedClasses)
}

export type Utils = GlobalUtils & TimeDateUtils

const utils: Utils = {
  writable,
  get,
  updateClassesOfStyled: (mutations, type, parent) => {
    if (parent) {
      const $collection = parent.add(parent.find(`[styled-${type}]`))
      $collection.each(function () {
        updateClasses($(this), mutations, type)
      })
    } else {
      $(`[styled-${type}]`).each(function () {
        updateClasses($(this), mutations, type)
      })
    }
  },
  getUrlParam: (param) => {
    const urlParams = new URLSearchParams(window.location.search)
    return urlParams.get(param)
  },
  addUrlParam: ({ url, param, value }) => {
    let u = new URL(url)
    let params = new URLSearchParams(u.search).append(param, value)

    return u.href
  },
  ...timeDateUtils,
}

window.util = utils
