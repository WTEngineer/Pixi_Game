import * as PIXI from 'pixi.js';
import { AceOfShadows } from '../tasks/AceOfShadows';
import { MagicWords } from '../tasks/MagicWords';
import { PhoenixFlame } from '../tasks/PhoenixFlame';
export class Menu {
    constructor(app) {
        const buttons = ['Ace of Shadows', 'Magic Words', 'Phoenix Flame'];
        buttons.forEach((label, index) => {
            const button = new PIXI.Text(label, {
                fill: 'white',
                fontSize: 30
            });
            button.interactive = true;
            button.buttonMode = true;
            button.x = app.screen.width / 2 - 100;
            button.y = app.screen.height / 2 - 100 + index * 70;
            button.on('pointerdown', () => this.runTask(app, label));
            app.stage.addChild(button);
        });
    }
    runTask(app, taskName) {
        app.stage.removeChildren();
        switch (taskName) {
            case 'Ace of Shadows':
                new AceOfShadows(app);
                break;
            case 'Magic Words':
                new MagicWords(app);
                break;
            case 'Phoenix Flame':
                new PhoenixFlame(app);
                break;
        }
    }
}
