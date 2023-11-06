import React, { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { List, X } from "lucide-react";

const MultipleAnswers = ({ newsResults, answer }) => {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <div className="flex w-3/4 mx-auto mt-10 relative">
        <Card className="w-full">
          <X
            className="absolute top-2 right-2"
            onClick={() => setShow(false)}
          />
          <div>
            <CardHeader>
              <CardTitle className="text-lg flex gap-3">
                Key Points <List />
              </CardTitle>
              <CardDescription>
                Top {newsResults.length} results analysed
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="ml-5 mr-3">
                <ul className="list-disc">
                  {answer.answer.map((claim, idx) => (
                    <li key={`${claim}-${idx}`}>{claim}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
    );
  }
};

export default MultipleAnswers;
