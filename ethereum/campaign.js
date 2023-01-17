import web3 from './web3';
import Campaign from './build/Campaign.json'

// You pass an address to this function and it creates an instance of the contract associated with that address
const campaign = (address) => {
    return new web3.eth.Contract(JSON.parse(Campaign.interface), address);
  };
  export default campaign;
  