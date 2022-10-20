import { Component } from "react";
import ColorChoices from "../color-choicer";
import OptionChoicer from "../option-choicer";

class Options extends Component {
  handleColorChange = (color) => {
    console.log(color, "this is the color from the parent component");
  };
  handleSizeChange = (size) => {
    console.log(size, "from size in the parent element");
  };
  handleColorChange = (color) => {
    console.log(color);
  };
  renderOptions = (attributes, productId) => {
    return attributes.map((attribute) => {
      if (attribute.type === "swatch")
        return (
          <ColorChoices
            choices={attribute.items}
            id={attribute.id}
            currentActiveChoice={attribute.items[0]}
            handleColorChange={this.handleColorChange}
            key={attribute.id}
            isMini={this.props.isMini}
            productId={productId}
          />
        );

      return (
        <OptionChoicer
          options={attribute.items}
          title={attribute.name}
          id={attribute.id}
          key={attribute.id}
          isMini={this.props.isMini}
          productId={productId}
        />
      );
    });
  };
  render() {
    const { attributes, productId } = this.props;

    return <div>{this.renderOptions(attributes, productId)}</div>;
  }
}

export default Options;
