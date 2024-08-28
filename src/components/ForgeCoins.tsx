//import { Progress } from '@radix-ui/react-progress'
"use client";
import { useSession } from "next-auth/react";
import React from "react";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { Zap } from "lucide-react";
import axios from "axios";

type Props = {}

const ForgeCoins = (props: Props) => {
    const {data }=useSession()
  return (
    <div className="flex flex-col items-center w-1/2 p-4 mx-auto mt-4 rounded-md bg-secondary">
        <h1 className="text-2xl font-black text-violet-900">FORGE COINS</h1>
      {data?.user.credits} / 10 Free Generations
      <Progress
        className="mt-2 bg-slate-500"
        value={data?.user.credits ? (data.user.credits / 10) * 100 : 0}
      />
      <Button
      
        className="mt-3 font-bold text-white transition bg-gradient-to-tr from-violet-600 to-blue-500 hover:from-violet-700 hover:to-blue-600"
      >
        Upgrade
        <Zap className="fill-white ml-2" />
      </Button>
    </div>
  )
}

export default ForgeCoins