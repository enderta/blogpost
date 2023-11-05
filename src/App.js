
import "./App.css";
import Pages from './components/Pages';
import NewsTicker from './components/NewsTicker';

function App() {
  return (
    <div>
    <Pages/>
    <div style={{margin: "20px"}}>
                <NewsTicker/>
            </div>
   </div>
  );
}

export default App;
