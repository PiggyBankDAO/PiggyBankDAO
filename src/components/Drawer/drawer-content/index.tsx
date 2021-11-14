import { useCallback, useState } from "react";
import { NavLink } from "react-router-dom";
import Social from "./social";
import StakeIcon from "../../../assets/icons/stake.png";
import BondIcon from "../../../assets/icons/coin.png";
import MetaIcon from "../../../assets/icons/meta.png";
import BoosterIcon from "../../../assets/icons/booster.png";
import WonderlandIcon from "../../../assets/icons/piggybank-vlogo.png";
import DashboardIcon from "../../../assets/icons/dashboard.png";
import { trim, shorten } from "../../../helpers";
import { useAddress } from "../../../hooks";
import useBonds from "../../../hooks/bonds";
import { Link } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import "./drawer-content.scss";
import DocsIcon from "../../../assets/icons/stake.svg";
import classnames from "classnames";
import { useSelector } from "react-redux";
import { IReduxState } from "src/store/slices/state.interface";

function NavContent() {
    const [isActive] = useState();
    const address = useAddress();
    const { bonds } = useBonds();

    const checkPage = useCallback((location: any, page: string): boolean => {
        const currentPath = location.pathname.replace("/", "");
        if (currentPath.indexOf("dashboard") >= 0 && page === "dashboard") {
            return true;
        }
        if (currentPath.indexOf("stake") >= 0 && page === "stake") {
            return true;
        }
        if (currentPath.indexOf("mints") >= 0 && page === "mints") {
            return true;
        }
        return false;
    }, []);

    return (
        <div className="dapp-sidebar">
            <div className="branding-header">
                <Link href="https://piggybankdao.finance" target="_blank">
                    <img alt="" src={WonderlandIcon} />
                </Link>

                {address && (
                    <div className="wallet-link">
                        <Link href={`https://snowtrace.io/address/${address}`} target="_blank">
                            <p>{shorten(address)}</p>
                        </Link>
                    </div>
                )}
            </div>

            <div className="dapp-menu-links">
                <div className="dapp-nav">
                    <Link
                        component={NavLink}
                        to="/dashboard"
                        isActive={(match: any, location: any) => {
                            return checkPage(location, "dashboard");
                        }}
                        className={classnames("button-dapp-menu", { active: isActive })}
                    >
                        <div className="dapp-menu-item">
                            <img alt="" src={DashboardIcon} />
                            <p>Dashboard</p>
                        </div>
                    </Link>
                    <Link
                        component={NavLink}
                        to="/stake"
                        isActive={(match: any, location: any) => {
                            return checkPage(location, "stake");
                        }}
                        className={classnames("button-dapp-menu", { active: isActive })}
                    >
                        <div className="dapp-menu-item">
                            <img alt="" src={StakeIcon} />
                            <p>Stake</p>
                        </div>
                    </Link>
                    <Link
                        component={NavLink}
                        id="bond-nav"
                        to="/mints"
                        isActive={(match: any, location: any) => {
                            return checkPage(location, "mints");
                        }}
                        className={classnames("button-dapp-menu", { active: isActive })}
                    >
                        <div className="dapp-menu-item">
                            <img alt="" src={BondIcon} />
                            <p>Bond</p>
                        </div>

                        <div className="bond-discounts">
                            <p>Bond Discounts</p>
                            {bonds.map((bond, i) => (
                                <Link component={NavLink} to={`/mints/${bond.name}`} key={i} className={"bond"}>
                                    {!bond.bondDiscount ? (
                                        <Skeleton variant="text" width={"150px"} />
                                    ) : (
                                        <p>
                                            {bond.displayName}
                                            <span className="bond-pair-roi">{bond.bondDiscount && trim(bond.bondDiscount * 100, 2)}%</span>
                                        </p>
                                    )}
                                </Link>
                            ))}
                        </div>
                    </Link>
                    <Link
                        onClick={() => {
                                      return;
                                    }}
                        className={classnames("button-dapp-menu", { active: isActive })}
                    >
                        <div className="dapp-menu-item-inactive">
                            <img alt="" src={MetaIcon} />
                            <p>Piggy Meta</p>
                        </div>
                    </Link>
                    <Link
                        onClick={() => {
                                      return;
                                    }}
                        className={classnames("button-dapp-menu", { active: isActive })}
                    >
                        <div className="dapp-menu-item-inactive">
                            <img alt="" src={BoosterIcon} />
                            <p>Liquidity Booster</p>
                        </div>
                    </Link>
                    <Link
                        onClick={() => {
                                      return;
                                    }}
                        className={classnames("button-dapp-menu", { active: isActive })}
                    >
                        <div className="dapp-menu-item-inactive">
                            <img alt="" src={DocsIcon} />
                            <p>Docs</p>
                        </div>
                    </Link>
                </div>
            </div>
            <Social />
        </div>
    );
}

export default NavContent;
