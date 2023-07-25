import React from "react";


export default function Display(props) {

  

  return (
    <>
      {/*VALOR ATUAL */}
      <p>{props.num}</p>

      {/*VALOR DO HISTÓRICO ARMAZENADO EM MEMORY */}
      <p>{props.memory}</p>
    
    {/* COMENTEI PRA NÃO  FICAR POLUIDO, MAS DENTRO DE KEYBOARD.JSX DA PRA VER PELO CONSOLE.LOG */}
    {/*  
      <p>{props.convertedJSON}</p>

      <p>{props.convertedOBJ}</p> */}


    </>


  );
}
