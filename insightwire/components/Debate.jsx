import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { MessagesSquare, X } from "lucide-react";

const Debate = ({ opinions }) => {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <div className="flex w-3/4 mx-auto mt-10 relative">
        <Card>
          <X
            className="absolute top-2 right-2 w-5 h-5 text-gray-500"
            onClick={() => setShow(false)}
          />
          <div className="flex flex-col">
            <div className="w-full">
              <CardHeader>
                <CardTitle className="text-lg flex gap-3">
                  AI Debate <MessagesSquare />
                </CardTitle>
                <CardDescription>
                  Two AIs with different perspectives discuss the issue.
                </CardDescription>
              </CardHeader>

              <CardContent>
                {opinions.debate.map((point, idx) => (
                  <div
                    key={`${point.side}-${idx}`}
                    className={
                      point.side === "skeptic"
                        ? `float-left w-4/5 bg-slate-100 rounded-lg p-3 mb-5`
                        : `float-right w-4/5 bg-rose-50 rounded-lg p-3 mb-5`
                    }
                  >
                    {point.text}
                  </div>
                ))}
              </CardContent>
            </div>
            <hr />
            <CardContent className="mt-10">
              <CardTitle className="text-md mb-3">AI Conclusion</CardTitle>
              <p className="text-sm">{opinions.conclusion}</p>
            </CardContent>
          </div>
        </Card>
      </div>
    );
  }
};

export default Debate;
