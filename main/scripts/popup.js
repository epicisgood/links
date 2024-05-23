let inFrame

try {
  inFrame = window !== top
} catch (e) {
  inFrame = true
}

if (!inFrame && !navigator.userAgent.includes('Firefox')) {
  const popup = open('about:blank', '_blank')
  if (!popup || popup.closed) alert('Please allow popups and redirects.')
  else {
    const doc = popup.document
    const iframe = doc.createElement('iframe')
    const style = iframe.style
    const link = doc.createElement('link')

    const name = localStorage.getItem('name') || 'Dashboard'
    const icon = localStorage.getItem('icon') || 'media/canvas.png'

    doc.title = name
    link.rel = 'icon'
    link.href = icon

    iframe.src = location.href
    style.position = 'fixed'
    style.top = style.bottom = style.left = style.right = 0
    style.border = style.outline = 'none'
    style.width = style.height = '100%'

    doc.head.appendChild(link)
    doc.body.appendChild(iframe)

    const pLink = localStorage.getItem(encodeURI("pLink")) || "https://www.google.com/"
    location.replace(pLink) 
  }
}

window.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden')
    document.body.insertAdjacentHTML(
      'beforeend',
      `<iframe style="position:fixed;top:0;left:0;border:none;z-index:99999999999999999999999999;" height="100%" width="100%" allowfullscreen="" id="hider"></iframe>`
    )
  else document.querySelector('#hider')?.remove()
})