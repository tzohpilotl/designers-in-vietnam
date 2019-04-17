import React, { useEffect, useState } from "react";
import "./App.css";
import ConnectionError from "./ConnectionError";
import DesignersList, { IDesigner } from "./DesignersList";
import firestore from "./firestore";

const App = () => {
  const [error, saveError] = useState(null);
  const [designers, saveDesigners] = useState([] as IDesigner[]);

  useEffect(() => {
    firestore
      .collection("people")
      .get()
      .then(querySnapshot => {
        const latestDesigners = [] as IDesigner[];
        querySnapshot.forEach(doc => {
          latestDesigners.push({ id: doc.id, ...doc.data() } as IDesigner);
        });
        return latestDesigners;
      })
      .then(saveDesigners)
      .catch(saveError);
  }, [designers]);

  return (
    <main className="App">
      {error && <ConnectionError />}
      <DesignersList designers={designers} />
    </main>
  );
};

export default App;