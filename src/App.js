
import "./App.css";
import Pages from './components/Pages';
import NewsTicker from './components/NewsTicker';



function App() {
  return (
   <>
    <div  >
    <Pages/>
    </div >
    <div style={{margin: "40px"}}>
                <NewsTicker/>
                </div>
   </>

  );
}

export default App;
