import React from "react"
import PropTypes from "prop-types"

class Home extends React.Component {
  render () {
    return (
      <React.Fragment>
        Cities: {this.props.cities}
        Temperature Fetch Path: {this.props.temperatureFetchPath}
      </React.Fragment>
    );
  }
}

Home.propTypes = {
  cities: PropTypes.array,
  temperatureFetchPath: PropTypes.string
};
export default Home
