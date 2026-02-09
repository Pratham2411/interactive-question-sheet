import { useEffect } from "react";
import { useSheetStore } from "./store/sheetStore";
import SheetView from "./components/SheetView";

function App() {
  const loadSheet = useSheetStore(s => s.loadSheet);

  useEffect(() => {
    loadSheet();
  }, []);

  return <SheetView />;
}

export default App;
