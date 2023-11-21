import tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css' // optional for styling

export function tooltip(element) {
  const title = element.getAttribute('title')
  const instance = tippy(element, {
    content: title,
    arrow: true,
  })
  return {
    destroy() {
      instance.destroy()
    },
  }
}
