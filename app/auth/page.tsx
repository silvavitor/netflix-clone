"use client"

import React, { useCallback, useState } from "react";

import Image from "next/image";

import logo from "@/public/images/logo.png"
import Input from "@/components/input";
import axios from "axios";

export default function Auth() {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [variant, setVariant] = useState<boolean>(true);

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) => !currentVariant)
  }, []);

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        name,
        password
      })
    } catch (error) {
      console.log(error);
    }
  }, [email, name, password]);

  function handleChangeEmail(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  function handleChangeName(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  function handleChangePassword(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <Image src={logo} alt="Logo" height={48}></Image>
        </nav>

        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 p-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant ? "Sign in" : "Register"}
            </h2>
            <div className="flex flex-col gap-4">
              <Input
                id="email"
                label="Email"
                type="email"
                value={email}
                onChange={handleChangeEmail}
              />
              {!variant && (
                <Input
                  id="name"
                  label="Name"
                  type="text"
                  value={name}
                  onChange={handleChangeName}
                />
              )}
              <Input
                id="password"
                label="Password"
                type="password"
                value={password}
                onChange={handleChangePassword}
              />
            </div>
            <button onClick={register} className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
              {variant ? "Login" : "Sign up"}
            </button>
            <p className="text-neutral-500 mt-12">
              {variant ? "First time using Netflix?" : "Already have an account?"}
              <span onClick={toggleVariant} className="text-white ml-1 hover:underline cursor-pointer">
                {variant ? "Create an account" : "Login"}
              </span>

            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
