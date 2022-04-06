import $ from "jquery";
import validate from "jquery-validation";

function newUserValidation() {
  $("#form_AddNewUser").validate({
    errorElement: "span",
    rules: {
      empName: {
        required: true,
        normalizer: function (value) {
          return $.trim(value);
        },
      },
      empContact: {
        required: true,
        normalizer: function (value) {
          return $.trim(value);
        },
      },
      empEmail: {
        required: true,
        normalizer: function (value) {
          return $.trim(value);
        },
      },
      empPassword: {
        required: true,
        minlength: 8,
        normalizer: function (value) {
          return $.trim(value);
        },
      },
      serviceArea: {
        required: true,
        normalizer: function (value) {
          return $.trim(value);
        },
      },
      empAddress: {
        required: true,
        normalizer: function (value) {
          return $.trim(value);
        },
      },
      destributionCenter: {
        required: true,
        normalizer: function (value) {
          return $.trim(value);
        },
      },
      empNic: {
        required: true,
        normalizer: function (value) {
          return $.trim(value);
        },
      },
      empType: {
        required: true,
        normalizer: function (value) {
          return $.trim(value);
        },
      },
    },
    messages: {
      empName: {
        required: "Name cannot be Empty",
      },
      empContact: {
        required: "Contact Number cannot be Empty",
      },
      empEmail: {
        required: "Email cannot be Empty",
      },
      empPassword: {
        required: "Password cannot be Empty",
      },
      serviceArea: {
        required: "Service Area cannot be Empty",
      },
      empAddress: {
        required: "Address cannot be Empty",
      },
      destributionCenter: {
        required: "Destribution center cannot be Empty",
      },
      empNic: {
        required: "Employee NIC cannot be Empty",
      },
      empType: {
        required: "Employee Type cannot be Empty",
      },
    },
  });
}

export default newUserValidation;
