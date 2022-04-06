import $ from 'jquery';
import validate from 'jquery-validation'

function signupValidation() {
    $('#signupform').validate({
        errorElement: "error",
        rules: {
            username: {
                required: true,
                normalizer: function (value) {
                    return $.trim(value);
                }
            },
            email: {
                required: true,
                normalizer: function (value) {
                    return $.trim(value);
                }
            },
            nic: {
                required: true,
                normalizer: function (value) {
                    return $.trim(value);
                }
            },
            contact: {
                required: true,
                normalizer: function (value) {
                    return $.trim(value);
                }
            },
            password: {
                required: true,
                normalizer: function (value) {
                    return $.trim(value);
                }
            },
            district: {
                required: true,
                normalizer: function (value) {
                    return $.trim(value);
                }
            },
            role: {
                required: true,
                normalizer: function (value) {
                    return $.trim(value);
                }
            }
        },

        messages:{
            username: {
                required:"Username field cannot be empty"
            },
            email: {
                required: "Email field cannot be empty"
            },
            nic: {
                required: "NIC field cannot be empty"
            },
            contact: {
                required: "Contact field cannot be empty"
            },
            password: {
                required: "Password field cannot be empty"
            },
            district: {
                required: "District field cannot be empty"
            },
            role: {
                required: "Employee Role field cannot be empty"
            }
        }

    })
}

export default signupValidation;