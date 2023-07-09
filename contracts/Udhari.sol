// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.5.0 <0.9.0;

contract Udhari {
    struct Memo {
        string name;
        string message;
        uint timestamp;
        address from;
        uint value;
    }

    Memo[] memos;
    address payable owner;

    constructor() {
        owner = payable(msg.sender);
    }

    function sendUdhari(
        string memory from,
        string memory message
    ) public payable {
        require(msg.value > 0, "Please Send Greater than Zero");
        owner.transfer(msg.value);
        memos.push(Memo(from, message, block.timestamp, msg.sender , msg.value));
    }

    function getMemos() public view returns (Memo[] memory) {
        return memos;
    }
}
