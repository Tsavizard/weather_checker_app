import React from "react"
import PropTypes from "prop-types"

class Home extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      cities: this.props.cities,
      temperatures: []
    }
  }

  componentDidMount(){
    //Fetch temperatures
  }

  checkTemperatures(){

  }

  render () {
    return (
      <React.Fragment>
        <div>
          Cities: {this.props.cities}
        </div>
        <div>
          {/* Temperature Fetch Path: {this.props.temperaturePath} */}
        </div>
      </React.Fragment>
    );
  }
}

Home.propTypes = {
  cities: PropTypes.array,
  temperaturePath: PropTypes.string
};
export default Home
