import React, { Fragment, ReactElement } from 'react';
import {IUserRoleViewState} from "@/Views/Private/Admin/UserRole/UserRole.View";
import {Dialog, HomeIcon, Table, UserIcon, GridViewIcon, ChevronDownIcon, ChevronUpIcon} from "evergreen-ui";
import {echo} from "@/App/Functions/Custom/echo.Function";
import Grid from "@material-ui/core/Grid";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import {RouterProvider} from "@/App/Services/Providers/Core/Router";
import {ROUTE_PATHS} from "@/Routes";
import {UserRoleViewStyleSheet} from "@/Static/StyleSheets/Admin/UserRole";
import DashboardIcon from '@material-ui/icons/Dashboard';


import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

interface IUserRoleViewScreenProps {
    viewData: IUserRoleViewState['view'],
    onViewClose(): void,
}


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        dialogPaper: {
            [theme.breakpoints.up('sm')]: {
                minWidth: "770px",
                maxHeight: "550px",
            }
        },

        root: {
            '& *': {
                fontSize: "15px !important",
            }
        },
        listContainer: {
            width: '100%',
            backgroundColor: theme.palette.background.paper,
        },
        nested: {
            paddingLeft: theme.spacing(4),
        },

        listItemIcon: {
            minWidth: 35,
        },

        checkBoxRoot: {
            '& *': {
                fontSize: "20px !important",
            }
        },
    }),
);



const Item = ({icon, label, onClick, selected}: Partial<{ icon: React.ReactChild, label: string, onClick: any, selected: boolean }>) => {
    const classes = useStyles();
    return (
        <ListItem button selected={selected} onClick={onClick}>
            <ListItemIcon className={classes.listItemIcon}>
                {icon}
            </ListItemIcon>
            <ListItemText primary={label}/>
        </ListItem>
    );
};

const NestedItem = ({icon, label, onClick, children}: Partial<{ icon: React.ReactChild, label: string, onClick: any, children: any }>) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    return (
        <React.Fragment>
            <ListItem button onClick={() => {
                setOpen(!open);
                if (typeof onClick === 'function') {
                    onClick();
                }
            }} selected={open}>
                <ListItemIcon className={classes.listItemIcon}>
                    {icon}
                </ListItemIcon>
                <ListItemText primary={label}/>
                {open ? <ExpandLess/> : <ExpandMore/>}
            </ListItem>

            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <div className={classes.nested}>
                        {children}
                    </div>
                </List>
            </Collapse>
        </React.Fragment>
    );
};


