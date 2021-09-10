import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import './Coin.css';
import Coin from './Coin';

function App() {

  const[coins, setCoins] = useState([]);
  const[search, setSearch] = useState('')
  
  useEffect (() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=1h')
    .then(res => {
      setCoins(res.data)
      console.log(res.data)
    }).catch(error => console.log(error))
    const interval = setInterval(() => {
      console.log('Refresh in every 30secs!');
      axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=1h')
    .then(res => {
      setCoins(res.data)
      console.log(res.data)
    }).catch(error => console.log(error)) //try alert("yoo error")
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = e => {
    setSearch(e.target.value)
  }

  const filteredCoins = coins.filter(coin => 
    coin.name.toLowerCase().includes(search.toLowerCase())
    )
  return (
    <div className="coin-app">
      <h1>WELCOME TO AGGY's CRYPTO TRACKER</h1>
      <br></br>
      <br></br>
      <div className="coin-search">
        
        <form>
          <input type="text" placeholder="Search a currency" className="coin-input" onChange={handleChange}/>
        </form>
      </div>
      {filteredCoins.map(coin => {
        return (
          <Coin 
          key={coin.id} 
          name={coin.name} 
          image={coin.image}
          symbol={coin.symbol}
          volume={coin.total_volume}
          price={coin.current_price}
          priceChange={coin.price_change_percentage_24h}
          priceChange1h={coin.price_change_percentage_1h_in_currency}
          />
        )
      })}
    </div>
  );
}

export default App;
