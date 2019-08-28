import React from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import Card from './Card'


class PerformantList extends React.PureComponent {

  constructor(props) {
    super(props)

    this.offsetY = 0

    this.boxRef = React.createRef()

    this.handleScroll = this.handleScroll.bind(this)
    this.getOffsetY = this.getOffsetY.bind(this)

    this.state = {
      shouldRefreshList: false,
      startIndex: 0,
      stopIndex: 6,
    }
  }
  getOffsetY(e) { return e.nativeEvent.srcElement.scrollTop } 


  handleScroll(e) {
    const { supplier, itemHeight, itemsDistance, overIndexThreshold } = this.props
    this.offsetY = this.getOffsetY(e)
    const _boxRef = this.boxRef.current

    const boxHeight = _boxRef.clientHeight


    // getting count of how many items could be shown in box container
    const avaliableItemsToSee = Math.floor(boxHeight/(itemHeight+itemsDistance))
    // console.log({avaliableItemsToSee})


    // witch item is currently showing 
    const itemIndex = Math.floor(this.offsetY / ( itemHeight + (itemsDistance/2) ))
    // console.log({ itemIndex })


    // calculating indexes to be shown
    const startIndex = itemIndex <= overIndexThreshold ? itemIndex : itemIndex - overIndexThreshold
    const stopIndex = itemIndex > supplier.length ? itemIndex : itemIndex + avaliableItemsToSee + overIndexThreshold

    console.log({ startIndex, stopIndex })

    this.setState({
      startIndex, stopIndex 
    })
  }


  renderEls() {
    const { startIndex, stopIndex } = this.state
    const { supplier, itemHeight, itemsDistance } = this.props

    let inRangeEls = []

    for(let i = startIndex; i <= stopIndex; i++) {

      const topOffset = i * (itemHeight + itemsDistance)

      inRangeEls.push( 
        { data: supplier[i], itemHeight, itemsDistance, topOffset }
      )
    }

    return (
      <React.Fragment>
        {
          inRangeEls.map(({ data, itemHeight, itemsDistance, topOffset }, i)=> (
            <React.Fragment key={i}>
              <Card 
                data={data}
                itemHeight={itemHeight}
                itemsDistance={itemsDistance}
                topOffset={topOffset}
                />
            </React.Fragment>
          ))
        }
      </React.Fragment>
    )
  }


  render() {
    const { supplier, itemHeight, itemsDistance } = this.props
    // itemsCount * (itemsHeight + (itemsTop&BottomMargin)) + listEndMargin 
    let _calcHeight = supplier.length * (itemHeight + (itemsDistance / 2)) + (itemsDistance / 2)
    return(
        <div className='container'>
          <AutoSizer>
            {({width, height}) => (
                <div 
                  className="box"
                  style={{width, height}}
                  onScroll={this.handleScroll}
                  ref={this.boxRef}
                >
                  <div 
                    className='inner-box'
                    style={{
                      height: _calcHeight,
                      width: '100%'
                    }}
                  >
                    {this.renderEls()}
                    {
                      // supplier.map(({ el }, i) => (
                      //   <div 
                      //     key={i}
                      //     className='card'
                      //     style={{
                      //       margin: `${itemsDistance / 2}px`,
                      //       height: itemHeight
                      //     }}
                      //   >
                      //     {i}
                      //   </div>
                      // ))
                    }
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