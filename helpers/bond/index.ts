import { Networks } from "../../constants/blockchain";
import { LPBond, CustomLPBond } from "./lp-bond";
import { StableBond, CustomBond } from "./stable-bond";
import { getAddresses } from "../../constants";

import MimIcon from "../../assets/tokens/MIM.svg";
import AvaxIcon from "../../assets/tokens/AVAX.svg";
import MimPBIcon from "../../assets/tokens/PB-MIM.svg";
import AvaxPBIcon from "../../assets/tokens/PB-AVAX.svg";

import { StableBondContract, LpBondContract, WavaxBondContract, StableReserveContract, LpReserveContract } from "../../abi";

export const mim = new StableBond({
    name: "MIM",
    displayName: "MIM",
    bondToken: "MIM",
    bondIconSvg: MimIcon,
    bondContractABI: StableBondContract,
    reserveContractAbi: StableReserveContract,
    networkAddrs: {
        [Networks.AVAX]: {
            bondAddress: getAddresses(Networks.AVAX).MIM_BOND_ADDRESS,
            reserveAddress: getAddresses(Networks.AVAX).MIM_RESERVE_ADDRESS,
        },
    },
});

export const mimTime = new LPBond({
    name: "mim_pb_lp",
    displayName: "PB-MIM LP",
    bondToken: "MIM",
    bondIconSvg: MimPBIcon,
    bondContractABI: LpBondContract,
    reserveContractAbi: LpReserveContract,
    networkAddrs: {
        [Networks.AVAX]: {
            bondAddress: getAddresses(Networks.AVAX).MIM_LP_BOND_ADDRESS,
            reserveAddress: getAddresses(Networks.AVAX).MIM_SWAP_ADDRESS,
        },
    },
    lpUrl: "https://www.traderjoexyz.com/#/pool/"
    + getAddresses(Networks.AVAX).MIM_ADDRESS
    + "/"
    + getAddresses(Networks.AVAX).PB_ADDRESS,
});

export default [mim, mimTime];
