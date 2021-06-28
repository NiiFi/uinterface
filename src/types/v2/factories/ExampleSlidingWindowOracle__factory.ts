/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Signer,
  utils,
  BigNumberish,
  Contract,
  ContractFactory,
  Overrides,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  ExampleSlidingWindowOracle,
  ExampleSlidingWindowOracleInterface,
} from "../ExampleSlidingWindowOracle";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "factory_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "windowSize_",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "granularity_",
        type: "uint8",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenIn",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amountIn",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "tokenOut",
        type: "address",
      },
    ],
    name: "consult",
    outputs: [
      {
        internalType: "uint256",
        name: "amountOut",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "factory",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "granularity",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "observationIndexOf",
    outputs: [
      {
        internalType: "uint8",
        name: "index",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "pairObservations",
    outputs: [
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "price0Cumulative",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "price1Cumulative",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "periodSize",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenA",
        type: "address",
      },
      {
        internalType: "address",
        name: "tokenB",
        type: "address",
      },
    ],
    name: "update",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "windowSize",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x61010060405234801561001157600080fd5b5060405161109b38038061109b8339818101604052606081101561003457600080fd5b5080516020820151604090920151909190600160ff82161161009d576040805162461bcd60e51b815260206004820181905260248201527f536c6964696e6757696e646f774f7261636c653a204752414e554c4152495459604482015290519081900360640190fd5b8160ff82168082816100ab57fe5b0460e081905202146100ee5760405162461bcd60e51b815260040180806020018281038252603081526020018061106b6030913960400191505060405180910390fd5b606083901b6001600160601b03191660805260a082905260f881901b7fff000000000000000000000000000000000000000000000000000000000000001660c05260e0516001600160a01b039093169260ff90911690610ecc61019f600039806102f7528061059452806105e752806106475250806101f452806104d752806106135280610766525080610218528061027e528061031b525080610242528061045c52806104855250610ecc6000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c8063c45a01551161005b578063c45a01551461015f578063c640752d14610190578063dbaad32f146101cd578063e4463eb2146101ea57610088565b8063556f0dc71461008d5780638a14117a146100ab5780638c86f1e4146100c5578063bfcc8e4214610108575b600080fd5b6100956101f2565b6040805160ff9092168252519081900360200190f35b6100b3610216565b60408051918252519081900360200190f35b6100b3600480360360608110156100db57600080fd5b5073ffffffffffffffffffffffffffffffffffffffff81358116916020810135916040909101351661023a565b6101416004803603604081101561011e57600080fd5b5073ffffffffffffffffffffffffffffffffffffffff813516906020013561041b565b60408051938452602084019290925282820152519081900360600190f35b61016761045a565b6040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b6101cb600480360360408110156101a657600080fd5b5073ffffffffffffffffffffffffffffffffffffffff8135811691602001351661047e565b005b610095600480360360208110156101e357600080fd5b50356105e2565b6100b3610645565b7f000000000000000000000000000000000000000000000000000000000000000081565b7f000000000000000000000000000000000000000000000000000000000000000081565b6000806102687f00000000000000000000000000000000000000000000000000000000000000008685610669565b9050600061027582610754565b805490915042037f00000000000000000000000000000000000000000000000000000000000000008111156102f5576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526033815260200180610df06033913960400191505060405180910390fd5b7f00000000000000000000000000000000000000000000000000000000000000006002027f000000000000000000000000000000000000000000000000000000000000000003811015610393576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602c815260200180610e23602c913960400191505060405180910390fd5b60008061039f856107fc565b509150915060006103b08a89610a4e565b5090508973ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415610404576103f7856001015484868c610ba1565b9650505050505050610414565b6103f7856002015483868c610ba1565b9392505050565b6000602052816000526040600020818154811061043457fe5b600091825260209091206003909102018054600182015460029092015490935090915083565b7f000000000000000000000000000000000000000000000000000000000000000081565b60006104ab7f00000000000000000000000000000000000000000000000000000000000000008484610669565b73ffffffffffffffffffffffffffffffffffffffff81166000908152602081905260409020549091505b7f000000000000000000000000000000000000000000000000000000000000000060ff168110156105365773ffffffffffffffffffffffffffffffffffffffff821660009081526020819052604081208054600190810182559152016104d5565b506000610542426105e2565b73ffffffffffffffffffffffffffffffffffffffff831660009081526020819052604081208054929350909160ff841690811061057b57fe5b60009182526020909120600390910201805490915042037f00000000000000000000000000000000000000000000000000000000000000008111156105da576000806105c6866107fc565b504286556001860191909155600285015550505b505050505050565b6000807f0000000000000000000000000000000000000000000000000000000000000000838161060e57fe5b0490507f000000000000000000000000000000000000000000000000000000000000000060ff16818161063d57fe5b069392505050565b7f000000000000000000000000000000000000000000000000000000000000000081565b60008060006106788585610a4e565b604080517fffffffffffffffffffffffffffffffffffffffff000000000000000000000000606094851b811660208084019190915293851b81166034830152825160288184030181526048830184528051908501207fff0000000000000000000000000000000000000000000000000000000000000060688401529a90941b9093166069840152607d8301989098527f96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f609d808401919091528851808403909101815260bd909201909752805196019590952095945050505050565b600080610760426105e2565b905060007f000000000000000000000000000000000000000000000000000000000000000060ff168260010160ff168161079657fe5b0690506000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208160ff16815481106107e557fe5b906000526020600020906003020192505050919050565b6000806000610809610c14565b90508373ffffffffffffffffffffffffffffffffffffffff16635909c0d56040518163ffffffff1660e01b815260040160206040518083038186803b15801561085157600080fd5b505afa158015610865573d6000803e3d6000fd5b505050506040513d602081101561087b57600080fd5b5051604080517f5a3d5493000000000000000000000000000000000000000000000000000000008152905191945073ffffffffffffffffffffffffffffffffffffffff861691635a3d549391600480820192602092909190829003018186803b1580156108e757600080fd5b505afa1580156108fb573d6000803e3d6000fd5b505050506040513d602081101561091157600080fd5b5051604080517f0902f1ac00000000000000000000000000000000000000000000000000000000815290519193506000918291829173ffffffffffffffffffffffffffffffffffffffff891691630902f1ac916004808301926060929190829003018186803b15801561098357600080fd5b505afa158015610997573d6000803e3d6000fd5b505050506040513d60608110156109ad57600080fd5b5080516020820151604090920151909450909250905063ffffffff80821690851614610a445780840363ffffffff81166109e78486610c1e565b517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1602969096019563ffffffff8116610a1d8585610c1e565b517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff16029590950194505b5050509193909250565b6000808273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161415610ad6576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526025815260200180610e4f6025913960400191505060405180910390fd5b8273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1610610b10578284610b13565b83835b909250905073ffffffffffffffffffffffffffffffffffffffff8216610b9a57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601e60248201527f556e697377617056324c6962726172793a205a45524f5f414444524553530000604482015290519081900360640190fd5b9250929050565b6000610bab610dca565b60405180602001604052808588880381610bc157fe5b047bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1690529050610bf6610bf18285610d16565b610dc3565b71ffffffffffffffffffffffffffffffffffff169695505050505050565b63ffffffff421690565b610c26610dca565b6000826dffffffffffffffffffffffffffff1611610ca557604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601760248201527f4669786564506f696e743a204449565f42595f5a45524f000000000000000000604482015290519081900360640190fd5b6040805160208101909152806dffffffffffffffffffffffffffff84167bffffffffffffffffffffffffffff0000000000000000000000000000607087901b1681610cec57fe5b047bffffffffffffffffffffffffffffffffffffffffffffffffffffffff16815250905092915050565b610d1e610ddc565b6000821580610d5957505082517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1682810290838281610d5657fe5b04145b610dae576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526023815260200180610e746023913960400191505060405180910390fd5b60408051602081019091529081529392505050565b5160701c90565b60408051602081019091526000815290565b604051806020016040528060008152509056fe536c6964696e6757696e646f774f7261636c653a204d495353494e475f484953544f524943414c5f4f42534552564154494f4e536c6964696e6757696e646f774f7261636c653a20554e45585045435445445f54494d455f454c4150534544556e697377617056324c6962726172793a204944454e544943414c5f4144445245535345534669786564506f696e743a204d554c5449504c49434154494f4e5f4f564552464c4f57a2646970667358221220f7500bbee681b676d4370e767123f9d73a40d24aee67f7f7fab012480256ae4e64736f6c63430006060033536c6964696e6757696e646f774f7261636c653a2057494e444f575f4e4f545f4556454e4c595f444956495349424c45";

export class ExampleSlidingWindowOracle__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    factory_: string,
    windowSize_: BigNumberish,
    granularity_: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ExampleSlidingWindowOracle> {
    return super.deploy(
      factory_,
      windowSize_,
      granularity_,
      overrides || {}
    ) as Promise<ExampleSlidingWindowOracle>;
  }
  getDeployTransaction(
    factory_: string,
    windowSize_: BigNumberish,
    granularity_: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      factory_,
      windowSize_,
      granularity_,
      overrides || {}
    );
  }
  attach(address: string): ExampleSlidingWindowOracle {
    return super.attach(address) as ExampleSlidingWindowOracle;
  }
  connect(signer: Signer): ExampleSlidingWindowOracle__factory {
    return super.connect(signer) as ExampleSlidingWindowOracle__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ExampleSlidingWindowOracleInterface {
    return new utils.Interface(_abi) as ExampleSlidingWindowOracleInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ExampleSlidingWindowOracle {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as ExampleSlidingWindowOracle;
  }
}