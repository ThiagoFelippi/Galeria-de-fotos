import $ from 'jquery'



const loadHtmlSuccessCallbacks = []

export function onLoadHtmlSuccess(callback) {
    if (!loadHtmlSuccessCallbacks.includes(callback)) {
        loadHtmlSuccessCallbacks.push(callback)
    }
}

function loadIncludes(parent) { //vai pegar todos os pais
    //se não setar nada pega o body
    if (!parent) parent = 'body'
    //dentro do pai vai procurar todos os elementos com a propriedade wm-include
    $(parent).find('[wm-include]').each((i, e) => { //o e é o elemento que tem a prop wm-include
        const url = $(e).attr('wm-include') //valor do atributo é a url
        $.ajax({
            url,
            success(data) { //pega os dados como param
                $(e).html(data) //botar os dados no html do elemento que tem a prop wm-include
                $(e).removeAttr('wm-include') //evita que seja chamado de novo

                loadHtmlSuccessCallbacks.forEach(callback => callback(data))
                loadIncludes(e)
            }
        })
    })
}

loadIncludes() //passando vai porque passa o body