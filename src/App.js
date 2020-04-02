import React, {  lazy,Suspense}  from 'react';
import { BrowserRouter as Router, Route,Switch ,Redirect} from 'react-router-dom'
import './App.css';
//import { All} from'./page/All'
const All = lazy(()=> import('./page/All'))
const Home = lazy(()=>import('./page/Home'))

function App() {
  return (
    <Router>

   <div className="App">
   <Suspense fallback={<div> 组件加载中....</div>}>
   <Switch>
   
   <Route path='/' component={All} ></Route>
 
 
   </Switch>
   
   </Suspense>
   
    </div>
   
    </Router>
    
  );
}

export default App;
