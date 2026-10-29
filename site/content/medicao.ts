/**
 * MEDIÇÃO (28/10/2026, seo-mxc 3.10, 1.28 e 3.21).
 *
 * GA4 da conta "Clínica Veterinária Caroline Keffer" (joaomcclima@gmail.com),
 * propriedade clinicacarolinekeffer.com.br, fluxo "Site Clínica Caroline Keffer".
 *
 * Modo de consentimento no modo BÁSICO: a tag do Google só é baixada depois
 * que a pessoa toca em Aceitar. Antes disso não sai nada do navegador, nem o
 * aviso de "sem consentimento" do modo avançado. Recusar não muda nada no site.
 *
 * O que entra no GA4 além das visitas: os toques em WhatsApp, Ligar e Como
 * chegar (eventos abaixo). `clique_whatsapp` é o evento principal: é o número
 * que mostra quantos agendamentos o site trouxe.
 *
 * Só mede no domínio da clínica: a cópia no .pages.dev e o `npm run dev` não
 * mandam dado nenhum, nem mostram o aviso.
 *
 * ⚠️ Se entrar outra ferramenta (Clarity, Pixel), ela entra AQUI, carregando
 * no mesmo `aceitar`, e a seção "Cookies" da política muda antes do deploy.
 */
import { ehProposta } from "@/content/site";

export const GA4_ID = "G-WE1TTDQTL7";

/** Medição ligada só no site aprovado. Na proposta não há aviso nem tag. */
export const medicaoLigada = !ehProposta && Boolean(GA4_ID);

/** Cookie onde fica a escolha: `v1.sim` ou `v1.nao`, por 12 meses. */
export const COOKIE_ESCOLHA = "kf_cookies";

export const avisoCookies = {
  texto:
    "Cookies de análise só se você aceitar. Recusar não muda nada no site.",
  recusar: "Recusar",
  aceitar: "Aceitar",
  politica: "Política",
  preferencias: "Preferências de cookies",
};

/**
 * Script que roda no <head>, antes de tudo: deixa o consentimento negado por
 * padrão, carrega a tag na hora para quem já aceitou e marca o <html> com a
 * escolha (o CSS esconde o aviso sem piscar). Também liga os eventos de toque.
 * Fica em texto porque precisa rodar antes da hidratação do React.
 */
export function scriptMedicao() {
  return `(function(){
var ID=${JSON.stringify(GA4_ID)},C=${JSON.stringify(COOKIE_ESCOLHA)},H=document.documentElement;
window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied'});
if(location.hostname!=='clinicacarolinekeffer.com.br'){H.dataset.cookies='fora';return}
window.kfMedir=function(){if(window.kfMedindo)return;window.kfMedindo=1;
gtag('consent','update',{analytics_storage:'granted'});
var s=document.createElement('script');s.async=1;s.src='https://www.googletagmanager.com/gtag/js?id='+ID;document.head.appendChild(s);
gtag('js',new Date());gtag('config',ID)};
var m=document.cookie.match(new RegExp('(?:^|; )'+C+'=([^;]*)'));
if(m&&m[1]==='v1.sim'){H.dataset.cookies='sim';window.kfMedir()}else if(m&&m[1]==='v1.nao'){H.dataset.cookies='nao'}
document.addEventListener('click',function(e){if(!window.kfMedindo)return;var a=e.target.closest&&e.target.closest('a[href]');if(!a)return;var h=a.getAttribute('href')||'',n=null;
if(/wa\\.me|api\\.whatsapp/.test(h))n='clique_whatsapp';else if(/^tel:/.test(h))n='clique_telefone';else if(/google\\.[^/]+\\/maps|maps\\.app\\.goo|maps\\.google/.test(h))n='clique_rotas';
if(n)gtag('event',n,{link_url:h.split('?')[0]})},true)})();`;
}
