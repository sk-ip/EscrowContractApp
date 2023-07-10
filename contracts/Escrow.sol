// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract Escrow {
    address public depositor;
    address public beneficiary;
    address public arbiter;
    bool public isApproved;

    event Approved(uint balance);

    constructor(address _arbiter, address _beneficiary) payable {
        arbiter = _arbiter;
        beneficiary = _beneficiary;
        depositor = msg.sender;
    }

    function approve() external {
        require(
            arbiter == msg.sender,
            "Only arbbiter can approve the Contract"
        );
        require(
            isApproved == false,
            "Cannot approve an already approved Contract"
        );
        uint balance = address(this).balance;
        (bool sent, ) = beneficiary.call{value: address(this).balance}("");
        require(sent, "Money not sent");
        isApproved = true;
        emit Approved(balance);
    }
}
