export default function Escrow({
  address,
  arbiter,
  beneficiary,
  value,
  handleApprove,
  approved,
  provider
}) {


  async function getButtonStatus() {
    return arbiter === await provider.getSigner() ;
  }

  return (
    <div className="existing-contract">
      <ul className="fields">
      <li>
          <div> Escrow Address </div>
          <div> {address} </div>
        </li>
        <li>
          <div> Arbiter </div>
          <div> {arbiter} </div>
        </li>
        <li>
          <div> Beneficiary </div>
          <div> {beneficiary} </div>
        </li>
        <li>
          <div> Value </div>
          <div> {value} </div>
        </li>
        {
          !approved && 
          <button
            className="button"
            id={address}
            onClick={(e) => {
              e.preventDefault();

              handleApprove();
            }}
            disabled={ !getButtonStatus() }
          >
            Approve
          </button>
        }
        {
          approved && 
          <div className="existing-contract complete" >
            Approved
          </div>
        }
      </ul>
    </div>
  );
}
