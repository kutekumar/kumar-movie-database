import "./App.css";
import { Route, Switch } from "react-router";
import Home from "./components/home/Home";
import MovieDetail from "./components/moviedetail/MovieDetail";
import Header from "./components/home/Header";

function App() {
  return (
    <main>
      <Header />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/movie/:id" component={MovieDetail} />
      </Switch>
    </main>
  );
}

export default App;
