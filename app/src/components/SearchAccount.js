import getContract from "../actions/getContract";
import approve from "../actions/approveContract";

export default function SearchAccount({ setEscrows, provider }) {

  async function getValueofAddress(address) {
    return fetch(`http://127.0.0.1:8545`, {
      method: "POST",
      body: JSON.stringify({
        "id": 1,
        "jsonrpc": "2.0",
        "params": [
          address,
          "latest"
        ],
        "method": "eth_getBalance"
      })
    })
    .then((res) => res.json())
    .then((obj) => obj.result)
    .catch((err) => {
      console.log(err);
    })
  }

    async function searchAccount() {
        const searchAddress = document.getElementById('search-contract-address').value;
        const escrowContract = await getContract(searchAddress);

        const escrow = {
            address: escrowContract.address,
            arbiter: await escrowContract.arbiter(),
            beneficiary: await escrowContract.beneficiary(),
            value: await getValueofAddress(escrowContract.address),
            approved: await escrowContract.isApproved(),
            handleApprove: async () => {
              escrowContract.on('Approved', () => {
                document.getElementById(escrowContract.address).className =
                  'complete';
                document.getElementById(escrowContract.address).innerText =
                  "✓ It's been approved!";
              });
      
              await approve(escrowContract, provider.getSigner());
            },
          };

        setEscrows([escrow]);
    }


    return (
        <div className="contract">
          <h1> Search for Existing Accounts </h1>
          <label>
            Contract Address
            <input type="text" id="search-contract-address" />
          </label>

          <div
            className="button"
            id="deploy"
            onClick={(e) => {
              e.preventDefault();
              searchAccount();
            }}
          >
            Search
          </div>
        </div>
    );
}