import * as React from 'react';
import { useSelector } from "react-redux";
import { Grid, Zoom, IconButton, Popover } from "@material-ui/core";
import { InfoOutlined } from "@material-ui/icons";
import { trim } from "../../helpers";
import "./dashboard.scss";
import { Skeleton } from "@material-ui/lab";
import { IReduxState } from "../../store/slices/state.interface";
import { IAppSlice } from "../../store/slices/app-slice";

function Dashboard() {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const isAppLoading = useSelector<IReduxState, boolean>(state => state.app.loading);
    const app = useSelector<IReduxState, IAppSlice>(state => state.app);

    const trimmedStakingAPY = app.stakingAPY * 100;

    var currentIndex = parseFloat(app.currentIndex + "");
    const wsPB = (app.marketPrice) * currentIndex;

    return (
        <div className="dashboard-view">
            <div className="dashboard-infos-wrap">
                <Zoom in={true}>
                    <Grid container spacing={0}>
                        <Grid item lg={4} md={4} sm={4} xs={12}>
                            <div className="dashboard-card">
                                <p className="card-title">PB Price</p>
                                <p className="card-value">{isAppLoading ? <Skeleton width="100px" /> : `$${trim(app.marketPrice, 2)}`}</p>
                            </div>
                        </Grid>

                        <Grid item lg={4} md={4} sm={4} xs={12}>
                            <div className="dashboard-card">
                                <p className="card-title">Market Cap</p>
                                <p className="card-value">
                                    {isAppLoading ? (
                                        <Skeleton width="160px" />
                                    ) : (
                                        new Intl.NumberFormat("en-US", {
                                            style: "currency",
                                            currency: "USD",
                                            maximumFractionDigits: 0,
                                            minimumFractionDigits: 0,
                                        }).format(app.marketCap)
                                    )}
                                </p>
                            </div>
                        </Grid>

                        {/* <Grid item lg={4} md={4} sm={4} xs={12}>
                            <div className="dashboard-card">
                                <p className="card-title">Supply (Staked/Total)</p>
                                <p className="card-value">
                                    {isAppLoading ? (
                                        <Skeleton width="250px" />
                                    ) : (
                                        `${new Intl.NumberFormat("en-US", {
                                            maximumFractionDigits: 0,
                                            minimumFractionDigits: 0,
                                        }).format(app.circSupply)}
                                        /
                                        ${new Intl.NumberFormat("en-US", {
                                            maximumFractionDigits: 0,
                                            minimumFractionDigits: 0,
                                        }).format(app.totalSupply)}`
                                    )}
                                </p>
                            </div>
                        </Grid> */}

                        <Grid item lg={4} md={4} sm={4} xs={12}>
                            <div className="dashboard-card">
                                <p className="card-title">TVL</p>
                                <p className="card-value">
                                    {isAppLoading ? (
                                        <Skeleton width="250px" />
                                    ) : (
                                        new Intl.NumberFormat("en-US", {
                                            style: "currency",
                                            currency: "USD",
                                            maximumFractionDigits: 0,
                                            minimumFractionDigits: 0,
                                        }).format(app.stakingTVL)
                                    )}
                                </p>
                            </div>
                        </Grid>

                        <Grid item lg={4} md={4} sm={4} xs={12}>
                            <div className="dashboard-card">
                                <p className="card-title">APY</p>
                                <p className="card-value">{isAppLoading ? <Skeleton width="250px" /> : `${new Intl.NumberFormat("en-US", {
                                                                                                                                 maximumFractionDigits: 4,
                                                                                                                                 minimumFractionDigits: 4,
                                                                                                                                 }).format(Number(trimmedStakingAPY))}%`}</p>
                            </div>
                        </Grid>

                        <Grid item lg={4} md={4} sm={4} xs={12}>
                            <div className="dashboard-card">
                                <p className="card-title">Current Index</p>
                                <p className="card-value">{isAppLoading ? <Skeleton width="250px" /> : `${trim(Number(app.currentIndex), 2)} PB`}</p>
                            </div>
                        </Grid>

                        <Grid item lg={4} md={4} sm={4} xs={12}>
                            <div className="dashboard-card">
                                <p className="card-title">Treasury Balance</p>
                                <p className="card-value">
                                    {isAppLoading ? (
                                        <Skeleton width="250px" />
                                    ) : (
                                        new Intl.NumberFormat("en-US", {
                                            style: "currency",
                                            currency: "USD",
                                            maximumFractionDigits: 0,
                                            minimumFractionDigits: 0,
                                        }).format(app.treasuryBalance)
                                    )}
                                </p>
                            </div>
                        </Grid>

                        <Grid item lg={4} md={4} sm={4} xs={12}>
                            <div className="dashboard-card">
                                <p className="card-title">Backing per $PB</p>
                                <p className="card-value">
                                    {isAppLoading ? (
                                        <Skeleton width="250px" />
                                    ) : (
                                        new Intl.NumberFormat("en-US", {
                                            style: "currency",
                                            currency: "USD",
                                            maximumFractionDigits: 0,
                                            minimumFractionDigits: 0,
                                        }).format(app.rfv)
                                    )}
                                </p>
                            </div>
                        </Grid>

                        <Grid item lg={4} md={4} sm={4} xs={12}>
                            <div className="dashboard-card">
                                <p className="card-title">Runway</p>
                                <p className="card-value">{isAppLoading ? <Skeleton width="250px" /> : `${trim(Number(app.runway), 1)} Days`}</p>
                            </div>
                        </Grid>

                        <Grid item lg={4} md={4} sm={4} xs={12}>
                            <div className="dashboard-card">
                                <p className="card-title">Staking Rate</p>
                                <p className="card-value">{isAppLoading ? <Skeleton width="250px" /> : `${trim(Number(app.stakingRate * 100), 1)} %`}</p>
                            </div>
                        </Grid>

                        <Grid item lg={4} md={4} sm={4} xs={12}>
                            <div className="dashboard-card">
                                <p className="card-title">Circulating Supply (total)</p>
                                <p className="card-value">{isAppLoading ? <Skeleton width="250px" /> : `${parseInt(app.arrangedCircSupply + "")} / ${parseInt(app.totalSupply + "")}`}</p>
                            </div>
                        </Grid>

                        <Grid item lg={4} md={4} sm={4} xs={12}>
                            <div className="dashboard-card">
                                <p className="card-title">
                                    wsPB
                                    <IconButton aria-describedby={id} onMouseEnter={handleClick} >
                                        <InfoOutlined style={{ fontSize: 15 }} />
                                    </IconButton>
                                    <Popover
                                        id={id}
                                        open={open}
                                        anchorEl={anchorEl}
                                        onClose={handleClose}
                                        anchorOrigin={{
                                          vertical: 'bottom',
                                          horizontal: 'center',
                                        }}
                                    >
                                        <div className="dashboard-card-popup">
                                            <p>
                                            wsPB = sPB * index
                                            </p>
                                            <p>
                                            The price of wsPB is equal to the price of PB multiplied by the current index
                                            </p>
                                        </div>
                                    </Popover>
                                </p>
                                <p className="card-value">{isAppLoading ? <Skeleton width="250px" /> : `$${trim(Number(wsPB), 2)}`}</p>
                            </div>
                        </Grid>
                    </Grid>
                </Zoom>
            </div>
        </div>
    );
}

export default Dashboard;
