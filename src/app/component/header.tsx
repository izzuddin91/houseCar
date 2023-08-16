"use client";

import React from "react";
import { Dropdown, Navbar, Avatar } from "flowbite-react";
import { signOut } from "firebase/auth";
import { clearAuth } from "../util/auth.util";
// import { DateTime } from "luxon";
import { useRouter } from "next/navigation"

function signOutAndRedirect (){
  const router = useRouter();
  console.log('logout')
  clearAuth()
  router.push("/login");
}

type HeaderProps = {
  // pfNumber: string;
  name: string;
  roleCode: string;
//   lastLogin: Date;
//   onSignOut: () => void;
};

export const Header = ({
  // pfNumber,
  name,
  roleCode,
//   lastLogin,
//   onSignOut,
}: HeaderProps) => {
  function getNameInitials(name: string): string {
    // return name.match(/\b\w/g)?.join("") ?? "";
    return 'name';
  }

  return (
    <Navbar
      fluid
      theme={{
        base: "bg-yellow-300 px-2 py-2.5 border-b shadow-sm border-gray-200",
      }}
    >
      <Navbar.Brand
        href="https://flowbite-react.com"
        className="flex flex-wrap gap-2"
      >
        <Avatar img="/backoffice/icon-192x192.png" />
        <span className="self-center whitespace-nowrap text-xl font-semibold text-gray-800 g">
          Izzuddin Properties
        </span>
      </Navbar.Brand>

      <div className="flex md:order-2">
        <Dropdown
          inline
          label={
            <Avatar
              placeholderInitials={getNameInitials(name)}
              bordered
              color="gray"
            >
              <div className="space-y-1 font-medium text-gray-800 text-left">
                <div>
                  {name} 
                </div>
                <div className="text-sm text-gray-500">
                  Last login at{" "}
                  <strong>
                    {/* {DateTime.fromJSDate(lastLogin).toFormat(
                      "ccc, dd LLL yyyy t a"
                    )} */}
                  </strong>
                </div>
              </div>
            </Avatar>
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">System Admin</span>
            <span className="block truncate text-sm font-medium">
              systemadmin@etiqa.com.my
            </span>
          </Dropdown.Header>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={signOutAndRedirect} >Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
    </Navbar>
  );
};
