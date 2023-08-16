"use client";
import Image from "next/image";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../../clientApp";
import "firebase/compat/firestore";
import { useState } from "react";
export default function Home() {
  const [houses, housesLoading, housesError] = useCollection(
    firebase.firestore().collection("houses"),
    {}
  );
  // const [addFlexItem, setAddFlexItem] = useState([{id: '', fullName: '', username: '', phoneNo: '' }])
  const [addFlexItem, setAddFlexItem] = useState([
    { houseName: "", house_image: "", houseId: "" },
  ]);
  console.log("test");
  houses?.docs.map((doc) => console.log(doc.data()));
  var array = [{}];
  const list = [...addFlexItem];
  if (!housesLoading && houses) {
    houses.docs.map((doc, i) => {
      // console.log(doc.data()['houseName'])
      list[i] = {
        houseName: doc.data()["houseName"],
        house_image: doc.data()["house_image"],
        houseId: doc.data()["houseId"],
      };
      // array.push(doc.data())
    });
  }
  //  setAddFlexItem(list)
  console.log(list);
  return (
    <div className="p-8 space-y-5">
      <h1 className="text-xl mb-2">Your properties</h1>
      <div className="grid grid-cols-3 gap-3 ">
        {list.map((row) => {
          console.log(row["houseId"]);
          var link = "/houseLogs/" + row["houseId"];
          return (
            <article className="overflow-hidden rounded-lg shadow-lg">
              <a href={link}>
                <img
                  alt="Placeholder"
                  className="block h-auto w-full"
                  src={row["house_image"]}
                />
              </a>

              <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                <h1 className="text-lg">
                  <a
                    className="no-underline hover:underline text-black"
                    href="#"
                  >
                    {row.houseName}
                  </a>
                </h1>
                <p className="text-grey-darker text-sm">11/1/19</p>
              </header>

              <footer className="flex items-center justify-between leading-none p-2 md:p-4">
                <a
                  className="flex items-center no-underline hover:underline text-black"
                  href="#"
                >
                  <img
                    alt="Placeholder"
                    className="block rounded-full"
                    src="https://picsum.photos/32/32/?random"
                  />
                  <p className="ml-2 text-sm">House Logs</p>
                </a>
                <a
                  className="no-underline text-grey-darker hover:text-red-dark"
                  href="#"
                >
                  <span className="hidden">Like</span>
                  <i className="fa fa-heart"></i>
                </a>
              </footer>
            </article>
          );
        })}
      </div>
    </div>
  );
}
