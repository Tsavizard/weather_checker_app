import React from 'react'

export default class Cities extends React.Component{

  render(){
    return(
      <ul>
        {
          this.props.cities.map((c,i) => {
            return(
              <li key={i} onClick={() => !this.props.isLoading && this.props.addCity(c.name) }>{c.name}</li>
            )
          })
        }
      </ul>
    )
  }
}