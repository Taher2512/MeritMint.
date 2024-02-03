"use client";

// import client from "@/client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

// const columns = [
//   {
//     name: "SL No.",
//     selector: (row) => row.id,
//     center: true,
//     style: {
//       fontSize: "15px",
//     },
//   },
//   {
//     name: "Name",
//     selector: (row) => row.names,
//     center: true,
//     sortable: true,
//     style: {
//       fontSize: "15px",
//     },
//   },
//   {
//     name: "Email",
//     selector: (row) => row.emails,
//     center: true,
//     style: {
//       fontSize: "15px",
//     },
//   },
//   {
//     name: "Points",
//     selector: (row) => row.points,
//     center: true,
//     style: {
//       fontSize: "15px",
//     },
//   },
// ];

// Update the columns configuration
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
    selector: (row) => row.name, // Change to 'point' to match the transformed data
    center: true,
    style: {
      fontSize: "15px",
    },
  },
  {
    name: "Email",
    selector: (row) => row.email, // Change to 'point' to match the transformed data
    center: true,
    style: {
      fontSize: "15px",
    },
  },
  {
    name: "Points",
    selector: (row) => row.point, // Change to 'point' to match the transformed data
    center: true,
    style: {
      fontSize: "15px",
    },
  },
];

const customStyles = {
  headCells: {
    style: {
      fontSize: "16px",
      fontWeight: "bold",
    },
  },
  rows: {
    style: {
      minHeight: "72px", // override the row height
    },
  },
};

const data = {
  Mathematics: {
    id: 1,
    names: ["Taher0", "Taher1", "Taher2", "Taher3", "Taher4"],
    emails: [
      "123@gmail.com",
      "456@gmail.com",
      "789@gmail.com",
      "abc@gmail.com",
      "def@gmail.com",
    ],
    points: [20, 30, 80, 60, 40],
  },
  Physics: {
    id: 2,
    names: ["Ali0", "Ali1", "Ali2", "Ali3", "Ali4"],
    emails: [
      "ali0@gmail.com",
      "ali1@gmail.com",
      "ali2@gmail.com",
      "ali3@gmail.com",
      "ali4@gmail.com",
    ],
    points: [55, 65, 75, 85, 95],
  },
  Computer: {
    id: 3,
    names: ["Sara0", "Sara1", "Sara2", "Sara3", "Sara4"],
    emails: [
      "sara0@gmail.com",
      "sara1@gmail.com",
      "sara2@gmail.com",
      "sara3@gmail.com",
      "sara4@gmail.com",
    ],
    points: [88, 78, 68, 58, 98],
  },
  English: {
    id: 4,
    names: ["John0", "John1", "John2", "John3", "John4"],
    emails: [
      "john0@gmail.com",
      "john1@gmail.com",
      "john2@gmail.com",
      "john3@gmail.com",
      "john4@gmail.com",
    ],
    points: [45, 55, 65, 75, 85],
  },
};

function PointsDatatable({ field, setField }) {
  const [loader, setLoader] = useState(true);
  const [fieldData, setFieldData] = useState([]);
  const router = useRouter();

  // async function getProducts() {
  //   let { data: res, status } = await client.get("product/allproducts");
  //   setProducts(res.data);
  // }

  useEffect(() => {
    setLoader(false);
    // getProducts();
  }, []);

  useEffect(() => {
    if (data[field]) {
      // Transform the data into an array of objects
      const transformedData = data[field].names.map((name, index) => ({
        id: index + 1, // Assuming you want a serial number starting from 1
        name: name,
        email: data[field].emails[index],
        point: data[field].points[index],
      }));

      setFieldData(transformedData);
    }
  }, [field]);

  // Render
  if (loader) {
    return <div>Loading</div>;
  }

  return (
    <div className="flex justify-center">
      <div className="my-16 w-3/4 border-gray-500 border-2">
        <DataTable
          title="Student Points"
          columns={columns}
          data={fieldData}
          pagination
          striped
          highlightOnHover
          pointerOnHover
          responsive
          customStyles={customStyles}
          // onRowClicked={(row) => {
          //   router.push(`/admin/dashboard/${row._id}`);
          // }}
        />
      </div>
    </div>
  );
}

export default PointsDatatable;
