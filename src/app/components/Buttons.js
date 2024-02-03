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
  const [modalIsOpen, setModalIsOpen] = useState(false);
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
      <div>
        <button
          onClick={() => setModalIsOpen(true)}
          className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium px-4 py-2 rounded hover:opacity-90 transition-opacity"
        >
          Open Modal
        </button>
        <SpringModal
          isOpen={modalIsOpen}
          setIsOpen={setModalIsOpen}
          fcl={fcl}
        />
      </div>
    </div>
  );
}

export default Buttons;

const addAField = async (fcl) => {
  const field = document.getElementById("add_field").value;
  field.toString();
  const transactionId = await fcl
    .send([
      fcl.transaction(addField),
      fcl.args([fcl.arg(field, fcl.t.String)]),
      fcl.payer(fcl.authz),
      fcl.proposer(fcl.authz),
      fcl.authorizations([fcl.authz]),
      fcl.limit(9999),
    ])
    .then(fcl.decode);

  console.log(transactionId);

  await fcl.tx(transactionId).onceSealed();
  console.log("Transaction sealed");
};

const SpringModal = ({ isOpen, setIsOpen, fcl }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            <FiPlusCircle className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
            <div className="relative z-10">
              <div className="bg-white w-16 h-16 mb-2 rounded-full text-3xl text-indigo-600 grid place-items-center mx-auto">
                <FiPlusCircle />
              </div>
              <h3 className="text-3xl font-bold text-center mb-2">
                Add a Field
              </h3>
              <div className="flex justify-center items-center my-6">
                <input
                  id="add_field"
                  placeholder="Mathematics"
                  className="text-black py-1.5 px-3 outline-none rounded-sm w-3/4"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    addAField(fcl);
                  }}
                  className="bg-white hover:opacity-90 transition-opacity text-indigo-600 font-semibold w-full py-2 rounded"
                >
                  Add
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

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
