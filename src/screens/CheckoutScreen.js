import React, { useState, useContext, useEffect } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import {
  Avatar,
  List,
  Button,
  ActivityIndicator,
  Colors,
} from "react-native-paper";
import { PayWithFlutterwave } from "flutterwave-react-native";

import { CartContext } from "../api/cart/CartContext";
import { PaymentContext } from "../api/checkout/PaymentContext";
import Text from "../components/TextComponent";
import { colors } from "../theme/colors";
import ListItemRestaurantSearch from "../components/restaurant/ListItemRestaurantSearch";
import Spacer from "../components/Spacer";
import CreditCardModal from "../components/payment/CreditCardModal";

function CheckoutScreen({ navigation, ...props }) {
  const cartContext = useContext(CartContext);
  const paymentContext = useContext(PaymentContext);

  const cart = cartContext.cart;
  const restaurant = cartContext.restaurant;
  const sum = cartContext.sum;
  const options = paymentContext.createPaymentOptions(sum);
  const storedCards = paymentContext.storedCards;
  const [name, setName] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [creditCard, setCreditCard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(
    function () {
      setIsLoading(paymentContext.paymentState.type === "loading");
      if (paymentContext.paymentState.type === "success") {
        cartContext.clearCart();
        paymentContext.resetPaymentState();
        navigation.navigate("Checkout", {
          screen: "checkout_success",
          params: {},
        });
      } else if (paymentContext.paymentState.type === "error") {
        navigation.navigate("Checkout", {
          screen: "checkout_error",
          params: { error: paymentContext.paymentState.errorMessage },
        });
      }
    },
    [paymentContext],
  );

  function emptyCartComponent() {
    return (
      <SafeAreaView style={{ flex: 1, padding: 16 }}>
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
          <Avatar.Icon
            icon="cart-off"
            backgroundColor={colors.brand.primary}
            size={128}
          />
          <Text>Your cart is empty!</Text>
        </View>
      </SafeAreaView>
    );
  }
  function useSavedCardComponent() {
    const cardNumShort = creditCard
      ? `${creditCard.first6Digits}...${creditCard.last4Digits}`
      : null;
    const formattedText = creditCard ? `Use card ${cardNumShort}` : null;
    const creditCardText = creditCard ? formattedText : "Choose a card";
    return (
      <Spacer size="medium" position="top">
        <Button
          disabled={isLoading}
          mode="contained"
          style={{ width: "80%", alignSelf: "center", padding: 16 }}
          color={colors.brand.primary}
          onPress={function () {
            if (!creditCard) {
              setModalVisible(true);
            } else {
              paymentContext.makeTokenizedPayment(sum, creditCard);
            }
          }}>
          {creditCardText}
        </Button>
      </Spacer>
    );
  }

  function checkoutLoadingComponent() {
    return (
      <ActivityIndicator
        size={96}
        animating={true}
        color={Colors.blue400}
        style={{
          position: "absolute",
          top: "70%",
          left: "50%",
          zIndex: 999,
        }}
      />
    );
  }

  function checkoutComponent() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "palevioletred",
          padding: 16,
        }}>
        <CreditCardModal
          visible={modalVisible}
          cards={storedCards}
          onCreditCardSelected={function (card) {
            setCreditCard(card);
          }}
          onDismiss={() => setModalVisible(false)}
        />
        <ListItemRestaurantSearch restaurant={restaurant} />
        {isLoading && checkoutLoadingComponent()}
        <Spacer position="top" size="medium">
          <Spacer position="left" size="small">
            <Text>Your order</Text>
          </Spacer>
        </Spacer>
        <ScrollView>
          <List.Section>
            {cart.map(function (item) {
              const text = `${item.item} - \u20a6${item.price}`;
              return <Text>{text}</Text>;
            })}
          </List.Section>
          <Text>{`Sum: ${sum}`}</Text>
          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={function (t) {
              setName(t);
            }}
            style={{ padding: 16 }}
          />
          <View style={{ marginTop: 32 }} />
          <PayWithFlutterwave
            customButton={function (props) {
              const text = `Pay \u20a6${sum}`;
              return (
                <Button
                  disabled={!name || isLoading}
                  icon="cash"
                  color={colors.brand.primary}
                  mode="contained"
                  onPress={() => {
                    paymentContext.setLoading();
                    props.onPress();
                  }}
                  style={{ width: "80%", alignSelf: "center", padding: 16 }}>
                  {text}
                </Button>
              );
            }}
            options={options}
            onRedirect={paymentContext.handleRedirect}
          />
          {storedCards.length ? useSavedCardComponent() : false}
          <Spacer size="medium" position="top">
            <Button
              disabled={!cart.length || isLoading}
              icon="cart-off"
              color={colors.ui.error}
              mode="contained"
              onPress={function () {
                cartContext.clearCart();
                navigation.goBack();
              }}
              style={{ width: "80%", alignSelf: "center", padding: 16 }}>
              Clear
            </Button>
          </Spacer>
        </ScrollView>
      </SafeAreaView>
    );
  }

  const body = cart.length ? checkoutComponent() : emptyCartComponent();
  return body;
}
export default CheckoutScreen;
