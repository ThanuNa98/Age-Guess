import { React, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home/js/Home';
import LoadingScreen from './Extras/js/LoadingScreen';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulating an async operation
  useEffect(() => {
    // Simulating a delay of 2 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      )}
    </Router>
  );
}

export default App;