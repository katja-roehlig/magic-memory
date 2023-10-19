import { useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";
import { useEffect } from "react";

const cardImages = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const[disabled,setDisabled] = useState(false)

  //Math.random liefert Zahlen zwischen 0 und 1
  //sort() vergleicht 2 Items(a,b) und gibt einen Wert zwischen -0.5 und 0.5 zurück.
  //ist der Wert < 0  -  a,b bleiben in der Reihenfolge
  //ist der Wert > 0  - a,b wechseln die Reihenfolge
  const getCards = () => {
    // Array erzeugen und 2x cardImages reintun => alle Karten sind doppelt

    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() })); //Jeder Karte eine ID zuordnen
      
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards);

    setTurns(0);
  };

  const handleChoice = (card) => {
    //Wenn der Wert von choiceOne null ist, gibt es false zurück, wenn er gesetzt ist, kommt true zurück
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // compare two selected cards
  useEffect(() => {
    
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true  };
            } else {
              return card;
            }
          });
        });
        console.log("Match!");
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000)
        
      }
    }
  }, [choiceOne, choiceTwo]);

  //reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false)
    setTurns((prevCount) => prevCount+1);
  };

  //start the game automatically
useEffect(() => {getCards()}, [])


  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={getCards}>New Game</button>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard 
          key={card.id} 
          disabled={disabled}
          card={card} 
          handleChoice={handleChoice} 
          flipped={card === choiceOne|| card === choiceTwo || card.matched === true}/>
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}
export default App;
