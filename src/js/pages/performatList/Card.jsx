import React from 'react'



class Card extends React.PureComponent {

  render() {
    const { data, itemHeight, itemsDistance, topOffset } = this.props

    return(
      <div 
        className='card'
        style={{
          width: `calc(100% - ${itemsDistance}px)`,
          margin: `${itemsDistance / 2}px`,
          height: itemHeight,
          top: topOffset
        }}
      >
        item {data}
      </div>
    )
  }
}


export default Card