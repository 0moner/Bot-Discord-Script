config

const   Discord   =   require  ( "discord.js" ) ;
const   dontenv   =   require  ( "dotenv" ) ;
const   fs   =   require  ( "fs" ) ;
const   path   =   require  ( "path" ) ;

dontenv . config  ( ) ;

const   bot   =   novo   Discord . Cliente  ( ) ;
bot . comandos   =   novo   Discord . Coleção  ( ) ;
bot . filas   =   novo   Mapa  ( ) ;

const   commandFiles   =   fs . readdirSync  ( path . join   ( __dirname ,   "/ comandos" ) )
. filter  ( ( nome  do  arquivo )   =>   nome  do  arquivo . endsWith  ( ". js" ) ) ;

para  ( var   nome   do   arquivo  de  commandFiles )  {
   comando   const  =   requer  ( `. / comandos / $ {nome do arquivo}` ) ;
  bot . comandos . set  ( comando . nome ,   comando ) ;
}

bot . login  ( processo . env . TOKEN ) ;

bot . em  ( "pronto" ,   ( )   =>   {
  deixe   atividades   =  [
      `Utilize $ {process.env.PREFIX} help para obter ajuda!` , // COMANDO HELP DO BOT
      `$ {bot.guilds.cache.size} servidores!` , // QUANTIDADE DE SERVIDORES QUE O BOT ESTÁ
     
    ]  ,
    i   =   0 ;
  setInterval  (   ( )   =>   bot . user . setActivity  ( `$ {Activities [i ++% Activities.length]}` ,   {
        digite :   "STREAMING" ,   url :   'link da twitch'
      } ) ,   1000   *   60 ) ;    // ASSISTIR, ESCUTAR, JOGAR, TRANSMITIR

  bot . do utilizador
      . setStatus  ( "dnd" )  // idle, dnd, online, invisível
      . catch  ( console . erro ) ;
console . log  ( "Estou Online!" )
} ) ;


bot . em  ( "mensagem" ,   ( msg )   =>   {
  if   ( ! msg . content . startsWith  ( process . env . PREFIX )   ||   msg . author . bot )   return ;

  const   args   =   msg . conteúdo . fatia  ( processo . env . PREFIXO . comprimento )  . dividir  ( "" ) ; 
   comando   const  =   args . shift  ( ) ;

  tente  {
    bot . comandos . get  ( comando )  . executar  ( bot ,   msg ,   args ) ;
    }   pegar   ( e )  {
    return   msg . responder  ( "Ops! Eu ainda não tenho esse comando." ) ;
  }
} ) ;
