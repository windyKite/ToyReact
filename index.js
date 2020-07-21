import { ToyReact, Component } from './ToyReact'

class MyComponent extends Component{
  render(){
    return <div>
      自定义组件的render返回内容!
      <div>
        {true}
        {this.children}
      </div>
    </div>
  }

}

class ComponentB extends Component {
  render() {
    return <div>
      ComponentB
    </div>
  }
}

let a = <MyComponent name="a">
  <div>dddddddd</div>
  <ComponentB/>
</MyComponent>

// let a = <div name="a">
//   <span>hello</span>
//   <span>world</span>
//   <span>!</span>
// </div>

console.log(a)

// 相当于 ReactDOM.render
ToyReact.render(a, document.getElementById('root'))