import React from 'react';
import axios from 'axios';
import '../../Styles/details.css';
import '../../Styles/filters.css';
import ReactPaginate from 'react-paginate';
import { API_URL } from '../../properties';

// Class Component
class Filter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            restaurantData: [],
            locationValues: [],
            offset: 0,
            perPage: 2,
            currentPage: 1,
        };
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    receivedData() {
        axios(
            {
                method: 'GET',
                url: `${API_URL}/restaurant/getRestaurants`,
                headers: { 'Content-Type': 'application/json' }
            }
        ).then(response =>{
            const restaurantData = response.data;
            const slice = restaurantData.slice(this.state.offset, this.state.offset + this.state.perPage)
            const postData = slice.map(item => <React.Fragment>
                <div className='FilterItems' onClick={() => this.handleNextPage(item)}>
                    <img src={item.image} className="FilterPic1" alt=''/>
                    <div className='FilterTheBigChill'>{item.name}</div>
                    <div className='FilterFort'>{item.address}</div>
                    <div className='FilterAddress'>{item.locality}, {item.city}</div>
                    <div><hr /></div>
                    <div className='FilterCUISINES'>CUISINES:</div>
                    <div className='FilterCOSTFORTWO'>COST FOR TWO:</div>
                    <div className='FilterBakery'>{item.cuisine}</div>
                    <div className='FilterSevenHundred'>{item.min_price}</div>
                </div>
            </React.Fragment>)
            this.setState({
                pageCount: Math.ceil(restaurantData.length / this.state.perPage), 
                postData
            })}).catch()
    }

    componentDidMount() {
        axios(
            {
                method: 'GET',
                url: `${API_URL}/citylist/getcitylist`,
                headers: { 'Content-Type': 'application/json' }
            }
        ).then(response => this.setState({ locationValues: response.data })).catch()
        this.receivedData()
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.receivedData()
        });

    };

    handleNextPage = (resaurantId) => {
        this.props.history.push(`/details?restaurant=${resaurantId._id}`);
    }

    render() {
        const { locationValues } = this.state;
        return (<div>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-sm-12 col-ms-12 col-lg-12'>
                    </div>
                    <div className='col-sm-12 col-ms-12 col-lg-12'>
                        <h1 className='Filterfood'>Places in India</h1>
                    </div>
                    <div className='col-sm-12 col-ms-12 col-lg-12'>
                    </div>
                </div>
            </div>
            <div className='container'>
                <div className='row'>
                    <div className='col-sm-4 col-md-4 col-lg-4'>
                        <div className='Filterrectangle'>
                            <div className='FilterFilt'>Filters</div>
                            <div className='Filter-Select-Location'>Select Location</div>
                            <div>
                                <select className='Filterdropdown' onChange={this.handlelocChange} >
                                    <option value="0">Select</option>
                                    {locationValues && locationValues.map((item) => {
                                        return <option value={item.location_id}>{`${item.name}, ${item.city}`}</option>
                                    })}
                                </select>
                            </div>
                            <div className='CuisineFilter'>Cuisine</div>
                            <div>
                                <input type="checkbox" className='check' />
                                <span className='head'>North Indian</span>
                            </div>
                            <div>
                                <input type="checkbox" className='check' />
                                <span className='head'>South Indian</span>
                            </div>
                            <div>
                                <input type="checkbox" className='check' />
                                <span className='head'>Chinese</span>
                            </div>
                            <div>
                                <input type="checkbox" className='check' />
                                <span className='head'>Thai</span>
                            </div>
                            <div>
                                <input type="checkbox" className='check' />
                                <span className='head'>Italian</span>
                            </div>
                            <div className='CostFilter'>Cost for Two</div>
                            <div>
                                <input type="radio" className='radiobutton' name="cost" />
                                <span className='head'>Less than ₹ 500</span>
                            </div>
                            <div>
                                <input type="radio" className='radiobutton' name="cost" />
                                <span className='head'>₹ 500 to ₹ 1000</span>
                            </div>
                            <div>
                                <input type="radio" className='radiobutton' name="cost" />
                                <span className='head'>₹ 1000 to ₹ 1500</span>
                            </div>
                            <div>
                                <input type="radio" className='radiobutton' name="cost" />
                                <span className='head'>₹ 1500 to ₹ 2000</span>
                            </div>
                            <div>
                                <input type="radio" className='radiobutton' name="cost" />
                                <span className='head'>₹ 2000+</span>
                            </div>
                            <div className='SortFilter'>Sort</div>
                            <div>
                                <input type="radio" className='radiobutton' name="sort"/>
                                <span className='head'>Price low to high</span>
                            </div>
                            <div>
                                <input type="radio" className='radiobutton' name="sort"/>
                                <span className='head'>Price high to low</span>
                            </div>
                        </div>
                    </div>
                    <div className='col-sm-8 col-md-8 col-lg-8'>
                        {this.state.postData}
                        <ReactPaginate
                            previousLabel={"prev"}
                            nextLabel={"next"}
                            breakLabel={"..."}
                            breakClassName={"break-me"}
                            pageCount={this.state.pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={this.handlePageClick}
                            containerClassName={"pagination"}
                            subContainerClassName={"pages pagination"}
                            activeClassName={"active"}
                        />
                    </div>
                </div>
            </div>
        </div>)
    }
}

export default Filter;