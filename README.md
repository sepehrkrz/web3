# Description

This smart contract defines two contracts: CampaignFactory and Campaign. The CampaignFactory contract is used to create new instances of the Campaign contract and keeps track of all the addresses of the deployed Campaign contracts in the deployedCampaigns array. The createCampaign function creates a new instance of the Campaign contract and passes in a minimum contribution value as well as the address of the creator (msg.sender). The getDeployedCampaigns function returns the deployedCampaigns array.

The Campaign contract is used to manage a crowdfunding campaign. It has a struct called Request which stores information about each funding request including a description, value, recipient address, whether it is complete, and how many approvals it has received. The contract also has a manager address, a minimum contribution value, and a mapping (associative array) of addresses to booleans called approvers that keeps track of who has contributed to the campaign.

# Contract Structure
The Campaign contract has several functions for managing the campaign. The contribute function allows users to contribute to the campaign by sending Ether to the contract. It checks that the value of the contribution is greater than the minimum contribution set by the manager. The createRequest function allows the manager to create a new funding request by providing a description, value, and recipient address. It is restricted so that only the manager can call this function.

The approveRequest function allows contributors to approve a funding request by providing the index of the request. It checks that the msg.sender has contributed to the campaign and has not already approved the request. The finalizeRequest function allows the manager to finalize a request if it has received more than half of the approvals and has not been finalized yet. It transfers the funds to the recipient and marks the request as complete.

The getSummary function returns the minimum contribution, the balance of the contract, the number of requests, the number of approvers, and the manager address. The getRequestCount function returns the number of requests.
The restricted modifier is used to restrict some of the functions to only be callable by the manager of the campaign.

