import $ from 'jquery';
import validate from 'jquery-validation'

function addnewdeliveryrequest(){
    $('#addRequest').validate({
        errorElement: 'span',
        rules:{
            cusName:{
                required:true,
                normalizer: function(value){
                    return $.trim(value);
                }
            },
            cusAddress:{
                required:true,
                normalizer: function(value){
                    return $.trim(value);
                }
            },
            cusContact:{
                required:true,
                normalizer: function(value){
                    return $.trim(value);
                }
            },
            cusServiceArea:{
                required:true,
                normalizer: function(value){
                    return $.trim(value);
                }
            }
        },
        messages:{
            cusName:{
                required:'Vehicle Plate Number Field Required'
            },
            cusAddress:{
                required:'Please Select a Regional Center'
            },
            cusContact:{
                required:'Please Select a Vehicle Type'
            },
            cusServiceArea:{
                required: 'Please Select Availability'
            }
        }
    })
}

export default addnewdeliveryrequest;