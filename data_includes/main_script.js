PennController.ResetPrefix(null);
PennController.DebugOff();

Sequence("Terms", "Participants","Instructions", randomize("Experiment"), SendResults(), "Final");

Header(
    defaultText
        .css("font-size","1.2em")
        .center()
        .print()
    ,
    defaultTextInput
        .css("font-size","1.2em")
        .center()
        .print()
    ,
    defaultButton
        .css("font-size","1.2em")
        .print()
        .center()
        .wait()
    )
    
    newTrial("Terms",
        newImage("LogoUAST","images.png")
        .center()
        .print()
        ,
        newText(
        "<p style='text-align: center;'><strong>TERMO DE CONSENTIMENTO PARA PARTICIPAÇÃO EM PESQUISA</strong></p>"
            )
        ,
        newText(
        `<p style="text-align: justify;">
            Você foi selecionado(a) para participar da pesquisa <strong>"ANÁLISE ACÚSTICA DA RAIVA E TRISTEZA NO CORPUS HOOSIER VOCAL EMOTION COLLECTION EM RELAÇÃO A PADRÕES ACÚSTICOS DESCRITOS NA LITERATURA"</strong>, sob a responsabilidade do pesquisador Diego Silva Garcia e orientador Ebson Wikerson.<br><br>
            Esta pesquisa tem como objetivo aacvaliar os padrões acústicos presentes nas emoções raiva e tristeza do corpus Hoosier Vocal Emotion Collection e o que a literatura descreve. Sua participação é voluntária e será realizada por meio deste formulário eletrônico, no qual você ouvirá cada áudios do corpus e indicará se os aprova ou não para a análise acústica. Todas as respostas serão anônimas e utilizadas exclusivamente para fins acadêmicos, a partir dos dados obtidos serão selecionados os 15 áudios mais votados para seguir para a análise acústica.<br><br>
            Ao continuar e enviar suas respostas, você concorda que os dados coletados sejam utilizados na pesquisa e na elaboração do TCC. Para quaisquer dúvidas, você pode entrar em contato com o pesquisador responsável:</p>`
            )
        ,
        newText("<p style='text-align:center;'><strong>E-mail: diego.sgarcia@ufrpe.br</strong></p>")
        ,
        newText("<p></p>")
        ,
        newButton("CONCORDO E CONTINUE")
            .css({"margin-bottom": "50px"})  // espaço de 50px abaixo do botão
        )
    
    newTrial("Participants",
        newText("<p>Bem-Vindos!</p>")
        ,
        newText("<p>Antes de iniciar, escreva o seu <strong>nome completo</strong> abaixo.</p>")
        ,
        newTextInput("Nome")
        ,
        newText("<p></p>")
        ,
        newButton("Iniciar")
        ,
        newVar("NOME") //Retorna os dados de "Nome" para "NOME"
            .global()
            .set( getTextInput("Nome") )
    )

.log( "NOME" , getVar("NOME") )

    newTrial("Instructions",
         
        newText("<p><strong>INSTRUÇÕES:</strong></p>")
        .center()
        ,
        newText('<p style="text-align:center;">Assista com atenção ao vídeo a seguir para compreender como o teste irá funcionar.</p>')
        ,  
        newHtml("yt", `
            <iframe width="560" height="315"
            src="https://www.youtube.com/embed/uY6e-dlTbdY"
            frameborder="0" allowfullscreen>
           </iframe>
          `)
        .center()
        .print()
        ,
        newText("<p></p>")
        ,
        newButton("Iniciar")
        .log()
)

Template("lista_de_pseudopalavras.csv",
    row => newTrial ("Experiment",
        newAudio("AudioExperiment", row.audio)
            ,
            
        newText("nome", `<p style="font-size: 1.8em;"><strong>${row.sentenca}</strong></p>`)
            .center()
            .print()
        ,
        
        newText("transcricao", `<p style="font-size: 1.3em; color: #444;">${row.transcricao}</p>`)
            .center()
            .print()
        ,
        
        getAudio("AudioExperiment")
            .play()
        ,
        
        newText("<p></p>")
        ,
                     
        newText("S", row.Aprovar)
        ,
        newText("N", row.Remover)
        ,
        
        newCanvas( "opcoes", 800, 200)
            .add( "center at 40%" , "middle at 50%", getText("S") )
            .add( "center at 60%" , "middle at 50%", getText("N") )
            .center()
            .print()
        ,
        
        newVar("RESPOSTA")
            .global()
        ,
        
        newSelector("ESCOLHA")
            .add( getText("S"), getText("N"))
            .keys("S","N")
            .log()
            .wait()
            .test.selected(getText("S"))
                    .success( getVar("RESPOSTA").set(row.Aprovar) )
                    .failure( getVar("RESPOSTA").set(row.Remover) )
    )

    .log("NOME", getVar("NOME"))
    .log("AUDIO", row.audio)
    .log("SENTENCA", row.sentenca)
    .log("TRANSCRICAO", row.transcricao)
    .log("RESPOSTA",    getVar("RESPOSTA"))
    .log("GRUPO", row.grupo)
    .log("ITEM", row.intem)

)
    
newTrial( "Final" ,
    newText("<p><strong>Obrigada pela participação!</strong></p>")
    .center()
    .print()
    ,
    
    newText("<p>Salve os dados da sua seleção clicando no botão <strong>Finalizar</strong>.</p>")
    .center()
    .print()
    ,

    newButton("Finalizar")
    .wait()
 )

.setOption("countsForProgressBar",false);
