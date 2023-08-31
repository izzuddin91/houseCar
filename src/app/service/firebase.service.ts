// file to create all the basic firebase function
// create read update delete 
"use client";
import Image from "next/image";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../clientApp";
import "firebase/compat/firestore";
import { useState } from "react";
import { getDocs } from "firebase/firestore";


export const getHouseList = async (): Promise<any> => {
    var [houseList] = useState([
        { houseName: "", house_image: "", houseId: "", location: "" },
    ]);

    var [houses, houseDetailLoading] = useCollection(
        firebase
          .firestore()
          .collection("houses")
          ,
        {}
      );

    const h3 = firebase.firestore().collection("houses");
    // const b = h3
    //   .where("houseId", "==", houseId)
    //   .where("date", ">", start)
    //   .where("date", "<", end);
    houses = await getDocs(h3);

    // return houses.docs
    var list = [...houseList]

    // if (!housesLoading && houses) {
        houses.docs.map((doc, i) => {
            list[i] = {
                houseName: doc.data()["houseName"],
                house_image: doc.data()["house_image"],
                houseId: doc.data()["houseId"],
                location: doc.data()["location"]
            };
        });
        return list
    // }
    
}