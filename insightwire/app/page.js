"use client";

import React, { useState, useEffect } from "react";
import ld from "lodash";

import Container from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { X } from "lucide-react";

import LoaderPlaceholder from "@/components/LoaderPlaceholder";
import NumericAnswer from "@/components/NumericAnswer";
import YesNoQuestion from "@/components/YesNoQuestion";
import MultipleAnswers from "@/components/MultipleAnswers";
import Entities from "@/components/Entities";
import Article from "@/components/Article";
import Debate from "@/components/Debate";
import Analysis from "@/components/Analysis";
import preferencesStore from "@/stores/preferences";

export default function Home() {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState(null);
  const [newsResults, setNewsResults] = useState([]);
  const [entities, setEntities] = useState(null);
  const [error, setError] = useState(null);
  const [opinions, setOpinions] = useState(null);
  const [show, setShow] = useState(true);
  const [loading, setLoading] = useState({
    response: false,
    news: false,
    entities: false,
    opinions: false,
  });
  const [open, setOpen] = useState(false);
  const [cachedQueries, setCachedQueries] = useState([]);
  const { preferences } = preferencesStore();

  useEffect(() => {
    const getCachedQueries = async () => {
      try {
        const results = await fetch("http://localhost:8000/api/cache", {
          method: "GET",
          mode: "cors",
          headers: { "Content-Type": "application/json" },
          referrerPolicy: "no-referrer",
        });
        const data = await results.json();
        setCachedQueries(data.map((q) => ({ value: q, label: q })));
      } catch (err) {
        console.error("Could not retrieve cached results at this time.");
      }
    };
    getCachedQueries();
  }, []);

  const search = async (query) => {
    setShow(true);
    setAnswer(null);
    setError(null);
    setEntities(null);
    setOpinions(null);
    setNewsResults([]);
    setLoading({ response: true, news: true, entities: true, opinions: true });

    try {
      const newsRes = await fetch("http://localhost:8000/api/news", {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: query }),
      });
      const newsData = await newsRes.json();
      setNewsResults(newsData);
    } catch (err) {
      setError("News results are not available at this time.");
    } finally {
      setLoading({
        response: true,
        news: false,
        entities: true,
        opinions: true,
      });
    }

    // TODO: only load what is set in preferences
    const resPromise = fetch("http://localhost:8000/api/search", {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: query }),
    });
    const entResPromise = fetch("http://localhost:8000/api/entities", {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: query }),
    });
    const opinionsPromise = fetch("http://localhost:8000/api/opinions", {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: query }),
    });

    try {
      const entRes = await entResPromise;
      const entData = await entRes.json();
      setEntities(entData);
    } catch (err) {
      setError("News results are not available at this time.");
    } finally {
      setLoading({
        response: true,
        news: false,
        entities: false,
        opinions: true,
      });
    }

    try {
      const res = await resPromise;
      const data = await res.json();
      setAnswer(data);
    } catch (err) {
      setError("Could not obtain News synthesis at this time.");
    } finally {
      setLoading({
        response: false,
        news: false,
        entities: false,
        opinions: true,
      });
    }

    try {
      const opinionsRes = await opinionsPromise;
      const opinionsData = await opinionsRes.json();
      setOpinions(opinionsData);
    } catch (err) {
      setError("News results are not available at this time.");
    } finally {
      setLoading({
        response: false,
        news: false,
        entities: false,
        opinions: false,
      });
    }
  };

  return (
    <Container>
      <div className="text-center">
        <h1 className="text-5xl mt-20">
          A <span className="font-bold">balanced</span> perspective on current
          events
        </h1>
        <hr className="mt-3 w-4/6 mx-auto border-y-1 border-1 border-dashed" />
        <p className="text-lg mt-5 w-8/12 justify-center mx-auto">
          InsightWire is a search engine that uses AI to find insights in News.
          It analyses and synthesises articles from a variety of sources and
          points of view, in order to provide a nuanced take of the events you
          are interested in.
        </p>
      </div>
      <div className="flex w-3/4 mx-auto justify-center items-center mt-10">
        {cachedQueries.length === 0 ? (
          <Input
            onChange={(data) => setQuery(data.target.value)}
            className="p-6 text-lg"
            value={query || ""}
            type="search"
            placeholder="Ask a question about current events..."
          />
        ) : (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Input
                onChange={(data) => {
                  setQuery(data.target.value);
                }}
                onKeyDown={(data) => {
                  if (data.key == "Enter") {
                    search(query);
                  }
                }}
                className="p-6 text-lg"
                value={query || ""}
                type="search"
                placeholder="Ask a question about current events..."
              />
            </PopoverTrigger>
            <PopoverContent className="p-0 sm:w-[400px] md:w-[850px]">
              <Command>
                <CommandInput placeholder="Search Query..." className="h-9" />
                <CommandGroup className="h-96 overflow-scroll">
                  {cachedQueries.map((q, i) => (
                    <CommandItem
                      key={`${q.value}-${i}`}
                      value={q.value}
                      onSelect={(currentValue) => {
                        setQuery(currentValue === q.value ? "" : q.value);
                        setOpen(false);
                        search(q.value);
                      }}
                    >
                      {q.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        )}

        <Button
          className="p-6 text-lg ml-2 w-24 h-12"
          type="submit"
          disabled={
            query.length === 0 ||
            loading.response ||
            loading.answer ||
            loading.opinions
          }
          onClick={() => search(query)}
        >
          {loading.response ||
          loading.entities ||
          loading.answer ||
          loading.opinions ? (
            <div className="ml-2" role="status">
              <svg
                aria-hidden="true"
                className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            "Search"
          )}
        </Button>
      </div>
      {error && (
        <div
          className="bg-red-100/75 text-red-800 dark:bg-red-500 dark:text-white px-4 py-3 rounded relative w-3/4 mx-auto mt-5"
          role="alert"
        >
          <strong className="font-bold mr-2">Service Unavailable:</strong>
          <span className="block sm:inline">
            Something went terribly <i>terribly</i> wrong.
          </span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg
              onClick={() => setError(null)}
              className="fill-current h-7 w-7 text-red-400 dark:text-white"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>
        </div>
      )}

      {(loading.response ||
        loading.news ||
        loading.entities ||
        loading.opinions) && (
        <div className="flex w-3/4 mx-auto mt-10">
          <LoaderPlaceholder loading={loading} />
        </div>
      )}

      {answer && preferences["answer"].checked && (
        <>
          {answer.type_of_question === "yes_or_no" && (
            <YesNoQuestion newsResults={newsResults} answer={answer} />
          )}
          {answer.type_of_question === "multiple_answers" && (
            <MultipleAnswers
              newsResults={newsResults}
              answer={answer}
              entities={entities}
            />
          )}
          {answer.type_of_question === "numeric_answer" && (
            <NumericAnswer newsResults={newsResults} answer={answer} />
          )}
        </>
      )}

      {entities &&
        !ld.isEmpty(entities.entities) &&
        preferences["entities"].checked && <Entities entities={entities} />}

      {opinions && opinions.takes && preferences["debate"].checked && (
        <Debate opinions={opinions.takes} />
      )}
      {opinions &&
        opinions.expert_analysis &&
        preferences["analysis"].checked && (
          <Analysis opinions={opinions.expert_analysis} />
        )}

      {newsResults.length > 0 && show && preferences["articles"].checked && (
        <div className="w-3/4 mx-auto border-2 mt-10 p-5 rounded-lg relative">
          <X
            className="absolute top-2 right-2 w-5 h-5 text-gray-500"
            onClick={() => setShow(false)}
          />
          <h2 className="text-lg font-semibold">Relevant News Articles</h2>
          {newsResults &&
            ld.map(
              newsResults.slice(0, preferences.articles.top),
              (article, idx) => {
                const title = article.title.split("|")[0].trim().slice(0, 110);
                return (
                  <Article
                    key={article.url + idx}
                    article={article}
                    title={title}
                  />
                );
              }
            )}
        </div>
      )}

      {answer && answer.type_of_question === "not_a_question" && (
        <div
          className="bg-sky-50 border-2 border-sky-200/75 text-sky-800 dark:bg-sky-500 dark:border-sky-400 dark:text-white px-4 py-3 rounded relative w-3/4 mx-auto"
          role="alert"
        >
          <strong className="font-bold mr-2">Question Expected:</strong>
          <span className="block sm:inline">Please provide a valid query.</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg
              className="fill-current h-7 w-7 text-sky-800 dark:text-white"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            ></svg>
          </span>
        </div>
      )}
    </Container>
  );
}
