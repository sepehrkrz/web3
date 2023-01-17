import Web3 from "web3";

let web3;
//Next JS runs on serverside and then outputs to front end therefore we need be ready for both senarios: E.g. window is only available at front end html not sever side
if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // We are in the browser and metamask is running.
  window.ethereum.request({ method: "eth_requestAccounts" });
  web3 = new Web3(window.ethereum);
} else {
  // We are on the server *OR* the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    "https://sepolia.infura.io/v3/161b59e127f64187a62870d1d7c130d8"
  );
  web3 = new Web3(provider);
}

export default web3;
