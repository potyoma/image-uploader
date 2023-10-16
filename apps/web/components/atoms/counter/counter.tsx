"use client";

import Text from "../text";
import s from "./counter.module.css";
import { plural } from "@web/lib/utils";
import { useEffect, useState } from "react";
import { useImageKeeperStore } from "@web/store";
import LoadBlock from "@web/components/organisms/load-block/load-block";
import { CounterSkeleton } from ".";

export default function Counter() {
  const [loading, setLoading] = useState(true);
  const { count, countPictures } = useImageKeeperStore();

  useEffect(() => {
    countPictures().then(() => setLoading(false));
  }, []);

  return (
    <LoadBlock loading={loading} fallback={<CounterSkeleton />}>
      <Text className={s.text}>
        {count} {plural("image", count)} stored in keeper
      </Text>
    </LoadBlock>
  );
}
