import { useImageKeeperStore } from "@web/store";
import { Picture } from "@web/store/models/picture";
import s from "./delete-bubble.module.css";
import Timer from "@web/components/atoms/timer/timer";
import Button from "@web/components/atoms/button/button";
import Icon from "@web/components/atoms/icon/icon";
import Text from "@web/components/atoms/text/text";
import { useState } from "react";

interface DeleteBubbleProps {
  picture: Picture;
}

export default function DeleteBubble({ picture }: DeleteBubbleProps) {
  const [render, setRender] = useState(true);

  const { cancelDelete } = useImageKeeperStore();

  const { name } = picture;

  return render ? (
    <div className={s.bubble}>
      <Timer onTimeout={() => setRender(false)} />
      <Text className={s.text}>Delete image {name}</Text>
      <Button onClick={() => cancelDelete(picture)}>
        <Icon icon="close" />
        Cancel
      </Button>
    </div>
  ) : null;
}
