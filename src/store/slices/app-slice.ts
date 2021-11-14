import { ethers } from "ethers";
import { getAddresses } from "../../constants";
import { StakingContract, SpbTokenContract, PBTokenContract } from "../../abi";
import { setAll } from "../../helpers";
import { createSlice, createSelector, createAsyncThunk } from "@reduxjs/toolkit";
import { JsonRpcProvider } from "@ethersproject/providers";
import { getMarketPrice, getTokenPrice, trim } from "../../helpers";
import { RootState } from "../store";
import allBonds from "../../helpers/bond";

interface ILoadAppDetails {
    networkID: number;
    provider: JsonRpcProvider;
}

export const loadAppDetails = createAsyncThunk(
    "app/loadAppDetails",
    //@ts-ignore
    async ({ networkID, provider }: ILoadAppDetails) => {
        const mimPrice = getTokenPrice("MIM");

        const addresses = getAddresses(networkID);

        //const ohmPrice = getTokenPrice("OHM");
        const ohmAmount = 0;

        const stakingContract = new ethers.Contract(addresses.STAKING_ADDRESS, StakingContract, provider);
        const currentBlock = await provider.getBlockNumber();
        const currentBlockTime = (await provider.getBlock(currentBlock)).timestamp;
        const spbContract = new ethers.Contract(addresses.SPB_ADDRESS, SpbTokenContract, provider);
        const pbContract = new ethers.Contract(addresses.PB_ADDRESS, PBTokenContract, provider);

        const marketPrice = ((await getMarketPrice(networkID, provider)) / Math.pow(10, 9)) * mimPrice;

        const totalSupply = (await pbContract.totalSupply()) / Math.pow(10, 9);
        const circSupply = (await spbContract.circulatingSupply()) / Math.pow(10, 9);
        //const circBalance= (await spbContract.circulatingSupply()) / Math.pow(10, 9);

        const stakingTVL = circSupply * marketPrice;

        const tokenBalPromises = allBonds.map(bond => bond.getTreasuryBalance(networkID, provider));
        const tokenBalances = await Promise.all(tokenBalPromises);
        const treasuryBalance = tokenBalances.reduce((tokenBalance0, tokenBalance1) => tokenBalance0 + tokenBalance1, ohmAmount);

        //const tokenAmountsPromises = allBonds.map(bond => bond.getTokenAmount(networkID, provider));
        //const tokenAmounts = await Promise.all(tokenAmountsPromises);
        //const rfvTreasury = tokenAmounts.reduce((tokenAmount0, tokenAmount1) => tokenAmount0 + tokenAmount1, ohmAmount);

        const pbBondsAmountsPromises = allBonds.map(bond => bond.getPBAmount(networkID, provider));
        const pbBondsAmounts = await Promise.all(pbBondsAmountsPromises);
        const PBAmount = pbBondsAmounts.reduce((PBAmount0, PBAmount1) => PBAmount0 + PBAmount1, 0);
        //const pbSupply = totalSupply - PBAmount;

        const circulatingBalance = (await pbContract.balanceOf(addresses.STAKING_ADDRESS)) / Math.pow(10, 9);

        const pbBondsBalancesPromises = allBonds.map(bond => bond.getBalanceOf(networkID, pbContract));
        const pbBondsBalances = await Promise.all(pbBondsBalancesPromises);
        const pbBondsBalance = pbBondsBalances.reduce((PBAmount0, PBAmount1) => PBAmount0 + PBAmount1, 0);

        const swapBalancesPromises = allBonds.map(bond => {
           if (bond.isLP) {
               return bond.getReverseBalanceOf(networkID, pbContract);
           }
        });
        const swapBalances = await Promise.all(swapBalancesPromises);
        var swapBalance = 0;
        for (var i in swapBalances) {
            if (i !== undefined && typeof swapBalances[i] === 'number') {
                swapBalance += Number(swapBalances[i]);
            }
        }

        //const marketCap = totalSupply * marketPrice - pbBondsBalance;
        //const rfv = treasuryBalance / pbSupply;

        const epoch = await stakingContract.epoch();
        const stakingReward = epoch.distribute;
        const stakingRebase = stakingReward / (circSupply * Math.pow(10, 9));
        const fiveDayRate = Math.pow(1 + stakingRebase, 5 * 3) - 1;
        const stakingAPY = Math.pow(1 + stakingRebase, 365 * 3) - 1;

        const currentIndex = (await stakingContract.index() / 2000).toFixed(0);

        const nextRebase = epoch.endTime;
        const treasuryRunway = treasuryBalance / circSupply;
        const runway = Math.log(treasuryRunway) / Math.log(1 + stakingRebase) / 3;

        const arrangedCircSupply = totalSupply - pbBondsBalance - swapBalance;

        const stakingRate = circSupply / (totalSupply - pbBondsBalance - PBAmount - (circulatingBalance - circSupply));
        const rfv = treasuryBalance / arrangedCircSupply;
        const marketCap = arrangedCircSupply * marketPrice;

        return {
            currentIndex: Number(ethers.utils.formatUnits(currentIndex, "gwei")) / 1,
            totalSupply,
            marketCap,
            currentBlock,
            circSupply,
            fiveDayRate,
            treasuryBalance,
            stakingAPY,
            stakingTVL,
            stakingRebase,
            marketPrice,
            currentBlockTime,
            nextRebase,
            rfv,
            runway,
            stakingRate,
            arrangedCircSupply,
        };
    },
);

const initialState = {
    loading: true,
};

export interface IAppSlice {
    loading: boolean;
    stakingTVL: number;
    marketPrice: number;
    marketCap: number;
    circSupply: number;
    currentIndex: string;
    currentBlock: number;
    currentBlockTime: number;
    fiveDayRate: number;
    treasuryBalance: number;
    stakingAPY: number;
    stakingRebase: number;
    networkID: number;
    nextRebase: number;
    totalSupply: number;
    rfv: number;
    runway: number;
    stakingRate: number;
    arrangedCircSupply: number;
}

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        fetchAppSuccess(state, action) {
            setAll(state, action.payload);
        },
    },
    extraReducers: builder => {
        builder
            .addCase(loadAppDetails.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(loadAppDetails.fulfilled, (state, action) => {
                setAll(state, action.payload);
                state.loading = false;
            })
            .addCase(loadAppDetails.rejected, (state, { error }) => {
                state.loading = false;
                console.log(error);
            });
    },
});

const baseInfo = (state: RootState) => state.app;

export default appSlice.reducer;

export const { fetchAppSuccess } = appSlice.actions;

export const getAppState = createSelector(baseInfo, app => app);
