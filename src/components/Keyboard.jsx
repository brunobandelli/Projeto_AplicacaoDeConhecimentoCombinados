import React, { useState, useEffect } from "react";
import Display from "./Display";
import DB from "../database/db.json"


/* NÃO IREI UTILIZAR O OPERADOR "this." POR QUE NÃO FUNCIONA CORRETAMENTE DENTRO DO CONTEXTO REACT, PARA ISSO EXISTE OS HOOKS.*/
/* BUG: !!!! verificar o problema de execução interrupta do windowsalert. DA LINHA 59 !!!!*/

export default function Keyboard(){

    /*Onde é armazenado o calculo */
    const [num, setNum] = useState(0)
    /*Armazena o estado atual dos Botões numericos clicados para referencia do alert*/
    const [click, setClick] = useState(false)
    /*Armazena o estado atual do Botão limpar clicado*/
    const [cleaned, setCleaned] = useState(false)
    /*Armazena os valores calculados*/
    const [history, setHistory] = useState([0])
    /*Armazena o estado do botão porem para referencia do botão history */
    const [calculed, setCalculed] = useState(false)
    /*Armazena o valor de history dentro de memory*/
    const [memory, setMemory] = useState([0])
    /*Armazena o estado atual do botão verificar historico como referencia para memory */
    const [showHistory, setShowHistory] = useState(false)


    /*Conversão apenas para didática de OBJECT PARA JSON E INVERSO*/
    const memoryJson = JSON.stringify(memory)
    const memoryOBJ = JSON.parse(memoryJson)

    console.log(typeof memoryJson + " Json: " + memoryJson)
    console.log(typeof memoryOBJ + " OBJ: " + memoryOBJ)


    useEffect(()=>{                                 
        if(calculed === true ){                         //verifica se o valor foi calculado(quando o botão é clicado)
                const newHistory = [...history, num]    // acomula os valores dentro de uma variavel do resultado anterior e posterior
                setHistory(newHistory)                  //recebe o valor acomulado da variavel de cima
                setCalculed(false)                      //transforma em false após o calculo o valor do botão
        }
    },[calculed])

    // useEffect(()=>{
        if(showHistory === true){                       //verifica se o botão de registrar foi apertado
            setMemory(history)                          //recebe o valor armazenado em history "registrando o ultimo valor armazenado na variavel"
            setShowHistory(false)                       //transoforma o valor do botão em false após click em registrar
        }
    // },[showHistory])



    useEffect(() => {

            if (click === false ){     // verificar se o botão foi clicado
                console.log(click)
                  window.alert("Clique em qualquer numero para somar");
                
              }
        setTimeout(() => {              // depois de 10s tranforma o botão em false
            if(click === true){         
                setClick(false)
            }
        }, 10000);
      },[click]);

       
      useEffect(()=> {

        setTimeout(()=>{
            if(cleaned === true){               // verifica se o botão de limpar foi clicado, e depois traforma ele em false
                window.alert("tá limpo fião!")
                setCleaned(false)
            }
        },100)

      },[cleaned])

    return(
        <>

        {/* Display */}
        <Display 
        num={"Valor atual: " + num} 
        memory={"Histórico: " + memory.join(", ")} 
        /*ESSA PARTE DE BAIXO COMENTEI PRA NÃO FICAR POLUIDO, MAS NO COMEÇO DO CODIGO EU JA FAÇO ISSO E RETORNO NO CONSOLE.LOG */
        // convertedJSON = {"Convertido para JSON " + typeof memoryJson + " " +  memoryJson}
        // convertedOBJ = {"Convertido para OBJ " + typeof memoryOBJ + " " + memoryOBJ} 
        />
        
        

       {/* Botões mapeados conforme arquivo json" */}      
        {DB.Valores.map((el,i)=>{
            return (
            <>
            <button onClick={()=>{
                setCalculed(true);                                          //ESSE ESTADO AJUDA NA VERIFICAÇÃO DA VAR HISTORY.
                setCleaned(Object.keys(el)[0] === "Limpar" ? true : false); // VERIFICA SE O BOTÃO LIMPAR FOI CLICADO OU NÃO E SETA O ESTADO.
                setClick(true);                                             //ESSE ESTADO AJUDA NA VERIFICAÇÃO PARA O WINDOWS ALERT
                setNum(Object.keys(el)[0] === "Limpar" ? 0 : num + Number(Object.values(el)))}} // SE LIMPAR FOR CLICADO, VALOR VIRA ZERO DE NUM.
                key={i}>
                {Object.keys(el)}                                           {/*VALOR DO BOTÃO CONFORME OBJ DB.JSON */}
                </button>
            {" "}
            </>
            )
        })}
        <br />
        <br />
        
        {/* Mostra o ultimo valor de history que foi armazenado dentro de memory. */}
        <button onClick={()=>setShowHistory(true)}>Verificar Histórico</button>

        {/* APENAS PARA MONITORIAMENTO */}
        {/* {
        console.log("history: "+ history) 
        }

        {
            console.log("memory: "+ memory)
        } */}

        <br />
        <br />
        {/* Simplesmente tranforma o historico em zero, porem não meche na contagem dentro do history */}
        <button onClick={()=>setMemory([0])}>Limpar Histórico</button>


        </>
    ) 
    
    
}