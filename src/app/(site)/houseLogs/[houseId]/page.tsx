"use client";
import Image from "next/image";
import {
  useCollection,
} from "react-firebase-hooks/firestore";
import firebase from "../../../clientApp";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { ReactNode, useState } from "react";
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
import { getDocs, } from "firebase/firestore";
import { PrimaryButton } from "@/app/component/button/PrimaryButton";

export default function HouseLogs() {
  var [amount, updateAmount] = useState(0)
  var [monthVal, updateMonthVal] = useState(1);
  var [year, updateYear] = useState(2023);
  const params = useParams();
  var [house, houseDetailLoading] = useCollection(
    firebase
      .firestore()
      .collection("houses")
      .where("houseId", "==", params["houseId"]),
    {}
  );

  var [addFlexItem, setAddFlexItem] = useState([
    { filename: "", notes: "", total: "", date: "" },
  ]);
  var list = [...addFlexItem];
  const searchParams = useSearchParams();

  function updateMonth(
    event: SelectChangeEvent<number>,
    child: ReactNode
  ): void {
    const vale: string | number = event.target.value.toString();
    updateMonthVal(parseInt(vale));
  }

  function updateYearVal(event: SelectChangeEvent<number>, child: ReactNode) {
    const vale: string | number = event.target.value.toString();

    updateYear(parseInt(vale));
  }

  function tryCall(): void {
    // make api call here to list out the data based on the year and month
    listHouseLogs(params["houseId"].toString(), monthVal, year);
    console.log(addFlexItem);
    setAddFlexItem([]);
  }

  async function listHouseLogs(

    houseId: String,
    selectedMonth: number,
    selectedYear: number
  ) {
    amount = 0
    let start = new Date(selectedYear + "-" + selectedMonth + "-01");
    var month = selectedMonth;
    var year = selectedYear;

    if (selectedMonth == 12) {
      month = 1;

      year = Number(selectedYear) + 1;
    } else {
      month = Number(selectedMonth) + 1;
      year = selectedYear;
    }
    let end = new Date(year + "-" + month + "-01");

    const h3 = firebase.firestore().collection("houseLogs");
    const b = h3
      .where("houseId", "==", houseId)
      .where("date", ">", start)
      .where("date", "<", end);
    house = await getDocs(b);
    addFlexItem = [];
    house.docs.map((docs, i) => {
      amount += parseInt(docs.data()["total"])
      addFlexItem[i] = {
        filename: docs.data()["filename"],
        notes: docs.data()["notes"],
        total: docs.data()["total"],
        date: docs.data()["date"].toDate().toDateString()
      };
      console.log(docs.data());
      setAddFlexItem(addFlexItem);
    });
    console.log(amount)
    updateAmount(amount)
  }

  return (
    <div className="p-5 h-screen bg-gray-100">
      <h2>House Details </h2>
      <div className="p-1">
        <Grid container spacing={1} className="pt-10">
          <Grid xs={5}>
            <div>
              {" "}
              <img
                alt="Placeholder"
                className="block h-auto w-full"
                src={house?.docs[0].data()["house_image"]}
              />{" "}
            </div>
          </Grid>
          <Grid xs={5}>
            <div>
              <Box sx={{ p: 1 }}>
                Name : {house?.docs[0].data()["houseName"]}
              </Box>
              <Box sx={{ p: 1 }}>
                Installment : RM {house?.docs[0].data()["installement"]}
              </Box>
              <Box sx={{ p: 1 }}>
                Maintenance : RM {house?.docs[0].data()["maintenance"]}
              </Box>
              <Box sx={{ p: 1 }}>
                Sinking fund : RM : {house?.docs[0].data()["sinkingFund"]}
              </Box>
              <Box sx={{ p: 1 }}>Wifi : RM {house?.docs[0].data()["wifi"]}</Box>
              <Box sx={{ p: 1 }}>
                {house?.docs[0].data()["text1key"]} :{" "}
                {house?.docs[0].data()["text1Value"]}
              </Box>
              <Box sx={{ p: 1 }}>
              <Button variant="outlined" >
                <a href="/houseLogs/newLogs/">New Logs</a>
              </Button>
              </Box>

            </div>
          </Grid>
        </Grid>
      </div>

      <div className="p-1">
        <Grid container spacing={1} className="pt-10">
          <Grid xs={3}>
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
          </Grid>
          <Grid xs={3}>
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
          </Grid>
          <Grid xs={3}>
            <Button style={{margin: '10px'}} variant="outlined" className="mt-3" onClick={tryCall}>Query</Button>
          </Grid>
          <Grid xs={3}>
            <h2>Amount: RM {amount}</h2>
          </Grid>
        </Grid>
      </div>

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
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {addFlexItem.map((row, i) => {
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
                      Completed
                    </span>
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {row["date"]}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {row["total"]}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
