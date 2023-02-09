import { Component } from "react";
import ColorChoices from "../color-choicer";
import OptionChoicer from "../option-choicer";

class Options extends Component {
  handleColorChange = (color) => {};
  handleSizeChange = (size) => {};

  renderOptions = (attributes, productId) => {
    return attributes.map((attribute) => {
      if (attribute.type === "swatch")
        return (
          <ColorChoices
            choices={attribute.items}
            id={attribute.id}
            selectedId={attribute.selected}
            isCartOption={this.props.isCartOptions}
            currentActiveChoice={attribute.items[0]}
            selectAttribute={this.props.selectAttribute}
            handleColorChange={this.handleColorChange}
            key={attribute.id}
            isMini={this.props.isMini}
            productId={productId}
            shouldNotChangeOptions={this.props.shouldNotChangeOptions}
          />
        );

      return (
        <OptionChoicer
          options={attribute.items}
          title={attribute.name}
          selectAttribute={this.props.selectAttribute}
          id={attribute.id}
          key={attribute.id}
          isMini={this.props.isMini}
          productId={productId}
          shouldNotChangeOptions={this.props.shouldNotChangeOptions}
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
