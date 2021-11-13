export const messages = {
    please_connect: "Please connect your wallet to AVAX network to use PiggyBankDAO !",
    please_connect_wallet: "Please connect your wallet!",
    try_mint_more: (value: string) => `You're trying to bond more than the maximum payout available! The maximum bond payout is ${value} PB.`,
    before_minting: "Before bonding enter a value.",
    existing_mint:
        "You have an existing bond. Bonding will reset your vesting period and forfeit rewards. We recommend claiming rewards first or using a fresh wallet. Do you still want to proceed?",
    before_stake: "Before staking enter a value.",
    before_unstake: "Before unstaking enter a value.",
    tx_successfully_send: "Transaction is successfully send",
    your_balance_updated: "Your balance is successfully updated",
    nothing_to_claim: "Nothing to claim",
    something_wrong: "Something went wrong",
    switch_to_avalanche: "Switch to AVAX?",
};
