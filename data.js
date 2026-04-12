// data.js — preguntas y palabras del juego

// ════ PREGUNTAS (60) ════
const CATS = [
  { name:"1 — Naturaleza", qs:[
    {id:1,  t:"¿Es algo que existe físicamente, que ocupa espacio?"},
    {id:2,  t:"¿Es una acción o proceso?"},
    {id:3,  t:"¿Es una emoción o estado mental?"},
    {id:4,  t:"¿Es un concepto abstracto (idea, valor, cualidad)?"},
    {id:5,  t:"¿Es una característica o forma de ser?"},
    {id:6,  t:"¿Puede ser varias cosas a la vez (objeto Y fenómeno, por ejemplo)?"},
  ]},
  { name:"2 — Mundo físico", qs:[
    {id:7,  t:"¿Puede tocarse?"},
    {id:8,  t:"¿Tiene forma definida y estable?"},
    {id:9,  t:"¿Cabe en las dos manos juntas?"},
    {id:10, t:"¿Es más grande que una persona?"},
    {id:11, t:"¿Puede comerse o beberse?"},
    {id:12, t:"¿Está vivo o ha estado vivo?"},
    {id:13, t:"¿Es fabricado por humanos?"},
    {id:14, t:"¿Existe en la naturaleza sin intervención humana?"},
    {id:15, t:"¿Se mueve por sí solo?"},
  ]},
  { name:"3 — Los sentidos", qs:[
    {id:16, t:"¿Puede verse a simple vista?"},
    {id:17, t:"¿Tiene color propio o característico?"},
    {id:18, t:"¿Está asociado a un sonido concreto?"},
    {id:19, t:"¿Tiene olor reconocible?"},
    {id:20, t:"¿Implica contacto físico o tacto?"},
  ]},
  { name:"4 — Tiempo y duración", qs:[
    {id:21, t:"¿Ocurre en un momento muy concreto (segundos o minutos)?"},
    {id:22, t:"¿Puede durar años o toda una vida?"},
    {id:23, t:"¿Es algo que cambia o evoluciona con el tiempo?"},
    {id:24, t:"¿Ha existido desde antes de los humanos?"},
    {id:25, t:"¿Es más común en cierta estación del año?"},
  ]},
  { name:"5 — Lo humano y social", qs:[
    {id:26, t:"¿Lo conocen o usan (casi) todas las culturas del mundo?"},
    {id:27, t:"¿Implica necesariamente a más de una persona?"},
    {id:28, t:"¿Lo usa o conoce casi todo el mundo?"},
    {id:29, t:"¿Está relacionado directamente con el cuerpo humano?"},
    {id:30, t:"¿Tiene que ver con la relación entre personas?"},
    {id:31, t:"¿Puede usarse o disfrutarse en soledad?"},
    {id:32, t:"¿Es algo que se aprende, no se nace con ello?"},
  ]},
  { name:"6 — Valor y contexto", qs:[
    {id:33, t:"¿Es generalmente agradable o positivo?"},
    {id:34, t:"¿Es generalmente peligroso o negativo?"},
    {id:35, t:"¿Su impacto depende del contexto?"},
    {id:36, t:"¿Está relacionado con el peligro o el miedo?"},
    {id:37, t:"¿Puede provocar admiración o asombro?"},
    {id:38, t:"¿Implica habilidad o destreza para hacerlo?"},
    {id:39, t:"¿Requiere esfuerzo o trabajo para conseguirlo?"},
    {id:40, t:"¿Se asocia a una cultura o región específica del mundo?"},
    {id:41, t:"¿Puede usarse como deporte o actividad recreativa?"},
  ]},
  { name:"7 — Dónde y cuándo", qs:[
    {id:42, t:"¿Se encuentra o sucede principalmente en exteriores?"},
    {id:43, t:"¿Está asociado al frío, la nieve o el invierno?"},
    {id:44, t:"¿Tiene que ver con la alimentación o la cocina?"},
    {id:45, t:"¿Está relacionado con el transporte o el viaje?"},
    {id:46, t:"¿Tiene que ver con la música o el arte?"},
    {id:47, t:"¿Está relacionado con el agua (mar, río, lluvia…)?"},
    {id:48, t:"¿Ocurre especialmente de noche o con poca luz?"},
    {id:49, t:"¿Se asocia a ceremonias, rituales o tradiciones?"},
  ]},
  { name:"8 — Lenguaje y cultura", qs:[
    {id:50, t:"¿Tiene una palabra equivalente en español?"},
    {id:51, t:"¿Tiene una palabra equivalente en inglés?"},
    {id:52, t:"¿Lo conoce la mayoría de personas en España?"},
    {id:53, t:"¿Existe hoy en día (no es algo del pasado)?"},
    {id:54, t:"¿Se usa también en otros idiomas (préstamo lingüístico)?"},
    {id:55, t:"¿Nombra algo que inventó o desarrolló esa cultura?"},
  ]},
  { name:"9 — Propiedades físicas", qs:[
    {id:56, t:"¿Tiene un peso o tamaño significativo?"},
    {id:57, t:"¿Puede comprarse en una tienda normal?"},
    {id:58, t:"¿Puede fabricarse de forma artesanal?"},
    {id:59, t:"¿Puede compartirse o usarse en grupo?"},
    {id:60, t:"¿Es más conocido hoy que hace 100 años?"},
  ]},
];

const ALL_Q = CATS.flatMap(c => c.qs);
const Q_MAP = Object.fromEntries(ALL_Q.map(q => [q.id, q.t]));

// ════ PALABRAS ════
// Respuestas: S=SÍ  N=NO  D=DEPENDE  X=N/A
// accept: cualquiera de estas cadenas en la respuesta del jugador cuenta como correcto

