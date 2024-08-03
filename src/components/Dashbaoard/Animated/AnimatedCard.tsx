import React, { ReactElement, useEffect } from "react";

import Image from "next/image";
import { motion, useAnimate } from "framer-motion";

import "@/components/Dashbaoard/Animated/list.css";
import useAppStore from "@/store/useAppStore";

/**
 * Renders an animated card with an image and name.
 *
 * @param {object} props - The props for the AnimatedCard component.
 * @param {string} props.image - The URL of the image to be displayed on the card.
 * @param {string} props.name - The name to be displayed on the card.
 * @returns {ReactElement} - The rendered AnimatedCard component.
 */
function AnimatedCard({
  image,
  name,
}: {
  image: string;
  name: string;
}): ReactElement {
  const [scope, animate] = useAnimate();

  const { revealCards } = useAppStore();

  const onMouseEnter = () => {
    animate([["div.hidden-div", { marginTop: "-375px" }, { duration: 0.3 }]]);
  };

  const onMouseLeave = () => {
    setTimeout(() => {
      if (!revealCards)
        animate([["div.hidden-div", { marginTop: "0px" }, { duration: 0.3 }]]);
    }, 500);
  };

  useEffect(() => {
    if (revealCards) {
      animate([["div.hidden-div", { marginTop: "-375px" }, { duration: 0.3 }]]);
    } else {
      animate([["div.hidden-div", { marginTop: "0px" }, { duration: 0.3 }]]);
    }
  }, [revealCards]);

  return (
    <motion.div
      ref={scope}
      id="card-container"
      className="overflow-hidden h-[395px] hover:cursor-pointer"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="w-full h-[375px] overflow-hidden">
        <motion.div className="hidden-div w-full h-[375px] bg-black flex justify-center items-center overflow-hidden">
          <Image src="/logo.svg" alt="logo" width={150} height={150} />
        </motion.div>
        <Image src={image} alt={name} width={250} height={500} />
      </div>
    </motion.div>
  );
}

export default AnimatedCard;