const UserRoleViewScreen: React.FC<IUserRoleViewScreenProps> = (props): ReactElement => {
    const classes = useStyles();

    return (
        <Fragment>
            <div className={UserRoleViewStyleSheet.classes.root}>
                <Dialog
                    isShown={props.viewData.open}
                    title="User Role View"
                    hasCancel={false}
                    confirmLabel={"Save"}
                    shouldCloseOnOverlayClick={true}
                    onCloseComplete={() => props.onViewClose()}
                    width={'50%'}
                >
                    <React.Fragment>
                        <div>
                            <Grid container spacing={1} style={{borderTop: '1px solid #d9d9d9'}} className={classes.root}>
                                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} style={{borderRight: '1px solid #d9d9d9'}}>
                                    <List
                                        component="nav"
                                        className={classes.listContainer}>

                                        <Item
                                            icon={<DashboardIcon/>}
                                            label={"Dashboard"}
                                            selected={false}
                                            onClick={() => {

                                            }}
                                        />

                                        <NestedItem label={"Products Info"} icon={<DashboardIcon/>}
                                                    onClick={() =>{ }}>

                                            <Item
                                                icon={<DashboardIcon/>}
                                                label={"Categories"}
                                                selected={false}
                                                onClick={() => {

                                                }}
                                            />

                                            <Item
                                                icon={<DashboardIcon/>}
                                                label={"Brands"}
                                                selected={false}
                                                onClick={() => {

                                                }}
                                            />

                                            <Item
                                                icon={<DashboardIcon/>}
                                                label={"Units"}
                                                selected={false}
                                                onClick={() => {

                                                }}
                                            />

                                            <Item
                                                icon={<DashboardIcon/>}
                                                label={"Medicines"}
                                                selected={false}
                                                onClick={() => {

                                                }}
                                            />

                                            <Item
                                                icon={<DashboardIcon/>}
                                                label={"Stock"}
                                                selected={false}
                                                onClick={() => {

                                                }}
                                            />
                                        </NestedItem>

                                        <NestedItem label={"People"} icon={<DashboardIcon/>}
                                                    onClick={"" }>
                                            <Item
                                                icon={<DashboardIcon/>}
                                                label={"Customers"}
                                                selected={false}
                                                onClick={() => {
                                                }}
                                            />

                                            <Item
                                                icon={<DashboardIcon/>}
                                                label={"Suppliers"}
                                                selected={false}
                                                onClick={() => {
                                                }}
                                            />
                                        </NestedItem>

                                        <NestedItem label={"Accounting"} icon={<DashboardIcon/>}
                                                    onClick={() =>{ }}>
                                            <Item
                                                icon={<DashboardIcon/>}
                                                label={"Account Categories"}
                                                selected={false}
                                                onClick={() => {

                                                }}
                                            />

                                            <Item
                                                icon={<DashboardIcon/>}
                                                label={"Account Heads"}
                                                selected={false}
                                                onClick={() => {

                                                }}
                                            />

                                            <Item
                                                icon={<DashboardIcon/>}
                                                label={"Income List"}
                                                selected={false}
                                                onClick={() => {

                                                }}
                                            />

                                            <Item
                                                icon={<DashboardIcon/>}
                                                label={"Expense List"}
                                                selected={false}
                                                onClick={() => {

                                                }}
                                            />
                                        </NestedItem>

                                        <NestedItem label={"HR"} icon={<DashboardIcon/>} onClick={() => { }}>
                                            <Item
                                                icon={<DashboardIcon/>}
                                                label={"Employees"}
                                                selected={false}
                                                onClick={() => {

                                                }}
                                            />

                                            <Item
                                                icon={<DashboardIcon/>}
                                                label={"Payroll"}
                                                selected={false}
                                                onClick={() => {

                                                }}
                                            />

                                            <Item
                                                icon={<DashboardIcon/>}
                                                label={"Attendance"}
                                                selected={false}
                                                onClick={() => {

                                                }}
                                            />

                                            <Item
                                                icon={<DashboardIcon/>}
                                                label={"Leave Purpose"}
                                                selected={false}
                                                onClick={() => {

                                                }}
                                            />

                                            <Item
                                                icon={<DashboardIcon/>}
                                                label={"Leave"}
                                                selected={false}
                                                onClick={() => {

                                                }}
                                            />
                                        </NestedItem>

                                        <NestedItem label={"Previous DueInvoice"} icon={<DashboardIcon/>}
                                                    onClick={() => { }}>
                                            <Item
                                                icon={<DashboardIcon/>}
                                                label={"Supplier DueInvoice"}
                                                selected={false}
                                                onClick={() => {

                                                }}
                                            />

                                            <Item
                                                icon={<DashboardIcon/>}
                                                label={"Customer DueInvoice"}
                                                selected={false}
                                                onClick={() => {

                                                }}
                                            />
                                        </NestedItem>

                                        <NestedItem label={"Transaction"} icon={<DashboardIcon/>}
                                                    onClick={() => { }}>
                                            <Item
                                                icon={<DashboardIcon/>}
                                                label={"Supplier Payment"}
                                                selected={false}
                                                onClick={() => {

                                                }}
                                            />

                                            <Item
                                                icon={<DashboardIcon/>}
                                                label={"Customer Payment"}
                                                selected={false}
                                                onClick={() => {

                                                }}
                                            />
                                        </NestedItem>

                                        <NestedItem label={"Purchase"} icon={<DashboardIcon/>}
                                                    onClick={() => { }}>
                                            <Item
                                                icon={<DashboardIcon/>}
                                                label={"Purchase Orders"}
                                                selected={false}
                                                onClick={() => {

                                                }}
                                            />
                                            <Item
                                                icon={<DashboardIcon/>}
                                                label={"Purchase Returns"}
                                                selected={false}
                                                onClick={() => {

                                                }}
                                            />
                                        </NestedItem>

                                        <NestedItem label={"Sales"} icon={<DashboardIcon/>}
                                                    onClick={() => { }}>
                                            <Item
                                                icon={<DashboardIcon/>}
                                                label={"Sales Orders"}
                                                selected={false}
                                                onClick={() => {

                                                }}
                                            />
                                            <Item
                                                icon={<DashboardIcon/>}
                                                label={"Sales Returns"}
                                                selected={false}
                                                onClick={() => {

                                                }}
                                            />
                                        </NestedItem>

                                        <NestedItem label={"Balance"} icon={<DashboardIcon/>}
                                                    onClick={() => { }}>
                                            <Item
                                                icon={<DashboardIcon/>}
                                                label={"Wastage"}
                                                selected={false}
                                                onClick={() => {

                                                }}
                                            />
                                        </NestedItem>

                                        <NestedItem label={"Report"} icon={<DashboardIcon/>}
                                                    onClick={() => { }}>
                                            <Item
                                                icon={<DashboardIcon/>}
                                                label={"Purchase Summary"}
                                                selected={false}
                                                onClick={() => {

                                                }}
                                            />

                                            <Item
                                                icon={<DashboardIcon/>}
                                                label={"Purchase Details"}
                                                selected={false}
                                                onClick={() => {

                                                }}
                                            />
                                            <Item
                                                icon={<DashboardIcon/>}
                                                label={"Purchase Return Summary"}
                                                selected={false}
                                                onClick={() => {

                                                }}
                                            />

                                            <Item
                                                icon={<DashboardIcon/>}
                                                label={"Purchase Return Details"}
                                                selected={false}
                                                onClick={() => {

                                                }}
                                            />

                                            <Item
                                                icon={<DashboardIcon/>}
                                                label={"Sales Summary"}
                                                selected={false}
                                                onClick={() => {

                                                }}
                                            />

                                            <Item
                                                icon={<DashboardIcon/>}
                                                label={"Sales Details"}
                                                selected={false}
                                                onClick={() => {

                                                }}
                                            />

                                            <Item
                                                icon={<DashboardIcon/>}
                                                label={"Sales Return Summary"}
                                                selected={false}
                                                onClick={() => {

                                                }}
                                            />

                                            <Item
                                                icon={<DashboardIcon/>}
                                                label={"Sales Return Details"}
                                                selected={false}
                                                onClick={() => {

                                                }}
                                            />

                                            <Item
                                                icon={<DashboardIcon/>}
                                                label={"Wastage Summary"}
                                                selected={false}
                                                onClick={() => {

                                                }}
                                            />
                                            <Item
                                                icon={<DashboardIcon/>}
                                                label={"Wastage Details"}
                                                selected={false}
                                                onClick={() => {

                                                }}
                                            />

                                            <Item
                                                icon={<DashboardIcon/>}
                                                label={"Supplier Payment Summary"}
                                                selected={false}
                                                onClick={() => {

                                                }}
                                            />
                                            <Item
                                                icon={<DashboardIcon/>}
                                                label={"Supplier Payment Report"}
                                                selected={false}
                                                onClick={() => {

                                                }}
                                            />
                                            <Item
                                                icon={<DashboardIcon/>}
                                                label={"Customer Payment Summary"}
                                                selected={false}
                                                onClick={() => {

                                                }}
                                            />
                                            <Item
                                                icon={<DashboardIcon/>}
                                                label={"Customer Payment Report"}
                                                selected={false}
                                                onClick={() => {

                                                }}
                                            />
                                            <Item
                                                icon={<DashboardIcon/>}
                                                label={"Supplier Invoice Summary"}
                                                selected={false}
                                                onClick={() => {

                                                }}
                                            />
                                            <Item
                                                icon={<DashboardIcon/>}
                                                label={"Supplier Invoice Report"}
                                                selected={false}
                                                onClick={() => {

                                                }}
                                            />
                                            <Item
                                                icon={<DashboardIcon/>}
                                                label={"Customer Invoice Summary"}
                                                selected={false}
                                                onClick={() => {

                                                }}
                                            />
                                            <Item
                                                icon={<DashboardIcon/>}
                                                label={"Customer Invoice Report"}
                                                selected={false}
                                                onClick={() => {

                                                }}
                                            />
                                            <Item
                                                icon={<DashboardIcon/>}
                                                label={"Account History"}
                                                selected={false}
                                                onClick={() => {

                                                }}
                                            />
                                            <Item
                                                icon={<DashboardIcon/>}
                                                label={"Profit Loss"}
                                                selected={false}
                                                onClick={() => {

                                                }}
                                            />
                                            <Item
                                                icon={<DashboardIcon/>}
                                                label={"General Ledger"}
                                                selected={false}
                                                onClick={() => {

                                                }}
                                            />
                                            <Item
                                                icon={<DashboardIcon/>}
                                                label={"Product Validity Report"}
                                                selected={false}
                                                onClick={() => {

                                                }}
                                            />
                                            <Item
                                                icon={<DashboardIcon/>}
                                                label={"Sales Item Summary"}
                                                selected={false}
                                                onClick={() => {

                                                }}
                                            />
                                            <Item
                                                icon={<DashboardIcon/>}
                                                label={"Income Balance Sheet"}
                                                selected={false}
                                                onClick={() => {

                                                }}
                                            />
                                            <Item
                                                icon={<DashboardIcon/>}
                                                label={"Customer List"}
                                                selected={false}
                                                onClick={() => {

                                                }}
                                            />
                                            <Item
                                                icon={<DashboardIcon/>}
                                                label={"Supplier List"}
                                                selected={false}
                                                onClick={() => {

                                                }}
                                            />
                                            <Item
                                                icon={<DashboardIcon/>}
                                                label={"Stock Report"}
                                                selected={false}
                                                onClick={() => {

                                                }}
                                            />
                                        </NestedItem>

                                        <NestedItem label={"Settings"} icon={<DashboardIcon/>}
                                                    onClick={() => { }}>
                                            <Item
                                                icon={<DashboardIcon/>}
                                                label={"General Settings"}
                                                selected={false}
                                                onClick={() => {

                                                }}
                                            />

                                            <Item
                                                icon={<DashboardIcon/>}
                                                label={"Accounting Settings"}
                                                selected={false}
                                                onClick={() => {

                                                }}
                                            />

                                            <Item
                                                icon={<DashboardIcon/>}
                                                label={"User Roles"}
                                                selected={false}
                                                onClick={() => {

                                                }}
                                            />
                                        </NestedItem>

                                    </List>
                                </Grid>

                                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                    <div style={{padding: "0 20px", marginTop: 15, marginBottom: 15}}>
                                        <div style={{marginBottom: 15}}>
                                            <b>Permissions</b>
                                        </div>

                                        <React.Fragment>
                                            <div>
                                                <FormControlLabel
                                                    value="end"
                                                    control={
                                                        <Checkbox
                                                            color="secondary"
                                                            classes={{root: classes.checkBoxRoot}}
                                                            checked={false}
                                                            onChange={() => { }}
                                                        />}
                                                    label="-- Select All --"
                                                    labelPlacement="end"
                                                />
                                            </div>

                                            <div>
                                                <FormControlLabel
                                                    value="end"
                                                    control={
                                                        <Checkbox
                                                            color="secondary"
                                                            classes={{root: classes.checkBoxRoot}}
                                                            checked={false}
                                                            onChange={() => { }}
                                                        />}
                                                    label="Access (Access the module)"
                                                    labelPlacement="end"
                                                />
                                            </div>

                                            <div>
                                                <FormControlLabel
                                                    value="end"
                                                    control={
                                                        <Checkbox
                                                            color="secondary"
                                                            classes={{root: classes.checkBoxRoot}}
                                                            checked={false}
                                                            onChange={() => { }}
                                                            disabled={false}
                                                        />
                                                    }
                                                    label="View (View Entry)"
                                                    labelPlacement="end"
                                                />
                                            </div>

                                            <div>
                                                <FormControlLabel
                                                    value="end"
                                                    control={
                                                        <Checkbox
                                                            color="secondary"
                                                            classes={{root: classes.checkBoxRoot}}
                                                            checked={false}
                                                            onChange={() => { }}
                                                            disabled={false}
                                                        />
                                                    }
                                                    label="Add (Make Entry)"
                                                    labelPlacement="end"
                                                />
                                            </div>

                                            <div>
                                                <FormControlLabel
                                                    value="end"
                                                    control={
                                                        <Checkbox
                                                            color="secondary"
                                                            classes={{root: classes.checkBoxRoot}}
                                                            checked={false}
                                                            onChange={() => { }}
                                                            disabled={false}
                                                        />
                                                    }
                                                    label="Edit (Edit Entry)"
                                                    labelPlacement="end"
                                                />
                                            </div>

                                            <div>
                                                <FormControlLabel
                                                    value="end"
                                                    control={
                                                        <Checkbox
                                                            color="secondary"
                                                            classes={{root: classes.checkBoxRoot}}
                                                            checked={false}
                                                            onChange={() => { }}
                                                            disabled={false}
                                                        />
                                                    }
                                                    label="Delete (Delete Entry)"
                                                    labelPlacement="end"
                                                />
                                            </div>

                                            <div>
                                                <FormControlLabel
                                                    value="end"
                                                    control={
                                                        <Checkbox
                                                            color="secondary"
                                                            classes={{root: classes.checkBoxRoot}}
                                                            checked={false}
                                                            onChange={() => { }}
                                                            disabled={false}
                                                        />
                                                    }
                                                    label="Print (Print Entry)"
                                                    labelPlacement="end"
                                                />
                                            </div>
                                        </React.Fragment>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </React.Fragment>


                    {/*<Table style={{width: '100%', textAlign: 'left'}}>
                        <Table.Row>
                            <Table.TextHeaderCell>Name:</Table.TextHeaderCell>
                            <Table.TextCell>{echo(props.viewData.data?.name)}</Table.TextCell>
                        </Table.Row>
                    </Table>*/}
                </Dialog>
            </div>
        </Fragment>
    );
};

export { UserRoleViewScreen };
