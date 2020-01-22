import React from "react";
import { Image, TouchableHighlight } from "react-native";
import { Container, Text, List, ListItem, View, Icon } from "native-base";
import { DrawerContentComponentProps } from "react-navigation-drawer";
import {  NavigationRoute } from "react-navigation";



interface Props extends DrawerContentComponentProps {

}
interface State {

}

export default class SideBar extends React.Component<Props, State> {
    _keyExtractor = (item: NavigationRoute) => item.routeName

    render() {

        return (
            <Container style={{ borderTopRightRadius: 18, borderBottomRightRadius: 18 }}>
                <View
                    style={{
                        flex: 4,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: 'rgb(184,184,184)',
                        borderTopRightRadius: 18

                    }}>
                    <TouchableHighlight onPress={() => { alert("asdasd") }} underlayColor={'rgba(255,255,255,0)'} >
                        <Image
                            source={{
                                uri: "https://avatars1.githubusercontent.com/u/37835086?s=400&v=4"
                            }}

                            style={{
                                height: 60,
                                width: 60,
                                resizeMode: "stretch",
                                borderRadius: 18
                            }} />

                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => { alert("asdasd") }} underlayColor={'rgba(255,255,255,0)'} >
                        <Text>@Yasir.Aktunc</Text>
                    </TouchableHighlight>
                </View>
                <View style={{ borderTopLeftRadius: 12, borderTopRightRadius: 12, flex: 9, backgroundColor: "white", marginTop: -30 }}>
                    <List
                        dataArray={this.props.items}
                        keyExtractor={this._keyExtractor}
                        renderRow={(data: NavigationRoute) => {
                            return (
                                <ListItem
                                    button
                                    onPress={() => this.props.navigation!.navigate(data.routeName)}
                                >

                                    <Text>{data.key}</Text>
                                </ListItem>
                            );
                        }}
                    />
                </View>
                <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-end", alignItems: "center", marginRight: 10 }}>
                    <Icon name='logout' type="MaterialCommunityIcons" onPress={() => { this.props.navigation!.navigate('App') }} />
                    <TouchableHighlight onPress={() => { this.props.navigation!.navigate('App') }} underlayColor={'rgba(255,255,255,0)'} >
                        <Text>Sign Out</Text>
                    </TouchableHighlight>
                </View>
            </Container>
        );
    }
}