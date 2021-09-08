var hypnobox = new (function() {
	var self = this;

	self.construct = function(){
		self.monitorForm();
		self.monitorWhatsapp();
	}


	self.monitorWhatsapp = function(){
		var hypnoboxForms = document.querySelectorAll('[hypnobox-whatsapp]');

		for (var i = 0; i < hypnoboxForms.length; i++) {
			var el = hypnoboxForms[i];

			el.removeAttribute('hypnobox-whatsapp');
			el.removeAttribute('href');
			el.setAttribute('hypnobox-whatsapp-initialized','');
			el.onclick = function(){
				self.openChat();
				return false;
			}
		}

		setTimeout(function(){
			self.monitorWhatsapp();
		},1000);
	}

	self.openChat = function(){
		var height = 497;
		var width = 674;
		var left = (screen.width/2)-(width/2);
  		var top = (screen.height/2)-(height/2);

  		var subdomain = 'casa8';
  		// var subdomain = 'casa8-homolog';

  		var parameters = '&produto=3'
  			+'&tipo_atendente=whatsapp'
  			+'&canal=whatsapp'
  			+'&subcanal=whatsapp';
		
		window.open('http://'+subdomain+'.hypnobox.com.br/atendimento?controle=Atendimento&acao=index'+parameters,"Chat","top="+top+",left="+left+",width="+width+",height="+height+",resizable=yes,toolbar=no,scrollbars=no");
				
	}


	self.monitorForm = function(){
		var hypnoboxForms = document.querySelectorAll('[hypnobox]');

		for (var i = 0; i < hypnoboxForms.length; i++) {
			var el = hypnoboxForms[i];
			el.removeAttribute('hypnobox');
			el.setAttribute('hypnobox-initialized','');
			el.onsubmit = function(){
				self.send(this);
				return false;
			}
		}

		setTimeout(function(){
			self.monitorForm();
		},1000);
	}



	self.send = function(form){
	
		var nome = '';
		var sobrenome = '';
		var email = '';
		var tel = '';
		var message = '';

		if(form.querySelector('[name="nome"]'))
		nome = form.querySelector('[name="nome"]').value;

		if(form.querySelector('[name="sobrenome"]'))
		sobrenome = form.querySelector('[name="sobrenome"]').value;
	
		if(form.querySelector('[name="email"]'))
		email = form.querySelector('[name="email"]').value;
	
		if(form.querySelector('[name="telefone"]'))
		tel = form.querySelector('[name="telefone"]').value;
	
		if(form.querySelector('[name="mensagem"]'))
		message = form.querySelector('[name="mensagem"]').value;

		
		var subdomain = 'casa8';
  		// var subdomain = 'casa8-homolog';

		var dataForm = {
			'nome':nome+' '+sobrenome,
			'email':email,
			'id_produto':'3',
			'assunto':'assunto test',
			'mensagem':message,
			'tel_comercial  ':tel
		};


		form.classList.add('-loading');

	
	

		$.ajax({
			url:'https://'+subdomain+'.hypnobox.com.br/email.receber.php',
			method:"post",
			data:dataForm,
			success:function(response){

				if(response.id !== "NULL"){
					form.classList.remove('-loading');
					form.reset();
					$('#formhypnobox').modal('show');
				}else{
					console.log('error-hypnobox');
					form.classList.remove('-loading');
				}
			},error:function(response){
	
			}
		});
	}


	self.construct();
	return self;
});

