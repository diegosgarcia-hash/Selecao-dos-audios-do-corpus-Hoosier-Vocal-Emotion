PennController.ResetPrefix(null);
PennController.DebugOff();
var showProgressBar = false;

Sequence("Participants","Instructions", randomize("Experiment"), SendResults(), "Final");

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
            src="https://www.youtube.com/embed/K4myJ86BWdM?si=39vrd5lO94S_1ar7"
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

    .log("NOME", getVar("NOME"))             // nome do participante
    .log("AUDIO", row.audio)                 // nome do arquivo de áudio
    .log("SENTENCA", row.sentenca)           // nome exibido
    .log("TRANSCRICAO", row.transcricao)     // transcrição exibida
    .log("RESPOSTA",    getVar("RESPOSTA"))  // RESPOSTA
    .log("GRUPO", row.grupo)                 // se precisar
    .log("ITEM", row.intem)                   // se precisar

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
