import Header from './components/Header/Header'
import {
  BrowserRouter as Router,
  Switch,
  Route

} from 'react-router-dom'
import RouterMain from './routers/RouterMain';

function App() {

  return (
    <div className="body-inner">
      <Router>
        <Switch>
          <Route path="/">
            <RouterMain />
          </Route>      
        </Switch>
      </Router>

      
    </div>
  );
}

export default App;
