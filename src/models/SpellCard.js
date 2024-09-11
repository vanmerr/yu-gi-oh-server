const Card = require("./Card");

class SpellCard extends Card {
    constructor(id, name, type, frameType, atk, def, level, attribute, 
        race, description, archetype, humanReadableCardType, cardSets = {
            set_name,
            set_code,
            set_rarity,
            set_rarity_code
        }, cardImages = {
            image_url,
            image_url_small,
            image_url_cropped
        }, cardPrices) {
        super(id, name, type, description, frameType, race, archetype, cardSets, cardImages, cardPrices);
        this.atk = atk;
        this.def = def;
        this.level = level;
        this.attribute = attribute;
        this.humanReadableCardType = humanReadableCardType;
      }
}