import React from "react";
import { Modal, ScrollView, View, Text, TouchableOpacity } from "react-native";

function CreditCardModal({
  visible,
  cards,
  onCreditCardSelected,
  onDismiss,
  ...props
}) {
  function creditCardComponent(card) {
    const text = `${card.first6Digits}...${card.last4Digits}`;
    return (
      <TouchableOpacity
        onPress={function () {
          onCreditCardSelected(card);
          onDismiss();
        }}>
        <View
          key={card.cardToken}
          style={{ padding: 16, borderWidth: 1, borderRadius: 2 }}>
          <Text>{text}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  function cardsComponent() {
    return cards.map(function (card) {
      return creditCardComponent(card);
    });
  }
  return (
    <View
      style={{
        marginTop: 22,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Modal
        visible={visible}
        transparent={true}
        animationType="slide"
        onRequestClose={function () {
          onDismiss();
        }}>
        <View
          style={{
            marginTop: 22,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}>
          <View
            style={{
              margin: 20,
              backgroundColor: "white",
              borderRadius: 20,
              padding: 35,
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}>
            <ScrollView>{cardsComponent()}</ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default CreditCardModal;
