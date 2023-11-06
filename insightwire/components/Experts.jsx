import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Experts = ({ opinions }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg flex gap-3">Analysis</CardTitle>
        <CardDescription>
          Expert AIs discuss the issue and offer their conclusion and reasoning
          steps.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <CardTitle className="">Answer</CardTitle>
        <p className="bg-slate-200 rounded-lg p-3 mt-3">{opinions.answer}</p>

        <div className="mt-10">
          <CardTitle>Reasoning</CardTitle>

          <ul className="list-disc ml-5 mr-5 mt-2">
            {opinions.reasoning.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default Experts;
