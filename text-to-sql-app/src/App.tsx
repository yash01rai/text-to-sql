import { useState } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import { callLLM } from "./lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

function App() {
  // const [count, setCount] = useState(0);
  const [query, setQuery] = useState("hey");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const generateCall = async () => {
    setIsLoading(true);
    setError("");
    try {
      // Your AI call to generate SQL
      const generatedSQL = await callLLM(query);
      setOutput(generatedSQL);
    } catch (err) {
      setError("Failed to generate SQL. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <main className="main-box">
        <section className="print-query-box">
          <Label>Your AI-generated SQL query</Label>
          {error ? (
            <div style={{ color: "red" }}>Error: {error}</div>
          ) : (
            // <Textarea
            //   id="show-output"
            //   value={output || "Your SQL query will appear here..."}
            //   disabled={true}
            // />
            <pre className="show-output">
              {output || "Your SQL query will appear here..."}
            </pre>
          )}
        </section>
        <section className="write-query-box">
          <Label htmlFor="query-input">Write your text query</Label>
          <Textarea
            id="query-input"
            placeholder="Write your text query here..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            // rows={4} // Allows for multiline input
            // style={{ width: "100%", padding: "10px", fontSize: "1rem" }}
          />
          <Button onClick={generateCall} disabled={isLoading}>
            {isLoading ? "Generating..." : "Generate SQL Query"}
          </Button>
        </section>
      </main>
    </>
  );
}

export default App;
