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

  const relevantLinesHandler: RelevantLinesHandler = (text) => {
    setRelevantLines(text);
  };

  const onSubmit = async (values: IFormData) => {
    try {
      console.log(values);
      const response = await submitLog(URL, values);

      return relevantLinesHandler(response?.relevantLines);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <UserForm onSubmit={onSubmit}></UserForm>
      {relevantLines && relevantLines.length > 0 && (
        <TextContainer text={relevantLines} />
      )}
    </div>
  );
}

export default App;
