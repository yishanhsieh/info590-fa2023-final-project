import { View, Text, Button } from "react-native";

export default function Checker({ answer, selectedOption }) {
  console.log("SelectedOption/ answer:", selectedOption, answer);

  if (selectedOption === answer) {
    return (
      <View>
        <Text>correct</Text>
      </View>
    );
  }
  if (selectedOption != answer && selectedOption) {
    return (
      <View>
        <Text>incorrect</Text>
      </View>
    );
  }
}
