
import "./App.css";
import Pages from './components/Pages';
import NewsTicker from './components/NewsTicker';
import ScrollToTop from "./components/ScrollToTop";



function App() {
  return (
   <>
    <div  >
    <Pages/>
    </div >
    <div style={{margin: "40px"}}>
                <NewsTicker/>
                </div>
       <ScrollToTop/>
   </>


  );
}

export default App;