const WORDS = [

  // ── Bloque 1 — palabras 1 a 13 ───────────────────────────────────────
  {
    id:"nyuki", word:"NYUKI", lang:"Swahili",
    meaning:"Abeja",
    hint:"Produce miel y vive en colonias muy organizadas",
    clue:"Un insecto volador con rayas amarillas y negras",
    accept:["abeja","abejorro","bee","insecto"],
    a:{1:"S",2:"N",3:"N",4:"N",5:"N",6:"N",7:"D",8:"S",9:"S",10:"N",11:"N",12:"S",13:"N",14:"S",15:"S",16:"S",17:"S",18:"S",19:"D",20:"D",21:"N",22:"D",23:"N",24:"S",25:"S",26:"S",27:"N",28:"S",29:"N",30:"N",31:"S",32:"N",33:"D",34:"D",35:"S",36:"D",37:"S",38:"N",39:"N",40:"N",41:"N",42:"S",43:"N",44:"D",45:"N",46:"N",47:"N",48:"N",49:"D",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"N",57:"D",58:"N",59:"D",60:"N"}
  },
  {
    id:"hyldypi", word:"HYLDÝPI", lang:"Islandés",
    meaning:"Abismo",
    hint:"Una profundidad sin fondo visible, puede ser real o metafórica",
    clue:"Un vacío enorme hacia abajo que da vértigo solo de mirarlo",
    accept:["abismo","sima","precipicio","foso","profundidad","fosa","barranco","void"],
    a:{1:"S",2:"N",3:"N",4:"D",5:"N",6:"D",7:"D",8:"D",9:"N",10:"S",11:"N",12:"N",13:"N",14:"S",15:"N",16:"S",17:"D",18:"D",19:"N",20:"N",21:"N",22:"S",23:"D",24:"S",25:"N",26:"S",27:"N",28:"S",29:"N",30:"N",31:"S",32:"N",33:"N",34:"D",35:"S",36:"S",37:"S",38:"N",39:"N",40:"N",41:"N",42:"S",43:"N",44:"N",45:"N",46:"N",47:"D",48:"D",49:"N",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"S",57:"N",58:"N",59:"D",60:"N"}
  },
  {
    id:"unan", word:"UNAN", lang:"Tagalo",
    meaning:"Almohada",
    hint:"La usas todas las noches aunque no le prestes atención",
    clue:"Objeto blando que apoya tu cabeza al dormir",
    accept:["almohada","almohadon","cojin","cojín","cabezal","pillow"],
    a:{1:"S",2:"N",3:"N",4:"N",5:"N",6:"N",7:"S",8:"S",9:"S",10:"N",11:"N",12:"N",13:"S",14:"N",15:"N",16:"S",17:"D",18:"N",19:"D",20:"S",21:"N",22:"S",23:"D",24:"N",25:"N",26:"S",27:"N",28:"S",29:"S",30:"N",31:"S",32:"N",33:"S",34:"N",35:"N",36:"N",37:"N",38:"N",39:"N",40:"N",41:"N",42:"N",43:"N",44:"N",45:"N",46:"N",47:"N",48:"S",49:"N",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"D",57:"S",58:"S",59:"D",60:"D"}
  },
  {
    id:"uchder", word:"UCHDER", lang:"Galés",
    meaning:"Altura",
    hint:"Se mide en metros. Puede referirse a un edificio, una montaña o una persona",
    clue:"Una medida que describe cuánto hay desde abajo hasta arriba",
    accept:["altura","alto","altitud","elevacion","elevación","alteza"],
    a:{1:"D",2:"N",3:"N",4:"S",5:"N",6:"N",7:"N",8:"N",9:"N",10:"N",11:"N",12:"N",13:"N",14:"S",15:"N",16:"D",17:"N",18:"N",19:"N",20:"N",21:"N",22:"S",23:"N",24:"S",25:"N",26:"S",27:"N",28:"S",29:"D",30:"N",31:"S",32:"N",33:"D",34:"D",35:"S",36:"D",37:"S",38:"N",39:"N",40:"N",41:"D",42:"S",43:"N",44:"N",45:"N",46:"N",47:"N",48:"N",49:"N",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"N",57:"N",58:"N",59:"N",60:"N"}
  },
  {
    id:"aamunkoitto", word:"AAMUNKOITTO", lang:"Finlandés",
    meaning:"Amanecer",
    hint:"En verano en Finlandia puede durar horas. En invierno apenas existe",
    clue:"El momento en que la oscuridad cede y aparece la primera luz del día",
    accept:["amanecer","alba","aurora","alborada","madrugada","salida del sol","sunrise"],
    a:{1:"D",2:"D",3:"N",4:"N",5:"N",6:"S",7:"N",8:"N",9:"N",10:"N",11:"N",12:"N",13:"N",14:"S",15:"N",16:"S",17:"S",18:"D",19:"N",20:"N",21:"S",22:"N",23:"N",24:"S",25:"N",26:"S",27:"N",28:"S",29:"N",30:"N",31:"S",32:"N",33:"S",34:"N",35:"N",36:"N",37:"S",38:"N",39:"N",40:"N",41:"N",42:"S",43:"N",44:"N",45:"N",46:"N",47:"N",48:"N",49:"D",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"N",57:"N",58:"N",59:"S",60:"N"}
  },
  {
    id:"urafiki", word:"URAFIKI", lang:"Swahili",
    meaning:"Amistad",
    hint:"No se compra ni se hereda, se construye con el tiempo",
    clue:"Un vínculo especial entre personas que se quieren bien",
    accept:["amistad","amigo","amigos","friendship","camaraderia","compañerismo","vinculo"],
    a:{1:"N",2:"N",3:"D",4:"S",5:"N",6:"N",7:"N",8:"N",9:"N",10:"N",11:"N",12:"N",13:"N",14:"N",15:"N",16:"N",17:"N",18:"N",19:"N",20:"N",21:"N",22:"S",23:"S",24:"N",25:"N",26:"S",27:"S",28:"S",29:"N",30:"S",31:"N",32:"D",33:"S",34:"N",35:"N",36:"N",37:"N",38:"N",39:"D",40:"N",41:"N",42:"N",43:"N",44:"N",45:"N",46:"N",47:"N",48:"N",49:"D",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"N",57:"N",58:"N",59:"S",60:"N"}
  },
  {
    id:"angor", word:"ANGOR", lang:"Galés",
    meaning:"Ancla",
    hint:"Sin ella el barco se alejaría solo. Pesa mucho",
    clue:"Un objeto de hierro pesado que fija los barcos al fondo del mar",
    accept:["ancla","ancora","áncora","anchor","amarre"],
    a:{1:"S",2:"N",3:"N",4:"N",5:"N",6:"N",7:"S",8:"S",9:"N",10:"D",11:"N",12:"N",13:"S",14:"N",15:"N",16:"S",17:"D",18:"N",19:"N",20:"S",21:"N",22:"S",23:"N",24:"N",25:"N",26:"S",27:"N",28:"S",29:"N",30:"N",31:"S",32:"N",33:"D",34:"N",35:"S",36:"N",37:"N",38:"N",39:"N",40:"N",41:"N",42:"S",43:"N",44:"N",45:"S",46:"N",47:"S",48:"N",49:"N",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"S",57:"S",58:"D",59:"N",60:"N"}
  },
  {
    id:"zuzi", word:"ZUZI", lang:"Vasco",
    meaning:"Antorcha",
    hint:"Fue la fuente de luz antes de la electricidad. También se usa en ceremonias",
    clue:"Un palo que arde en su extremo y se lleva en la mano",
    accept:["antorcha","tea","hacha","hachon","tizon","tizón","llama","torch"],
    a:{1:"S",2:"N",3:"N",4:"N",5:"N",6:"N",7:"S",8:"S",9:"S",10:"N",11:"N",12:"N",13:"S",14:"N",15:"N",16:"S",17:"S",18:"S",19:"S",20:"S",21:"N",22:"N",23:"N",24:"N",25:"N",26:"S",27:"N",28:"S",29:"N",30:"N",31:"S",32:"N",33:"D",34:"D",35:"S",36:"S",37:"S",38:"N",39:"N",40:"N",41:"N",42:"D",43:"N",44:"N",45:"N",46:"N",47:"N",48:"S",49:"S",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"D",57:"S",58:"S",59:"S",60:"D"}
  },
  {
    id:"sandur", word:"SANDUR", lang:"Islandés",
    meaning:"Arena",
    hint:"En Islandia es de color negro volcánico, no amarillo como la mayoría",
    clue:"Material granulado y suelto que cubre playas y desiertos",
    accept:["arena","sand","grava","gravilla","polvo"],
    a:{1:"S",2:"N",3:"N",4:"N",5:"N",6:"N",7:"S",8:"N",9:"S",10:"D",11:"N",12:"N",13:"N",14:"S",15:"N",16:"S",17:"S",18:"D",19:"N",20:"S",21:"N",22:"S",23:"N",24:"S",25:"N",26:"S",27:"N",28:"S",29:"N",30:"N",31:"S",32:"N",33:"D",34:"N",35:"S",36:"N",37:"N",38:"N",39:"N",40:"N",41:"D",42:"S",43:"N",44:"N",45:"N",46:"N",47:"D",48:"N",49:"N",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"D",57:"S",58:"N",59:"S",60:"N"}
  },
  {
    id:"toka", word:"TOKA", lang:"Maorí",
    meaning:"Arrecife",
    hint:"Los maorís navegaban entre ellos conociendo bien su peligro",
    clue:"Una formación rocosa o de coral bajo el agua, cerca de la superficie",
    accept:["arrecife","coral","roca","reef","escollo","bajo","banco"],
    a:{1:"S",2:"N",3:"N",4:"N",5:"N",6:"N",7:"S",8:"D",9:"N",10:"S",11:"N",12:"D",13:"N",14:"S",15:"N",16:"D",17:"D",18:"N",19:"N",20:"N",21:"N",22:"S",23:"S",24:"S",25:"N",26:"S",27:"N",28:"S",29:"N",30:"N",31:"S",32:"N",33:"D",34:"D",35:"S",36:"S",37:"S",38:"N",39:"N",40:"N",41:"D",42:"S",43:"N",44:"N",45:"N",46:"N",47:"S",48:"N",49:"N",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"S",57:"N",58:"N",59:"S",60:"N"}
  },
  {
    id:"izar", word:"IZAR", lang:"Vasco",
    meaning:"Estrella",
    hint:"En vasco esta palabra sobrevive casi igual desde hace siglos",
    clue:"Un punto brillante que ves en el cielo nocturno. Hay miles de millones",
    accept:["estrella","astro","star","lucero","sol","cuerpo celeste"],
    a:{1:"S",2:"N",3:"N",4:"N",5:"N",6:"N",7:"N",8:"D",9:"N",10:"S",11:"N",12:"N",13:"N",14:"S",15:"D",16:"S",17:"S",18:"N",19:"N",20:"N",21:"N",22:"S",23:"S",24:"S",25:"N",26:"S",27:"N",28:"S",29:"N",30:"N",31:"S",32:"N",33:"D",34:"N",35:"N",36:"N",37:"S",38:"N",39:"N",40:"N",41:"N",42:"S",43:"N",44:"N",45:"N",46:"N",47:"N",48:"S",49:"D",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"S",57:"N",58:"N",59:"S",60:"N"}
  },
  {
    id:"revontulet", word:"REVONTULET", lang:"Finlandés",
    meaning:"Aurora boreal",
    hint:'Literalmente "fuegos del zorro". En la mitología finesa, un zorro ártico las creaba con su cola',
    clue:"Un fenómeno de luces de colores que ilumina el cielo nocturno en el Ártico",
    accept:["aurora","boreal","aurora boreal","northern lights","luces del norte","polar"],
    a:{1:"D",2:"N",3:"N",4:"N",5:"N",6:"S",7:"N",8:"N",9:"N",10:"S",11:"N",12:"N",13:"N",14:"S",15:"S",16:"S",17:"S",18:"N",19:"N",20:"N",21:"N",22:"N",23:"S",24:"S",25:"S",26:"D",27:"N",28:"D",29:"N",30:"N",31:"S",32:"N",33:"S",34:"N",35:"N",36:"N",37:"S",38:"N",39:"N",40:"S",41:"N",42:"S",43:"S",44:"N",45:"N",46:"N",47:"N",48:"S",49:"N",50:"S",51:"S",52:"D",53:"S",54:"N",55:"N",56:"N",57:"N",58:"N",59:"S",60:"D"}
  },
  {
    id:"zori", word:"ZORI", lang:"Vasco",
    meaning:"Azar",
    hint:"También significa suerte o destino en euskera",
    clue:"Lo que pasa sin que nadie lo planee. Ni bueno ni malo por sí solo",
    accept:["azar","suerte","casualidad","destino","fortuna","chance","aleatoriedad"],
    a:{1:"N",2:"N",3:"N",4:"S",5:"N",6:"N",7:"N",8:"N",9:"N",10:"N",11:"N",12:"N",13:"N",14:"N",15:"N",16:"N",17:"N",18:"N",19:"N",20:"N",21:"N",22:"S",23:"N",24:"S",25:"N",26:"S",27:"N",28:"S",29:"N",30:"D",31:"S",32:"N",33:"D",34:"D",35:"S",36:"N",37:"N",38:"N",39:"N",40:"N",41:"N",42:"N",43:"N",44:"N",45:"N",46:"N",47:"N",48:"N",49:"D",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"N",57:"N",58:"N",59:"N",60:"N"}
  },

  // ── Bloque 2 — palabras 14 a 20 ──────────────────────────────────────
  {
    id:"whanga", word:"WHANGA", lang:"Maorí",
    meaning:"Bahía",
    hint:"Los maorís navegaban de isla en isla usando estas formaciones como refugio",
    clue:"Una entrada de mar rodeada de tierra por tres lados",
    accept:["bahia","bahía","cala","ensenada","golfo","ria","ría","abra"],
    a:{1:"S",2:"N",3:"N",4:"N",5:"N",6:"N",7:"S",8:"D",9:"N",10:"S",11:"N",12:"N",13:"N",14:"S",15:"D",16:"S",17:"S",18:"D",19:"D",20:"S",21:"N",22:"S",23:"S",24:"S",25:"N",26:"S",27:"N",28:"S",29:"N",30:"N",31:"S",32:"N",33:"S",34:"N",35:"N",36:"N",37:"S",38:"N",39:"N",40:"N",41:"S",42:"S",43:"N",44:"D",45:"S",46:"N",47:"S",48:"N",49:"N",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"S",57:"N",58:"N",59:"S",60:"N"}
  },
  {
    id:"aivani", word:"AIVANI", lang:"Georgiano",
    meaning:"Balcón",
    hint:"En Georgia los balcones de madera tallada son parte de la arquitectura tradicional",
    clue:"Una plataforma saliente en la fachada de un edificio, con barandilla",
    accept:["balcon","balcón","terraza","porche","mirador","galeria","galería"],
    a:{1:"S",2:"N",3:"N",4:"N",5:"N",6:"N",7:"S",8:"S",9:"N",10:"D",11:"N",12:"N",13:"S",14:"N",15:"N",16:"S",17:"D",18:"N",19:"N",20:"S",21:"N",22:"S",23:"D",24:"N",25:"N",26:"S",27:"N",28:"S",29:"N",30:"N",31:"S",32:"N",33:"S",34:"N",35:"N",36:"D",37:"S",38:"N",39:"S",40:"N",41:"N",42:"S",43:"N",44:"N",45:"N",46:"N",47:"N",48:"D",49:"N",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"S",57:"N",58:"D",59:"S",60:"D"}
  },
  {
    id:"urushi", word:"URUSHI", lang:"Japonés",
    meaning:"Barniz",
    hint:"Es la savia de un árbol japonés. Se usa desde hace más de 9.000 años para laquear objetos",
    clue:"Una sustancia líquida que se aplica sobre superficies para protegerlas y darles brillo",
    accept:["barniz","laca","lacado","esmalte","revestimiento","pintura","capa"],
    a:{1:"S",2:"N",3:"N",4:"N",5:"N",6:"N",7:"S",8:"D",9:"S",10:"N",11:"N",12:"D",13:"D",14:"D",15:"N",16:"S",17:"S",18:"N",19:"S",20:"S",21:"N",22:"S",23:"N",24:"N",25:"N",26:"D",27:"N",28:"D",29:"N",30:"N",31:"S",32:"S",33:"D",34:"D",35:"S",36:"N",37:"S",38:"S",39:"S",40:"S",41:"N",42:"N",43:"N",44:"N",45:"N",46:"S",47:"N",48:"N",49:"D",50:"S",51:"S",52:"D",53:"S",54:"S",55:"S",56:"N",57:"S",58:"S",59:"N",60:"N"}
  },
  {
    id:"coedwig", word:"COEDWIG", lang:"Galés",
    meaning:"Bosque",
    hint:"Gales tiene menos superficie forestal que casi cualquier otro país europeo",
    clue:"Una gran extensión de terreno cubierta de árboles",
    accept:["bosque","selva","foresta","arboleda","monte","woodland","silvestre"],
    a:{1:"S",2:"N",3:"N",4:"N",5:"N",6:"N",7:"S",8:"D",9:"N",10:"S",11:"D",12:"S",13:"N",14:"S",15:"D",16:"S",17:"S",18:"S",19:"S",20:"S",21:"N",22:"S",23:"S",24:"S",25:"D",26:"S",27:"N",28:"S",29:"N",30:"N",31:"S",32:"N",33:"S",34:"D",35:"S",36:"D",37:"S",38:"N",39:"N",40:"N",41:"S",42:"S",43:"D",44:"N",45:"N",46:"N",47:"D",48:"D",49:"D",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"S",57:"N",58:"N",59:"S",60:"N"}
  },
  {
    id:"makani", word:"MAKANI", lang:"Hawaiano",
    meaning:"Brisa",
    hint:"En Hawái los vientos tienen nombres propios según su dirección y fuerza",
    clue:"Un viento suave y agradable, sin fuerza suficiente para molestar",
    accept:["brisa","viento","aire","soplo","corriente","cefiro","céfiro","aura"],
    a:{1:"D",2:"S",3:"N",4:"N",5:"N",6:"S",7:"D",8:"N",9:"N",10:"D",11:"N",12:"N",13:"N",14:"S",15:"S",16:"N",17:"N",18:"S",19:"N",20:"S",21:"N",22:"N",23:"N",24:"S",25:"D",26:"S",27:"N",28:"S",29:"N",30:"N",31:"S",32:"N",33:"S",34:"N",35:"N",36:"N",37:"N",38:"N",39:"N",40:"N",41:"N",42:"S",43:"N",44:"N",45:"N",46:"N",47:"D",48:"D",49:"N",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"N",57:"N",58:"N",59:"S",60:"N"}
  },
  {
    id:"attaviti", word:"ÁTTAVITI", lang:"Islandés",
    meaning:"Brújula",
    hint:'Literalmente "indicador de dirección". Los islandeses la usaban para navegar en mar abierto',
    clue:"Instrumento que siempre señala hacia el norte magnético",
    accept:["brujula","brújula","compas","compass","norte","orientacion","orientación"],
    a:{1:"S",2:"N",3:"N",4:"N",5:"N",6:"N",7:"S",8:"S",9:"S",10:"N",11:"N",12:"N",13:"S",14:"N",15:"D",16:"S",17:"D",18:"N",19:"N",20:"S",21:"N",22:"S",23:"D",24:"N",25:"N",26:"S",27:"N",28:"S",29:"N",30:"N",31:"S",32:"S",33:"S",34:"N",35:"N",36:"N",37:"N",38:"N",39:"S",40:"N",41:"N",42:"D",43:"N",44:"N",45:"S",46:"N",47:"N",48:"N",49:"N",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"N",57:"S",58:"D",59:"D",60:"D"}
  },
  {
    id:"kupla", word:"KUPLA", lang:"Finlandés",
    meaning:"Burbuja",
    hint:"En finlandés también se usa para hablar de burbujas económicas o especulativas",
    clue:"Una esfera hueca de aire rodeada de una fina capa de líquido. Dura muy poco",
    accept:["burbuja","pompa","esfera","globo","bubble","pompas de jabon"],
    a:{1:"S",2:"N",3:"N",4:"N",5:"N",6:"N",7:"D",8:"S",9:"S",10:"N",11:"N",12:"N",13:"N",14:"S",15:"D",16:"S",17:"D",18:"S",19:"N",20:"D",21:"S",22:"N",23:"N",24:"S",25:"N",26:"S",27:"N",28:"S",29:"N",30:"N",31:"S",32:"N",33:"S",34:"N",35:"N",36:"N",37:"N",38:"N",39:"N",40:"N",41:"N",42:"D",43:"N",44:"D",45:"N",46:"N",47:"D",48:"N",49:"N",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"N",57:"N",58:"N",59:"S",60:"D"}
  },

  // ── Bloque 3 — palabras 21 a 37 ──────────────────────────────────────
  {
    id:"kubo", word:"KUBO", lang:"Tagalo",
    meaning:"Cabaña",
    hint:"Es la vivienda tradicional rural filipina: pequeña, de madera y bambú, con techo de paja",
    clue:"Una pequeña vivienda sencilla en plena naturaleza",
    accept:["cabaña","cabana","choza","chabola","refugio","cabañita","hut","cottage"],
    a:{1:"S",2:"N",3:"N",4:"N",5:"N",6:"N",7:"S",8:"S",9:"N",10:"D",11:"N",12:"N",13:"S",14:"N",15:"N",16:"S",17:"D",18:"N",19:"D",20:"S",21:"N",22:"S",23:"D",24:"N",25:"N",26:"S",27:"D",28:"S",29:"N",30:"D",31:"S",32:"S",33:"D",34:"N",35:"S",36:"N",37:"D",38:"S",39:"S",40:"N",41:"N",42:"S",43:"D",44:"N",45:"N",46:"N",47:"N",48:"N",49:"D",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"S",57:"N",58:"S",59:"S",60:"D"}
  },
  {
    id:"marie", word:"MARIE", lang:"Maorí",
    meaning:"Calma",
    hint:"En maorí se usa tanto para el mar en calma como para la paz interior",
    clue:"Ausencia de agitación, ruido o conflicto. Puede ser del mar o de la mente",
    accept:["calma","tranquilidad","paz","serenidad","sosiego","quietud","silencio","placidez"],
    a:{1:"D",2:"N",3:"S",4:"S",5:"D",6:"S",7:"N",8:"N",9:"N",10:"N",11:"N",12:"N",13:"N",14:"S",15:"N",16:"N",17:"N",18:"N",19:"N",20:"N",21:"N",22:"S",23:"S",24:"S",25:"N",26:"S",27:"N",28:"S",29:"D",30:"D",31:"S",32:"N",33:"S",34:"N",35:"D",36:"N",37:"N",38:"N",39:"D",40:"N",41:"N",42:"D",43:"N",44:"N",45:"N",46:"N",47:"D",48:"D",49:"N",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"N",57:"N",58:"N",59:"S",60:"N"}
  },
  {
    id:"bide", word:"BIDE", lang:"Vasco",
    meaning:"Camino",
    hint:"En euskera también significa vía o ruta. El Camino de Santiago pasa por el País Vasco",
    clue:"Una franja de terreno marcada por el paso de personas o vehículos",
    accept:["camino","senda","ruta","vereda","via","vía","sendero","path","road","carretera"],
    a:{1:"S",2:"N",3:"N",4:"D",5:"N",6:"D",7:"S",8:"D",9:"N",10:"S",11:"N",12:"N",13:"D",14:"D",15:"N",16:"S",17:"D",18:"N",19:"D",20:"S",21:"N",22:"S",23:"S",24:"D",25:"N",26:"S",27:"N",28:"S",29:"N",30:"N",31:"S",32:"N",33:"D",34:"N",35:"S",36:"N",37:"D",38:"N",39:"S",40:"N",41:"S",42:"S",43:"N",44:"N",45:"S",46:"N",47:"N",48:"D",49:"D",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"N",57:"N",58:"N",59:"S",60:"D"}
  },
  {
    id:"zari", word:"ZARI", lang:"Georgiano",
    meaning:"Campana",
    hint:"Las iglesias ortodoxas georgianas tienen campanarios con zaris de bronce que llevan siglos sonando",
    clue:"Un objeto hueco de metal que suena al golpearse o al oscilar",
    accept:["campana","campanilla","cencerro","timbre","bell","esquila","cascabel"],
    a:{1:"S",2:"N",3:"N",4:"N",5:"N",6:"N",7:"S",8:"S",9:"D",10:"D",11:"N",12:"N",13:"S",14:"N",15:"N",16:"S",17:"S",18:"S",19:"N",20:"S",21:"N",22:"S",23:"N",24:"N",25:"N",26:"S",27:"N",28:"S",29:"N",30:"D",31:"S",32:"N",33:"D",34:"N",35:"S",36:"N",37:"D",38:"D",39:"N",40:"N",41:"N",42:"D",43:"N",44:"N",45:"N",46:"S",47:"N",48:"N",49:"S",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"D",57:"S",58:"S",59:"S",60:"D"}
  },
  {
    id:"dalasini", word:"DALASINI", lang:"Swahili",
    meaning:"Canela",
    hint:"Viene del árabe. Es la corteza seca de un árbol originario de Sri Lanka",
    clue:"Una especia marrón con aroma dulce y cálido que se usa en cocina y repostería",
    accept:["canela","cinnamon","especia","corteza","condimento"],
    a:{1:"S",2:"N",3:"N",4:"N",5:"N",6:"N",7:"S",8:"D",9:"S",10:"N",11:"S",12:"D",13:"D",14:"D",15:"N",16:"S",17:"S",18:"N",19:"S",20:"S",21:"N",22:"S",23:"N",24:"S",25:"N",26:"S",27:"N",28:"S",29:"N",30:"N",31:"S",32:"N",33:"S",34:"N",35:"N",36:"N",37:"N",38:"N",39:"N",40:"S",41:"N",42:"N",43:"N",44:"S",45:"N",46:"N",47:"N",48:"N",49:"D",50:"S",51:"S",52:"S",53:"S",54:"S",55:"N",56:"N",57:"S",58:"N",59:"S",60:"D"}
  },
  {
    id:"ringulreid", word:"RINGULREIÐ", lang:"Islandés",
    meaning:"Caos",
    hint:"Literalmente algo así como 'confusión giratoria'. El islandés tiene palabras muy visuales",
    clue:"Desorden total, situación en que nada sigue ninguna regla o patrón",
    accept:["caos","desorden","confusión","confusion","anarquia","anarquía","caotismo","revuelo"],
    a:{1:"D",2:"N",3:"D",4:"S",5:"N",6:"S",7:"N",8:"N",9:"N",10:"N",11:"N",12:"N",13:"N",14:"S",15:"N",16:"D",17:"N",18:"D",19:"N",20:"N",21:"D",22:"D",23:"S",24:"S",25:"N",26:"S",27:"N",28:"S",29:"N",30:"D",31:"S",32:"N",33:"N",34:"D",35:"S",36:"D",37:"D",38:"N",39:"N",40:"N",41:"N",42:"N",43:"N",44:"N",45:"N",46:"N",47:"N",48:"N",49:"N",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"N",57:"N",58:"N",59:"D",60:"N"}
  },
  {
    id:"rere", word:"RERE", lang:"Maorí",
    meaning:"Cascada",
    hint:"Nueva Zelanda tiene algunas de las cascadas más espectaculares del mundo",
    clue:"Una caída de agua desde una altura considerable, con sonido ensordecedor",
    accept:["cascada","catarata","salto de agua","salto","waterfall","chorro"],
    a:{1:"S",2:"S",3:"N",4:"N",5:"N",6:"S",7:"D",8:"N",9:"N",10:"S",11:"N",12:"N",13:"N",14:"S",15:"S",16:"S",17:"S",18:"S",19:"N",20:"D",21:"N",22:"S",23:"D",24:"S",25:"D",26:"S",27:"N",28:"S",29:"N",30:"N",31:"S",32:"N",33:"S",34:"D",35:"S",36:"N",37:"S",38:"N",39:"N",40:"N",41:"S",42:"S",43:"D",44:"N",45:"N",46:"N",47:"S",48:"N",49:"N",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"S",57:"N",58:"N",59:"S",60:"D"}
  },
  {
    id:"lludw", word:"LLUDW", lang:"Galés",
    meaning:"Ceniza",
    hint:"En Gales el Miércoles de Ceniza (Dydd Mercher y Lludw) tiene tradición religiosa fuerte",
    clue:"El polvo gris que queda después de que algo se ha quemado por completo",
    accept:["ceniza","cenizas","ash","polvo","residuo","escoria"],
    a:{1:"S",2:"N",3:"N",4:"N",5:"N",6:"N",7:"S",8:"N",9:"S",10:"N",11:"N",12:"D",13:"N",14:"D",15:"N",16:"S",17:"S",18:"N",19:"D",20:"S",21:"N",22:"D",23:"N",24:"S",25:"N",26:"S",27:"N",28:"S",29:"N",30:"N",31:"S",32:"N",33:"N",34:"D",35:"S",36:"D",37:"N",38:"N",39:"N",40:"N",41:"N",42:"D",43:"N",44:"D",45:"N",46:"N",47:"N",48:"N",49:"S",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"N",57:"N",58:"N",59:"N",60:"N"}
  },
  {
    id:"aita", word:"AITA", lang:"Finlandés",
    meaning:"Cerca",
    hint:"En finlandés también significa 'valla'. Los finlandeses valoran mucho la privacidad y los límites entre propiedades",
    clue:"Una barrera física que delimita un terreno o separa dos zonas",
    accept:["cerca","valla","vallado","cercado","seto","fence","muro","tapia","barrera","delimitacion"],
    a:{1:"S",2:"N",3:"N",4:"N",5:"N",6:"N",7:"S",8:"S",9:"N",10:"S",11:"N",12:"N",13:"S",14:"N",15:"N",16:"S",17:"D",18:"N",19:"N",20:"S",21:"N",22:"S",23:"D",24:"N",25:"N",26:"S",27:"N",28:"S",29:"N",30:"D",31:"S",32:"N",33:"D",34:"N",35:"S",36:"N",37:"N",38:"N",39:"S",40:"N",41:"N",42:"S",43:"N",44:"N",45:"N",46:"N",47:"N",48:"N",49:"N",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"S",57:"S",58:"S",59:"D",60:"D"}
  },
  {
    id:"txinpart", word:"TXINPART", lang:"Vasco",
    meaning:"Chispa",
    hint:"En euskera la x y la tx tienen sonidos propios. Esta palabra suena casi como lo que describe",
    clue:"Un pequeño destello de fuego que salta de algo que arde o choca",
    accept:["chispa","destello","centella","llama","spark","brillo"],
    a:{1:"S",2:"D",3:"N",4:"N",5:"N",6:"D",7:"D",8:"N",9:"S",10:"N",11:"N",12:"N",13:"N",14:"S",15:"S",16:"S",17:"S",18:"N",19:"N",20:"D",21:"S",22:"N",23:"N",24:"S",25:"N",26:"S",27:"N",28:"S",29:"N",30:"N",31:"S",32:"N",33:"D",34:"D",35:"S",36:"S",37:"S",38:"N",39:"N",40:"N",41:"N",42:"D",43:"N",44:"N",45:"N",46:"N",47:"N",48:"D",49:"N",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"N",57:"N",58:"N",59:"N",60:"N"}
  },
  {
    id:"lani", word:"LANI", lang:"Hawaiano",
    meaning:"Cielo",
    hint:"En hawaiano también significa 'cielo' en sentido espiritual, y aparece en muchos nombres propios",
    clue:"El espacio que ves encima de tu cabeza cuando miras hacia arriba al aire libre",
    accept:["cielo","firmamento","sky","heaven","bóveda","atmosfera","atmósfera","espacio"],
    a:{1:"S",2:"N",3:"N",4:"D",5:"N",6:"S",7:"N",8:"N",9:"N",10:"S",11:"N",12:"N",13:"N",14:"S",15:"N",16:"S",17:"S",18:"D",19:"N",20:"N",21:"N",22:"S",23:"S",24:"S",25:"D",26:"S",27:"N",28:"S",29:"N",30:"N",31:"S",32:"N",33:"S",34:"N",35:"D",36:"N",37:"S",38:"N",39:"N",40:"N",41:"N",42:"S",43:"N",44:"N",45:"N",46:"N",47:"D",48:"D",49:"D",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"N",57:"N",58:"N",59:"S",60:"N"}
  },
  {
    id:"tuktok", word:"TUKTOK", lang:"Tagalo",
    meaning:"Cima",
    hint:"En Filipinas hay volcanes y picos donde llegar al tuktok es todo un reto",
    clue:"El punto más alto de una montaña o estructura. Desde allí solo se puede bajar",
    accept:["cima","cúspide","cuspide","cumbre","pico","crest","top","vértice","vertice","cúpula","punta"],
    a:{1:"S",2:"N",3:"N",4:"N",5:"N",6:"N",7:"S",8:"D",9:"N",10:"S",11:"N",12:"N",13:"N",14:"S",15:"N",16:"S",17:"D",18:"N",19:"N",20:"S",21:"N",22:"S",23:"D",24:"S",25:"D",26:"S",27:"N",28:"S",29:"N",30:"N",31:"S",32:"N",33:"S",34:"D",35:"S",36:"D",37:"S",38:"S",39:"S",40:"N",41:"S",42:"S",43:"S",44:"N",45:"N",46:"N",47:"N",48:"D",49:"D",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"S",57:"N",58:"N",59:"D",60:"D"}
  },
  {
    id:"mji", word:"MJI", lang:"Swahili",
    meaning:"Ciudad",
    hint:"En swahili también puede significar pueblo o asentamiento. Zanzíbar es uno de los mji más históricos de África oriental",
    clue:"Un gran núcleo urbano donde viven muchas personas, con calles, edificios y servicios",
    accept:["ciudad","municipio","metrópoli","metropoli","urbe","capital","poblacion","población","town","city"],
    a:{1:"S",2:"N",3:"N",4:"N",5:"N",6:"N",7:"S",8:"D",9:"N",10:"S",11:"N",12:"N",13:"S",14:"N",15:"N",16:"S",17:"D",18:"S",19:"D",20:"N",21:"N",22:"S",23:"S",24:"N",25:"N",26:"S",27:"S",28:"S",29:"N",30:"S",31:"S",32:"N",33:"D",34:"D",35:"S",36:"N",37:"S",38:"N",39:"S",40:"N",41:"N",42:"D",43:"N",44:"D",45:"S",46:"D",47:"D",48:"D",49:"D",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"S",57:"D",58:"N",59:"S",60:"D"}
  },
  {
    id:"loftslag", word:"LOFTSLAG", lang:"Islandés",
    meaning:"Clima",
    hint:"Literalmente 'condición del aire'. Islandia tiene uno de los climas más variables e impredecibles del mundo",
    clue:"El patrón habitual de temperaturas, lluvia y viento de una región a lo largo del año",
    accept:["clima","tiempo","meteorologia","meteorología","atmosfera","atmósfera","climate","weather"],
    a:{1:"D",2:"N",3:"N",4:"S",5:"N",6:"S",7:"N",8:"N",9:"N",10:"N",11:"N",12:"N",13:"N",14:"S",15:"N",16:"D",17:"N",18:"N",19:"N",20:"N",21:"N",22:"S",23:"S",24:"S",25:"S",26:"S",27:"N",28:"S",29:"D",30:"D",31:"S",32:"N",33:"D",34:"D",35:"S",36:"D",37:"N",38:"N",39:"N",40:"N",41:"N",42:"S",43:"D",44:"N",45:"N",46:"N",47:"D",48:"N",49:"N",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"N",57:"N",58:"N",59:"S",60:"D"}
  },
  {
    id:"kaban", word:"KABAN", lang:"Tagalo",
    meaning:"Cofre",
    hint:"En las viejas casas filipinas se guardaban los bienes más valiosos en kabanes de madera tallada",
    clue:"Una caja grande y resistente, normalmente con cerradura, para guardar objetos de valor",
    accept:["cofre","arca","baúl","baul","caja","chest","trunk","caja fuerte","arcón","arcon"],
    a:{1:"S",2:"N",3:"N",4:"N",5:"N",6:"N",7:"S",8:"S",9:"N",10:"D",11:"N",12:"N",13:"S",14:"N",15:"N",16:"S",17:"D",18:"N",19:"N",20:"S",21:"N",22:"S",23:"N",24:"N",25:"N",26:"S",27:"N",28:"S",29:"N",30:"N",31:"S",32:"N",33:"D",34:"N",35:"S",36:"N",37:"D",38:"N",39:"S",40:"N",41:"N",42:"N",43:"N",44:"N",45:"N",46:"N",47:"N",48:"N",49:"D",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"S",57:"S",58:"S",59:"S",60:"N"}
  },
  {
    id:"pyrstotahti", word:"PYRSTÖTÄHTI", lang:"Finlandés",
    meaning:"Cometa",
    hint:"Literalmente 'estrella de cola'. Visible a simple vista solo unas pocas veces por siglo",
    clue:"Un cuerpo celeste que orbita el sol y arrastra una larga cola luminosa de gas y polvo",
    accept:["cometa","comet","estrella","cola","cuerpo celeste","asteroide","meteoro"],
    a:{1:"S",2:"D",3:"N",4:"N",5:"N",6:"S",7:"N",8:"D",9:"N",10:"S",11:"N",12:"N",13:"N",14:"S",15:"S",16:"S",17:"S",18:"N",19:"N",20:"N",21:"N",22:"D",23:"S",24:"S",25:"N",26:"S",27:"N",28:"S",29:"N",30:"N",31:"S",32:"N",33:"D",34:"D",35:"S",36:"D",37:"S",38:"N",39:"N",40:"N",41:"N",42:"S",43:"N",44:"N",45:"N",46:"N",47:"N",48:"S",49:"D",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"S",57:"N",58:"N",59:"S",60:"D"}
  },
  {
    id:"beira", word:"BEIRA", lang:"Vasco",
    meaning:"Cristal",
    hint:"En euskera se usa tanto para el vidrio de una ventana como para el material en general",
    clue:"Material transparente y frágil que se usa en ventanas, vasos y espejos",
    accept:["cristal","vidrio","glass","vidriera","transparente","lente","espejo"],
    a:{1:"S",2:"N",3:"N",4:"N",5:"N",6:"N",7:"S",8:"S",9:"S",10:"N",11:"N",12:"N",13:"S",14:"D",15:"N",16:"S",17:"D",18:"N",19:"N",20:"S",21:"N",22:"S",23:"N",24:"D",25:"N",26:"S",27:"N",28:"S",29:"N",30:"N",31:"S",32:"S",33:"S",34:"D",35:"S",36:"D",37:"S",38:"S",39:"S",40:"N",41:"N",42:"N",43:"N",44:"N",45:"N",46:"D",47:"N",48:"N",49:"N",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"D",57:"S",58:"S",59:"D",60:"D"}
  },


  // ── Bloque 4 — palabras 39 a 49 ──────────────────────────────────────
  {
    id:"kanapu", word:"KANAPU", lang:"Maorí",
    meaning:"Destello",
    hint:"En maorí también describe el brillo del relámpago y el parpadeo de las estrellas",
    clue:"Un fogonazo de luz breve e intenso. Dura menos de un segundo",
    accept:["destello","flash","resplandor","brillo","fulgor","centella","relámpago","relampago","destellar"],
    a:{1:"D",2:"D",3:"N",4:"N",5:"N",6:"S",7:"N",8:"N",9:"N",10:"N",11:"N",12:"N",13:"N",14:"S",15:"S",16:"S",17:"S",18:"N",19:"N",20:"N",21:"S",22:"N",23:"N",24:"S",25:"N",26:"S",27:"N",28:"S",29:"N",30:"N",31:"S",32:"N",33:"S",34:"N",35:"N",36:"N",37:"S",38:"N",39:"N",40:"N",41:"N",42:"D",43:"N",44:"N",45:"N",46:"N",47:"N",48:"D",49:"N",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"N",57:"N",58:"N",59:"S",60:"N"}
  },
  {
    id:"kapalaran", word:"KAPALARAN", lang:"Tagalo",
    meaning:"Destino",
    hint:"En tagalo incluye también el sentido de suerte y fortuna personal. Es una palabra muy usada en canciones filipinas",
    clue:"La idea de que lo que te ocurre en la vida estaba escrito de antemano",
    accept:["destino","hado","sino","fatalidad","fortuna","suerte","providencia","karma"],
    a:{1:"N",2:"N",3:"D",4:"S",5:"N",6:"N",7:"N",8:"N",9:"N",10:"N",11:"N",12:"N",13:"N",14:"N",15:"N",16:"N",17:"N",18:"N",19:"N",20:"N",21:"N",22:"S",23:"S",24:"N",25:"N",26:"S",27:"N",28:"S",29:"N",30:"D",31:"S",32:"N",33:"D",34:"D",35:"S",36:"N",37:"D",38:"N",39:"N",40:"N",41:"N",42:"N",43:"N",44:"N",45:"D",46:"N",47:"N",48:"N",49:"D",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"N",57:"N",58:"N",59:"N",60:"N"}
  },
  {
    id:"almasi", word:"ALMASI", lang:"Swahili",
    meaning:"Diamante",
    hint:"La palabra viene del árabe. África oriental es una de las regiones con más reservas de este mineral",
    clue:"La piedra preciosa más dura que existe. Totalmente transparente cuando es pura",
    accept:["diamante","diamond","piedra","gema","joya","brillante","carbon","carbono"],
    a:{1:"S",2:"N",3:"N",4:"N",5:"N",6:"N",7:"S",8:"S",9:"S",10:"N",11:"N",12:"N",13:"N",14:"S",15:"N",16:"S",17:"S",18:"N",19:"N",20:"S",21:"N",22:"S",23:"N",24:"S",25:"N",26:"S",27:"N",28:"S",29:"N",30:"N",31:"S",32:"N",33:"S",34:"N",35:"N",36:"N",37:"S",38:"N",39:"S",40:"N",41:"N",42:"N",43:"N",44:"N",45:"N",46:"D",47:"N",48:"N",49:"D",50:"S",51:"S",52:"S",53:"S",54:"S",55:"N",56:"S",57:"S",58:"N",59:"N",60:"D"}
  },
  {
    id:"llun", word:"LLUN", lang:"Galés",
    meaning:"Dibujo",
    hint:"En galés, LLUN también significa fotografía e imagen en general. Y además es el nombre del lunes",
    clue:"Una imagen trazada a mano sobre papel o cualquier superficie",
    accept:["dibujo","ilustración","ilustracion","boceto","imagen","picture","drawing","trazo","bosquejo","pintura"],
    a:{1:"S",2:"D",3:"N",4:"N",5:"N",6:"N",7:"S",8:"S",9:"S",10:"D",11:"N",12:"N",13:"S",14:"N",15:"N",16:"S",17:"D",18:"N",19:"N",20:"S",21:"N",22:"S",23:"D",24:"N",25:"N",26:"S",27:"N",28:"S",29:"N",30:"D",31:"S",32:"S",33:"S",34:"N",35:"N",36:"N",37:"S",38:"S",39:"S",40:"N",41:"N",42:"N",43:"N",44:"N",45:"N",46:"S",47:"N",48:"N",49:"D",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"D",57:"S",58:"S",59:"S",60:"D"}
  },
  {
    id:"tuta", word:"TUTA", lang:"Swahili",
    meaning:"Duna",
    hint:"En swahili designa cualquier montículo o loma, no solo de arena. En la costa de Tanzania las hay por doquier",
    clue:"Una colina de arena formada por el viento. No tiene vegetación y cambia de forma lentamente",
    accept:["duna","medano","médano","dune","montículo","monticulo","arena","colina de arena"],
    a:{1:"S",2:"N",3:"N",4:"N",5:"N",6:"N",7:"S",8:"D",9:"N",10:"S",11:"N",12:"N",13:"N",14:"S",15:"D",16:"S",17:"S",18:"D",19:"N",20:"S",21:"N",22:"S",23:"S",24:"S",25:"N",26:"S",27:"N",28:"S",29:"N",30:"N",31:"S",32:"N",33:"D",34:"N",35:"S",36:"N",37:"S",38:"N",39:"N",40:"N",41:"D",42:"S",43:"N",44:"N",45:"N",46:"N",47:"D",48:"N",49:"N",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"S",57:"N",58:"N",59:"S",60:"D"}
  },
  {
    id:"pimennys", word:"PIMENNYS", lang:"Finlandés",
    meaning:"Eclipse",
    hint:'Literalmente "oscurecimiento". En Finlandia los eclipses solares son eventos muy esperados dada la escasez de luz en invierno',
    clue:"Un fenómeno en que un astro queda oculto tras otro. El sol desaparece en pleno día",
    accept:["eclipse","eclipsar","ocultación","ocultacion","oscurecimiento","solar","lunar"],
    a:{1:"S",2:"S",3:"N",4:"N",5:"N",6:"S",7:"N",8:"N",9:"N",10:"S",11:"N",12:"N",13:"N",14:"S",15:"S",16:"S",17:"D",18:"N",19:"N",20:"N",21:"S",22:"N",23:"N",24:"S",25:"N",26:"S",27:"N",28:"S",29:"N",30:"N",31:"S",32:"N",33:"D",34:"N",35:"S",36:"N",37:"S",38:"N",39:"N",40:"N",41:"N",42:"S",43:"N",44:"N",45:"N",46:"N",47:"N",48:"D",49:"D",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"N",57:"N",58:"N",59:"S",60:"D"}
  },
  {
    id:"oihartzun", word:"OIHARTZUN", lang:"Vasco",
    meaning:"Eco",
    hint:"Es una de las palabras más largas del euskera para un fenómeno tan breve. Se oye mucho en los valles pirenaicos",
    clue:"El sonido que rebota en una superficie y vuelve a tus oídos con un pequeño retraso",
    accept:["eco","echo","rebote","resonancia","reverberacion","reverberación","repeticion","repetición del sonido"],
    a:{1:"D",2:"S",3:"N",4:"N",5:"N",6:"S",7:"N",8:"N",9:"N",10:"N",11:"N",12:"N",13:"N",14:"S",15:"S",16:"N",17:"N",18:"S",19:"N",20:"N",21:"S",22:"N",23:"N",24:"S",25:"N",26:"S",27:"N",28:"S",29:"N",30:"N",31:"S",32:"N",33:"S",34:"N",35:"S",36:"N",37:"D",38:"N",39:"N",40:"N",41:"N",42:"S",43:"N",44:"N",45:"N",46:"N",47:"D",48:"N",49:"N",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"N",57:"N",58:"N",59:"S",60:"N"}
  },
  {
    id:"palaisipan", word:"PALAISIPAN", lang:"Tagalo",
    meaning:"Enigma",
    hint:"En tagalo también se usa para acertijos y juegos de ingenio. Literalmente viene de 'isip', que significa mente o pensamiento",
    clue:"Algo difícil de entender o explicar. Un misterio que desafía la razón",
    accept:["enigma","misterio","acertijo","incógnita","incognita","puzzle","rompecabezas","secreto","charada"],
    a:{1:"N",2:"N",3:"N",4:"S",5:"N",6:"N",7:"N",8:"N",9:"N",10:"N",11:"N",12:"N",13:"D",14:"N",15:"N",16:"N",17:"N",18:"N",19:"N",20:"N",21:"N",22:"D",23:"N",24:"N",25:"N",26:"S",27:"D",28:"S",29:"N",30:"D",31:"S",32:"N",33:"D",34:"N",35:"S",36:"N",37:"S",38:"N",39:"N",40:"N",41:"N",42:"N",43:"N",44:"N",45:"N",46:"N",47:"N",48:"N",49:"N",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"N",57:"N",58:"N",59:"D",60:"N"}
  },
  {
    id:"sarke", word:"SARKE", lang:"Georgiano",
    meaning:"Espejo",
    hint:"En la tradición georgiana, romper un espejo trae siete años de mala suerte, igual que en muchas culturas",
    clue:"Una superficie pulida que refleja con exactitud todo lo que tiene delante",
    accept:["espejo","mirror","reflejo","luna","cristal","vidrio"],
    a:{1:"S",2:"N",3:"N",4:"N",5:"N",6:"N",7:"S",8:"S",9:"D",10:"D",11:"N",12:"N",13:"S",14:"N",15:"N",16:"S",17:"D",18:"N",19:"N",20:"S",21:"N",22:"S",23:"D",24:"N",25:"N",26:"S",27:"N",28:"S",29:"D",30:"N",31:"S",32:"S",33:"S",34:"N",35:"N",36:"N",37:"S",38:"S",39:"S",40:"N",41:"N",42:"N",43:"N",44:"N",45:"N",46:"D",47:"N",48:"D",49:"N",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"D",57:"S",58:"S",59:"D",60:"D"}
  },
  {
    id:"draenen", word:"DRAENEN", lang:"Galés",
    meaning:"Espina",
    hint:"El espino negro (draenen ddu) es uno de los arbustos más comunes del paisaje rural galés",
    clue:"Una punta afilada que crece en algunas plantas para protegerse de los animales",
    accept:["espina","pincho","pua","púa","thorn","aguijón","aguijon","espino","zarza"],
    a:{1:"S",2:"N",3:"N",4:"N",5:"N",6:"N",7:"S",8:"S",9:"S",10:"N",11:"N",12:"S",13:"N",14:"S",15:"N",16:"S",17:"D",18:"N",19:"N",20:"S",21:"N",22:"S",23:"N",24:"S",25:"N",26:"S",27:"N",28:"S",29:"D",30:"N",31:"S",32:"N",33:"N",34:"S",35:"D",36:"S",37:"N",38:"N",39:"N",40:"N",41:"N",42:"S",43:"N",44:"N",45:"N",46:"N",47:"N",48:"N",49:"N",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"N",57:"N",58:"N",59:"N",60:"N"}
  },
  {
    id:"slod", word:"SLÓÐ", lang:"Islandés",
    meaning:"Estela",
    hint:"En islandés también significa sendero o rastro. Los vikingos dejaban slóðir en el océano Atlántico Norte",
    clue:"El rastro visible que deja algo al moverse: un barco en el agua, un avión en el cielo",
    accept:["estela","rastro","huella","surco","trail","wake","traza","reguero"],
    a:{1:"D",2:"N",3:"N",4:"N",5:"N",6:"D",7:"N",8:"N",9:"N",10:"D",11:"N",12:"N",13:"N",14:"S",15:"N",16:"D",17:"D",18:"N",19:"N",20:"N",21:"N",22:"D",23:"S",24:"S",25:"N",26:"S",27:"N",28:"S",29:"N",30:"N",31:"S",32:"N",33:"D",34:"N",35:"S",36:"N",37:"D",38:"N",39:"N",40:"N",41:"N",42:"S",43:"N",44:"N",45:"S",46:"N",47:"D",48:"N",49:"N",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"N",57:"N",58:"N",59:"N",60:"N"}
  },


  // ── Bloque 5 — palabras 38 y 50 a 65 ────────────────────────────────
  {
    id:"tablou", word:"TABLOU", lang:"Georgiano",
    meaning:"Cuadro",
    hint:"Georgia tiene una larga tradición pictórica ligada a la iglesia ortodoxa y los frescos medievales",
    clue:"Una obra de arte pintada sobre una superficie plana, normalmente enmarcada",
    accept:["cuadro","pintura","lienzo","obra","painting","fresco","lámina","lamina","ilustración","ilustracion"],
    a:{1:"S",2:"N",3:"N",4:"N",5:"N",6:"N",7:"S",8:"S",9:"D",10:"D",11:"N",12:"N",13:"S",14:"N",15:"N",16:"S",17:"S",18:"N",19:"N",20:"S",21:"N",22:"S",23:"N",24:"N",25:"N",26:"S",27:"N",28:"S",29:"N",30:"N",31:"S",32:"S",33:"S",34:"N",35:"N",36:"N",37:"S",38:"S",39:"S",40:"S",41:"N",42:"S",43:"N",44:"N",45:"N",46:"S",47:"N",48:"N",49:"D",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"D",57:"S",58:"S",59:"D",60:"D"}
  },
  {
    id:"tiura", word:"TIURA", lang:"Maorí",
    meaning:"Faro",
    hint:"Los maorís también usaban señales de fuego en la costa para guiar canoas en la oscuridad",
    clue:"Una torre con una luz giratoria muy potente que guía a los barcos en la oscuridad",
    accept:["faro","torre","lighthouse","baliza","señal","luz","linterna"],
    a:{1:"S",2:"N",3:"N",4:"N",5:"N",6:"N",7:"S",8:"S",9:"N",10:"S",11:"N",12:"N",13:"S",14:"N",15:"N",16:"S",17:"S",18:"D",19:"N",20:"S",21:"N",22:"S",23:"N",24:"N",25:"N",26:"S",27:"N",28:"S",29:"N",30:"N",31:"S",32:"N",33:"S",34:"N",35:"N",36:"N",37:"S",38:"N",39:"N",40:"N",41:"N",42:"S",43:"N",44:"N",45:"S",46:"N",47:"S",48:"S",49:"N",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"S",57:"N",58:"N",59:"N",60:"D"}
  },
  {
    id:"gezie", word:"GEZIE", lang:"Georgiano",
    meaning:"Flecha",
    hint:"Georgia fue durante siglos tierra de arqueros. Los guerreros georgianos eran famosos por su puntería",
    clue:"Un proyectil largo y delgado que se lanza con un arco y tiene punta afilada",
    accept:["flecha","saeta","dardo","arrow","proyectil","virote"],
    a:{1:"S",2:"N",3:"N",4:"N",5:"N",6:"N",7:"S",8:"S",9:"S",10:"N",11:"N",12:"N",13:"S",14:"N",15:"N",16:"S",17:"D",18:"N",19:"N",20:"S",21:"N",22:"N",23:"N",24:"N",25:"N",26:"S",27:"N",28:"S",29:"N",30:"N",31:"S",32:"N",33:"N",34:"D",35:"S",36:"S",37:"N",38:"S",39:"S",40:"N",41:"N",42:"N",43:"N",44:"N",45:"N",46:"N",47:"N",48:"N",49:"D",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"N",57:"N",58:"S",59:"N",60:"D"}
  },
  {
    id:"pua", word:"PUA", lang:"Hawaiano",
    meaning:"Flor",
    hint:"En hawaiano PUA también es un nombre propio muy común para las mujeres. Las flores son centrales en la cultura de las islas",
    clue:"La parte reproductora y colorida de una planta. Suele tener pétalos y aroma",
    accept:["flor","pétalo","petalo","flower","capullo","rosa","planta","bloom","floración","floracion"],
    a:{1:"S",2:"N",3:"N",4:"N",5:"N",6:"N",7:"S",8:"D",9:"S",10:"N",11:"N",12:"S",13:"N",14:"S",15:"N",16:"S",17:"S",18:"D",19:"S",20:"S",21:"N",22:"D",23:"S",24:"S",25:"S",26:"S",27:"N",28:"S",29:"N",30:"N",31:"S",32:"N",33:"S",34:"N",35:"N",36:"N",37:"S",38:"N",39:"N",40:"N",41:"N",42:"S",43:"N",44:"D",45:"N",46:"D",47:"N",48:"N",49:"D",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"N",57:"S",58:"S",59:"S",60:"D"}
  },
  {
    id:"sulie", word:"SULIE", lang:"Vasco",
    meaning:"Fuego",
    hint:"El fuego tiene un papel central en festividades vascas como las hogueras de San Juan",
    clue:"La llama y el calor que produce algo al arder. Luz, calor y peligro al mismo tiempo",
    accept:["fuego","llama","lumbre","hoguera","incendio","fire","brasa","ardor","pira"],
    a:{1:"D",2:"S",3:"N",4:"N",5:"N",6:"S",7:"D",8:"N",9:"N",10:"D",11:"N",12:"N",13:"N",14:"S",15:"S",16:"S",17:"S",18:"S",19:"S",20:"D",21:"N",22:"D",23:"S",24:"S",25:"N",26:"S",27:"N",28:"S",29:"N",30:"N",31:"S",32:"N",33:"D",34:"S",35:"S",36:"S",37:"S",38:"N",39:"N",40:"N",41:"N",42:"D",43:"N",44:"D",45:"N",46:"N",47:"N",48:"D",49:"S",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"N",57:"N",58:"N",59:"D",60:"N"}
  },
  {
    id:"punawai", word:"PUNAWAI", lang:"Hawaiano",
    meaning:"Fuente",
    hint:"En Hawái los manantiales naturales de agua dulce eran considerados sagrados y protegidos por los jefes tribales",
    clue:"Un manantial natural donde brota agua del suelo, o una construcción ornamental con agua",
    accept:["fuente","manantial","fontana","surtidor","fountain","spring","surgencia","venero"],
    a:{1:"S",2:"D",3:"N",4:"N",5:"N",6:"S",7:"S",8:"D",9:"N",10:"D",11:"N",12:"N",13:"D",14:"D",15:"S",16:"S",17:"D",18:"S",19:"N",20:"D",21:"N",22:"S",23:"N",24:"S",25:"N",26:"S",27:"N",28:"S",29:"N",30:"N",31:"S",32:"N",33:"S",34:"N",35:"N",36:"N",37:"S",38:"N",39:"N",40:"D",41:"N",42:"S",43:"N",44:"N",45:"N",46:"D",47:"S",48:"N",49:"D",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"D",57:"N",58:"D",59:"S",60:"D"}
  },
  {
    id:"galaksi", word:"GALAKSI", lang:"Maorí",
    meaning:"Galaxia",
    hint:"Los maorís son famosos por su profundo conocimiento del cielo nocturno. Usaban las estrellas para navegar",
    clue:"Un sistema enorme de estrellas, gas y polvo unidos por gravedad. Hay miles de millones en el universo",
    accept:["galaxia","galaxy","vía láctea","via lactea","universo","cosmos","nebulosa","espacio"],
    a:{1:"S",2:"N",3:"N",4:"N",5:"N",6:"N",7:"N",8:"D",9:"N",10:"S",11:"N",12:"N",13:"N",14:"S",15:"D",16:"S",17:"S",18:"N",19:"N",20:"N",21:"N",22:"S",23:"S",24:"S",25:"N",26:"S",27:"N",28:"S",29:"N",30:"N",31:"S",32:"N",33:"D",34:"N",35:"N",36:"N",37:"S",38:"N",39:"N",40:"N",41:"N",42:"S",43:"N",44:"N",45:"N",46:"N",47:"N",48:"S",49:"N",50:"S",51:"S",52:"S",53:"S",54:"S",55:"N",56:"S",57:"N",58:"N",59:"S",60:"D"}
  },
  {
    id:"chipchi", word:"CHIPCHI", lang:"Quechua",
    meaning:"Garúa",
    hint:"El quechua tiene muchas palabras para describir tipos de lluvia. La garúa es típica de la costa del Perú",
    clue:"Una llovizna muy fina y persistente, casi niebla con agua. Moja sin que parezca que llueve",
    accept:["garúa","garua","llovizna","sirimiri","mollizna","bruma","neblina","lluvia fina","goteo"],
    a:{1:"D",2:"S",3:"N",4:"N",5:"N",6:"S",7:"D",8:"N",9:"N",10:"S",11:"N",12:"N",13:"N",14:"S",15:"S",16:"D",17:"D",18:"S",19:"N",20:"S",21:"N",22:"N",23:"N",24:"S",25:"D",26:"S",27:"N",28:"S",29:"N",30:"N",31:"S",32:"N",33:"D",34:"N",35:"S",36:"N",37:"N",38:"N",39:"N",40:"S",41:"N",42:"S",43:"N",44:"N",45:"N",46:"N",47:"S",48:"D",49:"N",50:"S",51:"S",52:"D",53:"S",54:"N",55:"N",56:"N",57:"N",58:"N",59:"S",60:"D"}
  },
  {
    id:"napiszvirág", word:"NAPISZVIRÁG", lang:"Húngaro",
    meaning:"Girasol",
    hint:'Literalmente "flor del sol". El húngaro es famoso por sus compuestos muy visuales',
    clue:"Una flor grande y amarilla que siempre gira su cara hacia donde está el sol",
    accept:["girasol","girasoles","sunflower","flor","amarillo","sol","heliantus"],
    a:{1:"S",2:"N",3:"N",4:"N",5:"N",6:"N",7:"S",8:"S",9:"N",10:"S",11:"D",12:"S",13:"N",14:"S",15:"S",16:"S",17:"S",18:"N",19:"S",20:"S",21:"N",22:"D",23:"S",24:"S",25:"S",26:"S",27:"N",28:"S",29:"N",30:"N",31:"S",32:"N",33:"S",34:"N",35:"N",36:"N",37:"S",38:"N",39:"N",40:"N",41:"N",42:"S",43:"N",44:"D",45:"N",46:"N",47:"N",48:"N",49:"N",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"S",57:"D",58:"N",59:"S",60:"D"}
  },
  {
    id:"jökulll", word:"JÖKULL", lang:"Islandés",
    meaning:"Glaciar",
    hint:"Islandia tiene más de 260 glaciares. JÖKULL aparece en muchos nombres de lugares del país",
    clue:"Una enorme masa de hielo que se mueve muy lentamente por la montaña o el polo",
    accept:["glaciar","glaciares","helero","hielo","glacier","témpano","tempano","masa de hielo"],
    a:{1:"S",2:"N",3:"N",4:"N",5:"N",6:"N",7:"S",8:"D",9:"N",10:"S",11:"N",12:"N",13:"N",14:"S",15:"S",16:"S",17:"S",18:"N",19:"N",20:"S",21:"N",22:"S",23:"S",24:"S",25:"D",26:"S",27:"N",28:"S",29:"N",30:"N",31:"S",32:"N",33:"D",34:"N",35:"S",36:"N",37:"S",38:"N",39:"N",40:"S",41:"D",42:"S",43:"S",44:"N",45:"N",46:"N",47:"S",48:"N",49:"N",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"S",57:"N",58:"N",59:"N",60:"D"}
  },
  {
    id:"tete", word:"TETE", lang:"Swahili",
    meaning:"Gota",
    hint:"En swahili se usa tanto para gota de agua como para gota de sangre o cualquier líquido",
    clue:"Una pequeña cantidad de líquido con forma redondeada. La más pequeña unidad visible del agua",
    accept:["gota","gota de agua","drop","lágrima","lagrima","gotita","rociada"],
    a:{1:"S",2:"N",3:"N",4:"N",5:"N",6:"N",7:"S",8:"S",9:"S",10:"N",11:"D",12:"N",13:"N",14:"S",15:"D",16:"S",17:"D",18:"N",19:"N",20:"D",21:"S",22:"N",23:"N",24:"S",25:"N",26:"S",27:"N",28:"S",29:"N",30:"N",31:"S",32:"N",33:"D",34:"N",35:"S",36:"N",37:"N",38:"N",39:"N",40:"N",41:"N",42:"D",43:"D",44:"D",45:"N",46:"N",47:"S",48:"N",49:"N",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"N",57:"N",58:"N",59:"S",60:"N"}
  },
  {
    id:"kango", word:"KANGO", lang:"Swahili",
    meaning:"Gruta",
    hint:"Las costas de Tanzania y Kenia tienen cuevas kango excavadas por el mar en la roca de coral",
    clue:"Una cavidad natural en la roca, generalmente oscura y húmeda. Puede estar en la montaña o en el mar",
    accept:["gruta","cueva","caverna","cavidad","cave","oquedad","antro"],
    a:{1:"S",2:"N",3:"N",4:"N",5:"N",6:"N",7:"S",8:"D",9:"N",10:"S",11:"N",12:"N",13:"N",14:"S",15:"N",16:"D",17:"D",18:"D",19:"D",20:"S",21:"N",22:"S",23:"D",24:"S",25:"N",26:"S",27:"N",28:"S",29:"N",30:"N",31:"S",32:"N",33:"D",34:"N",35:"S",36:"D",37:"S",38:"N",39:"N",40:"S",41:"D",42:"S",43:"N",44:"N",45:"N",46:"N",47:"D",48:"S",49:"D",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"S",57:"N",58:"N",59:"S",60:"N"}
  },
  {
    id:"sorgin", word:"SORGIN", lang:"Vasco",
    meaning:"Hechizo",
    hint:"Sorgin también significa bruja en euskera. La mitología vasca está llena de seres mágicos como Mari y Basajaun",
    clue:"Una fórmula mágica que supuestamente altera la realidad. Puede ser de amor, protección o maldición",
    accept:["hechizo","conjuro","encantamiento","magia","sortilegio","brujería","brujeria","spell","maldición","maldicion"],
    a:{1:"D",2:"N",3:"N",4:"S",5:"N",6:"N",7:"N",8:"N",9:"N",10:"N",11:"N",12:"N",13:"N",14:"N",15:"N",16:"N",17:"N",18:"D",19:"N",20:"N",21:"D",22:"D",23:"N",24:"N",25:"N",26:"S",27:"D",28:"S",29:"N",30:"D",31:"S",32:"S",33:"D",34:"D",35:"S",36:"D",37:"D",38:"N",39:"N",40:"S",41:"N",42:"N",43:"N",44:"N",45:"N",46:"N",47:"N",48:"D",49:"S",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"N",57:"N",58:"N",59:"D",60:"N"}
  },
  {
    id:"jaas", word:"JÄÄS", lang:"Finlandés",
    meaning:"Hielo",
    hint:"El finlandés tiene docenas de palabras para distintos estados del hielo. JÄÄS es el más general",
    clue:"El agua en estado sólido. Se forma cuando la temperatura baja de cero grados",
    accept:["hielo","ice","escarcha","helada","cristal","glacial","congelado"],
    a:{1:"S",2:"N",3:"N",4:"N",5:"N",6:"N",7:"S",8:"S",9:"S",10:"D",11:"D",12:"N",13:"N",14:"S",15:"N",16:"S",17:"S",18:"N",19:"N",20:"S",21:"N",22:"D",23:"S",24:"S",25:"S",26:"S",27:"N",28:"S",29:"N",30:"N",31:"S",32:"N",33:"D",34:"N",35:"S",36:"N",37:"N",38:"N",39:"N",40:"N",41:"D",42:"S",43:"S",44:"D",45:"N",46:"N",47:"S",48:"N",49:"N",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"D",57:"S",58:"N",59:"S",60:"D"}
  },
  {
    id:"horizonti", word:"HORIZONTI", lang:"Georgiano",
    meaning:"Horizonte",
    hint:"Georgia tiene costas en el Mar Negro con horizontes amplios, y también las estepas del Cáucaso",
    clue:"La línea donde el cielo y la tierra o el mar parecen tocarse en la distancia",
    accept:["horizonte","horizon","línea","linea","lejanía","lejania","confin","confín"],
    a:{1:"D",2:"N",3:"N",4:"D",5:"N",6:"S",7:"N",8:"N",9:"N",10:"S",11:"N",12:"N",13:"N",14:"S",15:"N",16:"S",17:"D",18:"N",19:"N",20:"N",21:"N",22:"S",23:"N",24:"S",25:"N",26:"S",27:"N",28:"S",29:"N",30:"N",31:"S",32:"N",33:"S",34:"N",35:"S",36:"N",37:"S",38:"N",39:"N",40:"N",41:"N",42:"S",43:"N",44:"N",45:"N",46:"N",47:"D",48:"N",49:"N",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"N",57:"N",58:"N",59:"S",60:"N"}
  },
  {
    id:"tapuae", word:"TAPUAE", lang:"Maorí",
    meaning:"Huella",
    hint:"En maorí TAPUAE también significa pisada sagrada. Los lugares donde pisó un jefe eran considerados tapu (tabú)",
    clue:"La marca que deja un pie o una mano sobre una superficie blanda o sucia",
    accept:["huella","pisada","rastro","marca","impronta","footprint","traza","señal"],
    a:{1:"S",2:"N",3:"N",4:"N",5:"N",6:"D",7:"S",8:"S",9:"S",10:"N",11:"N",12:"N",13:"N",14:"D",15:"N",16:"S",17:"D",18:"N",19:"N",20:"S",21:"N",22:"D",23:"N",24:"N",25:"N",26:"S",27:"N",28:"S",29:"S",30:"N",31:"S",32:"N",33:"D",34:"N",35:"S",36:"N",37:"D",38:"N",39:"N",40:"N",41:"N",42:"D",43:"N",44:"N",45:"N",46:"N",47:"D",48:"N",49:"D",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"N",57:"N",58:"N",59:"N",60:"N"}
  },
  {
    id:"savukki", word:"SAVUKKI", lang:"Finlandés",
    meaning:"Humo",
    hint:"En Finlandia el humo de la sauna y las chimeneas forma parte del paisaje invernal. El olor a humo de sauna es inconfundible",
    clue:"La nube gris o negra de partículas que sube al aire cuando algo se quema",
    accept:["humo","smoke","vaho","vapor","nube","hollín","hollin","neblina","emanación","emanacion"],
    a:{1:"D",2:"S",3:"N",4:"N",5:"N",6:"S",7:"D",8:"N",9:"N",10:"S",11:"N",12:"N",13:"N",14:"D",15:"S",16:"S",17:"D",18:"N",19:"S",20:"N",21:"N",22:"D",23:"S",24:"S",25:"N",26:"S",27:"N",28:"S",29:"N",30:"N",31:"S",32:"N",33:"D",34:"D",35:"S",36:"D",37:"N",38:"N",39:"N",40:"N",41:"N",42:"S",43:"D",44:"D",45:"N",46:"N",47:"N",48:"D",49:"D",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"N",57:"N",58:"N",59:"S",60:"D"}
  },


  // ── Bloque 6 — palabras 66 a 83 ──────────────────────────────────────
  {
    id:"indar", word:"INDAR", lang:"Vasco",
    meaning:"Ímpetu",
    hint:"En euskera también significa fuerza y energía. Es una palabra muy usada en el deporte y la naturaleza",
    clue:"Una fuerza o impulso intenso que lleva a actuar con energía y rapidez",
    accept:["ímpetu","impetu","fuerza","impulso","energía","energia","brío","brio","empuje","vigor","ímpetu"],
    a:{1:"N",2:"D",3:"D",4:"S",5:"N",6:"S",7:"N",8:"N",9:"N",10:"N",11:"N",12:"N",13:"N",14:"N",15:"N",16:"N",17:"N",18:"N",19:"N",20:"N",21:"D",22:"N",23:"N",24:"N",25:"N",26:"S",27:"N",28:"S",29:"D",30:"N",31:"S",32:"N",33:"S",34:"N",35:"S",36:"N",37:"S",38:"N",39:"D",40:"N",41:"N",42:"N",43:"N",44:"N",45:"N",46:"N",47:"N",48:"N",49:"N",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"N",57:"N",58:"N",59:"N",60:"N"}
  },
  {
    id:"motu", word:"MOTU", lang:"Maorí",
    meaning:"Isla",
    hint:"Nueva Zelanda es en sí misma un conjunto de motu. Los maorís llegaron a ellas en canoa desde la Polinesia",
    clue:"Una extensión de tierra completamente rodeada de agua por todos lados",
    accept:["isla","islote","atolón","atolon","island","archipiélago","archipielago","isleta"],
    a:{1:"S",2:"N",3:"N",4:"N",5:"N",6:"N",7:"S",8:"D",9:"N",10:"S",11:"N",12:"N",13:"N",14:"S",15:"N",16:"S",17:"D",18:"D",19:"D",20:"S",21:"N",22:"S",23:"S",24:"S",25:"N",26:"S",27:"N",28:"S",29:"N",30:"N",31:"S",32:"N",33:"D",34:"D",35:"S",36:"D",37:"S",38:"N",39:"N",40:"N",41:"S",42:"S",43:"D",44:"D",45:"S",46:"N",47:"S",48:"N",49:"N",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"S",57:"N",58:"N",59:"S",60:"D"}
  },
  {
    id:"niwa", word:"NIWA", lang:"Japonés",
    meaning:"Jardín",
    hint:"El jardín japonés es una forma de arte con siglos de tradición. Hay reglas estrictas sobre piedras, agua y plantas",
    clue:"Un espacio exterior cultivado y cuidado donde crecen plantas, flores y a veces árboles",
    accept:["jardín","jardin","huerto","parque","garden","vergel","patio","bosque"],
    a:{1:"S",2:"N",3:"N",4:"N",5:"N",6:"N",7:"S",8:"D",9:"N",10:"S",11:"D",12:"S",13:"D",14:"D",15:"N",16:"S",17:"S",18:"S",19:"S",20:"S",21:"N",22:"S",23:"S",24:"N",25:"S",26:"S",27:"N",28:"S",29:"N",30:"N",31:"S",32:"S",33:"S",34:"N",35:"N",36:"N",37:"S",38:"S",39:"S",40:"S",41:"N",42:"S",43:"N",44:"D",45:"N",46:"S",47:"D",48:"N",49:"D",50:"S",51:"S",52:"S",53:"S",54:"N",55:"S",56:"S",57:"N",58:"S",59:"S",60:"D"}
  },
  {
    id:"zineb", word:"ZINEB", lang:"Tamazight",
    meaning:"Joya",
    hint:"El tamazight es la lengua bereber del norte de África. Las joyas de plata son parte fundamental de la identidad amazigh",
    clue:"Un objeto pequeño de material precioso que se lleva como adorno. Puede ser anillo, collar o pendiente",
    accept:["joya","joyas","joyería","joyeria","alhaja","gema","piedra preciosa","adorno","ornamento","jewel"],
    a:{1:"S",2:"N",3:"N",4:"N",5:"N",6:"N",7:"S",8:"S",9:"S",10:"N",11:"N",12:"N",13:"S",14:"D",15:"N",16:"S",17:"S",18:"N",19:"N",20:"S",21:"N",22:"S",23:"N",24:"N",25:"N",26:"S",27:"N",28:"S",29:"S",30:"D",31:"S",32:"S",33:"S",34:"N",35:"N",36:"N",37:"S",38:"S",39:"S",40:"S",41:"N",42:"N",43:"N",44:"N",45:"N",46:"S",47:"N",48:"N",49:"D",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"N",57:"S",58:"S",59:"N",60:"D"}
  },
  {
    id:"labirinto", word:"LABIRINTO", lang:"Georgiano",
    meaning:"Laberinto",
    hint:"La palabra viaja del griego al georgiano casi sin cambios. El mito del Minotauro se conoce en toda la región del Cáucaso",
    clue:"Un conjunto de caminos entrelazados y confusos del que es difícil salir",
    accept:["laberinto","laberinto","maze","dédalo","dedalo","enredo","intrincado","confuso"],
    a:{1:"S",2:"N",3:"N",4:"D",5:"N",6:"N",7:"S",8:"D",9:"N",10:"S",11:"N",12:"N",13:"S",14:"N",15:"N",16:"S",17:"D",18:"N",19:"N",20:"S",21:"N",22:"S",23:"N",24:"N",25:"N",26:"S",27:"N",28:"S",29:"N",30:"N",31:"S",32:"N",33:"D",34:"N",35:"S",36:"D",37:"D",38:"N",39:"S",40:"N",41:"N",42:"N",43:"N",44:"N",45:"N",46:"N",47:"N",48:"N",49:"D",50:"S",51:"S",52:"S",53:"S",54:"S",55:"N",56:"S",57:"N",58:"N",59:"N",60:"D"}
  },
  {
    id:"lampu", word:"LAMPU", lang:"Swahili",
    meaning:"Lámpara",
    hint:"Del árabe al swahili. Las lámparas de aceite y luego de queroseno fueron fundamentales en las ciudades costeras de África oriental",
    clue:"Un aparato que produce luz artificial. Puede ser eléctrica, de aceite o de gas",
    accept:["lámpara","lampara","luz","farol","quinqué","quinque","linterna","bombilla","candil","foco"],
    a:{1:"S",2:"N",3:"N",4:"N",5:"N",6:"N",7:"S",8:"S",9:"S",10:"D",11:"N",12:"N",13:"S",14:"N",15:"N",16:"S",17:"D",18:"N",19:"N",20:"S",21:"N",22:"S",23:"S",24:"N",25:"N",26:"S",27:"N",28:"S",29:"N",30:"N",31:"S",32:"N",33:"S",34:"N",35:"N",36:"N",37:"N",38:"N",39:"S",40:"N",41:"N",42:"N",43:"N",44:"N",45:"N",46:"N",47:"N",48:"S",49:"N",50:"S",51:"S",52:"S",53:"S",54:"S",55:"N",56:"D",57:"S",58:"S",59:"N",60:"D"}
  },
  {
    id:"uwa", word:"UWA", lang:"Tagalo",
    meaning:"Lluvia",
    hint:"Filipinas tiene monzones muy intensos. El tagalo tiene varias palabras para distintos tipos de lluvia",
    clue:"El agua que cae del cielo en forma de gotas cuando las nubes se condensan",
    accept:["lluvia","llover","precipitación","precipitacion","aguacero","chubasco","rain","chaparrón","chaparro"],
    a:{1:"D",2:"S",3:"N",4:"N",5:"N",6:"S",7:"D",8:"N",9:"N",10:"S",11:"N",12:"N",13:"N",14:"S",15:"S",16:"S",17:"D",18:"S",19:"N",20:"S",21:"N",22:"D",23:"S",24:"S",25:"D",26:"S",27:"N",28:"S",29:"N",30:"N",31:"S",32:"N",33:"D",34:"D",35:"S",36:"N",37:"D",38:"N",39:"N",40:"N",41:"N",42:"S",43:"D",44:"N",45:"N",46:"N",47:"S",48:"D",49:"D",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"N",57:"N",58:"N",59:"S",60:"D"}
  },
  {
    id:"masika", word:"MASIKA", lang:"Swahili",
    meaning:"Luna",
    hint:"En swahili MASIKA también es el nombre de la estación lluviosa, porque coincide con cierta fase lunar",
    clue:"El satélite natural de la Tierra. Se ve de noche y cambia de forma cada día",
    accept:["luna","moon","satélite","satelite","astro","creciente","menguante","plenilunio"],
    a:{1:"S",2:"N",3:"N",4:"N",5:"N",6:"N",7:"N",8:"D",9:"N",10:"S",11:"N",12:"N",13:"N",14:"S",15:"S",16:"S",17:"S",18:"N",19:"N",20:"N",21:"N",22:"N",23:"S",24:"S",25:"S",26:"S",27:"N",28:"S",29:"N",30:"N",31:"S",32:"N",33:"S",34:"N",35:"N",36:"N",37:"S",38:"N",39:"N",40:"N",41:"N",42:"S",43:"N",44:"N",45:"N",46:"N",47:"N",48:"S",49:"D",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"S",57:"N",58:"N",59:"S",60:"D"}
  },
  {
    id:"valo", word:"VALO", lang:"Finlandés",
    meaning:"Luz",
    hint:"En Finlandia la luz es un bien escaso en invierno. VALO también aparece en nombres propios y poesía",
    clue:"La energía que hace visibles las cosas. Sin ella solo hay oscuridad",
    accept:["luz","lumbre","brillo","resplandor","light","claridad","luminosidad","iluminación","iluminacion"],
    a:{1:"D",2:"S",3:"N",4:"D",5:"N",6:"S",7:"N",8:"N",9:"N",10:"S",11:"N",12:"N",13:"D",14:"S",15:"S",16:"S",17:"S",18:"N",19:"N",20:"N",21:"S",22:"S",23:"S",24:"S",25:"D",26:"S",27:"N",28:"S",29:"D",30:"N",31:"S",32:"N",33:"S",34:"N",35:"S",36:"N",37:"S",38:"N",39:"N",40:"N",41:"N",42:"S",43:"N",44:"N",45:"N",46:"D",47:"N",48:"S",49:"D",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"N",57:"N",58:"N",59:"S",60:"D"}
  },
  {
    id:"egur", word:"EGUR", lang:"Vasco",
    meaning:"Madera",
    hint:"El País Vasco tiene una larga tradición de carpintería y construcción naval en madera",
    clue:"El material sólido y duro que forma el tronco y las ramas de los árboles",
    accept:["madera","madera","wood","tronco","leña","lena","tablón","tablon","tabla","roble","pino"],
    a:{1:"S",2:"N",3:"N",4:"N",5:"N",6:"N",7:"S",8:"S",9:"D",10:"S",11:"D",12:"S",13:"D",14:"D",15:"N",16:"S",17:"S",18:"N",19:"S",20:"S",21:"N",22:"S",23:"S",24:"S",25:"N",26:"S",27:"N",28:"S",29:"N",30:"N",31:"S",32:"N",33:"S",34:"N",35:"N",36:"N",37:"N",38:"S",39:"N",40:"N",41:"N",42:"D",43:"N",44:"D",45:"N",46:"S",47:"N",48:"N",49:"D",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"S",57:"S",58:"S",59:"S",60:"D"}
  },
  {
    id:"magiya", word:"MAGIYA", lang:"Georgiano",
    meaning:"Magia",
    hint:"Georgia tiene una tradición de cuentos y leyendas llenas de seres sobrenaturales y poderes ocultos",
    clue:"El supuesto poder de alterar la realidad mediante fórmulas, rituales o voluntad sobrenatural",
    accept:["magia","magic","hechicería","hechiceria","brujería","brujeria","encanto","sortilegio","ilusión","ilusion"],
    a:{1:"N",2:"D",3:"D",4:"S",5:"N",6:"N",7:"N",8:"N",9:"N",10:"N",11:"N",12:"N",13:"N",14:"N",15:"N",16:"D",17:"N",18:"N",19:"N",20:"N",21:"N",22:"D",23:"N",24:"N",25:"N",26:"S",27:"N",28:"S",29:"N",30:"D",31:"S",32:"S",33:"D",34:"D",35:"S",36:"D",37:"S",38:"S",39:"N",40:"S",41:"N",42:"N",43:"N",44:"N",45:"N",46:"D",47:"N",48:"D",49:"S",50:"S",51:"S",52:"S",53:"S",54:"S",55:"N",56:"N",57:"N",58:"N",59:"D",60:"D"}
  },
  {
    id:"tai", word:"TAI", lang:"Maorí",
    meaning:"Marea",
    hint:"Los maorís construyeron sus asentamientos conociendo perfectamente los ciclos de las mareas",
    clue:"El movimiento periódico del nivel del mar que sube y baja cada doce horas por la gravedad lunar",
    accept:["marea","mareas","tide","pleamar","bajamar","flujo","reflujo","corriente"],
    a:{1:"D",2:"S",3:"N",4:"N",5:"N",6:"S",7:"D",8:"N",9:"N",10:"S",11:"N",12:"N",13:"N",14:"S",15:"S",16:"D",17:"D",18:"S",19:"D",20:"D",21:"N",22:"N",23:"S",24:"S",25:"N",26:"S",27:"N",28:"S",29:"N",30:"N",31:"S",32:"N",33:"D",34:"D",35:"S",36:"D",37:"S",38:"N",39:"N",40:"N",41:"S",42:"S",43:"N",44:"D",45:"N",46:"N",47:"S",48:"N",49:"D",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"N",57:"N",58:"N",59:"S",60:"D"}
  },
  {
    id:"choucho", word:"CHOUCHO", lang:"Swahili",
    meaning:"Mariposa",
    hint:"En swahili el nombre imita levemente el aleteo suave del insecto",
    clue:"Un insecto con cuatro alas de colores muy vistosos que se alimenta del néctar de las flores",
    accept:["mariposa","butterfly","polilla","lepidóptero","lepidoptero","insecto","oruga"],
    a:{1:"S",2:"N",3:"N",4:"N",5:"N",6:"N",7:"D",8:"S",9:"S",10:"N",11:"D",12:"S",13:"N",14:"S",15:"S",16:"S",17:"S",18:"N",19:"N",20:"N",21:"N",22:"D",23:"S",24:"S",25:"S",26:"S",27:"N",28:"S",29:"N",30:"N",31:"S",32:"N",33:"S",34:"N",35:"N",36:"N",37:"S",38:"N",39:"N",40:"N",41:"N",42:"S",43:"N",44:"D",45:"N",46:"N",47:"N",48:"N",49:"N",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"N",57:"N",58:"N",59:"S",60:"D"}
  },
  {
    id:"muisti", word:"MUISTI", lang:"Finlandés",
    meaning:"Memoria",
    hint:"En finlandés MUISTI también se usa para la memoria de los ordenadores. La misma palabra para la mente y la máquina",
    clue:"La capacidad de recordar experiencias, conocimientos y emociones del pasado",
    accept:["memoria","recuerdo","remembranza","memory","mente","reminiscencia","evocación","evocacion"],
    a:{1:"N",2:"N",3:"D",4:"S",5:"D",6:"N",7:"N",8:"N",9:"N",10:"N",11:"N",12:"N",13:"N",14:"N",15:"N",16:"N",17:"N",18:"N",19:"N",20:"N",21:"N",22:"S",23:"S",24:"N",25:"N",26:"S",27:"N",28:"S",29:"S",30:"N",31:"S",32:"N",33:"D",34:"N",35:"S",36:"N",37:"N",38:"N",39:"N",40:"N",41:"N",42:"N",43:"N",44:"N",45:"N",46:"N",47:"N",48:"N",49:"N",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"N",57:"N",58:"N",59:"D",60:"D"}
  },
  {
    id:"begirada", word:"BEGIRADA", lang:"Vasco",
    meaning:"Mirada",
    hint:"En euskera BEGI significa ojo. BEGIRADA es literalmente 'lo que hace el ojo'",
    clue:"El acto de dirigir los ojos hacia algo o alguien con atención",
    accept:["mirada","vistazo","ojeada","ojo","vista","gaze","look","ojeo","contemplación","contemplacion"],
    a:{1:"N",2:"S",3:"D",4:"N",5:"N",6:"N",7:"N",8:"N",9:"N",10:"N",11:"N",12:"N",13:"N",14:"N",15:"N",16:"D",17:"N",18:"N",19:"N",20:"N",21:"S",22:"N",23:"N",24:"N",25:"N",26:"S",27:"D",28:"S",29:"S",30:"S",31:"S",32:"N",33:"D",34:"N",35:"S",36:"N",37:"S",38:"N",39:"N",40:"N",41:"N",42:"D",43:"N",44:"N",45:"N",46:"N",47:"N",48:"D",49:"D",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"N",57:"N",58:"N",59:"D",60:"N"}
  },
  {
    id:"misterio2", word:"MISTÉRIO", lang:"Portugués",
    meaning:"Misterio",
    hint:"En Portugal los Mistérios son también representaciones teatrales religiosas medievales que aún se celebran",
    clue:"Algo que no se puede explicar o entender con la razón. Provoca curiosidad e inquietud",
    accept:["misterio","enigma","secreto","incógnita","incognita","mystery","arcano","oculto","desconocido"],
    a:{1:"N",2:"N",3:"D",4:"S",5:"N",6:"N",7:"N",8:"N",9:"N",10:"N",11:"N",12:"N",13:"N",14:"D",15:"N",16:"N",17:"N",18:"N",19:"N",20:"N",21:"N",22:"D",23:"N",24:"D",25:"N",26:"S",27:"N",28:"S",29:"N",30:"D",31:"S",32:"N",33:"N",34:"D",35:"S",36:"D",37:"S",38:"N",39:"N",40:"N",41:"N",42:"N",43:"N",44:"N",45:"N",46:"N",47:"N",48:"D",49:"D",50:"S",51:"S",52:"S",53:"S",54:"S",55:"N",56:"N",57:"N",58:"N",59:"D",60:"N"}
  },
  {
    id:"maunga", word:"MAUNGA", lang:"Maorí",
    meaning:"Montaña",
    hint:"En la cultura maorí cada maunga es sagrado y tiene nombre propio. El Taranaki y el Ruapehu son divinidades",
    clue:"Una gran elevación natural del terreno con cima definida. Puede estar nevada todo el año",
    accept:["montaña","monte","cerro","cima","pico","peak","mountain","sierra","cumbre","cordillera"],
    a:{1:"S",2:"N",3:"N",4:"N",5:"N",6:"N",7:"S",8:"S",9:"N",10:"S",11:"N",12:"N",13:"N",14:"S",15:"N",16:"S",17:"D",18:"N",19:"D",20:"S",21:"N",22:"S",23:"S",24:"S",25:"D",26:"S",27:"N",28:"S",29:"N",30:"N",31:"S",32:"N",33:"D",34:"D",35:"S",36:"D",37:"S",38:"N",39:"N",40:"N",41:"S",42:"S",43:"S",44:"N",45:"N",46:"N",47:"D",48:"N",49:"D",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"S",57:"N",58:"N",59:"S",60:"D"}
  },
  {
    id:"sorina", word:"SORINA", lang:"Georgiano",
    meaning:"Murmullo",
    hint:"En Georgia los ríos del Cáucaso murmuran entre las rocas. SORINA evoca ese sonido constante y suave",
    clue:"Un sonido suave, continuo y poco claro. Como el de voces lejanas o el agua entre piedras",
    accept:["murmullo","susurro","cuchicheo","rumor","runrún","runrun","murmur","ruido suave","bisbiseo"],
    a:{1:"D",2:"S",3:"N",4:"N",5:"N",6:"S",7:"N",8:"N",9:"N",10:"N",11:"N",12:"N",13:"N",14:"S",15:"S",16:"N",17:"N",18:"S",19:"N",20:"N",21:"N",22:"D",23:"N",24:"S",25:"N",26:"S",27:"D",28:"S",29:"N",30:"D",31:"S",32:"N",33:"S",34:"N",35:"S",36:"N",37:"N",38:"N",39:"N",40:"N",41:"N",42:"D",43:"N",44:"N",45:"N",46:"N",47:"D",48:"D",49:"N",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"N",57:"N",58:"N",59:"S",60:"N"}
  },


  // ── Bloque 7 — palabras 84 a 89 ──────────────────────────────────────
  {
    id:"udumagimbi", word:"UDUMAGIMBI", lang:"Ruandés",
    meaning:"Niebla",
    hint:"Ruanda se llama 'el país de las mil colinas' y sus valles están permanentemente envueltos en niebla",
    clue:"Una nube muy baja que se pega al suelo y reduce la visibilidad a pocos metros",
    accept:["niebla","neblina","bruma","nube","fog","mist","calima","calina","vapor"],
    a:{1:"D",2:"N",3:"N",4:"N",5:"N",6:"S",7:"D",8:"N",9:"N",10:"S",11:"N",12:"N",13:"N",14:"S",15:"S",16:"D",17:"D",18:"N",19:"N",20:"S",21:"N",22:"D",23:"S",24:"S",25:"D",26:"S",27:"N",28:"S",29:"N",30:"N",31:"S",32:"N",33:"D",34:"N",35:"S",36:"D",37:"D",38:"N",39:"N",40:"S",41:"N",42:"S",43:"D",44:"N",45:"N",46:"N",47:"D",48:"D",49:"N",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"N",57:"N",58:"N",59:"S",60:"D"}
  },
  {
    id:"huka", word:"HUKA", lang:"Maorí",
    meaning:"Nieve",
    hint:"Aunque Nueva Zelanda es subtropical, sus volcanes y los Alpes del Sur se cubren de huka en invierno",
    clue:"Agua congelada que cae del cielo en copos blancos y blandos",
    accept:["nieve","nevada","copo","nival","snow","escarcha","hielo","blanco","ventisca"],
    a:{1:"S",2:"N",3:"N",4:"N",5:"N",6:"N",7:"S",8:"N",9:"S",10:"S",11:"N",12:"N",13:"N",14:"S",15:"N",16:"S",17:"S",18:"N",19:"N",20:"S",21:"N",22:"D",23:"S",24:"S",25:"S",26:"S",27:"N",28:"S",29:"N",30:"N",31:"S",32:"N",33:"S",34:"N",35:"N",36:"N",37:"S",38:"N",39:"N",40:"N",41:"D",42:"S",43:"S",44:"N",45:"N",46:"N",47:"S",48:"N",49:"D",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"N",57:"N",58:"N",59:"S",60:"D"}
  },
  {
    id:"hoderi", word:"HODERI", lang:"Japonés",
    meaning:"Nube",
    hint:"En la poesía clásica japonesa las nubes son símbolo de lo efímero y lo que cambia sin parar",
    clue:"Una masa de vapor de agua condensado que flota en el cielo. Puede ser blanca o gris",
    accept:["nube","nubes","cloud","cúmulo","cumulo","nimbo","vapor","niebla"],
    a:{1:"D",2:"N",3:"N",4:"N",5:"N",6:"S",7:"D",8:"N",9:"N",10:"S",11:"N",12:"N",13:"N",14:"S",15:"S",16:"S",17:"D",18:"N",19:"N",20:"N",21:"N",22:"D",23:"S",24:"S",25:"D",26:"S",27:"N",28:"S",29:"N",30:"N",31:"S",32:"N",33:"S",34:"N",35:"N",36:"N",37:"S",38:"N",39:"N",40:"N",41:"N",42:"S",43:"D",44:"N",45:"N",46:"N",47:"D",48:"D",49:"N",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"N",57:"N",58:"N",59:"S",60:"D"}
  },
  {
    id:"wahat", word:"WAHAT", lang:"Tamazight",
    meaning:"Oasis",
    hint:"Los bereberes del Sahara conocen los oasis como puntos de supervivencia en las rutas de caravanas",
    clue:"Un lugar con agua y vegetación en medio del desierto. Un punto de vida rodeado de arena",
    accept:["oasis","manantial","refugio","vergel","oasis","jardín","jardin","huerto","fuente"],
    a:{1:"S",2:"N",3:"N",4:"N",5:"N",6:"N",7:"S",8:"D",9:"N",10:"S",11:"D",12:"S",13:"N",14:"S",15:"N",16:"S",17:"S",18:"N",19:"S",20:"S",21:"N",22:"S",23:"N",24:"S",25:"N",26:"S",27:"N",28:"S",29:"N",30:"N",31:"S",32:"N",33:"S",34:"N",35:"N",36:"N",37:"S",38:"N",39:"N",40:"S",41:"N",42:"S",43:"S",44:"D",45:"N",46:"N",47:"S",48:"N",49:"N",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"S",57:"N",58:"N",59:"S",60:"D"}
  },
  {
    id:"ahaztura", word:"AHAZTURA", lang:"Vasco",
    meaning:"Olvido",
    hint:"En euskera la raíz AHAZTU significa olvidar. El olvido es uno de los grandes temas de la poesía vasca",
    clue:"La pérdida de un recuerdo. Cuando algo que sabías o viviste deja de estar en tu mente",
    accept:["olvido","olvidar","amnesia","desmemoria","olvido","oblivion","laguna","pérdida","perdida"],
    a:{1:"N",2:"N",3:"S",4:"S",5:"N",6:"N",7:"N",8:"N",9:"N",10:"N",11:"N",12:"N",13:"N",14:"N",15:"N",16:"N",17:"N",18:"N",19:"N",20:"N",21:"N",22:"D",23:"S",24:"N",25:"N",26:"S",27:"N",28:"S",29:"S",30:"N",31:"S",32:"N",33:"N",34:"D",35:"S",36:"N",37:"N",38:"N",39:"N",40:"N",41:"N",42:"N",43:"N",44:"N",45:"N",46:"N",47:"N",48:"N",49:"N",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"N",57:"N",58:"N",59:"N",60:"N"}
  },
  {
    id:"pesqueira", word:"PESQUEIRA", lang:"Portugués",
    meaning:"Orilla",
    hint:"Portugal tiene miles de kilómetros de orilla entre el Atlántico y sus ríos. La palabra evoca pesca y trabajo junto al agua",
    clue:"El borde donde la tierra se encuentra con el agua. Puede ser de un río, un lago o el mar",
    accept:["orilla","ribera","margen","costa","borde","shore","bank","litoral","vera","playa"],
    a:{1:"S",2:"N",3:"N",4:"N",5:"N",6:"N",7:"S",8:"D",9:"N",10:"S",11:"N",12:"N",13:"N",14:"S",15:"N",16:"S",17:"D",18:"S",19:"D",20:"S",21:"N",22:"S",23:"S",24:"S",25:"N",26:"S",27:"N",28:"S",29:"N",30:"N",31:"S",32:"N",33:"S",34:"N",35:"N",36:"N",37:"S",38:"N",39:"N",40:"N",41:"S",42:"S",43:"N",44:"D",45:"S",46:"N",47:"S",48:"N",49:"N",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"N",57:"N",58:"N",59:"S",60:"D"}
  },


  // ── Bloque 8 — palabras 90 a 100 (último bloque) ─────────────────────
  {
    id:"tukuahua", word:"TUKUAHUA", lang:"Quechua",
    meaning:"Paisaje",
    hint:"El quechua nació en los Andes, donde el paisaje es uno de los más dramáticos del mundo",
    clue:"El conjunto de todo lo que se ve desde un punto: montañas, valles, cielo, vegetación",
    accept:["paisaje","panorama","vista","landscape","scenery","escenario","entorno","horizonte"],
    a:{1:"D",2:"N",3:"N",4:"D",5:"N",6:"S",7:"N",8:"N",9:"N",10:"S",11:"N",12:"N",13:"N",14:"S",15:"N",16:"S",17:"S",18:"D",19:"D",20:"N",21:"N",22:"S",23:"S",24:"S",25:"S",26:"S",27:"N",28:"S",29:"N",30:"N",31:"S",32:"N",33:"S",34:"N",35:"S",36:"N",37:"S",38:"N",39:"N",40:"N",41:"N",42:"S",43:"D",44:"N",45:"N",46:"D",47:"D",48:"D",49:"N",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"N",57:"N",58:"N",59:"S",60:"D"}
  },
  {
    id:"lafzi", word:"LAFZI", lang:"Tamazight",
    meaning:"Palabra",
    hint:"El tamazight fue durante siglos una lengua solo oral. Cada lafzi era preciosa porque no se podía escribir",
    clue:"La unidad básica del lenguaje. Un sonido o conjunto de letras con un significado",
    accept:["palabra","vocablo","término","termino","voz","word","expresión","expresion","dicción","diccion"],
    a:{1:"D",2:"N",3:"N",4:"S",5:"N",6:"S",7:"N",8:"N",9:"N",10:"N",11:"N",12:"N",13:"N",14:"N",15:"N",16:"N",17:"N",18:"S",19:"N",20:"N",21:"S",22:"D",23:"S",24:"N",25:"N",26:"S",27:"N",28:"S",29:"N",30:"S",31:"S",32:"S",33:"D",34:"N",35:"S",36:"N",37:"D",38:"N",39:"N",40:"N",41:"N",42:"N",43:"N",44:"N",45:"N",46:"S",47:"N",48:"N",49:"D",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"N",57:"N",58:"N",59:"S",60:"D"}
  },
  {
    id:"korakaha", word:"KORAKAHA", lang:"Sinhalés",
    meaning:"Pantano",
    hint:"Sri Lanka tiene zonas húmedas tropicales donde los pantanos son hábitat de cocodrilos y aves exóticas",
    clue:"Una zona de terreno muy húmedo, cubierta de agua estancada y barro. Difícil de cruzar",
    accept:["pantano","ciénaga","cienaga","marisma","lodazal","fango","barro","swamp","tremedal","marjal"],
    a:{1:"S",2:"N",3:"N",4:"N",5:"N",6:"N",7:"S",8:"N",9:"N",10:"S",11:"N",12:"S",13:"N",14:"S",15:"D",16:"D",17:"D",18:"D",19:"S",20:"S",21:"N",22:"S",23:"S",24:"S",25:"D",26:"S",27:"N",28:"S",29:"N",30:"N",31:"S",32:"N",33:"N",34:"S",35:"S",36:"D",37:"N",38:"N",39:"N",40:"S",41:"D",42:"S",43:"N",44:"N",45:"N",46:"N",47:"S",48:"N",49:"N",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"S",57:"N",58:"N",59:"S",60:"D"}
  },
  {
    id:"karatasi", word:"KARATASI", lang:"Swahili",
    meaning:"Papel",
    hint:"Viene del árabe. El comercio del papel fue vital en las rutas de la costa swahili entre África y Arabia",
    clue:"Una lámina fina y flexible hecha de fibras vegetales. Se usa para escribir, dibujar y envolver",
    accept:["papel","hoja","folio","paper","cartulina","pergamino","lámina","lamina","pliego"],
    a:{1:"S",2:"N",3:"N",4:"N",5:"N",6:"N",7:"S",8:"S",9:"S",10:"N",11:"N",12:"N",13:"S",14:"D",15:"N",16:"S",17:"D",18:"N",19:"D",20:"S",21:"N",22:"S",23:"S",24:"N",25:"N",26:"S",27:"N",28:"S",29:"N",30:"N",31:"S",32:"S",33:"S",34:"N",35:"N",36:"N",37:"N",38:"N",39:"S",40:"N",41:"N",42:"N",43:"N",44:"N",45:"N",46:"S",47:"N",48:"N",49:"N",50:"S",51:"S",52:"S",53:"S",54:"S",55:"N",56:"N",57:"S",58:"S",59:"S",60:"D"}
  },
  {
    id:"kapaku", word:"KAPAKU", lang:"Japonés",
    meaning:"Párpado",
    hint:"En Japón el doble párpado es un rasgo muy comentado culturalmente. Incluso existe cirugía para modificarlo",
    clue:"El pliegue de piel que cubre y protege el ojo. Se cierra solo cuando duermes o parpadeas",
    accept:["párpado","parpado","eyelid","piel","ojo","pestaña","membrana"],
    a:{1:"S",2:"N",3:"N",4:"N",5:"N",6:"N",7:"S",8:"S",9:"S",10:"N",11:"N",12:"S",13:"N",14:"S",15:"S",16:"S",17:"D",18:"N",19:"N",20:"S",21:"S",22:"S",23:"N",24:"S",25:"N",26:"S",27:"N",28:"S",29:"S",30:"N",31:"S",32:"N",33:"S",34:"N",35:"N",36:"N",37:"N",38:"N",39:"N",40:"N",41:"N",42:"N",43:"N",44:"N",45:"N",46:"N",47:"N",48:"S",49:"N",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"N",57:"N",58:"N",59:"S",60:"D"}
  },
  {
    id:"ilunabar", word:"ILUNABAR", lang:"Vasco",
    meaning:"Penumbra",
    hint:"En euskera ILUN significa oscuro y ARGI significa luz. ILUNABAR es la frontera entre los dos",
    clue:"La zona de sombra parcial entre la luz plena y la oscuridad total. Ni claro ni oscuro del todo",
    accept:["penumbra","semioscuridad","claroscuro","media luz","sombra","oscuridad","crepúsculo","crepusculo","tiniebla"],
    a:{1:"D",2:"N",3:"N",4:"D",5:"N",6:"S",7:"N",8:"N",9:"N",10:"N",11:"N",12:"N",13:"N",14:"S",15:"N",16:"D",17:"D",18:"N",19:"N",20:"N",21:"N",22:"D",23:"S",24:"S",25:"N",26:"S",27:"N",28:"S",29:"N",30:"N",31:"S",32:"N",33:"N",34:"N",35:"S",36:"N",37:"D",38:"N",39:"N",40:"N",41:"N",42:"S",43:"N",44:"N",45:"N",46:"N",47:"N",48:"S",49:"N",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"N",57:"N",58:"N",59:"N",60:"N"}
  },
  {
    id:"manukafi", word:"MANUKAFI", lang:"Hawaiano",
    meaning:"Perfume",
    hint:"En Hawái las flores de plumeria y pikake se usan para hacer leis perfumados. El aroma es parte central de la cultura",
    clue:"Una sustancia líquida con olor agradable que se aplica sobre la piel o la ropa",
    accept:["perfume","aroma","fragancia","colonia","esencia","olor","scent","eau de toilette"],
    a:{1:"S",2:"N",3:"N",4:"N",5:"N",6:"N",7:"S",8:"D",9:"S",10:"N",11:"N",12:"D",13:"S",14:"D",15:"N",16:"N",17:"N",18:"N",19:"S",20:"S",21:"N",22:"S",23:"D",24:"N",25:"N",26:"S",27:"N",28:"S",29:"S",30:"D",31:"S",32:"S",33:"S",34:"N",35:"N",36:"N",37:"S",38:"S",39:"S",40:"S",41:"N",42:"N",43:"N",44:"N",45:"N",46:"N",47:"N",48:"N",49:"D",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"N",57:"S",58:"D",59:"N",60:"D"}
  },
  {
    id:"perala", word:"PERALA", lang:"Sinhalés",
    meaning:"Perla",
    hint:"Sri Lanka fue durante siglos uno de los principales productores de perlas del mundo. Los árabes las llamaban 'lágrimas del mar'",
    clue:"Una esfera pequeña y brillante que se forma dentro de una ostra. Es una piedra preciosa natural",
    accept:["perla","pearl","ostra","nácar","nacar","gema","joya","aljófar","aljofar"],
    a:{1:"S",2:"N",3:"N",4:"N",5:"N",6:"N",7:"S",8:"S",9:"S",10:"N",11:"N",12:"D",13:"N",14:"S",15:"N",16:"S",17:"S",18:"N",19:"N",20:"S",21:"N",22:"S",23:"S",24:"S",25:"N",26:"S",27:"N",28:"S",29:"N",30:"N",31:"S",32:"N",33:"S",34:"N",35:"N",36:"N",37:"S",38:"N",39:"S",40:"S",41:"N",42:"S",43:"N",44:"N",45:"N",46:"D",47:"S",48:"N",49:"D",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"N",57:"S",58:"N",59:"N",60:"D"}
  },
  {
    id:"kivi", word:"KIVI", lang:"Finlandés",
    meaning:"Piedra",
    hint:"Finlandia emerge todavía del mar tras el peso de los glaciares. El país está lleno de rocas y kivi por todas partes",
    clue:"Un fragmento sólido de roca. Puede ser diminuto o enorme, liso o rugoso",
    accept:["piedra","roca","peña","guijarro","canto","stone","rock","mineral","peñasco","pedrusco"],
    a:{1:"S",2:"N",3:"N",4:"N",5:"N",6:"N",7:"S",8:"S",9:"D",10:"D",11:"N",12:"N",13:"N",14:"S",15:"N",16:"S",17:"D",18:"N",19:"N",20:"S",21:"N",22:"S",23:"D",24:"S",25:"N",26:"S",27:"N",28:"S",29:"N",30:"N",31:"S",32:"N",33:"D",34:"N",35:"S",36:"D",37:"D",38:"N",39:"N",40:"N",41:"D",42:"S",43:"N",44:"N",45:"N",46:"N",47:"D",48:"N",49:"D",50:"S",51:"S",52:"S",53:"S",54:"N",55:"N",56:"D",57:"S",58:"N",59:"S",60:"D"}
  },
  {
    id:"rangimarie", word:"RANGIMĀRIE", lang:"Maorí",
    meaning:"Pintura",
    hint:"Los maorís tienen una tradición pictórica muy rica en los wharenui (casas comunales), con diseños en rojo, negro y blanco",
    clue:"Una imagen creada aplicando color sobre una superficie. También el material líquido que se usa para ello",
    accept:["pintura","cuadro","lienzo","painting","colorear","arte","obra","fresco","mural","pigmento"],
    a:{1:"S",2:"D",3:"N",4:"D",5:"N",6:"S",7:"S",8:"S",9:"D",10:"D",11:"N",12:"N",13:"S",14:"D",15:"N",16:"S",17:"S",18:"N",19:"S",20:"S",21:"N",22:"S",23:"N",24:"N",25:"N",26:"S",27:"N",28:"S",29:"N",30:"N",31:"S",32:"S",33:"S",34:"D",35:"S",36:"N",37:"S",38:"S",39:"S",40:"S",41:"N",42:"N",43:"N",44:"N",45:"N",46:"S",47:"N",48:"N",49:"D",50:"S",51:"S",52:"S",53:"S",54:"N",55:"S",56:"N",57:"S",58:"S",59:"S",60:"D"}
  },
  {
    id:"graha", word:"GRAHA", lang:"Sánscrito",
    meaning:"Planeta",
    hint:"En sánscrito GRAHA significa literalmente 'el que agarra'. Los planetas 'agarran' a las personas según la astrología védica",
    clue:"Un cuerpo celeste esférico que orbita alrededor de una estrella. La Tierra es uno de ellos",
    accept:["planeta","planet","astro","mundo","orbe","cuerpo celeste","órbita","orbita"],
    a:{1:"S",2:"N",3:"N",4:"N",5:"N",6:"N",7:"N",8:"D",9:"N",10:"S",11:"N",12:"N",13:"N",14:"S",15:"S",16:"S",17:"D",18:"N",19:"N",20:"N",21:"N",22:"S",23:"S",24:"S",25:"N",26:"S",27:"N",28:"S",29:"N",30:"N",31:"S",32:"N",33:"D",34:"N",35:"N",36:"N",37:"S",38:"N",39:"N",40:"S",41:"N",42:"S",43:"D",44:"N",45:"N",46:"N",47:"N",48:"S",49:"D",50:"S",51:"S",52:"S",53:"S",54:"S",55:"S",56:"S",57:"N",58:"N",59:"S",60:"D"}
  },


];

// ── Exponer al scope global para game.js ──────────────────────────────
window.CATS  = CATS;
window.ALL_Q = ALL_Q;
window.Q_MAP = Q_MAP;
window.WORDS = WORDS;
