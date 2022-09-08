import React from 'react';
import axios from 'axios';
import WallPaper from './Wallpaper';
import QuickSearch from './QuickSearch';
import { API_URL } from '../../properties';

class Home extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        location: [],
        mealType: []
    }
  }

  componentDidMount(){
    axios(
        {
            method: 'GET',
            url:`${API_URL}/citylist/getcitylist`,
            headers: {'Content-Type': 'application/json'}
        }
    ).then(response => this.setState({ location: response.data})).catch()
    axios(
        {
            method: 'GET',
            url:`${API_URL}/meals/getMeals`,
            headers: {'Content-Type': 'application/json'}
        }
    ).then(response => this.setState({ mealType: response.data})).catch()
  }

  render(){
    const {location, mealType} = this.state;
    return (<div className='App'>
        <WallPaper locationValue = {location}/>
        <QuickSearch quickSearch = {mealType}/>
    </div>)
   }
}

export default Home;
