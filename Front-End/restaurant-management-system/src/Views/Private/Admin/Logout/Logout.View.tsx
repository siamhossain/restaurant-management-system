import React, { Fragment, ReactElement } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import {AuthenticationProvider} from "@/App/Services/Providers/Modules/Admin";
import {toaster} from "evergreen-ui";
import {AuthProvider} from "@/App/Services/Providers/Core/Auth";
import {useHistory} from "react-router";
import {ROUTE_PATHS} from "@/Routes";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        backdrop: {
            zIndex: 1,
            color: '#fff',
        },
    }),
);

const LogoutView = (): ReactElement => {
    const history = useHistory();
    const classes = useStyles();
    const [loading, setLoading] = React.useState(true);

    const tryLogout = () => {
        AuthenticationProvider.logout((data) => {
            setLoading(false);
            toaster.success(data.message);
            new AuthProvider().remove();
            history.push(ROUTE_PATHS.PUBLIC.ADMIN.LOGIN);
        });
    };

    React.useEffect(() => {
        if(loading) {
            tryLogout();
        }
    });
    return (
        <Fragment>
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit"/>
            </Backdrop>
        </Fragment>
    );
};

export default LogoutView;
