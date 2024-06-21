import Colors from "@/constants/Colors";
import { Pressable } from "react-native";

interface Props {
  onPress: () => void;
  children: React.JSX.Element | React.JSX.Element[];
  radius?: "large" | "medium";
  color?: string;
}

export default function Button({ onPress, children, radius, color }: Props) {
  return (
    <Pressable
      style={{
        backgroundColor: color ?? Colors.gray._800,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: radius ? (radius === "medium" ? 14 : 20) : 14,
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 20,
        alignItems: "center",
      }}
      onPress={onPress}
    >
      {children}
    </Pressable>
  );
}
