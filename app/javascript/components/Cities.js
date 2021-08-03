import React from 'react'

export default function Cities({isLoading, cities, addCity}){
  const citiesListStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end'
  }

  if(isLoading){
    return(
      <React.Fragment>
        <h6 style={{textAlign: 'center'}}>Click a city to monitor</h6>
        <ul style={citiesListStyles}>
        {
          cities.map((c,i) => {
            return(<li key={i}> {c.name} </li>)
          })
        }
        </ul>
      </React.Fragment>
    )
  }

  return(
    <React.Fragment>
      <h6 style={{textAlign: 'center'}}>Click a city to monitor</h6>
      <ul style={citiesListStyles}>
        {
          cities.map((c,i) => {
            return(
              <li
                key={i}
                onClick={() => addCity(c.name) }
                style={{cursor: 'pointer'}}
              >
                {c.name}
              </li>
            )
          })
        }
      </ul>
    </React.Fragment>
  )
}