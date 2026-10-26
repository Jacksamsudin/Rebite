import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DetailMakanan from './pages/Detailmakanan.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<DetailMakanan />}
        />
        <Route
          path="/detail-makanan"
          element={<DetailMakanan />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
