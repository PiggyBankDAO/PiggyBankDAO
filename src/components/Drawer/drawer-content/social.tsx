import { SvgIcon, Link } from "@material-ui/core";
import GitHub from "../../../assets/icons/github.png";
import Twitter from "../../../assets/icons/twitter.svg";
import Telegram from "../../../assets/icons/telegram.svg";
import Discord from "../../../assets/icons/discord.svg";

export default function Social() {
    return (
        <div className="social-row">
            <Link href="https://github.com/PiggyBankDAO/PiggyBankDAO" target="_blank">
                <img alt="" src={GitHub} />
            </Link>

            <Link href="https://twitter.com/PiggyBankDAO" target="_blank">
                <img alt="" src={Twitter} />
            </Link>

            <Link href="https://t.me/PiggyBankDAO" target="_blank">
                <img alt="" src={Telegram} />
            </Link>

            <Link href="https://discord.gg/xCCBkFVvWJ" target="_blank">
                <img alt="" src={Discord} />
            </Link>
        </div>
    );
}
