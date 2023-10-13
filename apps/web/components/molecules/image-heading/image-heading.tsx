import Heading from "@web/components/atoms/heading";
import s from "./image-heading.module.css";
import Badge from "@web/components/atoms/badge";
import moment from "moment";

interface ImageHeadingProps {
  date: string;
  count: number;
}

export default function ImageHeading({ date, count }: ImageHeadingProps) {
  const formattedDate = moment(date, "MM.YYYY").format("MMMM 'YY");

  return (
    <Heading level="h1" className={s.heading}>
      {formattedDate}
      <Badge className={s.badge}>
        <Heading className={s.badgeHeading}>{count}</Heading>
      </Badge>
    </Heading>
  );
}
