import React, {Fragment, ReactElement} from 'react';
import {PrimaryStickyHeaderScreen} from "@/Components/Screens/Global/Headers";
import {PageScreen} from "@/Components/Screens/Global/Page";
import {CategorySliderScreen} from "@/Components/Screens/Global/Category/CategorySlider";
import {SectionTitleScreen} from "@/Components/Screens/Global/SectionTitle";
import {ProductListScreen} from "@/Components/Screens/Global/ProductList";
import PizzaSlice from "@/Static/Images/Global/img_slice_pizza.png";

export interface CategoryListViewProps {

}

export interface CategoryListViewState {

}

class CategoryListView extends React.Component<CategoryListViewProps, CategoryListViewState> {
    render(): ReactElement {
        return (
            <Fragment>
                <PrimaryStickyHeaderScreen
                    headerProps={{
                        title: {
                            text: "Pizza",
                            image: PizzaSlice,
                        }
                    }}>
                    <PageScreen>
                        <CategorySliderScreen/>
                        <SectionTitleScreen commonText={"Product In "} title={"Pizza"}/>
                        <ProductListScreen/>
                    </PageScreen>
                </PrimaryStickyHeaderScreen>
            </Fragment>
        );
    }
}

export default CategoryListView;
