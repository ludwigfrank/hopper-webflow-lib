import { e } from '../util'

// Runs whenever the category is changed
$(document).ready(function () {
  e('category-selection-form').change(function (e) {
    const activeCategory = $('input[name="categories"]:checked').val()

    const elements = $('[hp-filter-by="categories"]')

    $(document).trigger(window.events.TRACK_EVENT, {
      event: 'selected_category',
      properties: { category: activeCategory },
    })

    if (activeCategory.includes('all')) {
      elements.fadeIn()
    } else {
      // Hide all elements that are not part of the active category
      elements.hide()
      elements.has(`[hp-category-slug="${activeCategory}"]`).fadeIn()
    }
  })

  $(function () {
    var parent = $('div[hp-ref="category-item-list"]')
    var divs = parent.children()
    while (divs.length) {
      parent.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0])
    }
  })

  let tagOccurances = []

  const categories = $.map(
    $('#form-category-selection input'),
    (element) => element.id
  )
  console.log(categories)
})

const observer = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting === false) {
      $('.section-bottom-nav').hide()
    } else {
      $('.section-bottom-nav').fadeIn()
    }
  },
  {
    rootMargin: '-220px 0px -220px 0px',
  }
)

observer.observe(document.getElementById('deal-collections'))
