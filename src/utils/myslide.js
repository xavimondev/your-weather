export function myslide(node) {
  let x
  let y

  function handleMousedown(event) {
    if (event.type.startsWith('touch')) {
      x = event.touches[0].pageX
      y = event.touches[0].pageY
    } else {
      x = event.clientX
      y = event.clientY
    }

    node.dispatchEvent(
      new CustomEvent('slidestart', {
        detail: { x, y }
      })
    )

    window.addEventListener('mousemove', handleMousemove)
    window.addEventListener('touchmove', handleMousemove)
    window.addEventListener('mouseup', handleMouseup)
    window.addEventListener('touchend', handleMouseup)
  }

  function handleMousemove(event) {
    let clientX = x
    let clientY = y

    if (event.type.startsWith('touch')) {
      clientX = event.touches[0].pageX
      clientY = event.touches[0].pageY
    } else {
      clientX = event.clientX
      clientY = event.clientY
    }
    const dx = clientX - x
    const dy = clientY - y
    x = clientX
    y = clientY

    node.dispatchEvent(
      new CustomEvent('slidemove', {
        detail: { x, y, dx, dy }
      })
    )
  }

  function handleMouseup() {
    x = 0
    y = 0

    node.dispatchEvent(
      new CustomEvent('slideend', {
        detail: { x, y }
      })
    )

    window.removeEventListener('mousemove', handleMousemove)
    window.removeEventListener('touchmove', handleMousemove)
    window.removeEventListener('mouseup', handleMouseup)
    window.removeEventListener('touchend', handleMouseup)
  }

  node.addEventListener('mousedown', handleMousedown)
  node.addEventListener('touchstart', handleMousedown)

  return {
    destroy() {
      node.removeEventListener('mousedown', handleMousedown)
    }
  }
}
