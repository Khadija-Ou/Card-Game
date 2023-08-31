const section = document.querySelector('section')
const playerLivesCount = document.querySelector('span')
let playerLives = 8

playerLivesCount.textContent = playerLives

const getData = () => [
  { imgSrc: './images/image1.jpg', name: 'image1' },
  { imgSrc: './images/image2.jpg', name: 'image2' },
  { imgSrc: './images/image3.jpg', name: 'image3' },
  { imgSrc: './images/image4.jpg', name: 'image4' },
  { imgSrc: './images/image5.jpg', name: 'image5' },
  { imgSrc: './images/image6.jpg', name: 'image6' },
  { imgSrc: './images/image1.jpg', name: 'image1' },
  { imgSrc: './images/image2.jpg', name: 'image2' },
  { imgSrc: './images/image3.jpg', name: 'image3' },
  { imgSrc: './images/image4.jpg', name: 'image4' },
  { imgSrc: './images/image5.jpg', name: 'image5' },
  { imgSrc: './images/image6.jpg', name: 'image6' },
]

// randomize
const randomize = () => {
  const cardData = getData()
  cardData.sort(() => Math.random() - 0.5)
  return cardData
}
//car generator
const cardGenerator = () => {
  const cardData = randomize()

  cardData.forEach((item) => {
    const card = document.createElement('div')
    const face = document.createElement('img')
    const back = document.createElement('div')
    card.classList = 'card'
    face.classList = 'face'
    back.classList = 'back'

    face.src = item.imgSrc
    card.setAttribute('name', item.name)

    section.appendChild(card)
    card.appendChild(face)
    card.appendChild(back)

    card.addEventListener('click', (e) => {
      card.classList.toggle('toggleCard')
      checkCards(e)
    })
  })
}
const checkCards = (e) => {
  console.log(e)
  const clickCard = e.target
  clickCard.classList.add('flipped')
  const flippedCards = document.querySelectorAll('.flipped')

  if (flippedCards.length === 2) {
    if (
      flippedCards[0].getAttribute('name') ===
      flippedCards[1].getAttribute('name')
    ) {
      console.log('match perfectly')
      flippedCards.forEach((card) => {
        card.classList.remove('flipped')
        card.style.pointerEvents = 'none'
      })
    } else {
      console.log('match failed')
      flippedCards.forEach((card) => {
        card.classList.remove('flipped')
        setTimeout(() => card.classList.remove('toggleCard'), 1000)
      })
      playerLives--
      playerLivesCount.textContent = playerLives
      if (playerLives === 0) {
        restart()
      }
    }
  }
}
const restart = () => {
  let cardData = randomize()
  let faces = document.querySelectorAll('.face')
  let cards = document.querySelectorAll('.card')
  section.style.pointerEvents = 'none'
  cardData.forEach((item, index) => {
    cards[index].classList.remove('toggleCard')
    //randomize
    setTimeout(() => {
      cards[index].style.pointerEvents = 'all'
      faces[index].src = item.imgSrc
      cards[index].setAttribute('name', item.name)
      section.style.pointerEvents = 'all'
    }, 1000)
  })
  playerLives = 8
  playerLivesCount.textContent = playerLives
}

cardGenerator()
