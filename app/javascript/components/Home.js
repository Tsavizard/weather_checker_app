import React from "react"
import PropTypes from "prop-types"

class Home extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      cities: this.props.cities,
      loading: false,
      temperatures: []
    }
  }

  componentDidMount(){
    this.checkTemperatures()
  }

  // addCity(cityName) {
  //   //Update request for city. If success then call toggleCity
  //   toggleCity(cityName)
  // }

  // removeCity(cityName) {
  //   //Update request for city. If success then call toggleCity
  //   toggleCity(cityName)
  // }

  toggleCity(cityName) {
    this.setState(prevState => {
      let newCities = [...prevState.cities]
      const index = newCities.findIndex(c => c.name == cityName)
      newCities[index].is_included = !newCities[index].is_included

      return({
        cities: newCities
      })
    })
  }

  checkTemperatures(){
    this.setState({loading: true})
    //Fetch all
    fetch(this.props.temperaturePath)
  }

  render () {
    return (
      <table>
        <thead>
          <tr>
            <td>City</td>
            <td>Min</td>
            <td>Max</td>
            <td>Average</td>
            <td>Last Reading</td>
            <td className='right'>
              <button
                onClick={() => {this.checkTemperatures(null)}}
                type='button'
                disabled={this.state.loading}
              >
                Update All
              </button>
            </td>
          </tr>
        </thead>
        <tbody>
          {
          this.state.cities.map((c,i) => {
            const {min, max, avg, last} = c.temperatures
            return(
              <tr key={i}>
                <td>{c.name}</td>
                <td>{min}</td>
                <td>{max}</td>
                <td>{avg}</td>
                <td>{last}</td>
                <td className='right'>
                  <button
                    onClick={() => {this.checkTemperatures(c.name)}}
                    type='button'
                    disabled={this.state.loading}
                  >
                    Update temperature
                  </button>
                </td>
              </tr>
            )
          })
        }
        </tbody>
      </table>
      // <AddRemoveCityButton
      //     city={c}
      //     clickHandler={() => { this.toggleCity(c.name)
      //       // c.is_included ? this.addCity(c.name) : this.removeCity(c.name)
      //     } }
      // />
    );
  }
}

Home.propTypes = {
  cities: PropTypes.array,
  temperaturePath: PropTypes.string
};

function AddRemoveCityButton({city, clickHandler}) {
  const sign = city.is_included ? '-' : '+'
  return(
    <button type='button' onClick={clickHandler}>{sign}</button>
  )
}

export default Home
