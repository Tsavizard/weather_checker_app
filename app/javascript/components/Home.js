import React from "react"
import PropTypes from "prop-types"
import Cities from './Cities'
import Rails from '@rails/ujs'

class Home extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      cities: this.props.cities,
      isLoading: false
    }
    this.checkTemperatures = this.checkTemperatures.bind(this)
  }

  componentDidMount(){
    this.checkTemperatures()
  }

  addCity(cityName) {
    this.setState({isLoading: true})

    Rails.ajax({
      type: 'POST',
      url: this.props.cityPath,
      dataType: 'json',
      data: JSON.stringify({
        city_name: cityName
      }),
      success: res => {
        if(data.success) toggleCity(cityName)
      },
      error: res => {

      },
      complete: res => {
        this.setState({isLoading: false})
      }
    })
  }

  removeCity(cityName) {
    fetch(`${this.props.cityPath}/${cityName}`, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
      if(data.success) toggleCity(cityName)
    });
  }

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
    this.setState({isLoading: true})

    const q = this.state.cities.map(c => c.name).join(',')
    fetch(`${this.props.temperaturePath}?city_names=${q}`)
      .then(response => response.json())
      .then(data => {
        if(!data.res) return

        this.setState(prevState => {
          const {cities} = prevState
          data.res.forEach(cityObj => {
            const cityName = Object.keys(cityObj)[0]
            const i = cities.findIndex(city => city.name == cityName)

            cities[i].temperatures = {...cityObj[cityName]}
          })
          return({
            cities: cities,
            isLoading: false
          })
        })
      })
  }

  render () {
    return (
      <div className='row'>
        <h6>Click a city to monitor</h6>
        <div className='col s2'>
          <Cities
            addCity={this.addCity.bind(this)}
            cities = {this.state.cities.filter(c => !c.is_included)}
            isLoading={this.state.isLoading}
          />
        </div>
        <div className='col s10'>
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
                    onClick={this.checkTemperatures}
                    type='button'
                    disabled={this.state.isLoading}
                  >
                    Update All
                  </button>
                </td>
              </tr>
            </thead>
            <tbody>
              {
              this.state.cities.filter(c => c.is_included).map((c,i) => {
                const {min, max, avg, last} = c.temperatures
                return(
                  <tr key={i}>
                    <td>{c.name}</td>
                    <td>{min}</td>
                    <td>{max}</td>
                    <td>{parseFloat(avg).toFixed(2)}</td>
                    <td>{last}</td>
                    <td>
                      <button type='button' onClick={() => {removeCity(c.name)}}>Remove </button>
                    </td>
                  </tr>
                )
              })
            }
            </tbody>
          </table>
        </div>
      </div>

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
