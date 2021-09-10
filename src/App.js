import React, { useState, useEffect } from 'react';
import axios from 'axios';
import emailjs from 'emailjs-com';
import './App.css';
import './Coin.css';
import Coin from './Coin';

function App() {

  const[coins, setCoins] = useState([]);
  const[search, setSearch] = useState('')
  
  function sendEmail(e) {
    e.preventDefault();

    emailjs.sendForm('service_6xz7w7g', 'krypto_app', e.target, 'user_4EI65dbaPnvNhqZigs2gh')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
      e.target.reset()
  }

  useEffect (() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h')
    .then(res => {
      setCoins(res.data)
      console.log(res.data)
    }).catch(error => console.log(error))
    const interval = setInterval(() => {
      console.log('Refresh in every 30secs!');
      axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h')
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
      {/* <form className="contact-form" onSubmit={sendEmail}>
      <input type="hidden" name="contact_number" />
      <label>Name</label>
      <input type="text" name="to_name" />
      <label>Email</label>
      <input type="email" name="from_name" />
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" value="Send" />
    </form> */}
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
