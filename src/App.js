import { useState } from 'react'
import './App.css'

const App = () => {
    const [cardList, setCardList] = useState([
        { id: 1, order: 1, text: 'Card 1' },
        { id: 2, order: 2, text: 'Card 2' },
        { id: 3, order: 3, text: 'Card 3' },
        { id: 4, order: 4, text: 'Card 4' }
    ])
    const [currentCard, setCurrentCard] = useState(null)

    const dragStartHandler = (event, card) => {
        setCurrentCard(card)
        console.log('drag', card)
    }

    const dragEndHandler = event => {
        event.target.style.background = 'white'
    }

    const dragOverHandler = event => {
        event.preventDefault()
        event.target.style.background = 'lightgray'
    }

    const dropHandler = (event, card) => {
        event.preventDefault()
        setCardList(
            cardList.map(c => {
                if (c.id === card.id) {
                    return { ...c, order: currentCard.order }
                }

                if (c.id === currentCard.id) {
                    return { ...c, order: card.order }
                }
                return c
            })
        )
        event.target.style.background = 'white'
    }

    const sortCards = (a, b) => {
        if (a.order > b.order) {
            return 1
        } else {
            return -1
        }
    }

    const dragLeaveHandler = event => {
        event.target.style.background = 'white'
    }

    return (
        <div className='App'>
            {cardList.sort(sortCards).map((card, index) => (
                <div
                    onDragStart={event => dragStartHandler(event, card)}
                    onDragLeave={event => dragLeaveHandler(event)}
                    onDragEnd={event => dragEndHandler(event)}
                    onDragOver={event => dragOverHandler(event)}
                    onDrop={event => dropHandler(event, card)}
                    className='card'
                    key={index}
                    draggable={true}>
                    {card.text}
                </div>
            ))}
        </div>
    )
}

export default App
