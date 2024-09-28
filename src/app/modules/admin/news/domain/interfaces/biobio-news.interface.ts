export interface IBioBioNews {
    ID: number;
    post_title: string;
    post_content: string;
    post_excerpt: string;
    post_URL: string;
    post_name: string;
    title_twitter: string;
    post_modified: string;
    post_parent: number;
    post_categories: PostCategory[];
    post_tags: PostTag[];
    post_category_primary: Category;
    post_category_secondary: Category;
    primary: string;
    secondary: string;
    short_url: string;
    year: string;
    month: string;
    day: string;
    video_rudo_destacado: string;
    url_banner_falabella: string;
    barra_falabella: string;
    is_columnista_vip: boolean;
    en_desarrollo: boolean;
    spoiler: boolean;
    explicitas: boolean;
    presunta_inocencia: boolean;
    transporte: boolean;
    estudio: boolean;
    violencia: boolean;
    suicidio: boolean;
    nota_imagen_grande: boolean;
    barra_medio_asociado: BarraMedioAsociado;
    nota_en_vivo: boolean;
    pdest: string;
    super_titular_tag: any;
    author: Person;
    authors_html: string;
    autorBiobioTV: string;
    notaFeliz: number;
    video_destacado_en_portada: number;
    multicaja: number;
    chkCronica: number;
    noCmnts: number;
    noticia_patrocinada: number;
    noticia_patrocinada_logo_imagen: string;
    extracto: string;
    firma_autor: string;
    post_image: PostImage;
    video_rudo_destacado_tag: string;
    notas_relacionadas: NotasRelacionada[];
    resumen_de_ia: string;
    frase_bbcl_investiga: string;
    marca_imagen_social: string;
    raw_post_date: string;
    post_date: string;
    post_date_timestamp: number;
    post_date_date: string;
    post_date_txt: string;
    post_hour: string;
    post_URL_https: string;
    post_hour_modified?: string;
    falabella_novios: boolean;
    titulo_html: string;
    es_inserto_p7: boolean;
    es_inserto_ist: boolean;
    es_inserto: boolean;
    es_vida: boolean;
    es_espectaculos_o_sociedad: boolean;
    es_nota_de_region: boolean;
    publishers?: Person[];
    destacados?: number[];
    espdest?: number[];
    internacional_extra?: string;
    colaborators?: Person[];
}

export interface PostCategory {
    ID: number;
    name: string;
    slug: string;
}

export interface PostTag {
    ID: number;
    name: string;
    slug: string;
}

export interface Category {
    term_id: number;
    name: string;
    slug: string;
    _parent?: number;
}

export interface BarraMedioAsociado {
    activo: boolean;
    medio?: string;
}

export interface Person {
    id: number;
    display_name: string;
    user_login: string;
    user_email: string;
    user_description: string;
}

export interface PostImage {
    URL: string;
    alt: string;
    caption: string;
    width: number;
    height: number;
    thumbnails: Thumbnails;
}

export interface Thumbnails {
    thumbnail: MediaFile;
    medium: MediaFile;
    large: MediaFile;
    social: MediaFile;
}

export interface MediaFile {
    width: number;
    height: number;
    URL: string;
}

export interface NotasRelacionada {
    ID: number;
    post_title: string;
    post_excerpt: string;
    post_URL: string;
    images: Images;
}

export interface Images {
    thumbnail: string;
    medium: string;
    large: string;
    social: string;
}
