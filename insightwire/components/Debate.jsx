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
                  Debate <MessagesSquare />
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
                        ? `float-left w-4/5 bg-slate-100 dark:bg-slate-300 dark:text-slate-900 rounded-lg p-5 mb-5`
                        : `float-right w-4/5 bg-rose-50 dark:bg-rose-300 dark:text-rose-900 rounded-lg p-5 mb-5`
                    }
                  >
                    {point.text}
                  </div>
                ))}
              </CardContent>
            </div>
            <hr />
            <CardContent className="mt-10">
              <CardTitle className="mb-5 text-lg font-semibold">
                Conclusion
              </CardTitle>
              <p className="text-md">{opinions.conclusion}</p>
            </CardContent>
          </div>
        </Card>
      </div>
    );
  }
};

export default Debate;
