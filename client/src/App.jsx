import './App.css';
import LoginPage from './pages/Login/Login';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {


  return (
    <BrowserRouter>
      <div className="parent">
        <Switch>
          <Route path="/" component={LoginPage} />
        </Switch>
      </div>
    </BrowserRouter>

  );
}

export default App;
