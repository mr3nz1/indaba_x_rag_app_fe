import Colors from "@/constants/Colors";
import { ThemedView } from "../ThemedView";

interface Props {
  active?: boolean;
}

export default function SliderBar({ active }: Props) {
  return (
    <ThemedView
      style={{
        height: 2,
        width: active ? 20 : 10,
        borderRadius: 20,
        backgroundColor: active ? Colors.gray._900 : Colors.gray._200,
      }}
    ></ThemedView>
  );
}
