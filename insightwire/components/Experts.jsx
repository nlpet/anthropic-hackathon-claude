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
        <CardDescription>Deeper dive into the issue.</CardDescription>
      </CardHeader>

      <CardContent>
        <p>{opinions.answer}</p>

        <div className="mt-10">
          <b>Reasoning Steps:</b>
          <ul>
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
