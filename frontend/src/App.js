import { BrowserRouter as Router, Route } from "react-router-dom";
import RoutineScreen from './screens/routine'
import CreateScreen from './screens/create'

function App() {

  return (
    <Router>
      <Route component={CreateScreen} path='/' exact />    
      <Route component={RoutineScreen} path='/:slug' />    
    </Router>
  );
}
export default App;
