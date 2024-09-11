const Card = require('./Card');

class MonsterCard extends Card {
  constructor(id, name, type, typeline = [], frameType, atk, def, level, attribute, 
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
    this.typeline = typeline;
    this.humanReadableCardType = humanReadableCardType;
    this.canActivateEffect = false;
  }

  activateEffect(gameState, ...params) {
    console.log(`${this.name} effect activated.`);
  }

  activateEffectSummer(gameState, ...params) {
    console.log(`${this.name} effect activated in Summer edition.`);
  }

  activateEffectSpecial(gameState, ...params) {
    console.log(`${this.name} effect activated in Special edition.`);
  }

  activateEffectFromGY(gameState, ...params) {
    console.log(`${this.name} effect activated from GY.`);
  }

  isActivateEffect(){
    this.canActivateEffect = true;
  }

  resetActivateEffect(){
    this.canActivateEffect = false;
  }

  setName(name) {
    this.name = name;
  }
  
  setAtk(atk) {
    this.atk = atk;
  }
  
  setDef(def) {
    this.def = def;
  }
  
  setLevel(level) {
    this.level = level;
  }
  
  setAttribute(attribute) {
    this.attribute = attribute;
  }
  setType(type) {
    this.type = type;
  }

  setFrameType(frameType) {
    this.frameType = frameType;
  }
}

module.exports = MonsterCard;
