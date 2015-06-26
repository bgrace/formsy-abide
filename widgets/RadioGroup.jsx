import React from 'react';
import Formsy from 'formsy-react';
import Widget from './Widget'

var RadioButton = React.createClass({
    onChange: function(event) {
        this.props.setValue(this.props.label);
    },
    render: function () {
        return (
            <span>
                <input type="radio"
                    name={this.props.name}
                    onChange={this.onChange}
                />
                <label forHtml={this.props.id}>{this.props.label}</label>
            </span>
        );
    }
});

var RadioGroup = React.createClass({

    mixins: [Widget, Formsy.Mixin],

    render: function () {
        var name = this.props.name;
        var buttons = this.props.options.map(function (option) {
            return (
                <RadioButton key={option.id} setValue={this.setValue} {...option} name={ name }/>
            );
        }, this);

        return (
            <div>
                <label><strong>{ this.props.label }</strong></label>
                <div>{ buttons }</div>
            </div>
        );
    }
});

module.exports = RadioGroup;