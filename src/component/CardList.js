import React from "react";
import Card from "./Card";
import './CardList.css'

function CardList({listitem}){
    
    return (
        <div className="list">
            {listitem.map((item, index) => {
                return <Card item={item} key={index} />
            })}
        </div>
    )
}
export default CardList;