"use client"
import Image from 'next/image'
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from '../../../clientApp';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { Box, Button, Grid } from '@mui/material';

export default  function HouseLogs(){

  const params = useParams()
  console.log(params)
  const [house, houseDetailLoading] = useCollection(firebase.firestore().collection("houses").where('houseId', '==', params['houseId']),{})
  const [houses, housesLoading, housesError] = useCollection(firebase.firestore().collection("houseLogs").where('houseId', '==', params['houseId']),{});
  const [addFlexItem, setAddFlexItem] = useState([{ filename: '', notes: '', total: '', date: '' }])
  const list = [...addFlexItem]
  const searchParams = useSearchParams()

firebase.auth().signInWithEmailAndPassword('asd@email.com', 'test123').then((value) => {
  console.log('xxx')
  console.log(value.user!)
  if (value.user){
    console.log('user exist!')
  }
})

if (!housesLoading && houses){
  houses.docs.map((doc, i) => {
    // console.log(doc.data())
    list[i] = {filename: doc.data()['filename'] , notes: doc.data()['notes'] , total: doc.data()['total'], date: (new Date(Number(doc.data()['date']))).toDateString() }
    // array.push(doc.data())
  })

  if (!houseDetailLoading && house){
    house.docs.map((doc, i) => {
      console.log(doc.data())
    })
  }

  console.log(house?.docs[0].data())
  
}
    return(
        
<div className="p-5 h-screen bg-gray-100">
<h2>House Details </h2>
<div className="p-1" >
<Grid container spacing={1} className="pt-10" >
      <Grid xs={5}>
      <div> <img alt="Placeholder" className="block h-auto w-full" src={house?.docs[0].data()['house_image']}/> </div>
      </Grid>
      <Grid xs={5}>
      <div>
      <Box sx={{ p: 1 }}>Name : {house?.docs[0].data()['houseName']}</Box>
      <Box sx={{ p: 1 }}>Installment : RM {house?.docs[0].data()['installement']}</Box>
      <Box sx={{ p: 1 }}>Maintenance : RM {house?.docs[0].data()['maintenance']}</Box>
      <Box sx={{ p: 1 }}>Sinking fund : RM : {house?.docs[0].data()['sinkingFund']}</Box>
      <Box sx={{ p: 1 }}>Wifi : RM {house?.docs[0].data()['wifi']}</Box>
      <Box sx={{ p: 1 }}>{house?.docs[0].data()['text1key']} : {house?.docs[0].data()['text1Value']}</Box>
      </div>
      </Grid>
</Grid>
</div>


<div className="overflow-auto rounded-lg shadow hidden md:block">
<div>
  <h2 style={{ 'float': 'left', }}>House Logs </h2>
  <Button variant="outlined" style={{ 'float': 'right' }}><a href="/houseLogs/newLogs/">New Logs</a></Button>
</div>
      <table className="w-full">
        <thead className="bg-gray-50 border-b-2 border-gray-200">
        <tr>
          <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">No.</th>
          <th className="p-3 text-sm font-semibold tracking-wide text-left">Details</th>
          <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">Status</th>
          <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">Date</th>
          <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">Total</th>
        </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
        {list.map((row, i) => {
          return (
            <tr className="bg-white">
            <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
              <a href="#" className="font-bold text-blue-500 hover:underline">{i + 1}</a>
            </td>
            <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
              {row['notes']}
            </td>
            <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
            <span
              className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">Completed</span>
            </td>
            <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{row['date']}</td>
            <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{row['total']}</td>
          </tr>
          )
        })}
        </tbody>
      </table>
    </div>
</div>
    )
}