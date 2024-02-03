"use client";

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  FiEdit,
  FiChevronDown,
  FiTrash,
  FiShare,
  FiPlusCircle,
  FiAlertCircle,
} from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import { updatePoints } from "../cadence/transactions/updatePoints";
import { getPoints } from "../cadence/scripts/getPoints";
import { getFields } from "../cadence/scripts/getFields";

const initialFieldValues = { id: uuidv4(), name: "", email: "", points: "" };

// const data = {
//   Mathematics: {
//     id: 1,
//     names: ["Taher0", "Taher1", "Taher2", "Taher3", "Taher4"],
//     emails: [
//       "123@gmail.com",
//       "456@gmail.com",
//       "789@gmail.com",
//       "abc@gmail.com",
//       "def@gmail.com",
//     ],
//     points: [20, 30, 80, 60, 40],
//   },
//   Physics: {
//     id: 2,
//     names: ["Ali0", "Ali1", "Ali2", "Ali3", "Ali4"],
//     emails: [
//       "ali0@gmail.com",
//       "ali1@gmail.com",
//       "ali2@gmail.com",
//       "ali3@gmail.com",
//       "ali4@gmail.com",
//     ],
//     points: [55, 65, 75, 85, 95],
//   },
//   Computer: {
//     id: 3,
//     names: ["Sara0", "Sara1", "Sara2", "Sara3", "Sara4"],
//     emails: [
//       "sara0@gmail.com",
//       "sara1@gmail.com",
//       "sara2@gmail.com",
//       "sara3@gmail.com",
//       "sara4@gmail.com",
//     ],
//    points: [88, 78, 68, 58, 98],
//   },
//   English: {
//     id: 4,
//     names: ["John0", "John1", "John2", "John3", "John4"],
//     emails: [
//       "john0@gmail.com",
//       "john1@gmail.com",
//       "john2@gmail.com",
//       "john3@gmail.com",
//       "john4@gmail.com",
//     ],
//     points: [45, 55, 65, 75, 85],
//   },
// };

