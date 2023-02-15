import { useState } from "react";

import UserForm from "./assets/components/UserForm";
import TextContainer from "./assets/components/TextContainer";

import "./App.scss";

export type RelevantLinesHandler = (text: string[] | undefined) => void;

function App() {
  const [relevantLines, setRelevantLines] = useState<undefined | string[]>(
    undefined
  );

  const relevantLinesHandler: RelevantLinesHandler = (text) => {
    console.log(text, relevantLines);
    setRelevantLines(text);
  };

  return (
    <div className="App">
      <UserForm onSubmit={relevantLinesHandler}></UserForm>
      {relevantLines && relevantLines.length > 0 && (
        <TextContainer text={relevantLines} />
      )}
    </div>
  );
}

export default App;
