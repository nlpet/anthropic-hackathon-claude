"use client";

import React, { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ListStart, ThumbsDown, ThumbsUp, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import ld from "lodash";

const Entities = ({ entities }) => {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <div className="flex w-3/4 mx-auto mt-10 relative">
        <Card className="w-full">
          <X
            className="absolute top-2 right-2 w-5 h-5 text-gray-500"
            onClick={() => setShow(false)}
          />
          <div className="grid grid-cols-5 divide-x-2">
            <div className="col-span-2">
              <CardHeader>
                <CardTitle className="text-lg flex gap-3">
                  Top Entities <ListStart />
                </CardTitle>
                <CardDescription>
                  Most prominent entities in relevant articles.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Entity</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Mentions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ld.keys(entities.entities).map((entity) => (
                      <TableRow key={entity}>
                        <TableCell>{entity}</TableCell>
                        <TableCell>{entities.entity_types[entity]}</TableCell>
                        <TableCell>{entities.entities[entity]}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </div>
            <div className="col-span-3">
              <CardHeader>
                <CardTitle className="text-lg flex gap-3">
                  Sentiment <ThumbsUp /> <ThumbsDown />
                </CardTitle>
                <CardDescription>
                  Target based sentiment associated with found entities.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Entity</TableHead>
                      <TableHead>Positive</TableHead>
                      <TableHead>Neutral</TableHead>
                      <TableHead>Negative</TableHead>
                      <TableHead>Sentiment</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ld.keys(entities.sentiment).map((entity) => {
                      const entSentiment = [
                        {
                          label: "positive",
                          percent: entities.sentiment[entity].pos_perc,
                        },
                        {
                          label: "neutral",
                          percent: entities.sentiment[entity].neu_perc,
                        },
                        {
                          label: "negative",
                          percent: entities.sentiment[entity].neg_perc,
                        },
                      ];
                      const sentiment = ld.maxBy(entSentiment, "percent");
                      const sentColors = {
                        positive: "green",
                        neutral: "neutral",
                        negative: "red",
                      };
                      const sentColor = `text-${
                        sentColors[sentiment.label]
                      }-500`;

                      return (
                        <TableRow key={entity}>
                          <TableCell>{entity}</TableCell>
                          <TableCell>
                            {(
                              entities.sentiment[entity].pos_perc * 100
                            ).toFixed(0)}
                            %
                          </TableCell>
                          <TableCell>
                            {(
                              entities.sentiment[entity].neu_perc * 100
                            ).toFixed(0)}
                            %
                          </TableCell>
                          <TableCell>
                            {(
                              entities.sentiment[entity].neg_perc * 100
                            ).toFixed(0)}
                            %
                          </TableCell>
                          <TableCell>
                            <span className={sentColor}>{sentiment.label}</span>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </div>
          </div>
        </Card>
      </div>
    );
  }
};

export default Entities;
