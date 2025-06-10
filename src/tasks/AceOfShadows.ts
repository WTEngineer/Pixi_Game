import * as PIXI from 'pixi.js'

export class AceOfShadows {
  private app: PIXI.Application
  private stacks: PIXI.Container[] = []
  private cards: PIXI.Sprite[] = []
  private currentStackIndex = 0
  private readonly stackCount = 3
  private readonly cardsPerStack = 36
  private cardTexture: PIXI.Texture

  constructor(app: PIXI.Application) {
    this.app = app
    this.cardTexture = PIXI.Texture.from('assets/card.png')

    this.createStacks()
    this.createCards()
    this.startCardMovement()
  }

  private createStacks() {
    const padding = 100
    const spacing = (this.app.screen.width - padding * 2) / (this.stackCount - 1)

    for (let i = 0; i < this.stackCount; i++) {
      const stack = new PIXI.Container()
      stack.x = padding + i * spacing
      stack.y = this.app.screen.height / 2 - 150
      this.stacks.push(stack)
      this.app.stage.addChild(stack)
    }
  }

  private createCards() {
    for (let i = 0; i < this.stackCount; i++) {
      for (let j = 0; j < this.cardsPerStack; j++) {
        const card = new PIXI.Sprite(this.cardTexture)
        card.width = 100
        card.height = 150
        card.anchor.set(0.5)
        card.y = -j * 2
        this.stacks[i].addChild(card)
        this.cards.push(card)
      }
    }
  }

  private startCardMovement() {
    this.app.ticker.add(this.update)

    setInterval(() => {
      const topCards = this.stacks[this.currentStackIndex].children
      if (topCards.length === 0) return

      const card = topCards[topCards.length - 1] as PIXI.Sprite
      const targetIndex = (this.currentStackIndex + 1) % this.stackCount
      const targetStack = this.stacks[targetIndex]

      // Remove from current stack
      this.stacks[this.currentStackIndex].removeChild(card)
      this.app.stage.addChild(card)

      const startX = this.stacks[this.currentStackIndex].x
      const startY = this.stacks[this.currentStackIndex].y - (topCards.length - 1) * 2
      const endX = targetStack.x
      const endY = targetStack.y - targetStack.children.length * 2

      let elapsed = 0
      const duration = 2000

      const move = (delta: number) => {
        elapsed += delta
        const t = Math.min(elapsed / duration, 1)
        card.x = startX + (endX - startX) * t
        card.y = startY + (endY - startY) * t

        if (t >= 1) {
          this.app.ticker.remove(move)
          targetStack.addChild(card)
          card.x = 0
        }
      }

      card.x = startX
      card.y = startY
      this.app.ticker.add(move)

      this.currentStackIndex = targetIndex
    }, 1000)
  }

  private update = () => {
    // Optional: visual effects or per-frame logic
  }
}