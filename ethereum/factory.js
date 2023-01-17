import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

//telling web3 the factory contract is already deployed ad here is its address
const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x2fFC638d5cfB7785f62887941bf7Eb9744DA3be8'

);

export default instance;