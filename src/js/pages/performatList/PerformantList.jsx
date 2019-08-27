import React from 'react'
import ReactDOM from 'react-dom'
import AutoSizer from 'react-virtualized-auto-sizer'


class PerformantList extends React.PureComponent {

  constructor() {
    super()
  }

  trackOffsetY(e){
    console.log(e.nativeEvent.srcElement.scrollTop)
  }

  renderEls() {
    return null
  }


  render() {
    const { supplier, itemHeight } = this.props
    let _calcHeight = supplier.length * itemHeight

    return(
        <div className='container'>
          <AutoSizer>
            {({width, height}) => (
                <div 
                  className="box"
                  style={{width, height}}
                  onScroll={this.trackOffsetY}
                >
                  <div 
                    className='inner-box'
                    style={{
                      height: _calcHeight,
                      width: '100%'
                    }}
                  >
                    {this.renderEls()}
                  </div>

                </div>
              )
            }
          </AutoSizer>
        </div>
    )
  }
}

export default PerformantList;