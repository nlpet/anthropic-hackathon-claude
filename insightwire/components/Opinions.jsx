import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Opinions = ({ opinions }) => {
  return (
    <Card className="w-full">
      <div className="grid grid-cols-4 divide-x-2">
        <div className="col-span-2">
          <CardHeader>
            <CardTitle className="text-lg flex gap-3">Opinion A</CardTitle>
            <CardDescription>Does this resonate?</CardDescription>
          </CardHeader>

          <CardContent>{opinions.skeptic}</CardContent>
        </div>
        <div className="col-span-2">
          <CardHeader>
            <CardTitle className="text-lg flex gap-3">Opinion B</CardTitle>
            <CardDescription>Or maybe this?</CardDescription>
          </CardHeader>
          <CardContent>{opinions.optimist}</CardContent>
        </div>
      </div>
    </Card>
  );
};

export default Opinions;
