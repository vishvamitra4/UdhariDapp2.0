import React from "react";
import { ethers } from "ethers";
import { useState } from "react";
import './AllCss/SendUdhari.css';
import Confetti from "react-confetti";


function SendUdhari({ state }) {

    const [Amount, SetAmount] = useState('');
    const [flag , setFlag] = useState(false);

    const ChangeAmount = (event) => {
        SetAmount(event.target.value);
    }
    const send_udhari = async function (event) {
        event.preventDefault();
        const { contract } = state;
        const name = document.querySelector("#name").value
        const message = document.querySelector("#message").value;

        const amount = { value: ethers.utils.parseEther(Amount) };
        const transaction = await contract.sendUdhari(name, message, amount);
        await transaction.wait();
        setFlag(prev => !prev);
    }

    
    return (
        <div className="container-1">
        {flag && <Confetti />}
            <form onSubmit={send_udhari}>
                <label>Name</label>
                <input type="text" id="name" placeholder="Write Your Name" ></input>
                <label>Message</label>
                <input type="text" id="message" placeholder="Enter A Sweet Message" ></input>
                <label>Amount</label>
                <input type="number" value={Amount} onChange={ChangeAmount} placeholder="Your Amount"></input>
                <button type="submit">Send</button>
            </form>
        </div>
    )
};

export default SendUdhari;