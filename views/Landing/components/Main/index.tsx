import React from "react";
import { Link } from "@material-ui/core";
import "./main.scss";
import Pig from "../../../../assets/icons/piggy-low.gif";

function Main() {

    return (
        <div className="landing-main">
            <div className="landing-sub">
                <div>
                    <div className="landing-main-title-wrap">
                        <p>Piggy Bank</p>
                    </div>
                    <div className="landing-main-help-text-wrap">
                        <p>Financial tools to grow your wealth - stake</p>
                        <p>and earn compounding interest</p>
                    </div>
                    <div className="landing-main-btns-wrap">
                        <Link href="https://app.piggybankdao.finance" target="_blank" rel="noreferrer">
                            <div className="landing-main-btn-enter-app">
                                <p>Enter APP</p>
                            </div>
                        </Link>
                        <Link onClick={() => {
                                  return;
                                }} target="_blank" rel="noreferrer">
                            <div className="landing-main-btn-documentation">
                                <p>Auditing</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="landing-sub-img">
                <img alt="" src={Pig} />
            </div>
        </div>
    );
}

export default Main;
