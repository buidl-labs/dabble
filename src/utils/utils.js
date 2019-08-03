import storyContractABI from "./story";
import Web3 from "web3";

export const sampleContent = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Odio euismod lacinia at quis risus sed vulputate. Vitae sapien pellentesque habitant morbi. Vitae nunc sed velit dignissim. Non diam phasellus vestibulum lorem. Ut faucibus pulvinar elementum integer enim. Duis at tellus at urna condimentum mattis pellentesque id nibh. Dolor sit amet consectetur adipiscing elit. Dui ut ornare lectus sit. Dictumst vestibulum rhoncus est pellentesque. Auctor elit sed vulputate mi sit amet mauris. Egestas tellus rutrum tellus pellentesque eu.

Orci dapibus ultrices in iaculis nunc sed augue lacus. Fringilla est ullamcorper eget nulla facilisi etiam dignissim diam quis. Mattis pellentesque id nibh tortor id aliquet lectus proin nibh. Sem integer vitae justo eget magna fermentum iaculis. Turpis egestas sed tempus urna et pharetra pharetra massa massa. Diam in arcu cursus euismod. Feugiat in fermentum posuere urna nec tincidunt praesent semper. Scelerisque fermentum dui faucibus in ornare quam viverra orci. Commodo viverra maecenas accumsan lacus vel facilisis volutpat est velit. Pretium viverra suspendisse potenti nullam ac tortor. Faucibus ornare suspendisse sed nisi lacus sed viverra tellus in. Nulla facilisi morbi tempus iaculis urna id volutpat.

Ornare aenean euismod elementum nisi quis eleifend quam. Aliquam faucibus purus in massa tempor. Senectus et netus et malesuada fames ac. Platea dictumst vestibulum rhoncus est pellentesque. Nibh mauris cursus mattis molestie. Magna fermentum iaculis eu non diam phasellus vestibulum. Suspendisse potenti nullam ac tortor. Vitae congue eu consequat ac felis donec et. Gravida arcu ac tortor dignissim convallis aenean et tortor. Auctor neque vitae tempus quam pellentesque nec nam. Id ornare arcu odio ut sem nulla. Ultricies tristique nulla aliquet enim tortor. Posuere morbi leo urna molestie at elementum eu facilisis. Hendrerit gravida rutrum quisque non tellus orci ac. Elementum nisi quis eleifend quam adipiscing vitae proin.

Feugiat in fermentum posuere urna nec tincidunt praesent semper. Condimentum id venenatis a condimentum vitae sapien pellentesque habitant. In arcu cursus euismod quis viverra nibh cras pulvinar. Leo vel orci porta non pulvinar. In ornare quam viverra orci. Risus in hendrerit gravida rutrum quisque non. Morbi tristique senectus et netus. Quam elementum pulvinar etiam non quam lacus. Cursus vitae congue mauris rhoncus aenean. Tortor posuere ac ut consequat. Platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper.`;

const storyContractAddress = "0xf736ff046ff92f3ad00a83830fa4c64ba026afdb";

export const web3 = new Web3(
  new Web3.providers.HttpProvider("https://testnet2.matic.network")
);

export const storyContract = new web3.eth.Contract(
  storyContractABI.abi,
  storyContractAddress
);
