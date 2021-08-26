import React, { useState, useContext } from "react";
import { View, ScrollView, Text } from "react-native";
import { List, Divider } from "react-native-paper";

import { CartContext } from "../../api/cart/CartContext";
import ListItemRestaurantSearch from "../../components/restaurant/ListItemRestaurantSearch";
import OrderButton from "../../components/restaurant/OrderButton";
import Spacer from "../../components/Spacer";

function RestaurantDetails({ route, navigation }) {
  const cartContext = useContext(CartContext);
  const [breakfastExpanded, setBreakfastExpanded] = useState(false);
  const [lunchExpanded, setLunchExpanded] = useState(false);
  const [dinnerExpanded, setDinnerExpanded] = useState(false);
  const [drinksExpanded, setDrinksExpanded] = useState(false);
  const { restaurant } = route.params;

  return (
    <View
      style={{
        flex: 1,
      }}>
      <ListItemRestaurantSearch restaurant={restaurant} />
      <ScrollView>
        <List.Section title="Menu">
          <List.Accordion
            title="Breakfast"
            left={props => <List.Icon {...props} icon="bread-slice" />}
            expanded={breakfastExpanded}
            onPress={() => setBreakfastExpanded(!breakfastExpanded)}>
            <List.Item title="Bread and Egg" />
            <Divider />
            <List.Item title="Yam and Stew" />
            <Divider />
            <List.Item title="Pap and Akara" />
          </List.Accordion>
          <List.Accordion
            title="Lunch"
            left={props => <List.Icon {...props} icon="hamburger" />}
            expanded={lunchExpanded}
            onPress={() => setLunchExpanded(!lunchExpanded)}>
            <List.Item title="Rice" />
            <Divider />
            <List.Item title="Amala and Ewedu" />
            <Divider />
            <List.Item title="Beans" />
          </List.Accordion>
          <List.Accordion
            title="Dinner"
            left={props => <List.Icon {...props} icon="food-variant" />}
            expanded={dinnerExpanded}
            onPress={() => setDinnerExpanded(!dinnerExpanded)}>
            <List.Item title="Indomie" />
            <Divider />
            <List.Item title="Spaghetti" />
          </List.Accordion>
          <List.Accordion
            title="Drinks"
            left={props => <List.Icon {...props} icon="cup" />}
            expanded={drinksExpanded}
            onPress={() => setDrinksExpanded(!drinksExpanded)}>
            <List.Item title="Water" />
            <Divider />
            <List.Item title="Coke" />
            <Divider />
            <List.Item title="Sprite" />
          </List.Accordion>
        </List.Section>
      </ScrollView>
      <Spacer position="bottom|top" size="medium">
        <OrderButton
          onPress={function () {
            cartContext.addToCart({ item: "special", price: 5000 }, restaurant);
            navigation.navigate("Checkout");
          }}>
          {"Order Special only \u20a6 5,000"}
        </OrderButton>
      </Spacer>
    </View>
  );
}

export default RestaurantDetails;
