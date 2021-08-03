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
    this.setLoading(true)
    const fd = new FormData
    fd.append('city_name', cityName)

    Rails.ajax({
      type: 'POST',
      url: this.props.cityPath,
      dataType: 'json',
      data: fd,
      success: res => {
        if(res.success) this.toggleCity(cityName)
      },
      error: res => { },
      complete: res => {
        this.setLoading(false)
      }
    })
  }

  removeCity(cityName) {
    this.setLoading(true)
    Rails.ajax({
      type: 'DELETE',
      url: `${this.props.cityPath}/${cityName}`,
      dataType: 'json',
      success: res => {
        if(res.success) this.toggleCity(cityName)
      },
      error: res => { },
      complete: res => {
        this.setLoading(false)
      }
    })
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

  setLoading(loading){
    if(loading){
      document.body.style.cursor='wait';
    }else{
      document.body.style.cursor='default';
    }
    this.setState({isLoading: loading})
  }

  render () {
    const excludedCities = this.state.cities.filter(c => !c.is_included)
    const rows = this.state.cities.filter(c => c.is_included).map((c,i) => {
      const {min, max, avg, last} = c.temperatures
      return(
        <tr key={i}>
          <td>{c.name}</td>
          <td>{min}</td>
          <td>{max}</td>
          <td>{parseFloat(avg).toFixed(2) || '-'}</td>
          <td>{last}</td>
          <td>
            <button
              type='button'
              onClick={() => {this.removeCity(c.name)}}
              disabled={this.state.isLoading}
            >
                Remove
            </button>
          </td>
        </tr>
      )
    })

    return (
      <div className='row'>
        <div className='col s2' style={{borderRight: '1px solid black'}}>
          {excludedCities.length > 0 &&
            <Cities
              addCity={this.addCity.bind(this)}
              cities = {excludedCities}
              isLoading={this.state.isLoading}
            />
          }
        </div>
        <div className='col s10'>
          { rows.length > 0 ?
            <table>
              <thead>
                <tr>
                  <td>City</td>
                  <td>Min</td>
                  <td>Max</td>
                  <td>Average</td>
                  <td>Last</td>
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
                { rows }
              </tbody>
            </table>
          :
            <h6
              style={{textAlign: 'center'}}
            >
              To monitor the temperature of a city please select it from the menu to the left
            </h6>
        }
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  cities: PropTypes.array,
  temperaturePath: PropTypes.string
};

export default Home
