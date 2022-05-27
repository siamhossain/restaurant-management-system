import React, {Fragment, ReactElement} from 'react';
import {SideBarStyleSheet} from "@/Static/StyleSheets/Admin/SideBar";
import {ROUTE_PATHS} from "@/Routes";
import {Link} from "react-router-dom";
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import {RouterProvider} from "@/App/Services/Providers/Core/Router";
import {
    HomeIcon,
    UserIcon,
    DashboardIcon,
    PersonIcon,
    KeyCommandIcon,
    CubeIcon,
    SettingsIcon,
    ResolveIcon,
    CogIcon, ContrastIcon, HorizontalBarChartIcon, ShareIcon, HeatGridIcon, ControlIcon, JoinTableIcon, BankAccountIcon
} from 'evergreen-ui'


interface IMobileDrawerScreenProps {
    mobile?: boolean,
}

const SideBarScreen: React.FC<IMobileDrawerScreenProps> = (props): ReactElement => {

    const Menu = {
        DropDown: ({label, icon, children}: { label: string; children: React.ReactNode; icon: string | React.ReactNode; }) => {
            const [open, setOpen] = React.useState(false);

            return (
                <React.Fragment>
                    <div className={open ? "active" : ""}>
                        <a onClick={() => setOpen(!open)} className={"parentLink"}>
                            <span className="sidebar-wrapper__icon">
                                {typeof icon === "string" ? <img src={icon} alt={"icon"}/> : icon}
                            </span>
                            <span className="sidebar-wrapper__menu-text"> {label}</span>
                            {open ? <ArrowDropUpIcon/> : <ArrowDropDownIcon/>}
                        </a>

                        {open && (
                            <ul className={"subMenu"}>
                                {children}
                            </ul>
                        )}
                    </div>
                </React.Fragment>
            );
        },
        Item: ({href, icon, label, onClick, newTab}: { href?: string, icon: string | React.ReactNode, label: string, onClick?(): void, newTab?: boolean }) => {
            const Link: any = RouterProvider.Link;

            return (
                <Link to={href} onClick={onClick} target={newTab ? "_blank" : ""}>
                <span className="subItem" >
                    {typeof icon === "string" ? <img src={icon} alt={"icon"}/> : icon}
                </span>
                    <span>{label}</span>
                </Link>
            )
        }
    };

    return (
        <Fragment>
            <div className={SideBarStyleSheet.classes.root(props.mobile)}>
                <div className="sidebar">
                    <a className="logo-expand" href="#">
                        eDorpon
                    </a>

                    <div className="side-wrapper">
                        <div className="side-title">MENU</div>
                        <div className="side-menu">
                            <Menu.Item href={ROUTE_PATHS.PRIVATE.ADMIN.DASHBOARD} icon={<HomeIcon />} label={"Dashboard"}/>

                            <Menu.DropDown label="People" icon={ <UserIcon/> }>
                                <Menu.Item href={ROUTE_PATHS.PRIVATE.ADMIN.CUSTOMER} icon={<UserIcon />} label={"Customer"}/>
                                <Menu.Item href={ROUTE_PATHS.PRIVATE.ADMIN.SUPPLIER} icon={<UserIcon />} label={"Supplier"}/>
                            </Menu.DropDown>

                            <Menu.DropDown
                                label="Accounting"
                                icon={<BankAccountIcon />}>
                                <Menu.Item href={ROUTE_PATHS.PRIVATE.ADMIN.ACCOUNT_CATEGORY} icon={<HomeIcon />} label={"Accounting Category"}/>
                                <Menu.Item href={ROUTE_PATHS.PRIVATE.ADMIN.ACCOUNT_HEAD} icon={<KeyCommandIcon />} label={"Accounting Head"}/>
                                <Menu.Item href={ROUTE_PATHS.PRIVATE.ADMIN.INCOME} icon={<HomeIcon />} label={"Income"}/>
                                <Menu.Item href={ROUTE_PATHS.PRIVATE.ADMIN.EXPENSE} icon={<HomeIcon />} label={"Expense"}/>
                            </Menu.DropDown>

                            <Menu.DropDown
                                label="Product"
                                icon={<CubeIcon />}>
                                <Menu.Item href={ROUTE_PATHS.PRIVATE.ADMIN.CATEGORY} icon={<KeyCommandIcon />} label={"Categories"}/>
                                <Menu.Item href={ROUTE_PATHS.PRIVATE.ADMIN.BRAND} icon={<HomeIcon />} label={"Brands"}/>
                                <Menu.Item href={ROUTE_PATHS.PRIVATE.ADMIN.UNIT} icon={<HomeIcon />} label={"Units"}/>
                                <Menu.Item href={ROUTE_PATHS.PRIVATE.ADMIN.PRODUCT} icon={<HomeIcon />} label={"Products"}/>
                            </Menu.DropDown>
                            <Menu.DropDown
                                label="Purchase"
                                icon={<CubeIcon />}>
                                <Menu.Item href={ROUTE_PATHS.PRIVATE.ADMIN.PURCHASE_ORDER} icon={<KeyCommandIcon />} label={"Purchase Order"}/>
                                <Menu.Item href={ROUTE_PATHS.PRIVATE.ADMIN.PURCHASE_ORDER_RETURN} icon={<HomeIcon />} label={"Purchase Return"}/>
                            </Menu.DropDown>
                            <Menu.DropDown
                                label="Sales"
                                icon={<CubeIcon />}>
                                <Menu.Item href={ROUTE_PATHS.PRIVATE.ADMIN.SALES_ORDER} icon={<KeyCommandIcon />} label={"Sales Order"}/>
                                <Menu.Item href={ROUTE_PATHS.PRIVATE.ADMIN.SALES_ORDER_RETURN} icon={<HomeIcon />} label={"Sales Return"}/>
                            </Menu.DropDown>
                            <Menu.Item href={ROUTE_PATHS.PRIVATE.ADMIN.WASTAGE} icon={<JoinTableIcon />} label={"Wastage"}/>
                            <Menu.DropDown
                                label="Payment"
                                icon={<CubeIcon />}>
                                <Menu.Item href={ROUTE_PATHS.PRIVATE.ADMIN.CUSTOMER_PAYMENT} icon={<KeyCommandIcon />} label={"Customer Payment"}/>
                                <Menu.Item href={ROUTE_PATHS.PRIVATE.ADMIN.SUPPLIER_PAYMENT} icon={<HomeIcon />} label={"Supplier Payment"}/>
                            </Menu.DropDown>

                            <Menu.DropDown
                                label="Ingredient"
                                icon={<PersonIcon />}>
                                <Menu.Item href={ROUTE_PATHS.PRIVATE.ADMIN.INGREDIENT_CATEGORY} icon={<KeyCommandIcon />} label={"Categories"}/>
                                <Menu.Item href={ROUTE_PATHS.PRIVATE.ADMIN.INGREDIENT} icon={<HomeIcon />} label={"Ingredient"}/>
                                <Menu.Item href={ROUTE_PATHS.PRIVATE.ADMIN.INGREDIENT_PURCHASE} icon={<HomeIcon />} label={"Ingredient Purchase"}/>
                                <Menu.Item href={ROUTE_PATHS.PRIVATE.ADMIN.INGREDIENT_USES} icon={<HomeIcon />} label={"Ingredient Usage"}/>
                            </Menu.DropDown>

                            <Menu.DropDown
                                label="Settings"
                                icon={<SettingsIcon />}>
                                <Menu.Item href={ROUTE_PATHS.PRIVATE.ADMIN.USER} icon={<UserIcon />} label={"Users"}/>
                                <Menu.Item href={ROUTE_PATHS.PRIVATE.ADMIN.STORE_INFORMATION} icon={<CogIcon />} label={"Store Info"}/>
                                <Menu.Item href={ROUTE_PATHS.PRIVATE.ADMIN.USER_ROLE} icon={<ControlIcon />} label={"User Role"}/>
                                <Menu.Item href={ROUTE_PATHS.PRIVATE.ADMIN.ACCOUNTING_SETTINGS} icon={<ControlIcon />} label={"Accounting Settings"}/>
                            </Menu.DropDown>

                            <Menu.DropDown label="Store Front" icon={<ContrastIcon />}>
                                {/*<Menu.Item href={ROUTE_PATHS.PRIVATE.ADMIN.USER} icon={<HeatGridIcon />} label={"Theme"}/>*/}
                                {/*<Menu.Item href={ROUTE_PATHS.PRIVATE.ADMIN.BANNER} icon={<HorizontalBarChartIcon />} label={"Banner"}/>*/}
                                <Menu.Item href={ROUTE_PATHS.PRIVATE.ADMIN.SLIDER} icon={<HorizontalBarChartIcon />} label={"Store Front Slider"}/>
                                <Menu.Item href={ROUTE_PATHS.PRIVATE.ADMIN.SOCIAL_LINK} icon={<ShareIcon />} label={"Social Link"}/>
                            </Menu.DropDown>
                            <Menu.Item href={ROUTE_PATHS.PRIVATE.ADMIN.DUE_INVOICE} icon={<ResolveIcon />} label={"Due Invoice"}/>
                            <Menu.Item href={ROUTE_PATHS.PRIVATE.ADMIN.TABLE_BOOKING} icon={<JoinTableIcon />} label={"Table Booking"}/>
                            <Menu.Item href={ROUTE_PATHS.PRIVATE.ADMIN.ALL_REPORT} icon={<JoinTableIcon />} label={"All Report"}/>

                            <Menu.DropDown label="Kitchen" icon={<ContrastIcon />}>
                                <Menu.Item href={ROUTE_PATHS.PRIVATE.ADMIN.TABLE_BOOK_FOOD_KITCHEN} icon={<HeatGridIcon />} label={"Table Book Foods"}/>
                                <Menu.Item href={ROUTE_PATHS.PRIVATE.ADMIN.SALES_FOOD_KITCHEN} icon={<HeatGridIcon />} label={"Sales Order Foods"}/>
                            </Menu.DropDown>

                        </div>
                    </div>

                </div>
            </div>
        </Fragment>
    );
};

export {SideBarScreen};
