import React, { Fragment, ReactElement } from 'react';
import {View,ScrollView} from "react-native";
import { Searchbar } from 'react-native-paper';
import {SearchFieldStyleSheet} from "@/Static/StyleSheets/Global/Home/SearchField";



const SearchFieldScreen = (): ReactElement => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = (query: string) => setSearchQuery(query);

    return (
        <Fragment>
            <ScrollView style={SearchFieldStyleSheet.root}>
                <View style={SearchFieldStyleSheet.searchContainer}>
                    <Searchbar
                        placeholder="Search our delicious food"
                        onChangeText={onChangeSearch}
                        value={searchQuery}
                        inputStyle={{
                            fontSize: 15
                        }}
                    />
                </View>
            </ScrollView>
        </Fragment>
    );
};

export { SearchFieldScreen };
