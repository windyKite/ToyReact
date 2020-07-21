class ElementWrapper {
  constructor(type) {
    this.root = document.createElement(type)
  }
  setAttribute(name, value) {
    this.root.setAttribute(name, value)
  }
  appendChild(vchild) {
    vchild.mountTo(this.root)
  }
  mountTo(parent) {
    parent.appendChild(this.root)
  }
}

class TextWrapper {
  constructor(content) {
    this.root = document.createTextNode(content)
  }
  mountTo(parent) {
    parent.appendChild(this.root)
  }
}

export class Component {
  constructor() {
    this.children = []
  }
  setAttribute(name, value) {
    this[name] = value
  }
  mountTo(parent) {
    let vdom = this.render()
    vdom.mountTo(parent)
  }
  appendChild(vchild) {
    this.children.push(vchild)
  }
}

export const ToyReact = {
  createElement(type, attributes, ...children) {
    // new 一个元素的实例出来
    let element
    if (typeof type === 'string') {
      // 原生html元素
      element = new ElementWrapper(type)
    } else {
      // 自定义组件元素
      element = new type
    }

    for (const name in attributes) {
      element.setAttribute(name, attributes[name])
    }

    let insertChildren = (children) => {
      for (let child of children) {
        if (typeof child === "object" && Array.isArray(child)) {
          insertChildren(child)
        } else {
          if (!(child instanceof Component) && !(child instanceof ElementWrapper) && !(child instanceof TextWrapper)) {
            child = String(child)
          }
          if (typeof child === 'string') {
            // 文本节点 
            child = new TextWrapper(child)
          }
          element.appendChild(child)
        }// 子元素是字符串，创建文本节点, 但是好像不加也一样?
      }
    }

    insertChildren(children)

    return element
  },
  render(vdom, element) {
    vdom.mountTo(element)
  }
}