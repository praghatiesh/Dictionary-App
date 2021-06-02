import react, { useEffect, useState } from "react";
import "./styles.css";
export default function Dictionary() {
  const [word, setword] = useState();
  const [list, setlist] = useState();
  const [url, seturl] = useState();
  const changer = (e) => {
    setword(e.target.value);
  };
  const search = () => {
    return (
      <div
        style={{
          display: "block",
          margin: "auto",
          width: "50%",
          backgroundColor: "rgb(235 197 146 / 85%)",
          borderRadius: "4%",
          padding: "5%",
          marginTop: "5%",
          marginBottom: "4%",
          borderStyle: "solid",
          borderColor: "#cb8467"
        }}
      >
        <h1>{list?.[0]?.word}</h1>
        <h3>phonetics : {list?.[0]?.phonetics?.[0]?.text}</h3>
        <audio controls style={{ width: "50%" }}>
          <source src={url} />
        </audio>
        <h3>
          definition : {list?.[0]?.meanings[0]?.definitions[0].definition}
        </h3>
        <h3>
          synonyms :
          {list?.[0]?.meanings[0]?.definitions[0]?.synonyms?.join(", ")}
        </h3>
        <h3>example : {list?.[0]?.meanings[0]?.definitions[0]?.example}</h3>
      </div>
    );
  };
  useEffect(() => {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${word}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setlist(data);
        seturl(list?.[0]?.phonetics?.[0]?.audio);
        console.log(list?.[0]?.phonetics?.[0]?.audio);
      })
      .catch((e) => {
        return setlist(undefined);
      });
  }, [word]);
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Dictionary</h1>
      <div>
        <input
          style={{
            borderWidth: 0,
            display: "block",
            margin: "auto",
            width: 300,
            padding: 5
          }}
          type="text"
          placeholder="Enter the word"
          onChange={changer}
        />
      </div>
      {search()}
    </div>
  );
}
