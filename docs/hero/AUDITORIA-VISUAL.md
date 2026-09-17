# Auditoria visual do hero · council cego da /landing

16/09/2026. Escopo: só a primeira dobra (desktop e mobile). Brief em [BRIEF.md](BRIEF.md).

## Seleção da direção (council de 6 lentes sobre 6 candidatos)

Venceu **F · pata com fotos** (4 de 6 votos), à frente do prontuário (2 votos).
Enxertos aplicados vindos dos outros candidatos: rótulos nas fotos, Dra. Carol em destaque,
âncoras que comandam a pata, glow no lugar de crescer no hover.

## Rodadas do council visual

Juízes novos a cada rodada, vendo só prints + BRIEF.

| Rodada | Must-fix | Nota mínima | Principais consertos aplicados depois |
|---|---|---|---|
| 1 | 9 | 5,0 | Sobretítulo no desktop · título quebrado por sentido · véu do mobile · reenquadre das fotos · patinhas fora do texto · respiro texto/pata |
| 2 | 5 | 5,5 | Foto da Dra. Carol limpa (recorte sobre fundo da marca) · pata maior e mais baixa, invadindo a faixa central · divisa escura suavizada |
| 3 | 1 | 5,5 | Patinhas de volta com ritmo · âncora "O cuidado" deixou de repetir o apoio |
| 4 | 2 | 6,0 | Almofada em cúpula como no logo + coração do logo · anéis e fios só no hover |
| 5 | 2 | 6,0 | Pata alinhada à borda direita da navbar |
| 6 | 0 | 7,0 | Placa de estacionamento fora da almofada · anel fixo na Dra. Carol · âncoras viraram links · botão do hero no mesmo ciano do site |
| 7 | 1 | 6,0 | Âncoras comandam a pata (hover/foco acende a parte correspondente) · brilho do botão sem faixa escura |
| 8 | 0 | 6,5 | Fios removidos · "A casa" acende forte · "O cuidado" virou "O atendimento" |
| 9 | 0 | 6,5 | Área livre de patinhas em volta da pata · hover da Dra. Carol perceptível · recortes sem cortar cabeça |
| 10 | 1 | 6,5 | Foto do dedo Atendimento trocada (pet visível acima do rótulo) · hover da almofada no mesmo padrão dos dedos |
| 11 | **0** | **7,0** | Ajustes dos nice-to-have: contêiner de 1400px a partir de 1536 (navbar junto) · texto alinhado ao logo · ladrilho maior no wide · pata adaptada ao celular e tablet |
| 12 | 4 | 6,5 | Mobile entrou no escopo: contraste do sobretítulo · título quebra por sentido em 390 · rótulos pendurados fora do dedo · textura mais visível |
| 13 | 3 | 7,0 | iPhone SE: pata menor e afastada da navbar · sobretítulo com respiro próprio |
| 14 | **0** | **7,0** | Rótulo da Dra. Carol branco com anel ciano (não parece botão) · hover dela mais forte · apoio curto sem "e … e" |

Depois da rodada 14 (pedido do JM, 16/09/2026): hero enxugado para título, apoio e dois CTAs
(WhatsApp e "Ver serviços"). Saíram o sobretítulo e as três âncoras, e com elas o efeito das
âncoras sobre a pata. O brilho no hover direto dos dedos continua.

## Redesenho (16/09/2026, tarde)

Council cego de 6 lentes comparou o hero atual (A) com três protótipos: B "texto dentro da
pata", C "pilares com recortes" (ref. 1) e D "título com fotos" (ref. 2). Votos: B 3 · D 2 ·
A 1 · C 0. Construído B no desktop; celular e tablet mantidos (a lente mobile preferiu A).
Candidatos em `auditoria/candidatos2/`.

| Rodada | Must-fix | Consertos |
|---|---|---|
| 15 | 2 (letreiro cortado pela cúpula · chip colado nos CTAs em 1280) | Reenquadre da fachada · endereço fora da foto, maior, acima da cúpula (pedido do JM) · vão mínimo de ~32px CTA/endereço · coração dentro da almofada · dedos de baixo mais perto da almofada · anéis do celular sem cruzar o título |

## Resultado

- **Must-fix: zero** nas 6 lentes (rodadas 6, 8, 9 e 11).
- **Nota mínima: 7,0**, abaixo do 9 que o portão pede. Notas mínimas por lente na rodada 11:
  primeiro impacto 8,5 · hierarquia 7,5 · tipografia 7,5 · mobile 8,5 · marca 7,0 · conversão 8,0.
- Decisão: entregar. Os pontos que seguram as notas são de gosto e recorrentes, não defeitos,
  e vários contrariam decisões do dono (ver abaixo). Mais rodadas trocavam um nice-to-have por outro.

## Nice-to-have que ficaram (para o dono decidir)

1. **Grade em duas colunas** (texto à esquerda, pata à direita): a lente de marca ainda lê como
   layout clássico. Foi a composição escolhida pelo dono; a ligação vem das âncoras.
2. **1920px**: o conjunto não cresce com a tela e sobra faixa vazia em cima e embaixo.
   Crescer exigiria alargar o contêiner de 1200px do site inteiro (navbar junto).
3. **Coluna de texto a ~15px da borda do logo da navbar**: desalinhamento pequeno de grade.
4. **Textura de patinhas**: em 1920 a repetição do ladrilho aparece.
5. **Céu da fachada** é a área mais clara da tela e puxa o olho antes do letreiro.
6. **Status "Aberto agora"** só aparece no celular; no desktop fica no menu.
7. **Setas "→" nas âncoras** sugerem outra página; elas rolam para seções abaixo.

## Pendências de conteúdo da clínica

- Foto da fachada em resolução maior (a atual é foto de celular).
- Confirmar o horário de funcionamento (marcado VALIDAR em `content/site.ts`).
- Autorização de uso das fotos da equipe e dos pets.
