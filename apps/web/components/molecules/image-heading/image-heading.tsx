import Heading from "@web/components/atoms/heading/heading";
import s from "./image-heading.module.css";
import Badge from "@web/components/atoms/badge";

interface ImageHeadingProps {
  date: string;
  count: number;
}

export default function ImageHeading({ date, count }: ImageHeadingProps) {
  return (
    <Heading level="h1" className={s.heading}>
      {date}
      <Badge className={s.badge}>
        <Heading className={s.badgeHeading}>{count}</Heading>
      </Badge>
    </Heading>
  );
}
