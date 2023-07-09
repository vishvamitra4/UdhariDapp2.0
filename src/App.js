import abi from "./contract/Udhari.json"
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import './App.css';
import SendUdhari from "./components/SendUdhari";
import AllData from "./components/AllData";
import Udhari from './Udhari.png'
function App() {

  const [Account, setAccount] = useState("");

  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null
  });

  useEffect(() => {
    const connectWallet = async () => {
      const contractAddres = "0x52dCb13Fa8bEBaC6778cA6d17bcAe0128EB9C626";
      const contractAbi = abi.abi;
      try {
        const { ethereum } = window;

        if (ethereum) {
          const account = await ethereum.request({ method: "eth_requestAccounts", });

          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          })

          window.ethereum.on('accountsChanged', () => {
            window.location.reload();
          })
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(contractAddres, contractAbi, signer);
          setAccount(account);
          setState({ provider, signer, contract });
        }
        else {
          alert("Please Install MetaMask!");
        }

      } catch (error) {
        console.log(error);
      }
    }

    connectWallet();
  }, [])

  return (
    <div className="App">
      <div>
        <img src={Udhari} alt="Udhari Img" />
        <p>Account Connected : {Account == "" ? "NONE" : Account}</p>
        <SendUdhari state={state} />
      </div>
      <AllData state={state} />
    </div>
  );
}

export default App;
