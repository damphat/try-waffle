// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

contract Counter {
    int public count;

    event Changed(int value, address indexed sender);

    function inc() external {
        count++;
        emit Changed(count, msg.sender);
    }

}