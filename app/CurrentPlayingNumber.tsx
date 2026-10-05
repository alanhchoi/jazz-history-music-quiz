import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";

interface CurrentPlayingNumberProps {
  current: number;
  total: number;
  className?: string;
}

export default function CurrentPlayingNumber({
  current,
  total,
  className,
}: CurrentPlayingNumberProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        className={className}
        key={current}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {current + 1} / {total}
      </motion.div>
    </AnimatePresence>
  );
}
