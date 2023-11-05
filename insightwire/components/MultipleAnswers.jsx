import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { List } from "lucide-react";

const MultipleAnswers = ({ newsResults, answer }) => {
  return (
    <Card className="w-full">
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
  );
};

export default MultipleAnswers;
