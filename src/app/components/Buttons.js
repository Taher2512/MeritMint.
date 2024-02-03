"use client";

import {
  FiEdit,
  FiChevronDown,
  FiTrash,
  FiShare,
  FiPlusCircle,
  FiAlertCircle,
} from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IconType } from "react-icons";
import { addField } from "../cadence/transactions/addField";

function Buttons({ fetchResults, field, setField, fcl }) {
  const [open, setOpen] = useState(false);
  const [newField, setNewField] = useState("");

  const Option = ({ text, /* Icon, */ setOpen }) => {
    return (
      <motion.li
        variants={itemVariants}
        onClick={() => {
          setOpen(false);
          setField(text);
        }}
        className="flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-indigo-100 text-slate-700 hover:text-indigo-500 transition-colors cursor-pointer"
      >
        {/* <motion.span variants={actionIconVariants}>
          <Icon />
        </motion.span> */}
        <span>{text}</span>
      </motion.li>
    );
  };

  return (
    <div className="p-8 pb-56 flex items-center justify-center bg-white">
      <motion.div animate={open ? "open" : "closed"} className="relative">
        <button
          onClick={() => setOpen((pv) => !pv)}
          className="flex items-center gap-2 px-3 py-2 rounded-md text-indigo-50 bg-indigo-500 hover:bg-indigo-500 transition-colors"
        >
          <span className="font-medium text-sm">{field}</span>
          <motion.span variants={iconVariants}>
            <FiChevronDown />
          </motion.span>
        </button>

        <motion.ul
          initial={wrapperVariants.closed}
          variants={wrapperVariants}
          style={{ originY: "top", translateX: "-50%" }}
          className="flex flex-col gap-2 p-2 rounded-lg bg-white shadow-xl absolute top-[120%] left-[50%] w-48 overflow-hidden"
        >
          {/* <Option setOpen={setOpen} Icon={FiEdit} text="Mathematics" />
          <Option setOpen={setOpen} Icon={FiPlusSquare} text="Physics" />
          <Option setOpen={setOpen} Icon={FiShare} text="Computer Science" />
          <Option setOpen={setOpen} Icon={FiTrash} text="English" /> */}
          <Option setOpen={setOpen} text="Mathematics" />
          <Option setOpen={setOpen} text="Physics" />
          <Option setOpen={setOpen} text="Computer Science" />
          <Option setOpen={setOpen} text="English" />
        </motion.ul>
      </motion.div>
      <button className="px-6 py-2 font-medium bg-indigo-500 text-white">
        End Sem
      </button>
    </div>
  );
}

export default Buttons;

const wrapperVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.1,
    },
  },
};

const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
    },
  },
  closed: {
    opacity: 0,
    y: -15,
    transition: {
      when: "afterChildren",
    },
  },
};

const actionIconVariants = {
  open: { scale: 1, y: 0 },
  closed: { scale: 0, y: -7 },
};
