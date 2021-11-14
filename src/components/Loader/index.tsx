import React from "react";
import Pig from "../../assets/icons/piggy-low.gif";
import "./loader.scss";

function Loader() {
    return (
        <div className="loader-wrap">
            <img alt="" src={Pig} />
        </div>
    );
}

export default Loader;
