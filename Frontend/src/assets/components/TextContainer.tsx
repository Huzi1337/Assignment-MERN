import "./TextContainer.scss";

const TextContainer: React.FC<{ text: string[] }> = ({ text }) => {
  return (
    <div className="textContainer">
      {text.map((line, index) => {
        return <p key={index}>{line}</p>;
      })}
    </div>
  );
};

export default TextContainer;
