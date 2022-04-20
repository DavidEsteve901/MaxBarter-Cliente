export interface Usuario{
    userName:string,
    password:string,
    nombre:string,
    apellidos:string,
    correo:string,
    telefono:string,
    imgPerfil:string,
    coords:any,
    roles:any,
    comunidadAutonoma:ComunidadAutonoma,
    productos:Producto[]
}

export interface Producto{
    id:number,
    titulo:string,
    descripcion:string,
    match:boolean
    tipo:Tipo,
    propietario:Usuario,
    tipoProducto:Tipo,
}

export interface Tipo{
    id:number,
    nombre:string
}

export interface Imagen{
    id:number,
    url:string,
    producto:Producto
}

export interface Oferta{
    id:number,
    activa:boolean,
    rechazada:boolean,
    productoPide:Producto,
    productoRecibe:Producto,
    usuarioPide:Usuario,
    usuarioRecibe:Usuario
}

export interface ComunidadAutonoma{
    id:number,
    nombre:string
}