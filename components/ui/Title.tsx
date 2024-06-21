import Colors from "@/constants/Colors";
import { Dimensions, Text } from "react-native";

interface Props {
  children: string;
}

export default function Title({ children }: Props) {
  const width = Dimensions.get("screen").width;

  return (
    <Text
      style={{
        fontFamily: "Bold",
        fontSize: 30,
        flex: 3.7 / 4,
        color: Colors.gray._800,
        width: width - 80,
      }}
    >
      {children}
    </Text>
  );
}
