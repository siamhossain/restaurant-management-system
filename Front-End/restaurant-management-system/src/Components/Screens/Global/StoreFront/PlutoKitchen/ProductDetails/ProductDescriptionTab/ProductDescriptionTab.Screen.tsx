import React, { Fragment, ReactElement } from 'react';
import Box from '@material-ui/core/Box';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import {ProductDescriptionTabStyleSheet} from "@/Static/StyleSheets/StoreFront/PlutoKitchen/ProductDescriptionTab";

const ProductDescriptionTabScreen = (): ReactElement => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event:any, newValue:any) => {
        setValue(newValue);
    };

    return (
        <Fragment>
            <div className={ProductDescriptionTabStyleSheet.classes.root}>
                <Box sx={{ width: '100%'}}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="Reviews (0)" value="1"/>
                                <Tab label="Description" value="2"/>
                            </TabList>
                        </Box>
                        <div className={"tab-panel-container"}>
                        <TabPanel value="1">Although the legendary Double Burger really needs no introduction, please allow us… Tucked in between three soft buns are two all-beef patties, cheddar cheese, ketchup, onion, pickles and iceberg lettuce. Hesburger’s own paprika and cucumber mayonnaise add the crowning touch. Oh baby!<br/><br/><br/>

                            <b>Ingredients:</b> Dr. Praeger’s Black Bean Burger, Focaccia bun, Balsamic Vinaigrette, Pesto, Tomato, Swiss Cheese<br/><br/>
                            <b>Allergies:</b> Egg  Milk Protin sesame mustard</TabPanel>
                        <TabPanel value="2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi commodi dolore, eum in iusto laborum molestias nam quos voluptate voluptates?</TabPanel>
                        </div>
                    </TabContext>
                </Box>
            </div>
        </Fragment>
    );
};

export { ProductDescriptionTabScreen };
