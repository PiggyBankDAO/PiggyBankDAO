import React, { useState } from "react";
import "./header.scss";
import { ReactComponent as WonderlandIcon } from "../../../../assets/icons/wonderland-icon.svg";
import { SvgIcon, Link, Box, Popper, Fade } from "@material-ui/core";
import { ReactComponent as GitHub } from "../../../../assets/icons/github.svg";
import { ReactComponent as Twitter } from "../../../../assets/icons/twitter.svg";
import { ReactComponent as Telegram } from "../../../../assets/icons/telegram.svg";
import { ReactComponent as Discord } from "../../../../assets/icons/discord.svg";
import Pig from "../../../../assets/icons/piggybank-hlogo.png";
import Social from "../../../../components/Drawer/drawer-content/social";

function Header() {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event: any) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);

    return (
        <div className="landing-header">
            <img className="landing-header-logo" alt="" src={Pig} />
            <div className="landing-header-nav-wrap">
<Social />

            </div>
        </div>
    );
}

export default Header;
