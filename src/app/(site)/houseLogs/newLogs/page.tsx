"use client"
import Image from 'next/image'
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from '../../../clientApp';
import 'firebase/compat/firestore';
import { useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import * as yup from "yup";
import { PrimaryTextInputWithLabel } from '../../../component/input/PrimaryTextInputWithLabel';
import { PrimaryButton } from '../../../component/button/PrimaryButton';
import { HiUser, HiKey, HiInformationCircle } from "react-icons/hi";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from 'react-hook-form';
import { Alert } from 'flowbite-react';
import { Button, Grid, RadioGroup, Stack, TextField } from "@mui/material";
import { useRouter } from 'next/navigation'
import { DatePicker } from "@mui/x-date-pickers"
type FormData = {
    logsTitle: string;
    logsDescription: string;
    total: number
  };
  const formSchema = yup
    .object({
      logsTitle: yup.string().required("PF Number is required"),
      logsDescription: yup.string().required("Password is required"),
      total: yup.number().required('need to add total'),
    })
    .required();

    

export default  function HouseLogs(){
  const router = useRouter()
    const [message, setMessage] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
      } = useForm<FormData>({
        resolver: yupResolver(formSchema),
      });

      const onSubmit: SubmitHandler<FormData> = async (data) => {
        console.log(data)
      }

    return (
    // <div className="p-8 space-y-2">
    //   <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
    //   <Grid container spacing={1} className="pt-10" >
    //     <Grid >
    //       <div>
    //       <PrimaryTextInputWithLabel
    //                             label="Logs Title"
    //                             name="pfNumber"
    //                             // icon={HiUser}
    //                             // placeholder="00123456"
    //                             type="text"
    //                             required
    //                             errors={errors}
    //                             register={register}
    //       ></PrimaryTextInputWithLabel>
    //               <PrimaryTextInputWithLabel
    //                         label="Description"
    //                         name="password"
    //                         // icon={HiKey}
    //                         // placeholder="Your Active Directory Credential"
    //                         type="text"
    //                         required
    //                         errors={errors}
    //                         register={register}
    //               />
    //               <PrimaryTextInputWithLabel
    //                         label="Total"
    //                         name="total"
    //                         // icon={HiKey}
    //                         // placeholder="Your Active Directory Credential"
    //                         type="number"
    //                         required
    //                         errors={errors}
    //                         register={register}
    //               />
    //                           {message && (
    //                         <Alert color="failure" icon={HiInformationCircle}>
    //                           <span>
    //                             <p>{message}</p>
    //                           </span>
    //                         </Alert>
    //                       )}
    //                 <PrimaryButton
    //                         type="submit"
    //                         className="mt-5"
    //                         isProcessing={isSubmitting}
    //                         disabled={isSubmitting}
    //                       >
    //                         Login
    //                 </PrimaryButton>
    //       </div>
    //     </Grid>
    //   </Grid>
    //   </form>    
    // </div>
    
    <div className="p-2 space-y-10">
      <Button variant="outlined" onClick={() => router.back()}>Back</Button>
    <form className="flex flex-col gap-4 " onSubmit={handleSubmit(onSubmit)} >
    <h1>New Logs</h1>

    <Stack spacing={2} sx={{ width: 300 }}>
    {/* <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={addFlexItem.map((option) => option.fullName + ' / ' + option.username + ' / ' + option.phoneNo)}
        renderInput={(params) => <TextField {...params} label="full name" />}
        onChange={
        // directToEditPage
        (event, newValue: string | null) => {
        console.log(newValue)
        setValue(newValue);
        console.log(newValue)
        // directToEditPage(newValue)
        }
    }
    /> */}
    <PrimaryTextInputWithLabel
          label="Logs title"
          name="logsTitle"
          placeholder=""
          type="text"
          required
          errors={errors}
          register={register}
        />
    <PrimaryTextInputWithLabel
          label="Logs Description"
          name="logsDescription"
          placeholder=""
          type="text"
          required
          errors={errors}
          register={register}
        />
    <PrimaryTextInputWithLabel
          label="Total"
          name="total"
          placeholder=""
          type="text"
          required
          errors={errors}
          register={register}
        />
    <PrimaryButton
          type="submit"
          className="mt-3"
          isProcessing={isSubmitting}
          disabled={isSubmitting}
        >
          Enter
    </PrimaryButton>
    </Stack>
    </form>

</div>
      )

}