import { useState } from "react";

import UserForm from "./assets/components/UserForm";
import TextContainer from "./assets/components/TextContainer";

import { IFormData } from "./assets/components/UserForm";

import "./App.scss";

const URL = "http://localhost:8000/api/logs";

type ServerErrorMessage = { message: string };

export type RelevantLinesHandler = (
  text: LogResponse | ServerErrorMessage
) => void;

export type LogResponse = { relevantLines: string[] };

export type SubmitFn = (
  url: string,
  data: IFormData
) => Promise<LogResponse | ServerErrorMessage>;

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
    return err as ServerErrorMessage;
  }
};

function App() {
  const [relevantLines, setRelevantLines] = useState<undefined | string[]>(
    undefined
  );
  const [error, setError] = useState<ServerErrorMessage | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const relevantLinesHandler: RelevantLinesHandler = (response) => {
    console.log(typeof response);
    if ((response as ServerErrorMessage).message != undefined) {
      console.log(response);
      return setError(response as ServerErrorMessage);
    }
    setRelevantLines((response as LogResponse).relevantLines);
  };

  const onSubmit = async (values: IFormData) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await submitLog(URL, values);
      setIsLoading(false);
      return relevantLinesHandler(response);
    } catch (err) {
      console.log(error);
      return relevantLinesHandler(err as ServerErrorMessage);
    }
  };

  return (
    <div className="App">
      <UserForm onSubmit={onSubmit}></UserForm>
      {isLoading && <TextContainer text={["Loading"]} />}
      {error && <TextContainer text={[error.message]} />}
      {relevantLines && !isLoading && !error && (
        <TextContainer text={relevantLines} />
      )}
    </div>
  );
}

export default App;
