import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv"

dotenv.config()


const config: HardhatUserConfig = {
  solidity: "0.8.24",
  defaultNetwork : "mumbai",
  networks : {
               mumbai : {
                          url : process.env.ALCHEMY_URL,
                          accounts : [process.env.POLYGON_PRIVATE_KEY!]
                        }
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: process.env.POLYGON_API_KEY
  },
};

export default config;
