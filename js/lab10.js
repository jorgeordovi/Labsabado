$(document).ready(function(){

function Validate(){};

  Validate.prototype = {
    email : function(email){
      var pattern = new RegExp(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]+$/);
      return pattern.test(email);
    },
    userid : function(uid){
      var pattern = new RegExp(/^[0-9]+$/);
      return pattern.test(uid);
    }
  };

  $('.nid-error').addClass('error');
  $('.nid-error').hide();
  $('.user-error').addClass('error');
  $('.user-error').hide();
  $('.password-error').addClass('error');
  $('.password-error').hide();
  $('.conf-password-error').addClass('error');
  $('.conf-password-error').hide();
  $('.email-error').addClass('error');
  $('.email-error').hide();
  $('.food-error').addClass('error');
  $('.food-error').hide();
  $('.pay-error').addClass('error');
  $('.pay-error').hide();
  $('.city-error').addClass('error');
  $('.city-error').hide();
  $('#buttons #info').remove();
 

  $('.button').bind('click', function(event){

  	var validate = new Validate();

  	var data = $('#nid').val();

  	if(validate.userid(data)){
      $('#nid').next().hide();
      $('.nid-error').next().hide();
      localStorage.setItem('nid', data);
    }
    else{
      $('#nid').next().show();
      $('input#nid').addClass('error');
      $('.nid-error').next().show();
      $('.nid-error').text('Indique su Documento de Identidad');
    }

    var data=$('#username').val();

    var len=data.length;
    
    if(len<1 && data === ""){
      $('#username').next().show();
      $('.user-error').next().show();
      $('.user-error').text('Por favor indique su(s) Nombre(s) y Apellido(s)');
    }
    else{
      $('#username').next().hide();
      $('.user-error').next().hide();
      localStorage.setItem('username', data);
    }

    var data=$('.password').val();

    var len=data.length;
    
    if(len<1 && len!==""){
      $('.password').next().show();
      $('.password-error').next().show();
      $('.password-error').text('Indique una Contraseña');
    }
    else{
      $('.password').next().hide();
      $('.password-error').next().hide();
    }


    var confData=$('.conf-password').val();

    var len=confData.length;

    if(len<1){
      $('.conf-password').next().show();
      $('.conf-password-error').next().show();
      $('.conf-password-error').text('Confirme la Contraseña');
    }
    else{
      $('.conf-password').next().hide();
      $('.conf-password-error').next().hide();

      if($('.password').val() !== $('.conf-password').val()){
        $('.conf-password').next().show();
        $('.conf-password-error').next().show();
        $('.conf-password-error').text('¡La Contraseña No es igual!');
      }
      else{
        $('.conf-password').next().show();
        $('.conf-password-error').hide();
        localStorage.setItem('password', data);
      }
    }


    var  data=$('.emailadd').val();
    
    if(validate.email(data)){
      // $('.emailadd').next().hide();
      $('.email-error').hide();
      localStorage.setItem('email', data);
    }
    else{
      $('.emailadd').next().show();
      $('.email-error').next().show();
      $('.email-error').text('¡El email es incorrecto!');
    }


    var count=0, meals={};
    
    $('#checkboxes').find(':checkbox').each(function(){
      if($(this).is(':checked')){
        count+=parseInt($(this).val());
        meals[$(this).attr('name')] = parseInt($(this).val());
      }
    });
    
    if(count==0){
      $('.food-error').css({'margin':50}).show();
      $('.food-error').text('¡Debe seleccionar un Alimento!');
    }
    else{
      $('.food-error').hide();
      $('.food-total').show();
      $('.food-total').text('Total de la compra: $' + count + ' M/Cte');
      localStorage.setItem('total', count);
      localStorage.setItem('meals', JSON.stringify(meals));
    }


  });

});