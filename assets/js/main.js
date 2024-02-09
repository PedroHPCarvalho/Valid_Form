class ValidaFormulário{
    /* Classe com os recursos para validação do formulario */
    constructor(){
         /* Construtor da classe*/   
        this.formulario = document.querySelector('.formulario')
        /* this.formulario = document.querySelector('.formulario') Aqui, estamos
        selecionando um elemento HTML que possui a classe 'formulario' e 
        armazenando-o na propriedade 'formulario' do objeto atual usando this. */

        this.eventos();
         /*this.eventos(); Aqui, está chamando uma função chamada 'eventos()'é responsável 
        por configurar os eventos ou comportamentos associados ao formulário. */
    }

    eventos(){
        this.formulario.addEventListener('submit', e => {
        /* Aqui, estamos selecionando o formulário (this.formulario) 
        e adicionando um ouvinte de evento para o evento 'submit', que 
        é acionado quando o formulário é enviado.*/ 

          
            this.handleSubmit(e); 
            /* Esta é uma função de callback que será executada quando o evento 'submit' 
            ocorrer. Ela recebe um argumento 'e' 
            (geralmente usado para representar o evento) e chama outra função chamada 
            'handleSubmit', passando o evento 'e' como argumento. */   
        })
    }

    handleSubmit(e){
        /* Esta é uma função que provavelmente é chamada quando o formulário é submetido. 
        Ela recebe um parâmetro e, que é o evento de submissão do formulário. */

        e.preventDefault();
        /* Aqui, "e" é o evento de submissão do formulário. Chamando preventDefault(), 
        você está impedindo o comportamento padrão do navegador para o evento de submissão do formulário, 
        que geralmente é atualizar a página. Isso significa que a página não será recarregada quando 
        o formulário for submetido.*/

       const camposValidos = this.camposValidos();
       /*está sendo chamada uma função chamada CamposValidos() para verificar se os campos do formulário 
       são válidos. O resultado dessa verificação é armazenado na variável CamposValidos. */

       const senhasValidas = this.senhasValidas();


        console.log(camposValidos)
        console.log(senhasValidas)

       if(camposValidos && senhasValidas){
        alert('Formulário enviado');
        this.formulario.submit();
       }
    }

    senhasValidas(){
        let valid = true;

        const senha = this.formulario.querySelector('.senha');
        const repetirSenha = this.formulario.querySelector('.repetir-senha');

        if(senha.value !== repetirSenha.value){
            valid = false;
            this.criaErro(senha, 'Campos senha e repetir senha precisam ser iguais.');
            this.criaErro(repetirSenha, 'Campos senha e repetir senha precisam ser iguais.');
        }
        if(senha.value.length < 6 || senha.value.length > 12){
            valid = false;
            this.criaErro(senha, 'Senha precisa estar entre 6 e 12 caracteres')
        }


        return valid;
    }

    camposValidos(){
        /*CamposValidos() responsável por verificar se os campos do formulário são válidos*/

        let valid = true;
        /* Inicializa uma variável valid como verdadeira. Essa variável 
        será usada para rastrear se todos os campos do formulário são válidos. */
        
        for(let errorText of this.formulario.querySelectorAll('.error-text')){
            errorText.remove();
        }

        for(let campo of this.formulario.querySelectorAll('.validar')){
            /*Este loop for itera sobre todos os elementos do formulário que possuem a 
            classe 'validar'. Parece que esses elementos são os campos que precisam ser 
            validados. */
            
            const label = campo.previousElementSibling.innerText;
            /*Aqui, está sendo obtido o texto do elemento anterior ao campo, presumivelmente 
            um rótulo ou etiqueta, para ser usado na mensagem de erro.*/

            if(!campo.value) {
                /*Dentro do loop, verifica se o valor do campo está vazio. Se estiver 
                vazio, significa que o campo não foi preenchido. */

                this.criaErro(campo, `Campo "${label}" não pode estar em branco.`)
                /*Se o campo estiver vazio, esta linha chama uma função criaErro() para criar 
                uma mensagem de erro. Parece que esta função espera o campo e a 
                mensagem de erro como argumentos. */
                
                valid = false;
                /*Define a variável valid como falsa, indicando que pelo menos um campo não é válido. */
            }

            if(campo.classList.contains('cpf')){
                if(!this.validaCpf(campo)) valid = false;
            }

            if(campo.classList.contains('usuario')){
                if(!this.validaUsuario(campo)) valid = false;
            }
        }
        return valid;
    }

    validaUsuario(campo){
        const usuario = campo.value;
        let valid = true;

        if(usuario.length < 3 || usuario.length > 12){
            this.criaErro(campo, 'Usuário precisa ter entre 6 e 12 caracteres')
            valid = false;
        }

        if(!usuario.match(/^[a-zA-z0-9]+$/g)){
            this.criaErro(campo, 'Usuário precisa conter apenas letras e/ou números')
            valid = false;
        }
        return true;
    }

    validaCpf(campo){
        const cpf = new ValidaCPF(campo.value);

        if(!cpf.valida()){
            this.criaErro(campo, 'CPF Inválido')
            return false;
        }

        return true;
    }

    criaErro(campo,msg){
        /*é responsável por criar uma mensagem de erro e adicioná-la ao DOM 
        (Modelo de Objeto de Documento, em inglês). */

        const div = document.createElement('div');
        /*Cria um novo elemento <div> no documento. Este elemento será usado 
        para exibir a mensagem de erro. */

        div.innerHTML = msg;
        /* Define o conteúdo HTML da <div> recém-criada como a mensagem de 
        erro recebida como argumento. */

        div.classList.add('error-text');
        /*Adiciona a classe CSS 'error-text' à <div>. Esta classe provavelmente contém 
        estilos para formatar a mensagem de erro, como cor de texto vermelha ou fundo destacado. */

        campo.insertAdjacentElement('afterend', div);
        /*criada após o elemento referenciado pelo argumento campo. Isso significa que a 
        mensagem de erro será exibida logo após o campo que causou o erro de validação. */
    }
}

const valida = new ValidaFormulário();