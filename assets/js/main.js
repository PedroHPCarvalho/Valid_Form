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

       const CamposValidos = this.CamposValidos();
       /*está sendo chamada uma função chamada CamposValidos() para verificar se os campos do formulário 
       são válidos. O resultado dessa verificação é armazenado na variável CamposValidos. */
    }

    CamposValidos(){
        /*CamposValidos() responsável por verificar se os campos do formulário são válidos*/

        let valid = true;
        /* Inicializa uma variável valid como verdadeira. Essa variável 
        será usada para rastrear se todos os campos do formulário são válidos. */
        
        for(let campo of this.formulario.querySelectorAll('.validar')){
            /*Este loop for itera sobre todos os elementos do formulário que possuem a 
            classe 'validar'. Parece que esses elementos são os campos que precisam ser 
            validados. */

            if(!campo.value) {
                /*Dentro do loop, verifica se o valor do campo está vazio. Se estiver 
                vazio, significa que o campo não foi preenchido. */

                const label = campo.previousElementSibling.innerText;
                /*Aqui, está sendo obtido o texto do elemento anterior ao campo, presumivelmente 
                um rótulo ou etiqueta, para ser usado na mensagem de erro.*/

                this.criaErro(campo, `Campo "${label}" não pode estar em branco.`)
                /*Se o campo estiver vazio, esta linha chama uma função criaErro() para criar 
                uma mensagem de erro. Parece que esta função espera o campo e a 
                mensagem de erro como argumentos. */
                
                valid = false;
                /*Define a variável valid como falsa, indicando que pelo menos um campo não é válido. */
            }
        }
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