import { Rector } from './types';

// Helper para reciclar fondos (1-5)
// Rector 1 -> Fondo 1, Rector 6 -> Fondo 1, etc.
const getFondo = (index: number) => `/images/fondo_${(index % 5) + 1}.jpg`;

export const RECTORES: Rector[] = [
  {
    id: "rector_1",
    nombre: "Dr. José de Baños y Sotomayor",
    periodo: "1686",
    descripcion_corta: "Primer rector designado formalmente al inicio del ejercicio institucional de la Real y Pontificia Universidad de San Carlos. Destacó por consolidar las cátedras fundamentales y organizar la vida académica en el Reino de Guatemala.",
    cita: "La sabiduría y el derecho son los cimientos sobre los cuales se erige la grandeza de una cátedra perpetua al servicio de la fe y el conocimiento.",
    trayectoria_academica: "Rector de la Real y Pontificia Universidad de San Carlos Borromeo. Originario de Santa Fe de Bogotá (Colombia), donde realizó sus estudios. Fue trasladado a Guatemala con el cargo de Arcediano de la Catedral, y después fue promovido a Deán. Se desempeñó, asimismo, como catedrático de Prima de Teología, en la Universidad, en la que ocupó la distinguida posición de Rector Perpetuo.",
    logros_gestion: "Durante su gestión como rector de la Real y Pontificia Universidad de San Carlos Borromeo, José de Baños y Sotomayor contribuyó al fortalecimiento de la organización académica y administrativa de la institución, consolidando la enseñanza tradicional en medicina, filosofía, teología y derecho, en concordancia con el modelo universitario colonial y el marco eclesiástico de su época.",
    foto_url: "/images/Dr. Jose de Baños y Sotomayor.png",
    fondo_url: getFondo(0),
    interacciones: { likes: 120, alumnos: 450 }
  },
  {
    id: "rector_2",
    nombre: "Dr. José Alejandro de Aycinena y Carrillo",
    periodo: "1800",
    descripcion_corta: "Defensor de la autonomía institucional y preservador del modelo académico tradicional frente a las transformaciones políticas de la era post-independencia en Guatemala.",
    cita: "La estabilidad de la enseñanza y el respeto a la tradición son los muros que protegen la integridad de nuestra academia frente a los vientos de cambio.",
    trayectoria_academica: "Fue doctor en Teología y Derecho Canónico, catedrático universitario y miembro del alto clero guatemalteco. Su formación se desarrolló dentro del modelo escolástico colonial, centrado en la enseñanza de la teología, la filosofía y el derecho, y representó el pensamiento conservador y clerical predominante en la educación superior de la época.",
    logros_gestion: "Durante su rectoría, defendió la continuidad institucional de la Real y Pontificia Universidad de San Carlos de Guatemala en un período de transición posterior a la Independencia. Su gestión se orientó a preservar el modelo académico tradicional, mantener la influencia del clero en la universidad y asegurar el funcionamiento de la institución frente a las corrientes liberales emergentes.",
    foto_url: "/images/Dr. Jose Alejandro de Aycinena.png",
    fondo_url: getFondo(1),
    interacciones: { likes: 145, alumnos: 520 }
  },
  {
    id: "rector_3",
    nombre: "José Simeón Cañas",
    periodo: "1805–1813",
    descripcion_corta: "Rector humanista e ilustrado que impulsó el pensamiento crítico y la conciencia social, transformando la educación académica bajo los principios de la libertad y la dignidad humana.",
    cita: "No hay mayor injusticia que la que se comete contra la libertad del hombre; la verdadera sabiduría reside en romper las cadenas de la desigualdad.",
    trayectoria_academica: "Fue sacerdote, filósofo y académico formado en la Real y Pontificia Universidad de San Carlos de Guatemala. Se desempeñó como catedrático de filosofía y teología, destacándose por su pensamiento humanista e ilustrado. Perteneció al clero intelectual de finales del período colonial y es reconocido por su postura ética y crítica frente a la esclavitud y las desigualdades sociales.",
    logros_gestion: "Durante su rectoría promovió una educación influida por las ideas de la ilustración, fortaleciendo la enseñanza de la filosofía y el pensamiento crítico. Su gestión contribuyó a la formación de intelectuales con conciencia social y reformista, dejando una huella significativa en la etapa final de la universidad colonial.",
    foto_url: "/images/Jose Simeon Canas.png",
    fondo_url: getFondo(2),
    interacciones: { likes: 98, alumnos: 300 }
  },
  {
    id: "rector_4",
    nombre: "Dr. Antonio de Larrazábal y Arrivillaga",
    periodo: "1813, 1820-1825",
    descripcion_corta: "Académico ilustre y figura política clave de la Independencia, cuya gestión rectoral integró la excelencia teológica con la defensa de los derechos civiles y la reforma educativa en Centroamérica.",
    cita: "La educación de un pueblo es la base de su libertad política y el único camino para asegurar la justicia en las nacientes instituciones de nuestra patria.",
    trayectoria_academica: "Se graduó de Licenciado y Doctor en Teología en 1792 y en sagrados cánones en 1797 en la Real y Pontificia Universidad de San Carlos Borromeo. En 1810, fue elegido como diputado a las Cortes de Cádiz. Representó a las Provincias Unidas del Centro América ante el Congreso Bolivariano celebrado en Panamá en 1826. En 1839 fue electo diputado de la Asamblea Constituyente, y se le designó primer Presidente de dicho organismo, cargo que no aceptó.",
    logros_gestion: "Participó en procesos políticos de la Independencia de Centroamérica y defendió derechos civiles y reformas educativas.",
    foto_url: "/images/Dr. Antonio de Larrazabal.png",
    fondo_url: "/images/fondo_6.jpg",
    interacciones: { likes: 210, alumnos: 890 }
  },
  {
    id: "rector_5",
    nombre: "Dr. José de Aycinena y Piñol",
    periodo: "1825-1829, 1840-1865",
    descripcion_corta: "Rector y jurista clave en la reorganización institucional de la Universidad, responsable de consolidar la estabilidad académica y el perfil ideológico de la institución durante las décadas formativas del siglo XIX.",
    cita: "La solidez de las leyes y la continuidad de nuestras instituciones son las únicas garantías para que la academia florezca en tiempos de incertidumbre política.",
    trayectoria_academica: "Obtuvo los grados de Doctor en Derecho Civil en 1817 y en Derecho Canónico en 1821, en la Universidad de San Carlos. Desempeñó los cargos siguientes: Abogado de la Universidad de San Carlos (1817); Teniente Prior del Real Consulado de Comercio; Promotor Fiscal de la Curia (1824) y Decano del Colegio de Abogados (1827).",
    logros_gestion: "Contribuyó de manera decisiva a la continuidad y reorganización de la Universidad de San Carlos en un contexto crítico posterior a la independencia y a las guerras civiles, asegurando su funcionamiento institucional. Durante su rectorado, fortaleció los vínculos de la Universidad con la Iglesia Católica, tanto en el ámbito curricular como en el administrativo, y consolidó una estrecha relación con el poder estatal conservador. Esta orientación influyó de forma significativa en el perfil académico e ideológico de la Universidad, marcando su desarrollo institucional durante varias décadas del siglo XIX.",
    foto_url: "/images/Dr. Jose de Aycinena.png",
    fondo_url: getFondo(4),
    interacciones: { likes: 175, alumnos: 600 }
  },
  {
    id: "rector_6",
    nombre: "Dr. Agustín Gómez Carrillo",
    periodo: "1899",
    descripcion_corta: "Intelectual y polímata que proyectó el prestigio de la Universidad al ámbito internacional, impulsando la investigación histórica y jurídica como pilares del desarrollo cultural guatemalteco.",
    cita: "La historia y las letras son el espejo donde un pueblo reconoce su identidad, y la Universidad el recinto sagrado donde esa verdad debe ser custodiada.",
    trayectoria_academica: "Abogado, escritor e historiador. Realizó sus estudios en el Seminario Tridentino, donde obtuvo el grado de Bachiller en Humanidades y Filosofía. Desempeñó los cargos de oficial de la Secretaría de Hacienda, diputado, Subsecretario de Relaciones Exteriores y de Educación Pública, y vocal de la Junta Directiva de la Sociedad Económica de Amigos del País. Fue uno de los fundadores de la Academia Guatemalteca de la Lengua. Perteneció a la Sociedad de Arqueología de México, a la Academia de la Historia Española, a la Academia de Bellas Letras de Santiago de Chile, entre otras.",
    logros_gestion: "Promovió la producción intelectual y la investigación histórica y jurídica, y reforzó el prestigio académico de la Universidad mediante su propia labor como jurista, historiador y miembro de academias nacionales e internacionales, lo que proyectó a la institución en el ámbito cultural e intelectual del país.",
    foto_url: "/images/Dr. Agustin Gomez Carrillo.png",
    fondo_url: getFondo(5), // Reusa fondo 1
    interacciones: { likes: 130, alumnos: 410 }
  },
  {
    id: "rector_7",
    nombre: "Dr. Carlos Federico Mora",
    periodo: "1944-1945",
    descripcion_corta: "Rector emblemático de la Revolución de Octubre y artífice de la autonomía universitaria, cuya gestión inauguró el régimen democrático y científico que define la identidad moderna de la Universidad de San Carlos.",
    cita: "La autonomía no es solo una libertad administrativa, es la sagrada obligación de la universidad de iluminar el camino de la patria con la antorcha de la ciencia y la conciencia social.",
    trayectoria_academica: "Médico y cirujano. Catedrático universitario. Fue Ministro de Educación y de Salud. Cursó un postgrado en la Universidad Johns Hopkins en Estados Unidos y estudió en el Instituto de Medicina Legal de Psiquiatría en Francia. Director del Asilo de Alienados. Fue cónsul de Guatemala en Hamburgo y Ministro Plenipotenciario en Berlín. Promovió la Ley Orgánica y Reglamentaria del Personal Docente de la República. Miembro fundador de la Universidad Popular. ",
    logros_gestion: "Participación universitaria en la Revolución de octubre de 1944. Inauguración del régimen autónomo de la Universidad. Impulso a la ciencia y medicina. Creación de los mecanismos y organización de las primeras elecciones universitarias.",
    foto_url: "/images/Dr. Carlos Federico Mora.jpeg",
    fondo_url: getFondo(6), // Reusa fondo 2
    interacciones: { likes: 190, alumnos: 750 }
  },
  {
    id: "rector_8",
    nombre: "Lic. Julio Valladares Márquez",
    periodo: "1945",
    descripcion_corta: "Pionero de la toxicología y precursor de la democracia universitaria, responsable de conducir el histórico proceso electoral que consolidó la participación de los tres sectores en la elección del Rector.",
    cita: "La verdadera esencia de la autonomía reside en la voluntad soberana de sus sectores, unidos por el rigor de la ciencia y el compromiso con la verdad.",
    trayectoria_academica: "Licenciado en Ciencias Químicas y Farmacia. Ejerció la docencia universitaria. Fue Decano de la Facultad de Ciencias Químicas y Farmacia. Rector interino. Estudió química, analítica forense y toxicología en Francia. Pionero del Departamento de Toxicología en su facultad. Fue miembro de la comisión para la fo",
    logros_gestion: "Realización del primer acto electoral en que estudiantes, profesores y graduados eligieron democráticamente al Rector universitario. Impulso a la ciencia y tecnología.",
    foto_url: "/images/Lic. Julio Valladares Marquez.jpeg",
    fondo_url: getFondo(7), // Reusa fondo 3
    interacciones: { likes: 160, alumnos: 580 }
  },
  {
    id: "rector_9",
    nombre: "Dr. Carlos Martínez Durán",
    periodo: "1945-1950, 1958-1962",
    descripcion_corta: "Visionario y primer Rector electo de la era autónoma, cuya gestión transformó la infraestructura y academia mediante la creación de la Ciudad Universitaria y múltiples facultades esenciales para el desarrollo nacional.",
    cita: "La universidad no solo debe habitar en edificios de piedra, sino expandirse en el espíritu de la cultura, el arte y la ciencia para servir al corazón de nuestro pueblo.",
    trayectoria_academica: "Médico y cirujano. Primer Rector electo en el período autónomo. Fue Ministro de Educación y docente universitario. Realizó estudios de especialización en los Institutos de Patología de las Universidades de Berlín y de La Habana. Parte de su fecunda labor fue su actividad literaria, con un total de 19 libros.",
    logros_gestion: "Adquisición de los terrenos de la Ciudad Universitaria. Fundación del Centro Universitario de Occidente. Creación de las facultades de: Agronomía, Medicina Veterinaria y Arquitectura. Creación de la Escuela de Psicología, y la Escuela de Historia. Inauguración de la Facultad de Humanidades. Fundación de la Imprenta Universitaria y del Teatro de Arte Universitario. Impulso a la construcción del edificio de la Rectoría",
    foto_url: "/images/Dr. Carlos Martinez Duran.jpeg",
    fondo_url: "/images/fondo_4.jpeg", // Reusa fondo 4
    interacciones: { likes: 220, alumnos: 920 }
  },
  {
    id: "rector_10",
    nombre: "Lic. Miguel Asturias Quiñones",
    periodo: "1950-1954",
    descripcion_corta: "Académico polifacético y gestor de la expansión científica, cuya rectoría consolidó la infraestructura bibliotecaria, la investigación técnica y el bienestar estudiantil en la Ciudad Universitaria.",
    cita: "La formación profesional alcanza su plenitud cuando se conjuga el rigor de la ingeniería con el compromiso social de la organización estudiantil.",
    trayectoria_academica: "Abogado y Notario e Ingeniero Civil. Ejerció la docencia. Uno de los fundadores de la Asociación de Estudiantes Universitarios. Fue Decano de la Facultad de Ingeniería y Ministro de Educación Pública.",
    logros_gestion: "Creación de la Facultad de Agronomía y de Biblioteca Central. Transformación del comedor universitario en residencia estudiantil. Aprobación del plan de estudios y condiciones de admisión. Realización de las Olimpiadas Universitarias. Inauguración del Instituto de Investigaciones Científicas. Creación de la Facultad de Ingeniería de Occidente.",
    foto_url: "/images/Lic. Miguel Asturias Quinones.jpeg",
    fondo_url: getFondo(9),
    interacciones: { likes: 0, alumnos: 0 }
  },
  {
    id: "rector_11",
    nombre: "Lic. Vicente Díaz Samayoa",
    periodo: "1954-1958",
    descripcion_corta: "Jurista y filósofo del derecho que impulsó la descentralización académica y el crecimiento de la Ciudad Universitaria mediante la creación de nuevas facultades y la expansión de la infraestructura educativa en el interior del país.",
    cita: "La educación superior debe ser el cimiento de la estructura jurídica y social de la nación, extendiendo su luz más allá de sus propios muros.",
    trayectoria_academica: "Abogado y Notario. Cursó estudios de postgrado, en la especialidad de Filosofía del Derecho, en Argentina. Fue Secretario General de la Universidad. Catedrático universitario. Ministro de Educación Pública y Presidente de la Asamblea Constituyente.",
    logros_gestion: "Fundación de la Facultad de Medicina Veterinaria y Zootecnia. Construcción del nuevo edificio de la Facultad de Ingeniería, en la Ciudad Universitaria, y del edificio de Ciencias Económicas, en Quetzaltenango. Creación del Departamento de Estudios de Derecho Internacional de la Facultad de Derecho, y de la Escuela de Humanidades de Occidente.",
    foto_url: "/images/Lic. Vicente Diaz Samayoa.jpeg",
    fondo_url: getFondo(10),
    interacciones: { likes: 0, alumnos: 0 }
  },
  {
    id: "rector_12",
    nombre: "Ing. Jorge Arias de Blois",
    periodo: "1962-1966",
    descripcion_corta: "Ingeniero experto en estadística y demografía que modernizó la infraestructura universitaria, destacando la finalización del anillo universitario y la construcción de laboratorios clave.",
    cita: "La ingeniería no es solo construir edificios, sino cimentar el futuro académico sobre bases sólidas de ciencia y planificación.",
    trayectoria_academica: "Ingeniero Civil. Fue Decano de la Facultad de Ingeniería. Realizó estudios de postgrado en Estados Unidos. Docente universitario. Como experto en temas estadísticos y poblacionales prestó asesoría a numerosas entidades nacionales e internacionales. La Universidad de Pittsburg le concedió el grado de Doctor Honoris Causa en Ciencias.",
    logros_gestion: "Inicio de la construcción de edificios destinados a estudios básicos. Renovación de los planes de estudio, construcción de los laboratorios de ingeniería y finalización del anillo universitario. Construcción del Anfiteatro.",
    foto_url: "/images/Ing. Jorge Arias de Blois.jpeg",
    fondo_url: getFondo(11),
    interacciones: { likes: 0, alumnos: 0 }
  },
  {
    id: "rector_13",
    nombre: "Lic. Edmundo Vásquez Martínez",
    periodo: "1966-1970",
    descripcion_corta: "Promotor cultural y jurídico que expandió la extensión universitaria y enriqueció el patrimonio institucional con la adquisición del Colegio Santo Tomás.",
    cita: "La cultura y el derecho deben extenderse más allá del campus, alcanzando cada rincón de nuestra sociedad para su verdadera transformación.",
    trayectoria_academica: "Abogado y Notario. Fue Secretario General de la Universidad. Ejerció la docencia universitaria. Ocupó cargos directivos en el Colegio de Abogados. Fue jefe del Departamento de Publicidad y representante de los colegios profesionales.",
    logros_gestion: "Desarrollo de una selecta producción editorial. Instalación del primer Consejo de la Enseñanza Privada Superior. Creación del Centro de Estudios de Población, y del Departamento de Extensión Universitaria. Adquisición del predio del “Colegio de Santo Tomás” en la Antigua Guatemala. Organización del coloquio literario con el escritor Miguel Ángel Asturias y del cuarto Congreso Jurídico Guatemalteco.",
    foto_url: "/images/Lic. Edmundo Vasquez Martinez.jpeg",
    fondo_url: getFondo(12),
    interacciones: { likes: 0, alumnos: 0 }
  },
  {
    id: "rector_14",
    nombre: "Dr. Rafael Cuevas del Cid",
    periodo: "1970-1974",
    descripcion_corta: "Visionario de la profesionalización docente y el servicio social, impulsando la Ciudad Universitaria y creando instituciones fundamentales como el EFPEM.",
    cita: "El servicio social es el alma de la universidad; sin él, la excelencia académica carece de su propósito más noble: servir al pueblo.",
    trayectoria_academica: "Doctor en Derecho por la Universidad de Madrid. Realizó estudios de postgrado en las universidades de Munich, Alemania. Abogado y Notario. Fue Decano de la Facultad de Derecho y Secretario General de la Universidad. Docente universitario. Fue Presidente de la Asociación de Estudiantes “El Derecho”. Miembro fundador de la Unión de Universidades de América Latina.",
    logros_gestion: "Impulso de la construcción de la Ciudad Universitaria. Instauración del Departamento de Servicio Social Universitario. Creación del EFPEM y CEFOL. Emisión del Estatuto de la carrera Universitaria. Establecimiento del Centro Audiovisual Universitario. Construcción del edificio de Recursos Educativos y creación de la Escuela de Ciencia Política.",
    foto_url: "/images/Dr. Rafael Cuevas del Cid.jpeg",
    fondo_url: "/images/fondo_4.jpeg",
    interacciones: { likes: 0, alumnos: 0 }
  },
  {
    id: "rector_15",
    nombre: "Dr. Roberto Valdeavellano Pinot",
    periodo: "1974-1978",
    descripcion_corta: "Gran descentralizador de la educación superior, llevando la universidad a las regiones a través de la fundación de múltiples centros universitarios regionales.",
    cita: "La universidad no tiene fronteras geográficas; su campus es todo el territorio nacional donde haya una mente ávida de conocimiento.",
    trayectoria_academica: "Odontólogo. Fue Decano de la Facultad de Odontología. Catedrático universitario y Secretario de la Asociación de Estudiantes de Odontología. Realizó estudios de postgrado y prácticas especializadas en las Universidades de Columbia y Pittsburg, Estados Unidos.",
    logros_gestion: "Fundación de los siguientes centros regionales: CUNOR, CUNOROC, CUNORI, CUNSUR, CUNSURORI y CUNSUROC. Creación de la Escuela de Trabajo Social y del Centro de Estudios Urbanos y Regionales (CEUR). Desarrollo del “Programa de Formación Docente”. Creación de las publicaciones: Boletín Universitario, Voz Universitaria; Revista Alero y Anuario.",
    foto_url: "/images/Dr. Roberto Valdeavellano Pinot.jpeg",
    fondo_url: getFondo(14),
    interacciones: { likes: 0, alumnos: 0 }
  },
  {
    id: "rector_16",
    nombre: "Lic. Saúl Osorio Paz",
    periodo: "1978-1980",
    descripcion_corta: "Rector valiente que defendió la autonomía universitaria desde el exilio durante los tiempos más oscuros de la represión, manteniendo viva la voz crítica de la institución.",
    cita: "La autonomía no se negocia ni en los tiempos de mayor oscuridad; es la antorcha que debemos mantener encendida a cualquier costo.",
    trayectoria_academica: "Licenciado en Economía. Docente universitario. Fue Decano de la Facultad de Ciencias Económicas y Director de la Escuela de Ciencias Económicas de Occidente, Quetzaltenango. Su gestión al frente de la Universidad ocurrió durante los años más difíciles de la represión gubernamental en Guatemala, fungió como Rector en el exilio, desde México y Costa Rica. Fue catedrático en la Universidad Nacional Autónoma de México, UNAM.",
    logros_gestion: "Defensa de la autonomía universitaria. Apoyo a los movimientos estudiantiles universitarios. Apertura de espacios para los sectores más necesitados del país. Fundación del semanario Siete Días.",
    foto_url: "/images/Lic. Saul Osorio Paz.jpeg",
    fondo_url: getFondo(15),
    interacciones: { likes: 0, alumnos: 0 }
  },
  {
    id: "rector_17",
    nombre: "Lic. Mario René Dary Rivera",
    periodo: "1981",
    descripcion_corta: "Mártir universitario y pionero de la conservación ambiental, cuyo legado perdura en la investigación científica y la protección de la biodiversidad guatemalteca.",
    cita: "Conservar la naturaleza es preservar la vida misma; la ciencia debe ser la guardiana de nuestro patrimonio natural para las futuras generaciones.",
    trayectoria_academica: "Licenciado en Ciencias Químicas y Farmacia. Biólogo. Secretario General de la Universidad. Docente universitario. Fundador de la Escuela de Biología. Fue Director del Museo de Historia Natural y del Jardín Botánico. Su período rectoral fue breve, ya que fue asesinado en la Ciudad Universitaria. En su honor se celebra el «Día del Biólogo» y se le otorgó su nombre al Biotopo para la Conservación del Quetzal.",
    logros_gestion: "Creación de la Dirección General de Investigación -DIGI-, del Consejo Coordinador e Impulsor de la Investigación-CONSIUSAC-; de la Dirección General de Administración-DIGA-; del Centro de Estudios Conservacionistas -CECON-; del Biotopo del Manatí, en Izabal y del Biotopo Cerro Cahuí, en Petén.",
    foto_url: "/images/Lic. Mario Rene Dary Rivera.jpg",
    fondo_url: getFondo(16),
    interacciones: { likes: 0, alumnos: 0 }
  },
  {
    id: "rector_18",
    nombre: "Dr. Eduardo Meyer Maldonado",
    periodo: "1982-1986",
    descripcion_corta: "Garante de la institucionalidad y la autonomía en la Constitución de 1985, consolidando el papel rector de la USAC en la educación superior nacional.",
    cita: "Nuestra autonomía es un mandato constitucional y moral, la piedra angular sobre la que descansa nuestra responsabilidad con la educación del pueblo.",
    trayectoria_academica: "Médico cirujano. Fue Secretario General de la Universidad. Catedrático universitario. Representó a la Universidad en diversos eventos científicos y académicos. Fue Ministro de Educación. Presidente del Organismo Legislativo. Diplomático.",
    logros_gestion: "Impulso a las políticas de investigación. Creación de la Coordinadora General de Planificación. Se garantiza la Autonomía de la Universidad, la integración del Consejo Superior Universitario sigue inalterado, estableciendo la participación tripartita en su gobierno a través de sus docentes, estudiantes y graduados. Se le reconoce personería jurídica y se le otorga la potestad de dirigir la educación superior del Estado.",
    foto_url: "/images/Dr. Eduardo Meyer Maldonado.jpeg",
    fondo_url: getFondo(17),
    interacciones: { likes: 0, alumnos: 0 }
  },
  {
    id: "rector_19",
    nombre: "Lic. Roderico Segura Trujillo",
    periodo: "1986-1990",
    descripcion_corta: "Impulsor de la diversidad lingüística y la regionalización, fortaleciendo la identidad cultural y la presencia universitaria en departamentos clave.",
    cita: "La universidad es universal, pero sus raíces deben nutrirse de las lenguas y culturas que definen nuestra identidad nacional.",
    trayectoria_academica: "Abogado y Notario. Catedrático universitario. Obtuvo la Maestría en Administración para el Desarrollo. Fue jefe del Departamento de Derecho Público.",
    logros_gestion: "Emisión de un nuevo Estatuto de la Carrera Universitaria. Creación de tres Centros Regionales: de Petén -CUDEP-, de San Marcos -CUSAM- y de Izabal -CUNIZAB-. Se extienden los servicios de CALUSAC a varios departamentos y se abren cursos de Cakchiquel y Kekchí. Creación de la Licenciatura en Deporte.",
    foto_url: "/images/Lic. Roderico Segura Trujillo.jpeg",
    fondo_url: getFondo(18),
    interacciones: { likes: 0, alumnos: 0 }
  },
  {
    id: "rector_20",
    nombre: "Dr. Juan Alfonso Fuentes Soria",
    periodo: "1990-1994",
    descripcion_corta: "Gestor de la comunicación universitaria y el bienestar estudiantil, inaugurando medios de difusión clave y espacios de servicio social multiprofesional.",
    cita: "Comunicar el saber es tan importante como crearlo; una universidad silenciosa no cumple su misión transformadora.",
    trayectoria_academica: "Odontólogo. Fue Vicepresidente de Guatemala; Decano de la Facultad de Odontología y catedrático universitario. Secretario General del CSUCA y Presidente de la Comisión Guatemalteca de Derechos Humanos. Presidente del Parlamento Centroamericano.",
    logros_gestion: "Aprobación de la Estructura Organizativa del Ejercicio Profesional Supervisado Multiprofesional. Inauguración del Museo de la Universidad de San Carlos de Guatemala. Apertura de la Unidad Ejecutora del Programa USAC/BCIE; del Centro Recreativo para trabajadores universitarios ubicado en la Finca Sabana Grande en Escuintla y del Albergue del Colegio Santo Tomás de Aquino. Creación de Radio Universidad y TV USAC.",
    foto_url: "/images/Dr. Alfonso Fuentes Soria.jpeg",
    fondo_url: getFondo(19),
    interacciones: { likes: 0, alumnos: 0 }
  },
  {
    id: "rector_21",
    nombre: "Dr. Jafeth Ernesto Cabrera Franco",
    periodo: "1994-1998",
    descripcion_corta: "Defensor del patrimonio histórico y la autonomía en su cincuentenario, fortaleciendo la infraestructura financiera y cultural de la universidad.",
    cita: "Cincuenta años de autonomía nos recuerdan que la libertad académica es una conquista diaria que debemos honrar con excelencia y servicio.",
    trayectoria_academica: "Médico cirujano. Fue Vicepresidente de Guatemala. Cursó estudios de postgrado en cirugía general. Fungió como Decano de la Facultad de Medicina. Catedrático universitario. Realizó estudios superiores de Organización y Dirección de los Servicios Médicos y Planificación en Salud en México.",
    logros_gestion: "Conmemoración del Cincuentenario de la Autonomía Universitaria. Promoción del avance de proyectos como la creación del Banco Universitario, y el convenio de cooperación con la municipalidad de Guatemala. Fomento del rescate del Centro Histórico. Incremento de la potencia de Radio Universidad.",
    foto_url: "/images/Dr. Jafeth Ernesto Cabrera Franco.jpeg",
    fondo_url: getFondo(20),
    interacciones: { likes: 0, alumnos: 0 }
  },
  {
    id: "rector_22",
    nombre: "Ing. Agr. Efraín Medina Guerra",
    periodo: "1998-2002",
    descripcion_corta: "Estratega académico que modernizó la gestión docente y de posgrado, estableciendo el Plan Estratégico de largo plazo y el Centro Universitario Metropolitano.",
    cita: "Planificar es construir el futuro; nuestra universidad debe mirar veinte años adelante para responder a los desafíos de un mundo globalizado.",
    trayectoria_academica: "Ingeniero agrónomo. Posee una Maestría en Ciencias de la Universidad de Texas A&M, Estados Unidos. Fue Decano de la Facultad de Agronomía. Fungió como ministro de Agricultura, Ganadería y Alimentación y Secretario General del CSUCA.",
    logros_gestion: "Creación de la Dirección General de Docencia, de la Coordinadora General de Cooperación, del Sistema de Estudios de Postgrado y del Centro Universitario Metropolitano. Acreditación de programas de postgrado. Incorporación de los derechos humanos en Ciencias Jurídicas y Sociales. Creación de la Dirección General de Docencia. Aprobación del Plan Estratégico por un período de 20 años. Inauguración del Canal Universitario.",
    foto_url: "/images/Ing. Agr. Efrain Medina Guerra.jpeg",
    fondo_url: getFondo(21),
    interacciones: { likes: 0, alumnos: 0 }
  },
  {
    id: "rector_23",
    nombre: "Dr. Luis Alfonso Leal Monterroso",
    periodo: "2002-2006",
    descripcion_corta: "Promotor de la inclusión y las artes, fundando el Instituto Universitario de la Mujer y la Escuela Superior de Arte, diversificando la oferta académica.",
    cita: "La paz se construye con educación, arte e inclusión; la universidad debe ser el espacio donde florezcan todas las expresiones del espíritu humano.",
    trayectoria_academica: "Médico veterinario. Fue Decano de la Facultad de Veterinaria. Fungió como Secretario General de la Universidad. Docente universitario. Representó a la Universidad en diversas instancias nacionales e internacionales.",
    logros_gestion: "Se efectuaron convenios con el sector privado. Fortalecimiento de los programas de cultura de paz con la Cooperación Canadiense. Creación del Centro Universitario de Santa Rosa -CUNSARO-, de la Escuela Superior de Arte, del Jardín Infantil, del programa de Educación Continua, del Instituto Universitario de la Mujer, de la Escuela de Ciencias Lingüísticas y del Instituto Tecnológico Maya de Estudios Superiores ITMES.",
    foto_url: "/images/Dr. Luis Alfonso Leal Monterroso.jpeg",
    fondo_url: getFondo(22),
    interacciones: { likes: 0, alumnos: 0 }
  },
  {
    id: "rector_24",
    nombre: "Dr. Carlos Estuardo Gálvez Barrios",
    periodo: "2006-2010, 2010-2014",
    descripcion_corta: "El gran expansor de la cobertura universitaria, llevando centros universitarios a casi todos los departamentos y modernizando los servicios estudiantiles.",
    cita: "Llevar la universidad a cada departamento no es solo una obra física, es un acto de justicia social para democratizar el conocimiento.",
    trayectoria_academica: "Abogado y notario. Doctor en Derecho. Fue Decano de la Facultad de Derecho y docente universitario. Obtuvo una maestría en Ciencias Penales en la Universidad de Costa Rica. Miembro de la Comisión para el Fortalecimiento del Sector Justicia y Presidente de la Comisión de Derecho Penal del Colegio de Abogados y Notarios de Guatemala.",
    logros_gestion: "Creación de Centros Universitarios en: Chimaltenango, Jutiapa, Totonicapán, El Progreso, Quiché, Baja Verapaz, Zacapa, Sololá y del Instituto Tecnológico Universitario Guatemala Sur. Creación de la Escuela de Ciencias Físicas y Matemáticas; así como del IPNUSAC, de la Coordinadora de Información Pública, del CEDESYD, de la División de Protocolo, del Programa de Cursos Libres e implementación del Servicio de transporte interno gratuito.",
    foto_url: "/images/Dr. Carlos Estuardo Galvez Barrios.jpeg",
    fondo_url: "/images/fondo_6.jpg",
    interacciones: { likes: 0, alumnos: 0 }
  },
  {
    id: "rector_25",
    nombre: "Dr. Carlos Guillermo Alvarado Cerezo",
    periodo: "2014-2018",
    descripcion_corta: "Impulsor de la educación continua y la innovación, fortaleciendo la presencia universitaria en Sacatepéquez y Retalhuleu.",
    cita: "La educación no termina con un título; es un compromiso de por vida que debemos facilitar a través de la actualización constante y la innovación.",
    trayectoria_academica: "Cirujano dentista. Fue Decano de la Facultad de Odontología y Secretario General de la Universidad. Docente universitario. Secretario General del Consejo Superior Universitario Centroamericano. Desempeñó varios cargos dentro de la Junta Directiva del Colegio Estomatológico de Guatemala.",
    logros_gestion: "Creación del Centro Universitario de Sacatepéquez y Centro Universitario de Retalhuleu; así como la creación de la Coordinadora de Cursos Libres y Educación Continua. Autorización del funcionamiento de la Coordinación de Ciencia, Tecnología e Innovación. Separación de la Coordinadora de Cursos Libres de la Coordinadora de Educación Continua.",
    foto_url: "/images/Dr. Carlos Alvarado Cerezo.jpeg",
    fondo_url: getFondo(24),
    interacciones: { likes: 0, alumnos: 0 }
  },
  {
    id: "rector_26",
    nombre: "Ing. Murphy Olympo Paiz Recinos",
    periodo: "2018-2021",
    descripcion_corta: "Pionero de la educación virtual y a distancia, preparando a la universidad para los retos tecnológicos del siglo XXI.",
    cita: "La tecnología es el puente que une al estudiante con el conocimiento, eliminando distancias y abriendo nuevas fronteras para el aprendizaje.",
    trayectoria_academica: "Ingeniero civil. Posee Maestría en docencia universitaria. Ha sido Decano de la Facultad de Ingeniería en dos períodos. Docente universitario. Fue miembro del Consejo Superior Universitario y Presidente del Colegio de Ingenieros de Guatemala.",
    logros_gestion: "Creación de la División de Educación a Distancia en Entornos Virtuales -DEDEV- y la Coordinadora General de Comunicación; y se traslada jerárquicamente el Jardín Infantil a la División de Administración de Recursos Humanos. Realización de Convenio de cooperación interinstitucional entre la Universidad de San Carlos de Guatemala y la Municipalidad de Mixco.",
    foto_url: "/images/Ing. Murphy Olympo Paiz Recinos.png",
    fondo_url: getFondo(25),
    interacciones: { likes: 0, alumnos: 0 }
  },
  {
    id: "rector_27",
    nombre: "M.A. Walter Ramiro Mazariegos Biolis",
    periodo: "2022-2026",
    descripcion_corta: "Gestor de la modernización administrativa y financiera, impulsando una oferta académica renovada con 42 nuevas carreras y saneamiento institucional.",
    cita: "La calidad educativa se sostiene sobre una administración eficiente y transparente, que invierte cada recurso en el futuro de nuestros estudiantes.",
    trayectoria_academica: "Posee Maestría en educación de valores. Licenciado en Pedagogía y Administración Educativa. Ha sido Decano de la Facultad de Humanidades y docente universitario. Miembro del Consejo Superior Universitario. Cuenta con Diplomado en liderazgo para el cambio por la Universidad de Regent, Virginia, Estados Unidos.",
    logros_gestion: "Firmas de convenios nacionales e internacionales, promoción de becas estudiantiles y para el personal administrativo. Apoyo al deporte universitario. Impulso a la capacitación y divulgación científica. Implementación de proyectos de infraestructura. Reducción significativa de la deuda. Gestión enfocada en la calidad del gasto y la austeridad. Lanzamiento de aplicaciones y plataformas para trámites administrativos y estudiantiles en línea. Aprobación de 42 nuevas carreras universitarias.",
    foto_url: "/images/M.A. Walter Ramiro Mazariegos Biolis.jpg",
    fondo_url: getFondo(26),
    interacciones: { likes: 0, alumnos: 0 }
  }
];