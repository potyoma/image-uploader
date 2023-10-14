import DeleteBubble from "@web/components/molecules/delete-bubble/delete-bubble";
import { useImageKeeperStore } from "@web/store";
import s from "./delete-bubbles.module.css";

export default function DeleteBubbles() {
  const { deleteQueue } = useImageKeeperStore();

  if ((deleteQueue?.length ?? 0) < 1) return null;

  return (
    <div className={s.bubbles}>
      {[...deleteQueue!].reverse().map(pic => (
        <DeleteBubble key={pic.id} picture={pic} />
      ))}
    </div>
  );
}
