import React from 'react';
import Formsy from 'formsy-react';
import Widget from './Widget'

var RadioButton = React.createClass({

    render: function () {
        return (
            <span className={this.props.wrapperClass}>
                <input type="radio" name={this.props.name} value={this.props.value} onChange={this.props.onChange} id={this.props.id} defaultChecked={this.props.checked}/>
                <label htmlFor={this.props.id}>{this.props.label}</label>
            </span>
        );
    }
});

var RadioGroup = React.createClass({

    mixins: [Widget, Formsy.Mixin],

    onChange: function(event) {
        this.setValue(event.target.value);
    },

    render: function () {
        var name = this.props.name;

        var buttons = this.props.options.map(function (option) {
            var value = option.value;
            var checked = value === this.getValue();

            return (
                <RadioButton key={value} checked={checked} name={name} value={value} wrapperClass={this.props.wrapperClass} onChange={this.onChange} {...option} />
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
