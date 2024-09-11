const fs = require('fs');
const path = require('path');
const { default: axios } = require("axios");
const CardService = require("./CardService");

async function saveImageFromURL(imageURL, folder, name) {
    try {
        // Tải hình ảnh từ URL dưới dạng buffer
        const response = await axios.get(imageURL, { responseType: 'arraybuffer' });

        // Kiểm tra nếu yêu cầu không thành công hoặc dữ liệu hình ảnh không hợp lệ
        if (response.status !== 200 || !response.data) {
            console.log(`Lỗi khi tải hình ảnh. Mã trạng thái: ${response.status} hoặc dữ liệu hình ảnh không hợp lệ`);
            return null;
        }

        const imageBuffer = Buffer.from(response.data);
        
        // Kiểm tra nếu dữ liệu hình ảnh là buffer hợp lệ
        if (imageBuffer.length === 0) {
            console.log('Dữ liệu hình ảnh rỗng.');
            return null;
        }

        // Xác định thư mục gốc của dự án
        const projectRoot = path.resolve(__dirname, '..', '..');
        // Xây dựng đường dẫn tới thư mục public
        const destination = path.join(projectRoot, 'public', 'images', folder, name);

        // Tạo thư mục nếu chưa tồn tại
        fs.mkdirSync(path.dirname(destination), { recursive: true });
        // Lưu hình ảnh vào đĩa
        fs.writeFileSync(destination, imageBuffer);

        // Trả về URL tương đối tới thư mục public
        return `/images/${folder}/${name}`;
    } catch (error) {
        console.log('Lỗi khi lưu hình ảnh:', name);
        return null;
    }
}

// Hàm xử lý dữ liệu từ MongoDB
async function processDocumentsInBatches() {
    try {
        const batchSize = 100; // Kích thước mỗi lô dữ liệu
        let skip = 0;
        let batchCount = 0;
        let hasMoreDocuments = true;

        while (hasMoreDocuments) {
            const cards = await CardService.find().skip(skip).limit(batchSize).exec();

            if (cards.length === 0) {
                hasMoreDocuments = false;
                break;
            }

            await Promise.all(
                cards.map(async (card) => {
                    const imageSavePromises = card.card_images.map(async (img) => {
                        const [image_url, image_url_small, image_url_cropped] = await Promise.all([
                            saveImageFromURL(img.image_url, "cards", `${img.id}.jpg`),
                            saveImageFromURL(img.image_url_small, "cards_small", `${img.id}.jpg`),
                            saveImageFromURL(img.image_url_cropped, "cards_cropped", `${img.id}.jpg`),
                        ]);

                        img.image_url = image_url;
                        img.image_url_small = image_url_small;
                        img.image_url_cropped = image_url_cropped;
                    });

                    await Promise.all(imageSavePromises);

                    // Cập nhật MongoDB
                    await CardService.updateOne({ _id: card._id }, {
                        $set: {
                            card_images: card.card_images
                        }
                    });
                })
            );

            skip += batchSize;
            batchCount++;
            console.log(`Batch ${batchCount} processed successfully.`);
        }

        console.log('All documents processed successfully.');
    } catch (error) {
        console.error('Error processing documents:', error);
        throw error;
    }
}

const get_database_yu_gi_oh = async () => {
    try {
      // Fetch data from the API
      const { data } = await axios.get('https://db.ygoprodeck.com/api/v7/cardinfo.php');
  
      if (data && data.data) {
        // Iterate through each card and save it to the MongoDB database
        for (let cardData of data.data) {
          const card = new CardService({
            name: cardData.name,
            type: cardData.type,
            typeline: cardData.typeline || [],
            humanReadableCardType: cardData.humanReadableCardType,
            frameType: cardData.frameType,
            desc: cardData.desc,
            race: cardData.race || "",
            pend_desc: cardData.pend_desc || null,
            monster_desc: cardData.monster_desc || null,
            atk: cardData.atk || null,
            def: cardData.def || null,
            level: cardData.level || null,
            scale: cardData.scale || null,
            attribute: cardData.attribute || null,
            linkval: cardData.linkval || null,
            linkmarkers: cardData.linkmarkers || [],
            ygoprodeck_url: cardData.ygoprodeck_url,
            card_sets: cardData.card_sets ? cardData.card_sets.map(set => ({
              set_name: set.set_name,
              set_code: set.set_code,
              set_rarity: set.set_rarity,
              set_rarity_code: set.set_rarity_code || "",
              set_price: set.set_price
            })) : [],
            card_images: cardData.card_images ? cardData.card_images.map(image => ({
              image_url: image.image_url,
              image_url_small: image.image_url_small,
              image_url_cropped: image.image_url_cropped
            })) : [],
            card_prices: cardData.card_prices ? cardData.card_prices.map(price => ({
              cardmarket_price: price.cardmarket_price,
              tcgplayer_price: price.tcgplayer_price,
              ebay_price: price.ebay_price,
              amazon_price: price.amazon_price,
              coolstuffinc_price: price.coolstuffinc_price
            })) : []
          });
  
          // Save the card to MongoDB
          await card.save();
          console.log(`${card.name} added to the database.`);
        }
      } else {
        console.error('No card data found from the API.');
      }
      console.log("Card added successfully");
    } catch (error) {
      console.error('Error fetching or saving card data:', error);
    }
  };

module.exports = {
    get_database_yu_gi_oh,
    processDocumentsInBatches
}