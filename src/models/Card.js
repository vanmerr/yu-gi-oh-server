class Card {
    constructor(id, name, type, description, frameType, 
      race, archetype, cardSets, cardImages, cardPrices) {
      this.id = id;
      this.name = name;
      this.type = type;
      this.description = description;
      this.frameType = frameType;
      this.race = race;
      this.archetype = archetype;
      this.cardSets = cardSets;
      this.cardImages = cardImages;
      this.cardPrices = cardPrices; 
    }
  
    activateEffect(gameState, ...params) {
      throw new Error('Method activateEffect() must be implemented.');
    }

  }
  
  module.exports = Card;
  