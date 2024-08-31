import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ethers } from "ethers";

import { useStateContext } from "../context";
import { CustomButton, Loader } from "../components";
import { calculateBarPercentage, daysLeft } from "../utils";
import { thirdweb } from "../assets";
import { CountBox } from "../components";

const CampaignDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  //console.log(state);

  const { donate, getDonations, contract, address } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [donators, setDonators] = useState([]);

  const remainingDays = daysLeft(state.deadline);

  const fetchDonators = async () => {
    const data = await getDonations(state.pId);

    console.log(data);
    setDonators(data);
  };

  // call the fetch donators when the contract is available
  useEffect(() => {
    if (contract) fetchDonators();
  }, [contract, address]);

  const handleDonate = async () => {
    const inrAmount = parseFloat(amount);

    // Convert INR to Ethereum based on the fixed rate
    const ethAmount = inrAmount / 160000;

    setIsLoading(true);

    await donate(state.pId, ethAmount.toString());
    navigate("/");
    setIsLoading(false);
  };

  const handleDownloadImage = () => {
    const link = document.createElement("a");
    link.href = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACgCAMAAAC8EZcfAAAAElBMVEUAAAD///9QUFCMjIy8vLw7OzuCkL2jAAADrElEQVR4nO2c4XLjIAyEE9u8/yvftKgzu8MqAjd1Lu3ur7NlwRdyVoSA3m4L2u6go9+7T2lH/22lzyUZ0IDvDtjOA+7HY20IuH9qQ8BjzxT2LgTcii53AjxOf0VoVxKNdf+96PIwoAHfF3DfPtQE4DaoPRcwHQECVA2MdvEBKQ7uRZevAKT/IgY04C8GTMMM2TnaXAqYBuoq3zOgAf8KIKX0kZ+Li65Aw/z/ojh4Rxfyz+0GNKABfxowFQG2sQPyb2NvpItmdTmgCOQGNODbA25pfQ+LgSUgpQwIeIzJwlyXayoBiQkvri0BG9CATwUcJ9m5gmnHi/Y5Lz9G2gPrg9XEPtfkOsek8JNTnMuzobLJJ6FFawb8pgz4XRWAquRfNlm85V9honhKzGkaPhCRp0GTdEGRiy7KOIkjkCufdAl7AI7tT9ZuDGjAVwBuWMyjW9Ea2ikljyw/+hlTdpwFBNOBZURqn1pBFzUCalKTjoCQGKFb1b7wN6ABDVgBpgB0q6uJBgRA3umIqQaIXVYA871bBjTgNYAveUnox74/QLdoT1/QjMlAv2j4VA5I9UNyEf7qE0TPaTfVcmsFGDDVcBvQgP8JIE2sox+cOAvRxp4NLirAA4uJs4DRJw4EfUJUFQfz1VDyb0PDj+wrgNUvSQW4tCvEgAY88ZKo+p8AWHtJMMyExP7A+2jHZQiq/20UpgSgGIA8wVAPLC2nkj86GtCAvxKwp9zxy0+VPVS+sae7hD/W91RjWHKk/u94wYDFCNxSe/4NzLWfV2ANaEADngAUD4g4pewCoGtptVNlO9cATq4Xq3zRgAa8EnDtJaHzA9Eb1gfp9x1v0ZmDqB8WWwbpMLI8XywAxQjk6Vj6DczpwaEuAxrwdYC0MWdu400OOPpzTBN7grqhjSVJuZg4pzxbEUpHiOwP4qwBDWjAAvDxxkBWHmZwfyEn9gJQ7A/EMPfVzDgMpSb/EEQFOFfbOSMDGvDnAJeODJGl5+eU0gcaJv7Cn3chiJPJWD9cO3RVjVDwjSO85M92AxrQgHOAt1GiA1qGWAGo9CxAcTbTgAY0YApIq4T5j/2nGi5G5oAPkoUTgJW/AFjb9WFAA747IJ0vLkqCdLCP3uVW2M8Akp10ogJ7ZjnWgAY0oHggVQ44LmN8nUIgf1xzoJjTb7XC/g3A9BsQ6dhN2EeDtBvQgK8GXPqT43GBKTkX+3AagIC0JYC2HIrPTPsPJzWZbvV/T5Y+0hE+IwMa8C8C/gMVeUorDmvR8wAAAABJRU5ErkJggg=="; // Directly reference the image file
    link.download = "campaignQR.jpg"; // Name for the downloaded file
    link.click();
  };
  const handleRedirect = () => {
    window.location.href = "http://127.0.0.1:5500/verify.html"; // Replace with your desired URL
  };
  return (
    <div>
      {isLoading && <Loader />}

      <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
        <div className="flex-1 flex-col">
          <img
            src={state.image}
            alt="campaign"
            className="w-full h-[410px] object-cover rounded-xl"
          />

          <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
            <div
              className="absolute h-full bg-[#4acd8d]"
              style={{
                width: `${calculateBarPercentage(
                  state.target,
                  state.amountCollected
                )}%`,
                maxWidth: "100%",
              }}
            ></div>
          </div>
        </div>
        <div className="w-200pxflex-1 flex-col bg-[#1c1c24] rounded-xl">
          {/* Additional image in a card */}
          <div className="flex items-center justify-center p-4 rounded-xl">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACgCAMAAAC8EZcfAAAAElBMVEUAAAD///9QUFCMjIy8vLw7OzuCkL2jAAADrElEQVR4nO2c4XLjIAyEE9u8/yvftKgzu8MqAjd1Lu3ur7NlwRdyVoSA3m4L2u6go9+7T2lH/22lzyUZ0IDvDtjOA+7HY20IuH9qQ8BjzxT2LgTcii53AjxOf0VoVxKNdf+96PIwoAHfF3DfPtQE4DaoPRcwHQECVA2MdvEBKQ7uRZevAKT/IgY04C8GTMMM2TnaXAqYBuoq3zOgAf8KIKX0kZ+Li65Aw/z/ojh4Rxfyz+0GNKABfxowFQG2sQPyb2NvpItmdTmgCOQGNODbA25pfQ+LgSUgpQwIeIzJwlyXayoBiQkvri0BG9CATwUcJ9m5gmnHi/Y5Lz9G2gPrg9XEPtfkOsek8JNTnMuzobLJJ6FFawb8pgz4XRWAquRfNlm85V9honhKzGkaPhCRp0GTdEGRiy7KOIkjkCufdAl7AI7tT9ZuDGjAVwBuWMyjW9Ea2ikljyw/+hlTdpwFBNOBZURqn1pBFzUCalKTjoCQGKFb1b7wN6ABDVgBpgB0q6uJBgRA3umIqQaIXVYA871bBjTgNYAveUnox74/QLdoT1/QjMlAv2j4VA5I9UNyEf7qE0TPaTfVcmsFGDDVcBvQgP8JIE2sox+cOAvRxp4NLirAA4uJs4DRJw4EfUJUFQfz1VDyb0PDj+wrgNUvSQW4tCvEgAY88ZKo+p8AWHtJMMyExP7A+2jHZQiq/20UpgSgGIA8wVAPLC2nkj86GtCAvxKwp9zxy0+VPVS+sae7hD/W91RjWHKk/u94wYDFCNxSe/4NzLWfV2ANaEADngAUD4g4pewCoGtptVNlO9cATq4Xq3zRgAa8EnDtJaHzA9Eb1gfp9x1v0ZmDqB8WWwbpMLI8XywAxQjk6Vj6DczpwaEuAxrwdYC0MWdu400OOPpzTBN7grqhjSVJuZg4pzxbEUpHiOwP4qwBDWjAAvDxxkBWHmZwfyEn9gJQ7A/EMPfVzDgMpSb/EEQFOFfbOSMDGvDnAJeODJGl5+eU0gcaJv7Cn3chiJPJWD9cO3RVjVDwjSO85M92AxrQgHOAt1GiA1qGWAGo9CxAcTbTgAY0YApIq4T5j/2nGi5G5oAPkoUTgJW/AFjb9WFAA747IJ0vLkqCdLCP3uVW2M8Akp10ogJ7ZjnWgAY0oHggVQ44LmN8nUIgf1xzoJjTb7XC/g3A9BsQ6dhN2EeDtBvQgK8GXPqT43GBKTkX+3AagIC0JYC2HIrPTPsPJzWZbvV/T5Y+0hE+IwMa8C8C/gMVeUorDmvR8wAAAABJRU5ErkJggg==" // Directly reference the image file
              alt="additional"
              className="w-[200px] h-[2 00px] object-cover rounded-xl"
            />
          </div>
            <div className="text-white w-[250px] font-bold px-4"><p>For verification of Campaign just download QRcode and then Verify it </p></div>
          {/* Button to download additional image */}
          <div className="mt-4 flex justify-center">
      <button
        className="w-[110px] bg-[#4acd8d] hover:bg-[#379567] text-white font-bold py-2 px-4 rounded "
        onClick={handleDownloadImage}
      >
        Download 
      </button>
    </div>

    {/* Additional button below */}
    <div className="mt-4 flex justify-center">
      {/* Button to redirect to another URL */}
      <button
        className="w-[110px] bg-[#4acd8d] hover:bg-[#379567] text-white font-bold py-2 px-4 rounded"
        onClick={handleRedirect}
      >
        Verify
      </button>
    </div>
        </div>

        <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
          <CountBox title="Days Left" value={remainingDays} />
          <CountBox
            title={`Raised of ${state.target * 160000} ₹`}
            value={state.amountCollected * 160000}
          />
          <CountBox title="Total Backers" value={donators.length} />
        </div>
      </div>

      <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[40px]">
          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
              Creator
            </h4>

            <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
              <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                <img
                  src={thirdweb}
                  alt="user"
                  className="w-[60%] object-contain"
                />
              </div>

              <div>
                <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">
                  {state.owner}
                </h4>
                <p className="mt-[4px] font-epilogue font-normal text-[12px] text-[#808191]">
                  10 Campaigns
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
              Story
            </h4>

            <div className="mt-[20px]">
              <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                {state.description}
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
              Donators
            </h4>

            <div className="mt-[20px] flex flex-col gap-4">
              {donators.length > 0 ? (
                donators.map((item, index) => (
                  <div
                    key={`${item.donator}-${index}`}
                    className="flex justify-between items-center gap-4"
                  >
                    <p className="font-epilogue font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-all">
                      {index + 1}. {item.donator}
                    </p>
                    <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] break-all">
                      {item.donation*160000 +" ₹"}
                    </p>
                  </div>
                ))
              ) : (
                <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                  No donators yet. Be the first one!
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1">
          <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
            Fund
          </h4>

          <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
            <p className="font-epilogue font-medium text-[20px] leading-[30px] text-center text-[#808191]">
              Fund the Campaign
            </p>

            <div className="mt-[30px]">
              <input
                type="number"
                placeholder="100 ₹"
                step="0.01"
                className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
                <h4 className="font-epilogue font-semibold text-[14px] text-white leading-[22px]">
                  Back it because you believe in it.
                </h4>

                <p className="mt-[20px] font-epilogue font-normal text-[#808191] leading-[22px]">
                  Support the project for no reward, just because it speaks to
                  you.
                </p>
              </div>

              <CustomButton
                btnType="button"
                title="Fund Campaign"
                styles="w-full bg-[#8c6dfd]"
                handleClick={handleDonate}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
