import { Container, Sprite } from 'pixi.js';
export class PhoenixFlame {
    container = new Container();
    particles = [];
    constructor(app) {
        app.stage.addChild(this.container);
        for (let i = 0; i < 10; i++) {
            const particle = Sprite.from('assets/fire.png');
            particle.x = app.screen.width / 2 + Math.random() * 100 - 50;
            particle.y = app.screen.height / 2;
            particle.alpha = Math.random();
            particle.scale.set(Math.random());
            this.container.addChild(particle);
            this.particles.push(particle);
        }
        app.ticker.add(() => {
            for (const p of this.particles) {
                p.y -= 1;
                p.alpha -= 0.01;
                if (p.alpha <= 0) {
                    p.y = app.screen.height / 2;
                    p.alpha = 1;
                    p.x = app.screen.width / 2 + Math.random() * 100 - 50;
                }
            }
        });
    }
}
