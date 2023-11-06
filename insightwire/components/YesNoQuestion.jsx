import React, { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, Gauge, Scale, Text, X } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { capitalizeFirstLetter } from "@/lib/utils";

import ld from "lodash";

const YesNoQuestion = ({ answer, newsResults }) => {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <div className="flex w-3/4 mx-auto mt-10 relative">
        <Card className="w-full">
          <X
            className="absolute top-2 right-2"
            onClick={() => setShow(false)}
          />
          <div className="grid grid-cols-5 divide-x-2">
            <div className="col-span-3">
              <CardHeader>
                <CardTitle className="text-lg flex gap-3">
                  Summary <Text />
                </CardTitle>
                <CardDescription>
                  Top {newsResults.length} results analysed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>{answer.summary}</p>
              </CardContent>
            </div>
            <div className="col-span-2">
              <CardHeader>
                <CardTitle className="text-lg flex gap-3">
                  Agreement Rate <Gauge />
                </CardTitle>
                <CardDescription>
                  {answer.num_considered} articles considered
                </CardDescription>
              </CardHeader>
              <CardContent>
                {ld.map(answer.answer, (v, k) => {
                  const label = capitalizeFirstLetter(k);
                  const icon = {
                    yes: <Check />,
                    no: <X />,
                    neutral: <Scale />,
                  };
                  const colorStyle = {
                    yes: "text-green-600",
                    no: "text-red-600",
                    neutral: "text-gray-600",
                  };
                  return (
                    <div key={k} className="mb-5">
                      <Label
                        className={`text-base flex ${colorStyle[k]}`}
                        htmlFor={k}
                      >
                        <div className="mr-2 mb-2">{icon[k]}</div>
                        {`${label} - ${(v * 100).toFixed(0)}%`}
                      </Label>

                      <Progress className="h-2 mt-0" id={k} value={v * 100} />
                    </div>
                  );
                })}
              </CardContent>
            </div>
          </div>
        </Card>
      </div>
    );
  }
};

export default YesNoQuestion;
