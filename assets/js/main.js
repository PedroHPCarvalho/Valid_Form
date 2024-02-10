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
        /*essa função é responsável por verificar se as senhas inseridas em um formulário são 
        válidas. O resultado dessa verificação está sendo armazenado na variável senhasValidas.*/

        // console.log(camposValidos)
        // console.log(senhasValidas)

       if(camposValidos && senhasValidas){
        /*usando um if para verificar duas condições. A expressão camposValidos && senhasValidas 
        verifica se tanto camposValidos quanto senhasValidas são verdadeiros. Se ambas as 
        condições forem verdadeiras, o bloco de código dentro do if será executado. */

        alert('Formulário enviado');
        /*Se os campos do formulário forem válidos e as senhas também forem válidas, 
        uma caixa de alerta será exibida com a mensagem "Formulário enviado*/

        this.formulario.submit();
        /* Em seguida, o código está submetendo o formulário atual. Isso geralmente faz com 
        que os dados do formulário sejam enviados para o servidor para processamento. */
       }
    }

    senhasValidas(){
        /*responsável por verificar se as senhas inseridas em um formulário são válidas.*/

        let valid = true;
        /*Inicializa uma variável valid como verdadeira. 
        Essa variável será usada para rastrear se as senhas são válidas. */

        const senha = this.formulario.querySelector('.senha');
        const repetirSenha = this.formulario.querySelector('.repetir-senha');
        /*Aqui, são obtidos os elementos do formulário que representam 
        os campos de senha e repetir senha. */

        if(senha.value !== repetirSenha.value){
            valid = false;
            this.criaErro(senha, 'Campos senha e repetir senha precisam ser iguais.');
            this.criaErro(repetirSenha, 'Campos senha e repetir senha precisam ser iguais.');
        }
        /*Verifica se os valores dos campos de senha e repetir senha são diferentes. Se forem 
        diferentes, isso indica que as senhas não correspondem e portanto não são válidas. A 
        função cria uma mensagem de erro para cada campo indicando que as senhas precisam ser
        iguais. */


        if(senha.value.length < 6 || senha.value.length > 12){
            valid = false;
            this.criaErro(senha, 'Senha precisa estar entre 6 e 12 caracteres')
        }
        /*Verifica se o comprimento da senha está entre 6 e 12 caracteres. Se 
        não estiver, a senha é considerada inválida e a função cria uma mensagem de erro 
        para o campo de senha indicando que a senha precisa ter entre 6 e 12 caracteres.*/


        return valid;
       /*Retorna o status de validade das senhas. Se todas as verificações forem passadas com 
       sucesso e valid permanecer como true, isso significa que as senhas são válidas e a função 
       retorna true. Caso contrário, valid será false e a função retornará false, indicando que as
        senhas não são válidas. */ 
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
            /*Verifica se o campo atual tem a classe CSS 'cpf'. Se tiver, isso significa que
            é um campo que deve conter um CPF. Em seguida, verifica a validade do CPF 
            usando uma função chamada validaCpf(campo). */
                if(!this.validaCpf(campo)) valid = false;
                /*Se o campo for um CPF e a validação do CPF falhar 
                (ou seja, a função validaCpf(campo) retornar false), a variável valid 
                será definida como false, indicando que o campo não é válido. */
            }
            

            if(campo.classList.contains('usuario')){
                /*Verifica se o campo atual tem a classe CSS 'usuario'. Se tiver, isso 
                significa que é um campo que deve conter um nome de usuário. Em seguida, 
                verifica a validade do nome de usuário usando uma função chamada  */

                if(!this.validaUsuario(campo)) valid = false;
                /*Se o campo for um nome de usuário e a validação do usuário falhar 
                (ou seja, a função validaUsuario(campo) retornar false), a variável valid 
                será definida como false, indicando que o campo não é válido. */
            }
            
        }
        return valid;
    }

    validaUsuario(campo){
        //a validação do campo de usuário está sendo realizada. 

        const usuario = campo.value;
        //Esta linha obtém o valor do campo de entrada do usuário.

        let valid = true;
        //Inicializa uma variável valid como verdadeira. 
        //Esta variável será usada para rastrear se o campo do usuário é válido.

        if(usuario.length < 3 || usuario.length > 12){
            this.criaErro(campo, 'Usuário precisa ter entre 6 e 12 caracteres')
            valid = false;
        }
        /*Verifica se o comprimento do nome de usuário está entre 3 e 12 caracteres. 
        Se não estiver, uma mensagem de erro é criada indicando que o usuário precisa 
        ter entre 6 e 12 caracteres, e a variável valid é definida como false. */

        if(!usuario.match(/^[a-zA-z0-9]+$/g)){
            this.criaErro(campo, 'Usuário precisa conter apenas letras e/ou números')
            valid = false;
        }
        /*Verifica se o nome de usuário contém apenas letras e/ou números. 
        Se o nome de usuário contiver caracteres que não sejam letras ou números, 
        uma mensagem de erro é criada indicando que o usuário precisa conter apenas 
        letras e/ou números, e a variável valid é definida como false. */

        return true;
        /*O problema aqui é que a função sempre retorna true, independentemente do 
        resultado das verificações anteriores. Isso significa que mesmo se as 
        verificações falharem e valid for definido como false, a função ainda retorna true, 
        o que não é o comportamento desejado. */
    }

    validaCpf(campo){
        //a validação do campo de CPF está sendo realizada. 

        const cpf = new ValidaCPF(campo.value);
        /* Cria um novo objeto ValidaCPF, que parece ser uma classe 
        ou função que lida com a validação de CPF. O valor passado para 
        o construtor é o valor do campo de entrada do CPF. */

        if(!cpf.valida()){
        /*Verifica se o CPF é válido chamando o método valida() no objeto cpf. 
        Se o método valida() retornar false, isso significa que o CPF não é válido.
         Nesse caso, uma mensagem de erro é criada indicando que o CPF é inválido, e a 
         função retorna false. */

            this.criaErro(campo, 'CPF Inválido')
            // Se o CPF for válido (ou seja, o método valida() retornar true), 
            //a função retorna true. Isso indica que o CPF é válido e passou na validação.
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