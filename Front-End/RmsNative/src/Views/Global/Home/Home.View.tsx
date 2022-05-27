import React, {Fragment, ReactElement} from 'react';
import {PrimaryStickyHeaderScreen} from "@/Components/Screens/Global/Headers";
import {GreetingsScreen} from "@/Components/Screens/Global/Home";
import {PageScreen} from "@/Components/Screens/Global/Page";
import {SearchFieldScreen} from "@/Components/Screens/Global/Home/SearchField";
import {CategorySliderScreen} from "@/Components/Screens/Global/Category/CategorySlider";
import {SectionTitleScreen} from "@/Components/Screens/Global/SectionTitle";
import {ProductListScreen} from "@/Components/Screens/Global/ProductList";
import {SideDrawerScreen} from "@/Components/Screens/Global/SideDrawer";
export interface HomeViewProps {

}

export interface HomeViewState {

}

class HomeView extends React.Component<HomeViewProps, HomeViewState> {
    render(): ReactElement {
        return (
            <Fragment>
                <PrimaryStickyHeaderScreen>
                    <SideDrawerScreen/>
                    <PageScreen>
                        <GreetingsScreen/>
                        <SearchFieldScreen/>
                        <CategorySliderScreen/>
                        <SectionTitleScreen commonText={"Special "} title={"Menu"}/>
                        <ProductListScreen />
                    </PageScreen>
                </PrimaryStickyHeaderScreen>
            </Fragment>
        );
    }
}

export default HomeView;
