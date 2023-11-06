
import "./App.css";
import Pages from './components/Pages';
import NewsTicker from './components/NewsTicker';
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <div>
    <Pages/>
    <div style={{margin: "20px"}}>
                <NewsTicker/>
            </div>
            <div>
              <ScrollToTop/>
            </div>
   </div>
  );
}

export default App;
