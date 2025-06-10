import * as PIXI from 'pixi.js'
import { Menu } from './ui/Menu'
import { FPSCounter } from './utils/FPSCounter'

export class App {
  app: PIXI.Application
  menu: Menu
  fps: FPSCounter

  constructor() {
    this.app = new PIXI.Application({
      resizeTo: window,
      backgroundColor: 0x222222,
      resolution: window.devicePixelRatio,
      autoDensity: true
    })

    document.body.appendChild(this.app.view as HTMLCanvasElement)

    this.menu = new Menu(this.app)
    this.fps = new FPSCounter()

    window.addEventListener('resize', () => this.app.resize())
  }

  
}