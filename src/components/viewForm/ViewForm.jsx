import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { Card, CardTitle, CardText } from 'react-toolbox/lib/card';
import Checkbox from 'react-toolbox/lib/checkbox';
import DatePicker from 'react-toolbox/lib/date_picker';
import Dropdown from 'react-toolbox/lib/dropdown';
import Input from 'react-toolbox/lib/input';
import { RadioGroup, RadioButton } from 'react-toolbox/lib/radio';
import Slider from 'react-toolbox/lib/slider';

import { fetchInputs, changeValue } from '../../actions/index';

import styles from './styles';

class ViewFormContainer extends React.Component {
  handleChange(index, field, value) {
    this.props.dispatch(changeValue(index, field, value));
  }

  createInput(input, i) {
    switch (input.type) {
      case 'checkbox':
        return <Checkbox
                  key={i}
                  checked={input.checked}
                  label={input.label}
                  onChange={this.handleChange.bind(this, i, 'checked')} />;
      case 'date-picker':
        return <DatePicker
                  key={i}
                  label={input.label}
                  value={new Date(input.value)}
                  onChange={this.handleChange.bind(this, i, 'value')} />;
      case 'dropdown':
        return <Dropdown
                  key={i}
                  label={input.label}
                  value={input.value}
                  source={input.options}
                  onChange={this.handleChange.bind(this, i, 'value')} />;
      case 'input':
        return <Input
                  key={i}
                  type='text'
                  hint={input.hint}
                  icon={input.icon}
                  label={input.label}
                  maxLength={input.maxLength}
                  required={input.required}
                  value={input.value}
                  onChange={this.handleChange.bind(this, i, 'value')} />;
      case 'radio':
        return <RadioGroup
                  className={styles.radioGroup}
                  key={i}
                  name={input.name}
                  value={input.value}
                  onChange={this.handleChange.bind(this, i, 'value')}>
                  {input.options.map((item, i) =>
                    <RadioButton
                       key={i}
                       label={item.label}
                       value={item.value} />
                  )}
        </RadioGroup>;
      case 'slider':
        return  <div key={i}>
          <p>{input.label}</p>
          <Slider
             min={input.min}
             max={input.max}
             step={input.step}
             value={input.value}
             onChange={this.handleChange.bind(this, i, 'value')}
             pinned
             editable />
        </div>;

      default:
        return undefined;
    }
  }

  componentDidMount() {
    this.props.dispatch(fetchInputs());
  }

  render() {

    return (
      <Card className={styles.card}>
        <CardTitle title='Form'/>
        <CardText>
          {this.props.inputs.map((input, i) => this.createInput(input, i))}
        </CardText>
      </Card>
    );
  }
}

ViewFormContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  inputs: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
  return {
    inputs: state.form.schema || []
  };
};

export default connect(mapStateToProps)(ViewFormContainer);
