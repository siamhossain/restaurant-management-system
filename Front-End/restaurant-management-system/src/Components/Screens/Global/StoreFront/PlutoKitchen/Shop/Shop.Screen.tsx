import React, { Fragment, ReactElement } from 'react';
import {ShopStyleSheet} from "@/Static/StyleSheets/StoreFront/PlutoKitchen/Shop";
import Grid from '@material-ui/core/Grid';
import {CommonStyleSheet} from "@/Static/StyleSheets/StoreFront/PlutoKitchen/Common";
import {SpecialMenuCardScreen} from "@/Components/Screens/Global/StoreFront/PlutoKitchen/SpecialMenu";
import SendruesImage from "@/Static/Images/StoreFront/PlutoKitchen/ShopMenu/Bangladeshi-Sendrues.png";
import ChickenSandwichImage from "@/Static/Images/StoreFront/PlutoKitchen/ShopMenu/Chicken-Sandwich.png";
import ChinisNoudlusImage from "@/Static/Images/StoreFront/PlutoKitchen/ShopMenu/Chinis-Noudlus.png";
import DoubleCheeseBurgerImage from "@/Static/Images/StoreFront/PlutoKitchen/ShopMenu/Double-Cheese-Burger.png";
import DoubleCheesePizzaImage from "@/Static/Images/StoreFront/PlutoKitchen/ShopMenu/Double-Cheese-Pizza.png";
import PizzDrinkImage from "@/Static/Images/StoreFront/PlutoKitchen/ShopMenu/Pizza-&-Drink.png";
import { SearchInput, TagInput, RadioGroup } from 'evergreen-ui'

const ShopScreen = (): ReactElement => {

    const [values, setValues] = React.useState(['Kauri', 'Willow', 'fancuk']);

    const [tags, setTags] = React.useState(['tag1', 'tag2', 'fancuk']);

    const [options] = React.useState([
        { label: 'L', value: 'L' },
        { label: 'M', value: 'M' },
        { label: 'S', value: 'S' },
        { label: 'XL', value: 'XL' }
    ])

    const [value, setValue] = React.useState('restricted')

    return (
        <Fragment>
            <div className={ShopStyleSheet.classes.root}>
                <div className={CommonStyleSheet.classes.container}>
                    <Grid container spacing={2}>
                        {/*<Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                            <div className="search-box">
                                <SearchInput placeholder="Filter traits..." />
                            </div>
                            <div className="category-tag">
                                <h2 className={"category-heading"}>All Categories</h2>
                                <TagInput
                                    // inputProps={{ placeholder: 'Add trees...' }}
                                    values={values}
                                    onChange={values => {
                                        setValues(values)
                                    }}
                                />
                            </div>
                            <div className="filter-size">
                                <h2 className={"category-heading"}>Filter By Size</h2>
                                <RadioGroup
                                    label=""
                                    value={value}
                                    options={options}
                                    onChange={event => setValue(event.target.value)}
                                />
                            </div>
                            <div className="category-tag">
                                <h2 className={"category-heading"}>Popular Tag</h2>
                                <TagInput
                                    // inputProps={{ placeholder: 'Add trees...' }}
                                    values={tags}
                                    onChange={tags => {
                                        setValues(tags)
                                    }}
                                />
                            </div>
                        </Grid>*/}

                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
                                    <SpecialMenuCardScreen src={SendruesImage} menu_name={"Unlimited Full Chicken"} price={"550 tk"} compare_at_price={"250 tk"} />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
                                    <SpecialMenuCardScreen src={ChickenSandwichImage} menu_name={"Unlimited Full Chicken"} price={"550 tk"} compare_at_price={"250 tk"} />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                                    <SpecialMenuCardScreen src={ChinisNoudlusImage} menu_name={"Unlimited Full Chicken"} price={"550 tk"} compare_at_price={"250 tk"} />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
                                    <SpecialMenuCardScreen src={DoubleCheeseBurgerImage} menu_name={"Unlimited Full Chicken"} price={"550 tk"} compare_at_price={"250 tk"} />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
                                    <SpecialMenuCardScreen src={DoubleCheesePizzaImage} menu_name={"Unlimited Full Chicken"} price={"550 tk"} compare_at_price={"250 tk"} />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
                                    <SpecialMenuCardScreen src={PizzDrinkImage} menu_name={"Unlimited Full Chicken"} price={"550 tk"} compare_at_price={"250 tk"} />
                                </Grid>

                        </Grid>
                    </Grid>
                </div>
            </div>
        </Fragment>
    );
};

export { ShopScreen };
