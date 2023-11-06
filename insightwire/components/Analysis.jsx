import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bot, X } from "lucide-react";

const Analysis = ({ opinions }) => {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <div className="flex w-3/4 mx-auto mt-10 relative">
        <X
          className="absolute top-2 right-2 w-5 h-5 text-gray-500"
          onClick={() => setShow(false)}
        />
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-lg flex gap-3">
              Analysis <Bot />
            </CardTitle>
            <CardDescription>
              Expert AIs discuss the issue and offer their conclusion and
              reasoning steps.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <CardTitle className="">Answer</CardTitle>
            <p className="bg-slate-200 dark:bg-slate-800 rounded-lg p-3 mt-3 w-fit">
              {opinions.answer}
            </p>

            <div className="mt-5">
              <CardTitle>Reasoning</CardTitle>

              <ul className="list-disc ml-5 mt-2">
                {opinions.reasoning.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
};

export default Analysis;
