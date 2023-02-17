import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';

const variants = {
  out: {
    opacity: 0,
    y: 40,
    transition: {
      duration: 0.25
    }
  },
  in: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.25,
      delay: 0.15
    }
  }
}

const Transition = ({ children }) => {
  const { asPath } = useRouter();

  return (
    <AnimatePresence
      initial={false}
      exitBeforeEnter
    >
      <motion.div
        variants={variants}
        animate="in"
        initial="out"
        exit="out"
        key={asPath}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export default Transition;