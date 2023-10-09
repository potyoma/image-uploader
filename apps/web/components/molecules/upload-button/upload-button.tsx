import Button from "@web/components/atoms/button";
import s from "./upload-button.module.css";
import Icon from "@web/components/atoms/icon/icon";

interface UploadButtonProps {
  disabled?: boolean;
}

export default function UploadButton({ disabled }: UploadButtonProps) {
  return (
    <Button disabled={disabled} className={s.button}>
      <Icon icon="cloud" color="black" />
      Upload Image
    </Button>
  );
}
