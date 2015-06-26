var React = require('react');

var TextField = require('./TextField');
var RadioGroup = require('./RadioGroup');
var TextArea = require('./TextArea');
var SelectField = require('./SelectField');

var FieldsGroup = React.createClass({

    schemaToComponent: function (schema) {

        var components = {
            "radio": function () {
                return (<RadioGroup key={schema.name} {...schema}/>);
            },
            "textarea": function () {
                return (<TextArea key={schema.name} {...schema}/>);
            },
            "select": function () {
                return (<SelectField key={schema.name} {...schema}/>);
            }
        };

        var component = components[schema.type];
        if (component) {
            return component();
        } else {
            if (!schema.warning) {
                if ("email" == schema.type) {
                    schema.warning = "An email address like name@example.com is required.";
                }
            }

            return (<TextField key={schema.name} {...schema}/>);
        }
    },

    render: function () {

        var nodes = this.props.fields.map(this.schemaToComponent);
        return <div className="live-field field-set">{nodes}</div>;
    }
});

module.exports = FieldsGroup;