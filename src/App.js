import React,{Component} from 'react'
import axios from 'axios'
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import ChefList from "./ChefList";
import ChefDetail from "./ChefDetail";
// model.addAttribute("main_jsp","파일명")
// React => 한개의 기능수행
class App extends Component{
   render(){
      return (
          <Router>
            <Switch>
              <Route exact path={"/"} component={ChefList}/>
              <Route exact path={"/chef_detail"} component={ChefDetail}/>
            </Switch>
          </Router>
      )
   }
}
export default App;
