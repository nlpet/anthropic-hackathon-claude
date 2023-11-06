import React, { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { List, X } from "lucide-react";
import ld from "lodash";

const MultipleAnswers = ({ newsResults, answer, entities }) => {
  const [show, setShow] = useState(true);
  let keyPoints = answer.answer;

  if (!ld.isEmpty(entities)) {
    keyPoints = [];
    ld.forEach(answer.answer, (keyPoint) => {
      const tokens = keyPoint.replaceAll(/\d+\.|-/gi, "").split(" ");
      const annotatedTokens = [];
      ld.forEach(tokens, (token, idx) => {
        if (entities.entities[token]) {
          annotatedTokens.push(
            <React.Fragment key={`${token}-${idx}`}>
              {" "}
              <span className="underline decoration-2 underline-offset-2">
                {token}
              </span>{" "}
            </React.Fragment>
          );
        } else {
          annotatedTokens.push(
            <React.Fragment key={`${token}-${idx}`}>
              {" "}
              <span>{token}</span>{" "}
            </React.Fragment>
          );
        }
      });

      keyPoints.push(annotatedTokens);
    });
  }

  if (show) {
    return (
      <div className="flex w-3/4 mx-auto mt-10 relative">
        <Card className="w-full">
          <X
            className="absolute top-2 right-2 w-5 h-5 text-gray-500"
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
              <div className="ml-5">
                <ul className="list-disc">
                  {keyPoints.map((claim, idx) => (
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
