PennController.ResetPrefix(null);
PennController.DebugOff();
var showProgressBar = false;

Sequence("Participants","Instructions", randomize("experiment"), SendResults(), "final");

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
        newText("<p>Antes de iniciar, escreva o seu <strong>NOME</strong> abaixo:</p>")
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
        newText('<p style="text-align:center;">Assista com atenção ao vídeo a seguir para compreender como o teste irá funcionar. Após a conclusão do vídeo, clique no botão “Continuar” ou pressione a tecla “C” no teclado.</p>')
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
    row => newTrial ("experiment",
        newAudio("AudioExperiment", row.audio)
            .play()
            ,
            
        newImage("play.png")
            .size( 50, 50)
            .center()
            .print
            ,

        getImage("alto_falante_icone.png")
            .remove()
        ,
                     
        newText("S", variable.aprovar)
        ,
        newText("N", variable.remover)
        ,
        
        newCanvas( "2000vw, 800vh")
            .add( "center at 25%" , "middle at 2%", getText("S") )
            .add( "center at 75%" , "middle at 2%", getText("N") )
            .print
        ,
        newSelector()
            .add( getText("S"), getText("N"))
            .keys("S","N")
            .log()
            .wait()
    )

    .log("grupo", variable.grupo)
    .log("intem", variable.intem)

)
    
newTrial( "Final" ,
    newText("<p> Trabalho finalizado, obrigada pela participação!</p>")
    .center()
 )

.setOption("countsForProgressBar",false);
