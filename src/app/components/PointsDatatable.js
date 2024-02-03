import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useRouter } from "next/navigation";

const columns = [
  {
    name: "SL No.",
    selector: (row) => row.id,
    center: true,
    style: {
      fontSize: "15px",
    },
  },
  {
    name: "Name",
    selector: (row) => row.name,
    center: true,
    style: {
      fontSize: "15px",
    },
  },
  {
    name: "Email",
    selector: (row) => row.email,
    center: true,
    style: {
      fontSize: "15px",
    },
  },
  {
    name: "Points",
    selector: (row) => row.point,
    center: true,
    style: {
      fontSize: "15px",
    },
  },
];

const topThreeColumns = [
  {
    name: "SL No.",
    // Use a custom cell render function to display the row index
    cell: (row, index) => index + 1, // Adding 1 because index is 0-based
    center: true,
    style: {
      fontSize: "15px",
    },
  },
  {
    name: "Name",
    selector: (row) => row.name,
    center: true,
    style: {
      fontSize: "15px",
    },
  },
  {
    name: "Email",
    selector: (row) => row.email,
    center: true,
    style: {
      fontSize: "15px",
    },
  },
  {
    name: "Points",
    selector: (row) => row.averagePoints,
    center: true,
    style: {
      fontSize: "15px",
    },
  },
  {
    name: "Actions",
    button: true,
    ignoreRowClick: true,
    allowOverflow: true,
    cell: (row) => (
      <button
        style={{ fontSize: "15px", padding: "5px 10px", cursor: "pointer" }}
        onClick={() => rewardStudent(row.email)}
      >
        Reward
      </button>
    ),
  },
];

const customStyles = {
  table: {
    style: {
      color: "white",
      backgroundColor: "#A262DE",
    },
  },
  headCells: {
    style: {
      FontFace: "Gilroy",
      fontSize: "16px",
      fontWeight: "bold",
      backgroundColor: "#F3F4F6",
    },
  },
  rows: {
    style: {
      color: "white",
      backgroundColor: "#A262DE",
      minHeight: "72px",
    },
  },
};

function PointsDatatable({ field, setField, data, setData, topThree }) {
  const [loader, setLoader] = useState(true);
  const [fieldData, setFieldData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    setLoader(false);
  }, []);

  useEffect(() => {
    // Checking if the field exists in the data and it has names, emails, and points arrays
    if (data[field] && data[field].emails && data[field].points) {
      const transformedData = data[field].emails.map((email, index) => ({
        id: index + 1,
        name: data[field].names[index],
        email: email,
        point: data[field].points[index],
      }));

      setFieldData(transformedData);
    }
  }, [field, data]);

  if (loader) {
    return <div>Loading</div>;
  }

  return (
    <div className="flex justify-center">
      <div className="my-16 w-3/4 border-gray-500 border-2">
        <DataTable
          title={topThree.length !== 0 ? "Top Three" : "Student Points"}
          columns={topThree.length !== 0 ? topThreeColumns : columns}
          data={topThree.length !== 0 ? topThree : fieldData}
          pagination
          striped
          
          pointerOnHover
          responsive
          customStyles={customStyles}
        />
      </div>
    </div>
  );
}

export default PointsDatatable;
