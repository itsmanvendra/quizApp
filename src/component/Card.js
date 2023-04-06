import React, {useState, useRef} from "react";
import './Card.css'
function Card({item}){
    // const selectedOptions = useRef();
    const [showAnswer, setShowAnswer] = useState(false);
    const [answerStatus, setAnswerStatus] = useState(null);
    function toggleCard(){
        setShowAnswer((showAnswer) => !showAnswer);
    }
    function handleSelect(e, ans){
        console.log(e.target.value === ans);
        if(e.target.value === ans){
            setAnswerStatus(true);
        }
        else{
            setAnswerStatus(false);
        }
    }
    return (
        <div className={`card ${showAnswer ? 'flip' : ''}`}>
            <div className= "front">
                {item.question}
                <div className="option_container">
                    <div className="options">
                        {item.options.map((val, index) => {
                            return (
                                <div key={index}>
                                    <input type="radio" id={index} name={item.id} value={val} onChange={(e) => handleSelect(e, item.answer)} />
                                    <label htmlFor={index}>{val}</label>
                                </div>

                            )
                        })}
                    </div>
                    <div className={answerStatus === null ? 'hidden' : ''}>
                        <h4>{answerStatus ? 'Correct Answer🥳🔥' : 'Wrong Answer❌'}</h4>
                    </div>
                </div>
            </div>
            <div className= "back">
                {item.answer}
            </div>

            <button className={showAnswer ? 'hidden' : 'btn'} onClick={toggleCard}>View answer</button>
            <button className={showAnswer ? 'btn' : 'hidden'} onClick={toggleCard}>View question</button>
            
            
        </div>

    )
}
export default Card;