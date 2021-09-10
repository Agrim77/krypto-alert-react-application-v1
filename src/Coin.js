import React from 'react'


const coin = ({ name, image, symbol, price, volume, priceChange, priceChange1h }) => {
    return (
        <div className="coin-container">
            <div className="coin-row">
                <div className="coin">
                    <img src={image} alt="crypto"/>
                    <h1>{name}</h1>
                    <p className="coin-symbol">{symbol}</p>
                </div>
                <div className="coin-data">
                    <p className="coin-price">₹{price}</p>
                    <p className="coin-volume">₹{volume.toLocaleString()}</p>
                    
                    {priceChange < 0 ? (
                       <p className="coin-percent red"> {priceChange.toFixed(2)}</p>
                    ) : (
                        <p className="coin-percent green"> {priceChange.toFixed(2)}</p>
                    )}
                    
                    {priceChange1h < 0 ? (
                        <p className="coin-marketcap"> Price Change in last hour 
                        <p className="red"> ₹{priceChange1h.toLocaleString()}</p> 
                        </p>
                    ) : (
                        <p className="coin-marketcap"> Price Change in last hour 
                        <p className="green"> ₹{priceChange1h.toLocaleString()}</p> </p>
                    )}

                </div>
            </div>
        </div>
    )
}

export default coin
