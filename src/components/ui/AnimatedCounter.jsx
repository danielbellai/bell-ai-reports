import { useRef } from 'react';
import { useInView } from 'framer-motion';
import CountUp from 'react-countup';

export default function AnimatedCounter({ end, suffix = "", prefix = "", duration = 2 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <span ref={ref}>
      {isInView ? (
        <CountUp end={end} duration={duration} suffix={suffix} prefix={prefix} />
      ) : (
        `${prefix}0${suffix}`
      )}
    </span>
  );
}
