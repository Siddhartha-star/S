"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";

export const RealtimeClock = () => {
  const [now, setNow] = useState(() => dayjs());

  useEffect(() => {
    const interval = setInterval(() => setNow(dayjs()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col text-right text-sm text-white/70">
      <span className="text-lg font-semibold text-white">{now.format("HH:mm:ss")}</span>
      <span>{now.format("dddd, MMM D YYYY")}</span>
    </div>
  );
};




