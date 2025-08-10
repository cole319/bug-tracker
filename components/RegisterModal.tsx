"use client";

import React from "react";
import { useState } from "react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";

import { signInWithGoogle, registerWithEmail } from "@/firebase/auth";

export default function AuthModal() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleGoogle = async () => {
    try {
      await signInWithGoogle();
      router.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  const handleEmailRegistration = async () => {
    try {
      await registerWithEmail(email, password);
      router.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="text-text-primary dark:text-d-text-primary bg-card-bg dark:bg-d-card-bg flex flex-col justify-center items-center gap-[1rem] w-[30%] rounded-lg pt-[2rem] pb-[4rem] shadow-2xl shadow-accent-primary/20">
      <h1 className="text-accent-logo text-[3rem] font-bold">Sign up</h1>
      <input
        type="text"
        placeholder="Email Id"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border-[0.2px] border-accent-primary/60 dark:border-d-accent-primary/60 w-[60%] text-[1rem] py-[0.5rem] px-[1rem] outline-none rounded-lg"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border-[0.2px] border-accent-primary/60 dark:border-d-accent-primary/60 w-[60%] text-[1rem] py-[0.5rem] px-[1rem] outline-none rounded-lg"
      />
      <button
        type="submit"
        onClick={handleEmailRegistration}
        className="w-[60%] bg-accent-logo text-neutral-50 py-[0.4rem] px-[1rem] rounded-md font-bold text-[1.1rem] cursor-pointer hover:bg-accent-logo/90 ease-in-out duration-300"
      >
        Sign Up
      </button>
      <p>Or</p>
      <button
        onClick={handleGoogle}
        className="px-4 py-2 w-[60%] bg-text-primary dark:bg-d-text-primary text-neutral-50 dark:text-text-primary font-semibold rounded flex justify-center items-center gap-[1rem] cursor-pointer hover:bg-text-primary/90 dark:hover:bg-d-text-primary/90 ease-in-out duration-300"
      >
        <span className="text-[1.5rem]">
          <FcGoogle />
        </span>
        Sign in with Google
      </button>
      <p className="pt-[1rem]">
        Already have an account?{" "}
        <span className="text-accent-logo font-medium hover:underline">
          <Link href="login">click here to login</Link>
        </span>
      </p>
    </div>
  );
}
