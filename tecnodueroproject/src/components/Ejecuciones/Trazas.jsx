const getTrazas =async()=>{
    try{
        const response = await trazasServices.getTrazas(jwt,{
            id_caso_fk
        })
    }catch(error){
        console.log(error)
    }
}