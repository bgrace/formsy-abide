import React from 'react';
import Formsy from 'formsy-react';
import FieldWarning from './FieldWarning';
import Widget from './Widget'

var SelectOption = React.createClass({
    render: function () {
        return (
            <option value={ this.props.value } selected={this.props.selected}>{ this.props.label }</option>
        );
    }
});

var SelectField = React.createClass({

    mixins: [Widget, Formsy.Mixin],

    componentDidMount: function() {
        this.setValue(this.props.defaultValue);
    },

    render: function () {
        var required = this.props.required ? <small>required</small> : "";
        var options = this.props.options.map(function (option) {
            return (<SelectOption key={option.value} {...option} />);
        });
        var dummyNode = this.props.required ? <SelectOption key="_dummy" value="" label={this.props.placeholder} /> : false;

        return (
            <div>
                <label>
                    <strong>{this.validityCheck()} { this.props.label }</strong> {required}
                    <select required={ this.props.required }
                            defaultValue={ this.props.defaultValue }
                            value={this.getValue()}
                            name={this.name}
                            onBlur={this.blurred}
                            onChange={this.valueChanged}
                            disabled={this.isFormDisabled()}>
                    {dummyNode}
                    { options }
                    </select>
                </label>
                <FieldWarning warning={this.getErrorMessage()} />
            </div>

        );
    }
});

module.exports = SelectField;