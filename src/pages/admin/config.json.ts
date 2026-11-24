import { isPreviewDemo } from '../../lib/preview';
import type {APIRoute} from 'astro';
export const GET: APIRoute=()=>{
 const config={
  "load_config_file": false,
  "locale": "pt",
  "display_url": "/",
  "site_url": "https://lojamancial.pages.dev",
  "backend": {
    "name": "github",
    "repo": "joaoo-IA/lojamancial",
    "branch": "main",
    "base_url": "https://lojamancial.pages.dev",
    "auth_endpoint": "api/oauth/auth",
    "auth_scope": "public_repo",
    "commit_messages": {
      "create": "catalogo: cadastrar {{collection}} {{slug}}",
      "update": "catalogo: atualizar {{collection}} {{slug}}",
      "delete": "catalogo: remover {{collection}} {{slug}}",
      "uploadMedia": "catalogo: adicionar imagem {{path}}",
      "deleteMedia": "catalogo: remover imagem {{path}}"
    }
  },
  "media_folder": "public/media",
  "public_folder": "/media",
  "publish_mode": "simple",
  "collections": [
    {
      "name": "produtos",
      "label": "Produtos",
      "label_singular": "Produto",
      "folder": "src/content/produtos",
      "format": "json",
      "extension": "json",
      "create": true,
      "delete": false,
      "identifier_field": "id",
      "slug": "{{id}}",
      "summary": "{{nome}} · {{precoCentavos}} centavos · visível: {{visivel}}",
      "editor": {
        "preview": false
      },
      "fields": [
        {
          "label": "Identificador estável",
          "name": "id",
          "widget": "uuid",
          "read_only": true,
          "hint": "Gerado automaticamente. Não muda nas edições."
        },
        {
          "label": "Nome",
          "name": "nome",
          "widget": "string"
        },
        {
          "label": "Descrição",
          "name": "descricao",
          "widget": "text"
        },
        {
          "label": "Preço em centavos",
          "name": "precoCentavos",
          "widget": "number",
          "value_type": "int",
          "min": 1,
          "max": 10000000,
          "hint": "14990 = R$ 149,90. Use somente números inteiros."
        },
        {
          "name": "categoriaId",
          "label": "Categoria",
          "widget": "relation",
          "collection": "categorias",
          "search_fields": [
            "nome"
          ],
          "value_field": "id",
          "display_fields": [
            "nome"
          ],
          "required": false
        },
        {
          "name": "categoria",
          "label": "Categoria original (compatibilidade)",
          "widget": "string",
          "read_only": true,
          "required": false,
          "hint": "Registros antigos continuam usando esta categoria enquanto o novo vínculo não for preenchido."
        },
        {
          "label": "Visível na vitrine",
          "name": "visivel",
          "widget": "boolean",
          "default": true,
          "hint": "Desative para ocultar. Publique e aguarde o build concluir."
        },
        {
          "label": "Foto principal",
          "name": "foto",
          "widget": "image",
          "choose_url": false,
          "media_library": {
            "allow_multiple": false,
            "config": {
              "max_file_size": 5242880
            }
          },
          "hint": "Use as ilustrações existentes ou envie JPG, PNG ou WebP de até 5 MB. Outros SVGs são bloqueados no build."
        },
        {
          "label": "Descrição acessível da foto",
          "name": "fotoAlt",
          "widget": "string"
        },
        {
          "name": "galeria",
          "label": "Fotos adicionais",
          "widget": "list",
          "required": false,
          "max": 5,
          "summary": "{{fields.alt}}",
          "hint": "Até cinco fotos adicionais. A foto principal continua a primeira.",
          "fields": [
            {
              "name": "foto",
              "label": "Foto",
              "widget": "image",
              "choose_url": false,
              "media_library": {
                "config": {
                  "max_file_size": 5242880
                }
              }
            },
            {
              "name": "alt",
              "label": "Descrição da imagem",
              "widget": "string"
            }
          ]
        },
        {
          "name": "guiaMedidasId",
          "label": "Guia de medidas",
          "widget": "relation",
          "collection": "medidas",
          "search_fields": [
            "nome"
          ],
          "value_field": "id",
          "display_fields": [
            "nome"
          ],
          "required": false
        },
        {
          "name": "novidade",
          "label": "Novidade",
          "widget": "boolean",
          "default": false
        },
        {
          "name": "destaque",
          "label": "Destaque da coleção",
          "widget": "boolean",
          "default": false
        },
        {
          "name": "ordem",
          "label": "Ordem de exibição",
          "widget": "number",
          "value_type": "int",
          "min": 0,
          "default": 0
        },
        {
          "label": "Peças incluídas",
          "name": "pecasIncluidas",
          "widget": "string",
          "default": "Top e legging",
          "hint": "Nesta prova: descreva as peças, sem definir ainda tamanhos independentes de conjuntos."
        },
        {
          "label": "Variações ilustrativas",
          "name": "variacoes",
          "widget": "list",
          "min": 1,
          "fields": [
            {
              "label": "ID da variação",
              "name": "id",
              "widget": "uuid",
              "read_only": true
            },
            {
              "label": "Cor",
              "name": "cor",
              "widget": "string"
            },
            {
              "label": "Tamanho",
              "name": "tamanho",
              "widget": "string"
            }
          ]
        }
      ]
    },
    {
      "name": "categorias",
      "label": "Categorias",
      "folder": "src/content/categorias",
      "format": "json",
      "extension": "json",
      "create": true,
      "delete": false,
      "identifier_field": "id",
      "slug": "{{id}}",
      "summary": "{{nome}}",
      "editor": {
        "preview": false
      },
      "fields": [
        {
          "name": "id",
          "label": "ID estável",
          "widget": "uuid",
          "read_only": true
        },
        {
          "name": "nome",
          "label": "Nome",
          "widget": "string"
        },
        {
          "name": "slug",
          "label": "Endereço curto",
          "widget": "string",
          "pattern": [
            "^[a-z0-9-]+$",
            "Use letras minúsculas, números e hífen."
          ]
        },
        {
          "name": "imagem",
          "label": "Imagem",
          "widget": "image",
          "choose_url": false,
          "media_library": {
            "config": {
              "max_file_size": 5242880
            }
          }
        },
        {
          "name": "alt",
          "label": "Descrição da imagem",
          "widget": "string"
        },
        {
          "name": "ordem",
          "label": "Ordem",
          "widget": "number",
          "value_type": "int",
          "min": 0,
          "default": 0
        },
        {
          "name": "visivel",
          "label": "Exibir na navegação",
          "widget": "boolean",
          "default": true,
          "hint": "Não oculta automaticamente os produtos desta categoria."
        }
      ]
    },
    {
      "name": "medidas",
      "label": "Guias de medidas",
      "folder": "src/content/medidas",
      "format": "json",
      "extension": "json",
      "create": true,
      "delete": false,
      "identifier_field": "id",
      "slug": "{{id}}",
      "summary": "{{nome}}",
      "editor": {
        "preview": false
      },
      "fields": [
        {
          "name": "id",
          "label": "ID estável",
          "widget": "uuid",
          "read_only": true
        },
        {
          "name": "nome",
          "label": "Nome",
          "widget": "string"
        },
        {
          "name": "nota",
          "label": "Orientação e origem dos valores",
          "widget": "text"
        },
        {
          "name": "linhas",
          "label": "Tamanhos e medidas em cm",
          "widget": "list",
          "min": 1,
          "fields": [
            {
              "name": "tamanho",
              "label": "Tamanho",
              "widget": "string"
            },
            {
              "name": "busto",
              "label": "Busto",
              "widget": "number",
              "value_type": "float",
              "min": 1,
              "default": 0,
              "max": 399,
              "required": false
            },
            {
              "name": "cintura",
              "label": "Cintura",
              "widget": "number",
              "value_type": "float",
              "min": 1,
              "default": 0,
              "max": 399
            },
            {
              "name": "quadril",
              "label": "Quadril",
              "widget": "number",
              "value_type": "float",
              "min": 1,
              "default": 0,
              "max": 399
            }
          ]
        }
      ]
    },
    {
      "name": "loja",
      "label": "Informações da loja",
      "editor": {
        "preview": false
      },
      "files": [
        {
          "file": "src/content/loja/configuracao.json",
          "name": "configuracao",
          "label": "Identificação e atendimento",
          "fields": [
            {
              "name": "nome",
              "label": "Nome provisório",
              "widget": "string"
            },
            {
              "name": "subtitulo",
              "label": "Subtítulo",
              "widget": "string"
            },
            {
              "name": "atendimento",
              "label": "Horário e atendimento",
              "widget": "text"
            },
            {
              "name": "whatsapp",
              "label": "WhatsApp",
              "widget": "string",
              "required": false,
              "hint": "Somente dígitos com país e DDD. Em branco até definição comercial."
            },
            {
              "name": "entrega",
              "label": "Entrega e retirada",
              "widget": "text"
            }
          ]
        }
      ]
    },
    {
      "name": "banners",
      "label": "Banners — modelo para E3",
      "editor": {
        "preview": false
      },
      "files": [
        {
          "file": "src/content/loja/banners.json",
          "name": "banners",
          "label": "Banners da inicial",
          "fields": [
            {
              "name": "itens",
              "label": "Banners preparados",
              "widget": "list",
              "required": false,
              "fields": [
                {
                  "name": "id",
                  "label": "ID estável",
                  "widget": "uuid",
                  "read_only": true
                },
                {
                  "name": "titulo",
                  "label": "Título",
                  "widget": "string"
                },
                {
                  "name": "imagem",
                  "label": "Imagem",
                  "widget": "image",
                  "choose_url": false,
                  "media_library": {
                    "config": {
                      "max_file_size": 5242880
                    }
                  }
                },
                {
                  "name": "alt",
                  "label": "Descrição da imagem",
                  "widget": "string"
                },
                {
                  "name": "link",
                  "label": "Link interno",
                  "widget": "string",
                  "pattern": [
                    "^/(?!/).*",
                    "Use um caminho interno iniciado por uma barra."
                  ]
                },
                {
                  "name": "ordem",
                  "label": "Ordem",
                  "widget": "number",
                  "value_type": "int",
                  "min": 0,
                  "default": 0
                },
                {
                  "name": "visivel",
                  "label": "Visível",
                  "widget": "boolean",
                  "default": false
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
 if(isPreviewDemo()) return Response.json({...config,backend:{name:'test-repo'},site_url:'/',display_url:'/'},{headers:{'Cache-Control':'no-store'}});
 const site=import.meta.env.PUBLIC_SITE_URL?.replace(/\/$/,'');
 config.site_url=site||'/';config.backend.base_url=site||'https://configurar-endereco.invalid';config.backend.auth_scope=import.meta.env.CMS_GITHUB_SCOPE||'public_repo';
 const local=import.meta.env.DEV&&import.meta.env.CMS_LOCAL_BACKEND==='true';
 if(local) config.site_url='/';
 return Response.json({...config,...(local?{local_backend:{url:import.meta.env.CMS_LOCAL_PROXY_URL||'http://localhost:8081/api/v1',allowed_hosts:['localhost','127.0.0.1']}}:{})},{headers:{'Cache-Control':'no-store'}});
};
