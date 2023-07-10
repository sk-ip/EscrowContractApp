import { useState } from 'react';
import { ethers } from 'ethers';

import deploy from '../actions/deploy';
import approve from '../actions/approveContract';

export default function CreateAccount({ setEscrows, provider }) {
    const [signer, setSigner] = useState(provider.getSigner());

    async function newContract() {
        const beneficiary = document.getElementById('beneficiary').value;
        const arbiter = document.getElementById('arbiter').value;
        const value = ethers.BigNumber.from(BigInt(document.getElementById('wei').value) * BigInt(10 ** 18) )  ;

        const escrowContract = await deploy(signer, arbiter, beneficiary, value);
    
        const escrow = {
          address: escrowContract.address,
          arbiter,
          beneficiary,
          value: value.toString(),
          approved: false,
          handleApprove: async () => {
            escrowContract.on('Approved', () => {
              document.getElementById(escrowContract.address).className =
                'complete';
              document.getElementById(escrowContract.address).innerText =
                "✓ It's been approved!";
            });
    
            await approve(escrowContract, signer);
          },
        };
    
        setEscrows(escrow);
    }

    return (
        <div className="contract">
          <h1> Create New Escrow Accounts </h1>
          <label>
            Arbiter Address
            <input type="text" id="arbiter" />
          </label>

          <label>
            Beneficiary Address
            <input type="text" id="beneficiary" />
          </label>

          <label>
            Deposit Amount (in ETH)
            <input type="text" id="wei" />
          </label>

          <div
            className="button"
            id="deploy"
            onClick={(e) => {
              e.preventDefault();

              newContract();
            }}
          >
            Deploy
          </div>
        </div>
    )
}