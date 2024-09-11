const mongoose = require('mongoose');

const cardSetSchema = new mongoose.Schema({
  set_name: { type: String, required: true },
  set_code: { type: String, required: true },
  set_rarity: { type: String, required: true },
  set_rarity_code: { type: String, required: false },
  set_price: { type: String, required: true }
});

const cardImageSchema = new mongoose.Schema({
  image_url: { type: String, required: true },
  image_url_small: { type: String, required: true },
  image_url_cropped: { type: String, required: true }
});

const cardPriceSchema = new mongoose.Schema({
  cardmarket_price: { type: String, required: true },
  tcgplayer_price: { type: String, required: true },
  ebay_price: { type: String, required: true },
  amazon_price: { type: String, required: true },
  coolstuffinc_price: { type: String, required: true }
});

const cardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  typeline: { type: [String], required: false },  // Typeline array (e.g., ['Fiend', 'Pendulum', 'Effect'])
  humanReadableCardType: { type: String, required: true },
  frameType: { type: String, required: true },
  desc: { type: String, required: true },
  race: { type: String, required: false },
  pend_desc: { type: String, required: false },  // Pendulum effect description
  monster_desc: { type: String, required: false },  // Monster effect description
  atk: { type: Number, required: false },
  def: { type: Number, required: false },
  level: { type: Number, required: false },
  scale: { type: Number, required: false },  // Pendulum scale
  attribute: { type: String, required: false },
  linkval: { type: Number, required: false },  // For Link Monsters
  linkmarkers: { type: [String], required: false },  // For Link Monsters (e.g., ['Left', 'Right'])
  ygoprodeck_url: { type: String, required: true },
  card_sets: [cardSetSchema],  // Array of card sets
  card_images: [cardImageSchema],  // Array of card images
  card_prices: [cardPriceSchema]  // Array of card prices
});

// Mongoose automatically generates an _id for each document
const CardService = mongoose.model('Cards', cardSchema);

module.exports = CardService;
