"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCollection } from "react-firebase-hooks/firestore";
import firebase from "../../../clientApp";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { ReactNode, useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { getDocs } from "firebase/firestore";
import SearchIcon from "@mui/icons-material/Search";
import BrokenImageIcon from "@mui/icons-material/BrokenImage";
import InputIcon from "@mui/icons-material/Input";
import { PrimaryButton } from "@/app/component/button/PrimaryButton";
import { confirmAlert } from "@/app/service/alert.service";
import {
  deleteHouseLog,
  getHouseDetails,
  getHouseLogsOnDateRange,
} from "@/app/service/firebase.service";
import moment from "moment";

export default function HouseLogs() {
  const router = useRouter();

  function createNewLogs() {
    router.push("/newLogs/" + params["houseId"]);
  }
  var [houseDetail, updatehouseDetail] = useState({});
  var [houseLogs, setHouseLogs]: any = useState([{}]);
  var [amount, updateAmount] = useState(0);
  var [monthVal, updateMonthVal] = useState(1);
  var [year, updateYear] = useState(2023);
  const params = useParams();

  useEffect(() => {
    // get the year, month and house id
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    getHouseLogsOnDateRange(params["houseId"].toString(), month, year).then(
      (val: any) => {
        updateMonthVal(month);
        updateYear(year);

        setHouseLogs(val);
        updateTotalAmount(houseLogs);
      }
    );
    getHouseDetails(params["houseId"].toString()).then((val) => {
      updatehouseDetail(val);
    });
  }, []);

  function updateMonth(event: SelectChangeEvent<number>): void {
    const vale: string | number = event.target.value.toString();
    updateMonthVal(parseInt(vale));
  }

  function updateYearVal(event: SelectChangeEvent<number>) {
    const vale: string | number = event.target.value.toString();
    updateYear(parseInt(vale));
  }

  function getHouseLogs(): void {
    getHouseLogsOnDateRange(params["houseId"].toString(), monthVal, year).then(
      (val: any) => {
        updateMonthVal(monthVal);
        updateYear(year);
        setHouseLogs(val);
        updateTotalAmount(houseLogs);
      }
    );
  }

  function updateTotalAmount(houseLogs: any) {
    amount = houseLogs.reduce((a: any, b: any) => +a + +b.total, 0);
    updateAmount(amount);
  }

  function deleteItem(event: any) {
    console.log(event);
    // delete this and show alert
    confirmAlert("delete", "confirm to delete this record?", () => {
      deleteHouseLog(event)
        .then(() => {
          window.location.reload();
        })
        .catch(function (error: any) {
          console.error("Error removing document: ", error);
        });
    });
  }

  return (
    <div className="p-5 h-screen bg-gray-100">
      <Button variant="outlined" onClick={() => router.back()}>
        Back
      </Button>
      <h2>House Details </h2>
      <div className="grid grid-cols-2 gap-4 p-4">
        <div className="col-span">
          <div>
            {" "}
            <img
              alt="Placeholder"
              className="block h-auto w-full"
              src={(houseDetail as any)["house_image"]}
            />{" "}
          </div>
        </div>
        <div className="col-span">
          <div>
            <Box sx={{ p: 1 }}>Name : {(houseDetail as any)["houseName"]}</Box>
            <Box sx={{ p: 1 }}>
              Installment : RM {(houseDetail as any)["installement"]}
            </Box>
            <Box sx={{ p: 1 }}>
              Maintenance : RM {(houseDetail as any)["maintenance"]}
            </Box>
            <Box sx={{ p: 1 }}>
              Sinking fund : RM : {(houseDetail as any)["sinkingFund"]}
            </Box>
            <Box sx={{ p: 1 }}>Wifi : RM {(houseDetail as any)["wifi"]}</Box>
            <Box sx={{ p: 1 }}>
              {(houseDetail as any)["text1key"]} :{" "}
              {(houseDetail as any)["text1Value"]}
            </Box>
            <Box sx={{ p: 1 }}>
              <Button
                variant="outlined"
                onClick={createNewLogs}
                endIcon={<InputIcon />}
              >
                New Logs
              </Button>
            </Box>
            <Box sx={{ p: 1 }}>
              <Button
                color="error"
                variant="outlined"
                onClick={createNewLogs}
                endIcon={<BrokenImageIcon />}
              >
                Damages Logs
              </Button>
            </Box>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 p-4">
        <div className="col-span">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Month</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={monthVal}
              label="Month"
              onChange={updateMonth}
            >
              <MenuItem value={1}>January</MenuItem>
              <MenuItem value={2}>February</MenuItem>
              <MenuItem value={3}>March</MenuItem>
              <MenuItem value={4}>April</MenuItem>
              <MenuItem value={5}>May</MenuItem>
              <MenuItem value={6}>June</MenuItem>
              <MenuItem value={7}>July</MenuItem>
              <MenuItem value={8}>August</MenuItem>
              <MenuItem value={9}>September</MenuItem>
              <MenuItem value={10}>October</MenuItem>
              <MenuItem value={11}>November</MenuItem>
              <MenuItem value={12}>December</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="col-span">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Year</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={year}
              label="Year"
              onChange={updateYearVal}
            >
              <MenuItem value={2019}>2019</MenuItem>
              <MenuItem value={2020}>2020</MenuItem>
              <MenuItem value={2021}>2021</MenuItem>
              <MenuItem value={2022}>2022</MenuItem>
              <MenuItem value={2023}>2023</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="col-span">
          <Button
            style={{ margin: "10px" }}
            variant="outlined"
            className="mt-3"
            onClick={getHouseLogs}
            endIcon={<SearchIcon />}
          >
            Query
          </Button>
        </div>
        <div className="col-span">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Total:
          </label>
          <div className="relative mt-3 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-500 sm:text-sm">RM {amount} </span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols gap-4 p-4">
        <div className="overflow-auto rounded-lg shadow hidden md:block">
          <div>
            <h1 style={{ float: "left" }}>House Logs </h1>
          </div>
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">
                  No.
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  Details
                </th>
                <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                  Status
                </th>
                <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                  Date
                </th>
                <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                  Total
                </th>
                <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {houseLogs.map((row: any, i: number) => {
                return (
                  <tr className="bg-white">
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <a
                        href="#"
                        className="font-bold text-blue-500 hover:underline"
                      >
                        {i + 1}
                      </a>
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {row["notes"]}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">
                        <a href={row["filename"]}>Image</a>
                      </span>
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {row["date"]
                        ? moment(row["date"].toDate()).format("DD-MM-YYYY")
                        : ""}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {row["total"]}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <button onClick={() => deleteItem(row["id"])}>
                        {row["id"]}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
