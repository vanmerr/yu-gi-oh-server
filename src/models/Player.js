class Player {
    constructor (deck) {
        this.mainDeck = mainDeck; // Vị trí đặt bộ bài chính
        this.hand = []; // Tay của người chơi
        this.score = 8000; // Điểm gốc
        this.GY = []; // Nghĩa địa (Graveyard)
        this.field = null; // Nơi đặt lá bài ma pháp môi trường (Field Zone)
        this.extraDeck = extraDeck; // Extra Deck chứa các quái vật đặc biệt
        this.banish = []; // Khu vực bài bị trục xuất (Banish Zone)
        
        // Các vùng chơi
        this.mainMonsterZone = new Array(5).fill(null); // 5 vị trí cho quái thú chính
        this.spellTrapZone = new Array(5).fill(null); // 5 vị trí cho bài ma pháp và bẫy
        this.pendulumZone = new Array(2).fill(null); // 2 vị trí cho bài Pendulum
        this.extraMonsterZone = null; // 1 vị trí cho quái thú đặc biệt từ Extra Deck
        
        this.deckLimit = 60; // Giới hạn số bài trong bộ bài chính
        this.maxHandSize = 6; // Số bài tối đa trong tay
        this.deckOut = false; // Trạng thái Deck-out
        this.turn = false; // Trạng thái lượt chơi
    }

    // Xáo trộn bộ bài chính
    shuffleTheDeck() {
        this.mainDeck.sort(() => Math.random() - 0.5);
    }

    // Rút bài từ bộ bài chính
    drawCards(numbers) {
        if (this.mainDeck.length < numbers) {
            this.deckOut = true;
        } else {
            for (let i = 0; i < numbers; i++) {
                const drawnCard = this.mainDeck.shift();
                if (this.hand.length < this.maxHandSize) {
                    this.hand.push(drawnCard);
                } else {
                    this.GY.push(drawnCard); // Đưa bài vượt mức vào nghĩa địa
                }
            }
        }
    }

    // Đặt bài quái thú vào Main Monster Zone
    summonMonster(card, zoneIndex) {
        if (zoneIndex >= 0 && zoneIndex < 5) {
            if (!this.mainMonsterZone[zoneIndex]) {
                this.mainMonsterZone[zoneIndex] = card;
            } else {
                console.log('Main Monster Zone is occupied!');
            }
        }
    }

    // Đặt bài phép hoặc bẫy vào Spell/Trap Zone
    setSpellTrap(card, zoneIndex) {
        if (zoneIndex >= 0 && zoneIndex < 5) {
            if (!this.spellTrapZone[zoneIndex]) {
                this.spellTrapZone[zoneIndex] = card;
            } else {
                console.log('Spell/Trap Zone is occupied!');
            }
        }
    }

    // Đặt bài Pendulum vào Pendulum Zone
    setPendulum(card, zoneIndex) {
        if (zoneIndex >= 0 && zoneIndex < 2) {
            if (!this.pendulumZone[zoneIndex]) {
                this.pendulumZone[zoneIndex] = card;
            } else {
                console.log('Pendulum Zone is occupied!');
            }
        }
    }

    // Triệu hồi quái thú đặc biệt từ Extra Deck vào Extra Monster Zone
    summonExtraMonster(card) {
        if (!this.extraMonsterZone) {
            this.extraMonsterZone = card;
        } else {
            console.log('Extra Monster Zone is occupied!');
        }
    }

    // Loại bỏ bài khỏi trò chơi (đưa vào Banish Zone)
    banishCard(card) {
        this.banish.push(card);
    }

    // Kích hoạt bài ma pháp môi trường vào Field Zone
    activateFieldSpell(card) {
        if (!this.field) {
            this.field = card;
        } else {
            console.log('Field Zone is already occupied!');
        }
    }

    // Tăng và giảm điểm gốc
    increaseScore(score) {
        this.score += score;
    }

    reduceScore(score) {
        this.score -= score;
        if (this.score <= 0) {
            this.score = 0;
            this.lose();
        }
    }

    // Kiểm tra Deck-out và thua cuộc
    checkDeckOut() {
        if (this.deckOut) {
            console.log('Player has decked out!');
            this.lose();
        }
    }

    lose() {
        console.log('Player has lost the game!');
    }

    win() {
        console.log('Player has won the game!');
    }

    startTurn() {
        this.turn = true;
        console.log('Player\'s turn has started.');
    }

    endTurn() {
        this.turn = false;
        console.log('Player\'s turn has ended.');
    }
}
