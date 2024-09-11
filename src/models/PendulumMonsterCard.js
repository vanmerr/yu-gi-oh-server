const MonsterCard = require("./MonsterCard");

class PendulumMonsterCard extends MonsterCard {
    constructor(id, name, type, frameType, typeline = [], atk, def, level, attribute, 
        race, description, archetype, humanReadableCardType, pend_desc, 
        monster_desc, scale, cardSets = {
            set_name,
            set_code,
            set_rarity,
            set_rarity_code
        }, cardImages = {
            image_url,
            image_url_small,
            image_url_cropped }, cardPrices){
        super(id, name, type, frameType, typeline, atk, def, level, attribute, race, description, 
            archetype, humanReadableCardType, cardSets, cardImages, cardPrices);
                
        this.pend_desc = pend_desc;
        this.monster_desc = monster_desc;
        this.scale = scale;
    }

    setScale(scale) {
        this.scale = scale;
    }
}

module.exports = PendulumMonsterCard;