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
    this.checkTemperatures()
  }

  checkTemperatures(){
    //Fetch temperatures
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

  render () {
    return (
      <React.Fragment>
        <div>
          <h1>Welcome to Weather Checker</h1>
        </div>

        <div className='row'>
          <span >Cities: </span>
          {
            this.state.cities.map((c,i) => {
              return(
                <div className='col s12' key={i}>
                  { c.name }
                  <AddRemoveCityButton
                    city={c}
                    clickHandler={() => { this.toggleCity(c.name)
                      // c.is_included ? this.addCity(c.name) : this.removeCity(c.name)
                    } }
                />
                </div>
              )
            })
          }
        </div>
      </React.Fragment>
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
