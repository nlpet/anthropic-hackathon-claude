import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Newspaper } from "lucide-react";

const Article = ({ article, title }) => {
  return (
    <Card
      className={
        "w-full mt-5 hover:border-slate-400/80 hover:shadow-md hover:border-2"
      }
    >
      <CardHeader>
        <CardTitle className="flex gap-3">
          <Newspaper />
          <div className="text-lg underline decoration-2 underline-offset-2 ">
            <a target="_blank" rel="noopener noreferrer" href={article.url}>
              {article.title.length > 120 ? title + ".." : title}
            </a>
          </div>
        </CardTitle>

        <CardDescription>
          Published {article.age} by{" "}
          <span className="font-semibold">{article.meta_url.netloc}</span>
        </CardDescription>
        <hr />
      </CardHeader>
      <CardContent>
        <div className="bg-rose-50/75 p-3 rounded-lg dark:text-white dark:bg-gray-900">
          {article.description}
        </div>
      </CardContent>
    </Card>
  );
};

export default Article;
