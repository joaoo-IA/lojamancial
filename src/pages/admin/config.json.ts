import type { APIRoute } from 'astro';
export const GET: APIRoute = () => {
 const local = import.meta.env.DEV && import.meta.env.CMS_LOCAL_BACKEND === 'true';
 const site = import.meta.env.PUBLIC_SITE_URL?.replace(/\/$/, '');
 const config = {
  load_config_file: false, locale: 'pt', display_url: '/', site_url: site || '/',
  backend: {name:'github',repo:'joaoo-IA/lojamancial',branch:'main',base_url:site || 'https://configurar-endereco.invalid',auth_endpoint:'api/oauth/auth',auth_scope:import.meta.env.CMS_GITHUB_SCOPE || 'public_repo',commit_messages:{create:'catalogo: cadastrar {{collection}} {{slug}}',update:'catalogo: atualizar {{collection}} {{slug}}',delete:'catalogo: remover {{collection}} {{slug}}',uploadMedia:'catalogo: adicionar imagem {{path}}',deleteMedia:'catalogo: remover imagem {{path}}'}},
  ...(local ? {local_backend:{url:'http://localhost:8081/api/v1',allowed_hosts:['localhost','127.0.0.1']}} : {}),
  media_folder:'public/media', public_folder:'/media',
  // A biblioteca local é implícita; media_library.name seleciona somente plugins externos registrados.
  publish_mode:'simple',
  collections:[{name:'produtos',label:'Produtos',label_singular:'Produto',folder:'src/content/produtos',format:'json',extension:'json',create:true,delete:false,identifier_field:'id',slug:'{{id}}',summary:'{{nome}} · {{precoCentavos}} centavos · visível: {{visivel}}',editor:{preview:false},fields:[
   {label:'Identificador estável',name:'id',widget:'uuid',read_only:true,hint:'Gerado automaticamente. Não muda nas edições.'},
   {label:'Nome',name:'nome',widget:'string'},
   {label:'Descrição',name:'descricao',widget:'text'},
   {label:'Preço em centavos',name:'precoCentavos',widget:'number',value_type:'int',min:1,max:10000000,hint:'14990 = R$ 149,90. Use somente números inteiros.'},
   {label:'Categoria',name:'categoria',widget:'select',options:['Conjuntos','Blusas','Tops','Leggings','Shorts'],default:'Conjuntos'},
   {label:'Visível na vitrine',name:'visivel',widget:'boolean',default:true,hint:'Desative para ocultar. Publique e aguarde o build concluir.'},
   {label:'Foto principal',name:'foto',widget:'image',choose_url:false,media_library:{allow_multiple:false,config:{max_file_size:5242880}},hint:'Use as ilustrações existentes ou envie JPG, PNG ou WebP de até 5 MB. Outros SVGs são bloqueados no build.'},
   {label:'Descrição acessível da foto',name:'fotoAlt',widget:'string'},
   {label:'Peças incluídas',name:'pecasIncluidas',widget:'string',default:'Top e legging',hint:'Nesta prova: descreva as peças, sem definir ainda tamanhos independentes de conjuntos.'},
   {label:'Variações ilustrativas',name:'variacoes',widget:'list',min:1,fields:[{label:'ID da variação',name:'id',widget:'uuid',read_only:true},{label:'Cor',name:'cor',widget:'string'},{label:'Tamanho',name:'tamanho',widget:'string'}]}
  ]}]
 };
 return Response.json(config, {headers:{'Cache-Control':'no-store'}});
};
