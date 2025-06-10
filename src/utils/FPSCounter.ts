import Stats from 'stats.js'

export class FPSCounter {
  stats: Stats

  constructor() {
    this.stats = new Stats()
    this.stats.showPanel(0) // FPS
    Object.assign(this.stats.dom.style, {
      position: 'absolute',
      top: '0px',
      left: '0px'
    })
    document.body.appendChild(this.stats.dom)

    requestAnimationFrame(this.loop)
  }

  loop = () => {
    this.stats.begin()
    this.stats.end()
    requestAnimationFrame(this.loop)
  }
}