/**
 * Created by bgrace on 2/24/15.
 */

var React = require('react');

module.exports = React.createClass({
    render: function () {
        var warning = this.props.warning ? this.props.warning : "This field is required.";
        return (
            <small className="error"><strong>{ warning }</strong></small>
        );
    }
});