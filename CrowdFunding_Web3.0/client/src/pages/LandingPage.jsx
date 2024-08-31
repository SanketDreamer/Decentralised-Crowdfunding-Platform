import React, { useState, useEffect } from "react";

import DisplayCampaigns from "../components/DisplayCampaigns"
import { useStateContext } from "../context";
import Hero from "../components/Hero/Hero";
const LandingPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { address, contract, getCampaigns } = useStateContext();
  
  const fetchCampaigns = async() => {
    setIsLoading(true);
    const data = await getCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  }

  useEffect(() => {
    if(contract) fetchCampaigns();
  }, [address, contract]);

  return(
    
    <div>
    <div><Hero/></div>
    
  </div>
  );
};

export default LandingPage;
