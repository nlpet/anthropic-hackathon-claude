import React, { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Text, X } from "lucide-react";

const NumericAnswer = ({ answer, newsResults }) => {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <div className="flex w-3/4 mx-auto mt-10 relative">
        <Card className="w-full">
          <X
            className="absolute top-2 right-2 w-5 h-5 text-gray-500"
            onClick={() => setShow(false)}
          />
          <div className="grid grid-cols-4 divide-x-2">
            <div className="col-span-2">
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
                  Answer: {answer.answer.answer}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      Show context for given answer.
                    </AccordionTrigger>
                    <AccordionContent>
                      {answer.answer.evidence.join(". ")}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </div>
          </div>
        </Card>
      </div>
    );
  }
};

export default NumericAnswer;
