import { Container, Sprite, Text, TextStyle } from 'pixi.js';
import dialogueData from '../data/MagicWords.json';
export class MagicWords {
    container = new Container();
    constructor(app) {
        app.stage.addChild(this.container);
        let y = 100;
        for (const entry of dialogueData.dialogue) {
            const avatarData = dialogueData.avatars.find(a => a.name === entry.name);
            const emojis = dialogueData.emojies;
            const txtParts = entry.text.split(/({.*?})/g).filter(Boolean);
            let x = avatarData?.position === 'left' ? 100 : app.screen.width / 2;
            const avatar = Sprite.from(avatarData?.url || '');
            avatar.x = x - 80;
            avatar.y = y;
            avatar.width = avatar.height = 64;
            this.container.addChild(avatar);
            txtParts.forEach(part => {
                if (part.startsWith('{') && part.endsWith('}')) {
                    const emojiKey = part.replace(/[{}]/g, '');
                    const emoji = emojis.find(e => e.name === emojiKey);
                    if (emoji) {
                        const sprite = Sprite.from(emoji.url);
                        sprite.x = x;
                        sprite.y = y;
                        sprite.width = sprite.height = 24;
                        this.container.addChild(sprite);
                        x += 30;
                    }
                }
                else {
                    const txt = new Text(part, new TextStyle({ fill: 'white', fontSize: 18 }));
                    txt.x = x;
                    txt.y = y;
                    this.container.addChild(txt);
                    x += txt.width + 10;
                }
            });
            y += 100;
        }
    }
}
