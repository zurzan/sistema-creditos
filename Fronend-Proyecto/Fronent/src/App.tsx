import { AuthProvider } from "./presentation/contexts/AuthContext";
import { AppRouter } from "./presentation/routes/AppRouter";

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;