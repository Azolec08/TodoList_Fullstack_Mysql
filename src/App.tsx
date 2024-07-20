import { Route, Routes } from "react-router-dom";
import Layout from "./layout";
import { Add } from "./pages/Add";
import Books from "./pages/Books";
import { Update } from "./pages/Update";
function App() {
  return (
    <main>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Books />} />
          <Route path="/add" element={<Add />} />
          <Route path="/update/:id" element={<Update />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
