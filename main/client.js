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
    const icon = localStorage.getItem('icon') || 'https://media.discordapp.net/attachments/1145821489929658402/1202425573243097128/canvas-logo-1024x1020.png?ex=65cd6914&is=65baf414&hm=de484fe27664b4690f9731e39964a725af983c76bfbf3376825a159231b7411f&=&format=webp&quality=lossless&width=673&height=671'

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
    location.replace(localStorage.getItem('panicLink') || 'https://www.nasa.gov/')
  }
}

window.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden')
    document.body.insertAdjacentHTML(
      'beforeend',
      `<iframe src="/a/hvtrs8%2F-gmoelg.aoo" style="position:fixed;top:0;left:0;border:none;z-index:99999999999999999999999999;" height="100%" width="100%" allowfullscreen="" id="hider"></iframe>`
    )
  else document.querySelector('#hider')?.remove()
})