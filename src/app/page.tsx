// "use client"
// import Image from 'next/image'


// import { Alert } from 'flowbite-react';
// import { useCollection } from "react-firebase-hooks/firestore";
// import { useAuthState } from "react-firebase-hooks/auth";
// import firebase from './clientApp';
// import 'firebase/compat/firestore';
// import { useState } from 'react';
// import * as yup from "yup";
// import { SubmitHandler, useForm } from 'react-hook-form';
// import { yupResolver } from "@hookform/resolvers/yup";
// import { PrimaryTextInputWithLabel } from './component/input/PrimaryTextInputWithLabel';
// import { HiUser, HiKey, HiInformationCircle } from "react-icons/hi";
// import { PrimaryButton } from './component/button/PrimaryButton';
// import { useRouter } from 'next/navigation';
// import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
// import { initializeApp, getApps } from "firebase/app";

// // // Initialize Firebase
// const auth = getAuth(firebase.app());


// type FormData = {
//   pfNumber: string;
//   password: string;
//   isLocalAccount: boolean;
// };
// const formSchema = yup
//   .object({
//     pfNumber: yup.string().required("PF Number is required"),
//     password: yup.string().required("Password is required"),
//     isLocalAccount: yup.boolean().default(false),
//   })
//   .required();


// export default function Home() {
//   const router = useRouter()
// const {
//   register,
//   handleSubmit,
//   formState: { errors, isSubmitting },
// } = useForm<FormData>({
//   resolver: yupResolver(formSchema),
// });

// const [message, setMessage] = useState("");

// const onSubmit: SubmitHandler<FormData> = async (data) => {
//   console.log(data)
//   await signInWithEmailAndPassword(auth, data.pfNumber, data.password);
//   // this need to try call authentication from firebase
//   // router.push('/houseList')


//   let result = null,
//         error = null;
//     try {
//         result = await signInWithEmailAndPassword(auth, data.pfNumber, data.password);
//         if (result.user){
//           router.push('/houseList')
//         }
//     } catch (e) {
//       console.log(e)
//         error = e;
//     }
//     console.log(result?.user) 
    

// }

// return (
//   <div className="p-5 h-screen bg-gray-100">
//     <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto w-1/3">
//     <div className="w-full bg-white rounded-lg shadow mt-0"> 
//     <div className="p-8 space-y-10">
//     <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900">
//             Sign in House Car Maintenance App
//     </h1>

//     <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
//     <PrimaryTextInputWithLabel
//                   label="PF Number"
//                   name="pfNumber"
//                   icon={HiUser}
//                   placeholder="00123456"
//                   type="text"
//                   required
//                   errors={errors}
//                   register={register}
//     ></PrimaryTextInputWithLabel>
//     <PrimaryTextInputWithLabel
//               label="Password"
//               name="password"
//               icon={HiKey}
//               placeholder="Your Active Directory Credential"
//               type="password"
//               required
//               errors={errors}
//               register={register}
//     />
//                 {message && (
//               <Alert color="failure" icon={HiInformationCircle}>
//                 <span>
//                   <p>{message}</p>
//                 </span>
//               </Alert>
//             )}
//             <PrimaryButton
//               type="submit"
//               className="mt-3"
//               isProcessing={isSubmitting}
//               disabled={isSubmitting}
//             >
//               Login
//             </PrimaryButton>
//     </form>
    
//     </div>
//     </div>
//     </div>
//   </div>

// )
// }
