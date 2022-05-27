import React, { Fragment, ReactElement } from 'react';
import {AddressStyleSheet} from "@/Static/StyleSheets/StoreFront/PlutoKitchen/Address";
import {CommonStyleSheet} from "@/Static/StyleSheets/StoreFront/PlutoKitchen/Common";
import Grid from "@material-ui/core/Grid";
import {TextInputField} from "evergreen-ui";
import {ProfileMenu} from "@/Components/Screens/Private/StoreFront/Plutokitchen/Customer/ProfileMenu/ProfileMenu";


const AddressScreen = (): ReactElement => {
    return (
        <Fragment>
             <div className={AddressStyleSheet.classes.root}>
                 <div className={CommonStyleSheet.classes.container}>
                     <div className="address-section">
                         <Grid container spacing={4}>
                             <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                                <ProfileMenu/>
                             </Grid>

                             <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
                                 <div className="address-following">
                                     <p>The following addresses will be used on the checkout page by default.</p>
                                     <div className="address-wrapper">
                                         <div className="billing-address">
                                             <h1 className="address-title">Billing address</h1>
                                             <div className="add-button">
                                                 <button>Add</button>
                                             </div>
                                             <p>You have not set up this type of address yet.</p>
                                         </div>

                                         <div className="shipping-address">
                                             <h1 className="address-title">Shipping address</h1>
                                             <div className="add-button">
                                                 <button>Add</button>
                                             </div>
                                             <p>You have not set up this type of address yet.</p>
                                         </div>
                                     </div>

                                     <h1 className="address-title">Billing address</h1>
                                     <div className="billing-address-from">
                                         <TextInputField
                                             description="FIRST NAME *"
                                             className={"first-name"}
                                             placeholder=" "
                                         />
                                         <TextInputField
                                             description="LAST NAME *"
                                             className={"first-name"}
                                             placeholder=" "
                                         />
                                         <TextInputField
                                             description="PHONE*"
                                             className={"first-name"}
                                             placeholder=" "
                                         />
                                         <TextInputField
                                             description="EMAIL*"
                                             className={"first-name"}
                                             placeholder=" "
                                         />
                                         <TextInputField
                                             description="COMPANY NAME(optional)"
                                             className={"first-name"}
                                             placeholder=" "
                                         />
                                         <TextInputField
                                             description="STREET ADDRESS"
                                             className={"first-name"}
                                             placeholder=" "
                                         />
                                         <TextInputField
                                             description="TOWN/CITY*"
                                             className={"first-name"}
                                             placeholder=" "
                                         />

                                         <div className="button">
                                             <button>SAVE ADDRESS</button>
                                         </div>
                                     </div>
                                 </div>
                             </Grid>
                         </Grid>
                     </div>
                 </div>
             </div>
        </Fragment>
    );
};

export { AddressScreen };