const AddPointsForm = ({ fcl }) => {
  const [field, setField] = useState("Select Field");
  const [allFields, setAllFields] = useState([]);
  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);
  const [formFields, setFormFields] = useState([]);

  const handleChange = (id, event) => {
    const { name, value } = event.target;
    const updatedFormFields = formFields.map((field) => {
      if (field.id === id) {
        return { ...field, [name]: value };
      }
      return field;
    });
    setFormFields(updatedFormFields);
  };

  const addNewStudentField = () => {
    setFormFields([
      ...formFields,
      {
        id: `new-${formFields.length}`,
        name: "",
        email: "",
        points: "",
        addPoints: "",
      },
    ]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Assuming all entries in formFields are for the currently selected field
    const transformedData = {
      [field]: {
        id: Date.now(), // Example ID, assuming each submission is unique
        names: [],
        emails: [],
        points: [],
      },
    };

    formFields.forEach((field) => {
      transformedData[field].names.push(field.name);
      transformedData[field].emails.push(field.email);
      // Assuming you want to add the new points to the original points
      const addedPoints = field.addPoints ? Number(field.addPoints) : 0;
      transformedData[field].points.push(addedPoints);
    });

    console.log("Transformed Form Data:", transformedData);

    // Here, you'd handle the form submission, likely sending the transformedData to a backend server
    const transactionId = await fcl
      .send([
        fcl.transaction(updatePoints),
        fcl.args([
          fcl.arg(field, fcl.t.String), // For a single string
          fcl.arg(transformedData[field].emails, fcl.t.Array(fcl.t.String)), // For an array of strings
          fcl.arg(transformedData[field].points, fcl.t.Array(fcl.t.UInt64)), // For an array of integers
        ]),
        fcl.payer(fcl.authz),
        fcl.proposer(fcl.authz),
        fcl.authorizations([fcl.authz]),
        fcl.limit(9999),
      ])
      .then(fcl.decode);

    console.log("TR ID:", transactionId);

    await fcl.tx(transactionId).onceSealed();
    console.log("Transaction sealed");
  };

  // Immediately-invoked function expression (IIFE) to handle async operations
  const getFieldData = async (tempField) => {
    try {
      if (tempField === "Select Field") return;
      const getAllFieldPoints = async () => {
        const allFieldPoints = await fcl
          .send([
            fcl.script(getPoints),
            fcl.args([fcl.arg(tempField, fcl.t.String)]),
          ])
          .then(fcl.decode);

        return allFieldPoints;
      };

      const transformBackendData = async (fieldName, backendData) => {
        // Initialize the structure with the field name as the key
        const transformedData = {
          [fieldName]: {
            id: Date.now(), // Placeholder ID
            names: [], // Leave the names array blank as per requirement
            emails: [],
            points: [],
          },
        };

        // Iterate over the backend data object to fill the emails and points arrays
        Object.entries(backendData).forEach(([email, point]) => {
          transformedData[fieldName].emails.push(email);
          transformedData[fieldName].points.push(parseInt(point, 10)); // Ensure points are stored as numbers
        });

        return transformedData;
      };

      // Fetch and transform the data
      const allFieldPoints = await getAllFieldPoints();
      const transformedData = await transformBackendData(
        tempField,
        allFieldPoints
      );
      console.log("Transformed Data:", transformedData);
      setData(transformedData);
    } catch (error) {
      console.error("Error fetching or transforming data:", error);
    }
  };

  const handleFieldSelect = async (fieldKey) => {
    console.log("Data accessed in handleFieldSelect:", data);
    setField(fieldKey);
    setOpen(false);
    // Populate form fields based on selected field
    const fieldData = data[fieldKey];
    const newFormFields = fieldData.emails.map((email, index) => ({
      id: `${fieldKey}-${index}`, // Unique ID for each field
      name: fieldData.names[index],
      email: email,
      points: fieldData.points[index],
      addPoints: "",
    }));
    setFormFields(newFormFields);
  };

  useEffect(() => {
    // This effect listens for changes in `data` and `field`
    // and calls `handleFieldSelect` if the selected field's data is available
    if (field !== "Select Field" && data[field]) {
      handleFieldSelect(field);
    }
  }, [data, field]); // Reacts to changes in `data` or `field`

  useEffect(() => {
    // Immediately-invoked function expression (IIFE) to use async-await
    (async () => {
      try {
        const fetchedFields = await fcl
          .send([fcl.script(getFields), fcl.args([])])
          .then(fcl.decode);

        setAllFields(fetchedFields);
      } catch (error) {
        console.error("Failed to fetch fields:", error);
      }
    })();
  }, []);

  return (
    <div>
      <motion.div animate={open ? "open" : "closed"} className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 px-3 py-2 rounded-md text-indigo-50 bg-indigo-500 hover:bg-indigo-600 transition-colors"
        >
          <span className="font-medium text-sm">{field}</span>
          <FiChevronDown />
        </button>

        {open && (
          <motion.ul
            initial="closed"
            animate="open"
            exit="closed"
            variants={{
              open: { opacity: 1, scaleY: 1 },
              closed: { opacity: 0, scaleY: 0 },
            }}
            className="absolute top-[120%] left-[50%] w-48 bg-white shadow-xl rounded-lg z-10"
          >
            {allFields.map((field) => (
              <motion.li
                key={field}
                onClick={async () => {
                  setField(field);
                  await getFieldData(field);
                }}
                className="p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-indigo-100 text-slate-700 hover:text-indigo-500 transition-colors cursor-pointer"
              >
                {field}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        {formFields.map((field, index) => (
          <div key={field.id} className="flex flex-col space-y-2">
            <input
              type="text"
              name="name"
              value={field.name}
              onChange={(e) => handleChange(field.id, e)}
              placeholder="Name"
              className="border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-gray-700 rounded-md shadow-sm"
            />
            <input
              type="email"
              name="email"
              value={field.email}
              onChange={(e) => handleChange(field.id, e)}
              placeholder="Email"
              className="border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-gray-700 rounded-md shadow-sm"
            />
            <input
              type="number"
              name="points"
              value={field.points}
              readOnly // Assuming original points should not be editable
              className="border-gray-300 text-gray-700 rounded-md shadow-sm cursor-not-allowed"
            />
            <input
              type="number"
              name="addPoints"
              value={field.addPoints}
              onChange={(e) => handleChange(field.id, e)}
              placeholder="Add Points"
              className="border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-gray-700 rounded-md shadow-sm"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addNewStudentField}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Add New Student
        </button>
        <div className="flex justify-end items-center mt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Submit Form
          </button>
        </div>
      </form>
    </div>
  );
};

// Variants for the dropdown animation
const wrapperVariants = {
  open: {
    opacity: 1,
    scaleY: 1,
    transition: {
      staggerChildren: 0.1,
      duration: 0.2,
    },
  },
  closed: {
    opacity: 0,
    scaleY: 0,
    transition: {
      staggerChildren: 0.1,
      duration: 0.2,
    },
  },
};

const itemVariants = {
  open: { opacity: 1, y: 0 },
  closed: { opacity: 0, y: -20 },
};

export default AddPointsForm;
