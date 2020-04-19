var matchingGame = {};
matchingGame.cardWidth = 80;//牌宽
matchingGame.cardHeight = 120;//牌高
//存储所有牌
matchingGame.deck = [
    "cardAK","cardAK","cardAQ","cardAQ","cardAJ","cardAJ",
    "cardBK","cardBK","cardBQ","cardBQ","cardBJ","cardBJ",
    "cardCK","cardCK","cardCQ","cardCQ","cardCJ","cardCJ",
    "cardDK","cardDK","cardDQ","cardDQ","cardDJ","cardDJ"
]
//随机排序函数
function shuffle(){
    return Math.random() > 0.5 ? 1 : -1
}