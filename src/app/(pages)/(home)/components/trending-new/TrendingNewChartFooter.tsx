"use client";
import { useState } from "react";

import { useActionState } from "react";
import { refreshTopNewGames } from "../../db/refreshTopNewGames";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { motion } from "motion/react";

export default function TrendingNewFooter() {
  const initialState = { message: "" };
  const [state, formAction, pending] = useActionState(
    refreshTopNewGames,
    initialState
  ); //Next.js Form hooks, we'll use this in the useEffect
  const [message, setMessage] = useState("");

  return (
    <div>
      <form
        action={formAction}
        className="flex gap-1 justify-start items-center"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            rotate: pending ? 360 : 0,
          }}
          transition={{
            loop: Infinity,
            ease: "linear",
            duration: pending ? 1 : 0,
          }}
          disabled={pending}
        >
          <ArrowPathIcon
            color="#FFFFFF"
            className="h-8 w-8 hover:text-2xl hover:cursor-pointer"
          />
        </motion.button>
        {message.length > 0 && (
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 6,
            }}
            className=" text-sm "
          >
            {message}
          </motion.span>
        )}
      </form>
    </div>
  );
}
