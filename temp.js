<View style={{ marginTop: 12 }}>
  {currentQuestion?.options.map((item, index) => (
    <Pressable
      onPress={() =>
        selectedAnswerIndex === null && setSelectedAnswerIndex(index)
      }
      style={
        selectedAnswerIndex === index &&
        index === currentQuestion.correctAnswerIndex
          ? {}
          : selectedAnswerIndex != null && selectedAnswerIndex === index
          ? {}
          : {}
      }
    >
      {selectedAnswerIndex === index &&
      index === currentQuestion.correctAnswerIndex ? (
        <AntDesign name="check" size={20} color="white" />
      ) : selectedAnswerIndex != null && selectedAnswerIndex === index ? (
        <AntDesign name="closecircle" size={20} color="white" />
      ) : (
        <Text>{item.options}</Text>
      )}

      <Text style={{ marginLeft: 10 }}>{item.answer}</Text>
    </Pressable>
  ))}
</View>;
