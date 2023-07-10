import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
import Escrow from './components/Escrow';

import SearchAccount from './components/SearchAccount';
import CreateAccount from './components/CreateAccount';
import Account from './components/Account';

const provider = new ethers.providers.Web3Provider(window.ethereum);

function App() {
  const [escrows, setEscrows] = useState([]);
  const [account, setAccount] = useState();
  const [signer, setSigner] = useState();

  window.ethereum.on('accountsChanged', function (accounts) {
    setAccount(accounts[0]);
  })

  useEffect(() => {
    async function getAccounts() {
        const accounts = await provider.send('eth_requestAccounts', []);
        setAccount(accounts[0]);
        setSigner(provider.getSigner());
    }

    getAccounts();
  }, []);

  function addEscrow(escrow) {
    setEscrows([...escrows, escrow]);
  }

  return (
    <div className="container" >
      <Account account={account} />
      <div className="container-row" >
        <CreateAccount setEscrows={addEscrow} provider={provider} />
        <SearchAccount setEscrows={setEscrows} provider={provider} />
      </div>

      <div className="existing-contracts">
        <h1> Escrow Accounts </h1>

        <div id="container">
          { escrows.length > 0 && escrows.map((escrow) => {
            return <Escrow key={escrow.address} {...escrow} provider={provider} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
