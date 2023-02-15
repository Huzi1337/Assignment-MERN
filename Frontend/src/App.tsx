import { useState } from "react";

import UserForm from "./assets/components/UserForm";
import TextContainer from "./assets/components/TextContainer";

import { IFormData } from "./assets/components/UserForm";

import "./App.scss";

const URL = "http://localhost:8000/api/logs";

export type RelevantLinesHandler = (text: string[] | undefined) => void;

export type LogResponse = { relevantLines: string[] };

export type SubmitFn = (
  url: string,
  data: IFormData
) => Promise<LogResponse | undefined>;

const submitLog: SubmitFn = async (url: string, data: IFormData) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json() as Promise<LogResponse>;
  } catch (err) {
    console.log(err);
  }
};

function App() {
  const [relevantLines, setRelevantLines] = useState<undefined | string[]>(
    undefined
  );
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const relevantLinesHandler: RelevantLinesHandler = (text) => {
    if (!text) return setError(true);
    setRelevantLines(text);
  };

  const onSubmit = async (values: IFormData) => {
    try {
      setIsLoading(true);
      setError(false);
      const response = await submitLog(URL, values);
      setIsLoading(false);
      return relevantLinesHandler(response?.relevantLines);
    } catch (err) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <UserForm onSubmit={onSubmit}></UserForm>
      {isLoading && <TextContainer text={["Loading"]} />}
      {error && (
        <TextContainer
          text={["An error has occurred. No valid log lines entered."]}
        />
      )}
      {relevantLines && !isLoading && !error && (
        <TextContainer text={relevantLines} />
      )}
    </div>
  );
}

export default App;
