import React, {Component} from "react"
import AutoComplete from "react-autocomplete"

class autoComplete extends Component {

  constructor(props){
    super(props)
    this.state={
      value: ''
    }
  }

  valueHandler(){

  }




	render(){
		return(
      <div className="searchForm">
            <AutoComplete
          
          getItemValue={(item)=> item.label}
          items={[
            { label: 'apple' },
            { label: 'banana' },
            { label: 'pear' }
          ]}
          shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
          renderItem={(item, isHighlighted) =>
            <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
              {item.label}
            </div>
          }
          value={this.state.value}
          onChange={(e) => this.setState({value: e.target.value})}
          onSelect={(value) => this.setState({value})}   
          />
      </div>
		)
	}
}

export default autoComplete
