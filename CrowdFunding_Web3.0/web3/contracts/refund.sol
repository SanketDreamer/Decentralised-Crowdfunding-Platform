pragma solidity ^0.8.9;

contract CrowdFunding {
    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] donators;
        uint256[] donations;
        mapping(address => uint256) refundRequests;
    }
    
    
    mapping(uint256 => Campaign) public campaigns;
    mapping(uint256 => bool) public fraudulentCampaigns;
    
    uint256 public numberOfCampaigns = 0;

    function createCampaign(address _owner, string memory _title, string memory _description, uint256 _target, uint256 _deadline, string memory _image) public returns (uint256) {
        Campaign storage campaign = campaigns[numberOfCampaigns];

        require(_deadline > block.timestamp, "The deadline should be a date in the future.");

        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;

        numberOfCampaigns++;

        return numberOfCampaigns - 1;
    }

    function donateToCampaign(uint256 _id) public payable {
        uint256 amount = msg.value;

        Campaign storage campaign = campaigns[_id];

        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);

        // Use transfer instead of call to mitigate reentrancy issues
        payable(campaign.owner).transfer(amount);

        campaign.amountCollected += amount;
    }

    function requestRefund(uint256 _id) public {
        Campaign storage campaign = campaigns[_id];

        require(campaign.amountCollected > 0, "No funds available for refund.");

        uint256 donorIndex = indexOf(campaign.donators, msg.sender);
        require(donorIndex != type(uint256).max, "Sender did not donate to this campaign.");

        uint256 donationAmount = campaign.donations[donorIndex];

        // Ensure only the campaign owner can request a refund on behalf of the donor
        require(msg.sender == campaign.owner, "Only the campaign owner can request refunds.");

        (bool sent, ) = payable(msg.sender).call{value: donationAmount}("");
        if (sent) {
            campaign.refundRequests[msg.sender] = 0;
            campaign.amountCollected -= donationAmount;
        }
    }

    function flagAsFraudulent(uint256 _id) public {
        Campaign storage campaign = campaigns[_id];
        require(msg.sender == campaign.owner, "Only the campaign owner can flag a campaign as fraudulent.");
        fraudulentCampaigns[_id] = true;
    }

    function autoRefundFraudulentCampaign(uint256 _id) public {
        require(fraudulentCampaigns[_id], "This campaign is not flagged as fraudulent.");
        
        Campaign storage campaign = campaigns[_id];

        for (uint256 i = 0; i < campaign.donators.length; i++) {
            address donor = campaign.donators[i];
            uint256 donationAmount = campaign.donations[i];

            (bool sent, ) = payable(donor).call{value: donationAmount}("");

            if (sent) {
                campaign.refundRequests[donor] = 0;
                campaign.amountCollected -= donationAmount;
            }
        }

        // Reset the fraudulent flag after refunds
        fraudulentCampaigns[_id] = false;
    }

    function getDonators(uint256 _id) public view returns (address[] memory, uint256[] memory) {
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    

    function indexOf(address[] storage array, address element) internal view returns (uint256) {
        for (uint256 i = 0; i < array.length; i++) {
            if (array[i] == element) {
                return i;
            }
        }
        return type(uint256).max;
    }
}
